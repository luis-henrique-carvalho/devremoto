#!/usr/bin/env node

/**
 * slot-arbiter.mjs
 * 
 * Gerenciador Inteligente de Fila & Árbitro Anti-Colisão de Publicações
 * 
 * Invariantes do DevRemoto:
 * 1. Grade Editorial Oficial de Slots Diários (Horário de Brasília):
 *    - 'vagas'   -> 09:00 BRT (12:00 UTC) [Fixo Diário: Carrossel de 8 Vagas]
 *    - 'video'   -> 13:30 BRT (16:30 UTC) [Fixo Diário: Reels / HyperFrames]
 *    - 'content' -> 18:30 BRT (21:30 UTC) [Dias Úteis: Carrossel Técnico / Dicas]
 * 
 * 2. Regras Anti-Canibalização:
 *    - Buffer Intra-Canal: NUNCA publicar dois conteúdos no mesmo canal com menos de 4h de intervalo.
 *    - Buffer Inter-Canais: NUNCA agendar no mesmo minuto que outro canal (ex: Mundos Vivos vs DevRemoto).
 *    - Fila Sequencial: Se o slot de hoje já estiver ocupado, avança automaticamente para o próximo dia livre.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');

export const DEVREMOTO_INTEGRATION_ID = 'cmw6m87yh0001qjy4vy20eyss';

export const SLOT_HOURS_UTC = {
  vagas: { hourUtc: 12, minuteUtc: 0, labelBrt: '09:00 BRT', name: 'Carrossel de Vagas' },
  video: { hourUtc: 16, minuteUtc: 30, labelBrt: '13:30 BRT', name: 'Vídeo Reels HyperFrames' },
  content: { hourUtc: 21, minuteUtc: 30, labelBrt: '18:30 BRT', name: 'Carrossel Técnico & Dicas' },
};

export function loadDotEnv(envPath = ENV_PATH) {
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match) env[match[1]] = match[2].trim();
    }
  }
  return env;
}

export function fetchPostizPosts(envOverrides = {}) {
  const env = { ...process.env, ...loadDotEnv(), ...envOverrides };
  const postizBin = env.POSTIZ_BIN || 'postiz';

  const res = spawnSync(postizBin, ['posts:list'], {
    encoding: 'utf8',
    env,
    timeout: 30_000,
  });

  if (res.status !== 0) {
    console.warn('[SlotArbiter] Não foi possível consultar fila do Postiz via CLI:', res.stderr || res.stdout);
    return [];
  }

  const stdout = res.stdout || '';
  const jsonStart = stdout.indexOf('{');
  if (jsonStart === -1) return [];

  try {
    const data = JSON.parse(stdout.slice(jsonStart));
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (err) {
    console.warn('[SlotArbiter] Erro ao parsear JSON do Postiz:', err.message);
    return [];
  }
}

/**
 * Retorna o próximo slot vago sem colisão.
 * 
 * @param {'vagas' | 'video' | 'content'} contentType
 * @param {Date} [referenceDate]
 * @param {Object} [options]
 * @returns {{ scheduleIso: string, slotBrt: string, dateSlug: string, isNextDay: boolean }}
 */
export function findNextAvailableSlot(contentType = 'video', referenceDate = new Date(), options = {}) {
  const slotConfig = SLOT_HOURS_UTC[contentType] || SLOT_HOURS_UTC.video;
  const targetIntegrationId = options.integrationId || DEVREMOTO_INTEGRATION_ID;
  const minSpacingHours = options.minSpacingHours ?? 4; // mínimo de 4h entre posts do mesmo canal
  const minAdvanceMinutes = options.minAdvanceMinutes ?? 30; // não agendar com menos de 30min de antecedência

  const allPosts = fetchPostizPosts(options.envOverrides);

  // Filtrar posts ativos (QUEUE ou PUBLISHED recente)
  const activePosts = allPosts.filter(p => p.state === 'QUEUE' || p.state === 'PUBLISHED');

  const now = referenceDate;
  let testDate = new Date(now.getTime());

  // Tenta até 14 dias futuros
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const candidate = new Date(Date.UTC(
      testDate.getUTCFullYear(),
      testDate.getUTCMonth(),
      testDate.getUTCDate(),
      slotConfig.hourUtc,
      slotConfig.minuteUtc,
      0,
      0
    ));

    // Se o horário já passou hoje ou está dentro da margem de antecedência mínima
    if (candidate.getTime() <= now.getTime() + minAdvanceMinutes * 60_000) {
      testDate.setUTCDate(testDate.getUTCDate() + 1);
      continue;
    }

    // Verificar colisão intra-canal (DevRemoto)
    let hasIntraCollision = false;
    let intraCollisionReason = '';

    for (const post of activePosts) {
      if (!post.publishDate) continue;
      const postDate = new Date(post.publishDate);
      const isSameChannel = post.integrationId === targetIntegrationId || post.integration?.id === targetIntegrationId;

      if (isSameChannel) {
        const diffMs = Math.abs(candidate.getTime() - postDate.getTime());
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < minSpacingHours) {
          hasIntraCollision = true;
          intraCollisionReason = `Conflito intra-canal: já existe post agendado (${post.id}) em ${postDate.toISOString()} (espaçamento: ${diffHours.toFixed(1)}h < ${minSpacingHours}h)`;
          break;
        }
      } else {
        // Verificar colisão inter-canais (exato mesmo horário de outro canal)
        const diffMinutes = Math.abs(candidate.getTime() - postDate.getTime()) / (1000 * 60);
        if (diffMinutes < 15) {
          hasIntraCollision = true;
          intraCollisionReason = `Conflito inter-canais: canal "${post.integration?.name || post.integrationId}" tem post em ${postDate.toISOString()} (${diffMinutes.toFixed(0)}m de diferença)`;
          break;
        }
      }
    }

    if (!hasIntraCollision) {
      const dateSlug = candidate.toISOString().slice(0, 10);
      return {
        scheduleIso: candidate.toISOString(),
        slotBrt: `${dateSlug} às ${slotConfig.labelBrt}`,
        dateSlug,
        slotName: slotConfig.name,
        isNextDay: dayOffset > 0,
      };
    }

    // Avança para o próximo dia
    testDate.setUTCDate(testDate.getUTCDate() + 1);
  }

  // Fallback seguro se tudo estiver cheio por 14 dias
  const fallback = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return {
    scheduleIso: fallback.toISOString(),
    slotBrt: fallback.toISOString(),
    dateSlug: fallback.toISOString().slice(0, 10),
    slotName: slotConfig.name,
    isNextDay: true,
  };
}

/**
 * Função utilitária para imprimir o mapa de slots atuais
 */
export function printScheduleMap() {
  console.log('📅 Mapa de Slots e Fila de Publicações (DevRemoto):\n');
  const allPosts = fetchPostizPosts();
  const devPosts = allPosts.filter(p => 
    p.integrationId === DEVREMOTO_INTEGRATION_ID || p.integration?.id === DEVREMOTO_INTEGRATION_ID
  );

  devPosts.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());

  for (const p of devPosts) {
    const d = new Date(p.publishDate);
    const brt = d.toLocaleString('pt-BR', { timeZone: 'America/Bahia' });
    const textSnippet = (p.content || '').replace(/<[^>]+>/g, '').split('\n')[0].slice(0, 50);
    const stateIcon = p.state === 'PUBLISHED' ? '🟢 Publicado' : '🟡 Na Fila (QUEUE)';
    console.log(`  • ${brt} | ${stateIcon} | ID: ${p.id} | "${textSnippet}..."`);
  }

  console.log('\n🔮 Próximos Slots Livres Recomendados:');
  for (const type of ['vagas', 'video', 'content']) {
    const next = findNextAvailableSlot(type);
    console.log(`  - [${type.toUpperCase()}] -> ${next.slotBrt} (${next.scheduleIso})`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('slot-arbiter.mjs')) {
  printScheduleMap();
}
