#!/usr/bin/env node

/**
 * DevRemoto: Pipeline Diário de Vídeo Viral de IA e Ferramentas Open-Source
 * 
 * Executa ponta a ponta:
 * 1. Curadoria do próximo repositório trending do catálogo
 * 2. Geração da narração neural com Edge-TTS / Kokoro + alinhamento de legendas
 * 3. Montagem da composição determinística HyperFrames (HTML + GSAP)
 * 4. Renderização GPU para MP4 (1080x1920, 30fps)
 * 5. Agendamento automático no Postiz para as 12:00 BRT
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadDotEnv, publishVideoToPostiz } from './src/publish-postiz.mjs';
import { findNextAvailableSlot } from './src/slot-arbiter.mjs';
import { compileVideoHtml } from './src/video-composer/composer.mjs';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT_DIR, 'data');
const VIDEOS_DIR = path.join(ROOT_DIR, 'videos');
const CATALOG_PATH = path.join(DATA_DIR, 'video-repo-catalog.json');
const HISTORY_PATH = path.join(DATA_DIR, 'video-history.json');
const TEMPLATE_ASSETS_DIR = path.join(VIDEOS_DIR, 'trending-repo', 'assets');
const ENV_PATH = path.join(ROOT_DIR, '.env');

function parseCliArgs(argv) {
  const getVal = (flag, fallback) => {
    const idx = argv.indexOf(flag);
    return idx >= 0 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    dryRun: argv.includes('--dry-run'),
    forceAudio: argv.includes('--force-audio'),
    repoId: getVal('--repo', ''),
    publishMode: getVal('--publish-mode', 'schedule'),
    targetDate: getVal('--date', ''),
  };
}

function readJsonOr(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

/**
 * Retorna o próximo horário das 12:00 BRT (15:00 UTC) para agendamento.
 */
function getNextNoonBrtIso(now = new Date()) {
  try {
    const slot = findNextAvailableSlot('video', now);
    console.log(`[SlotArbiter] Próximo slot de vídeo alocado: ${slot.slotBrt} (${slot.scheduleIso})`);
    return slot.scheduleIso;
  } catch (err) {
    console.warn('[SlotArbiter] Fallback para cálculo local:', err.message);
    const candidate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 30, 0));
    if (candidate.getTime() <= now.getTime() + 15 * 60_000) {
      candidate.setUTCDate(candidate.getUTCDate() + 1);
    }
    return candidate.toISOString();
  }
}

/**
 * Gera narração e word boundaries via Python edge-tts.
 */
function generateVoiceover(text, audioPath, transcriptPath) {
  console.log(`[Audio] Gerando narração neural para: "${text.slice(0, 60)}..."`);
  const pythonScript = `
import asyncio
import json
import edge_tts

async def main():
    text = ${JSON.stringify(text)}
    audio_path = ${JSON.stringify(audioPath)}
    json_path = ${JSON.stringify(transcriptPath)}
    
    comm = edge_tts.Communicate(text, voice="pt-BR-AntonioNeural", rate="+10%", boundary="WordBoundary")
    words = []
    with open(audio_path, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                offset_sec = chunk["offset"] / 10_000_000
                duration_sec = chunk["duration"] / 10_000_000
                words.append({
                    "type": "WordBoundary",
                    "offset": chunk["offset"],
                    "duration": chunk["duration"],
                    "text": chunk["text"],
                    "start_sec": round(offset_sec, 4),
                    "end_sec": round(offset_sec + duration_sec, 4)
                })
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(words, f, indent=2, ensure_ascii=False)

asyncio.run(main())
`;

  const res = spawnSync('python3', ['-c', pythonScript], { encoding: 'utf8' });
  if (res.status !== 0) {
    throw new Error(`Falha ao gerar áudio com edge-tts: ${res.stderr || res.stdout}`);
  }
  const transcript = readJsonOr(transcriptPath, []);
  const duration = transcript.length ? transcript[transcript.length - 1].end_sec : 30.0;
  console.log(`[Audio] Concluído! Duração: ${duration.toFixed(2)}s`);
  return { audioPath, transcriptPath, duration };
}

/**
 * A geração e compilação do HyperFrames é delegada à arquitetura modular
 * (src/video-composer/) para garantir harmonia entre roteiro, elementos, efeitos, som e transições.
 */
function buildHyperFramesHtml(item, duration, transcript = []) {
  return compileVideoHtml(item, duration, transcript);
}

function buildInstagramCaption(item) {
  if (item.caption) {
    return item.caption.trim();
  }

  const keyword = item.ctaKeyword || 'REPLY';
  const name = item.name || 'Ferramenta Open-Source';
  
  const featuresText = Array.isArray(item.techRows) && item.techRows.length > 0
    ? item.techRows.map((r, i) => `${i + 1}. ${r.name.replace(/^[^\w\s]+/, '').trim()}`).join('\n')
    : `1. 100% Gratuito e sem mensalidades\n2. Roda direto no seu computador\n3. Código aberto com milhares de estrelas no GitHub\n4. Sem limites de uso`;

  return `Comente ${keyword} aqui embaixo para receber o acesso gratuito e o tutorial direto no seu Direct.

O ${name} substitui ferramentas proprietárias caras que cobram mensalidades pesadas em dólar.

Principais recursos:
${featuresText}

Comente ${keyword} que o robô já te responde no Direct em segundos com o link oficial.

#tecnologia #inteligenciaartificial #opensource #produtividade #devremoto`;
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  console.log(`\n======================================================`);
  console.log(`🚀 DevRemoto: Pipeline Diário de Vídeo Viral (Reels)`);
  console.log(`======================================================\n`);

  const env = loadDotEnv(ENV_PATH);
  const catalogData = readJsonOr(CATALOG_PATH, { catalog: [] });
  const history = readJsonOr(HISTORY_PATH, []);

  // Seleciona repositório alvo
  let target = null;
  if (args.repoId) {
    target = catalogData.catalog.find((c) => c.id === args.repoId);
    if (!target) throw new Error(`Repositório com id "${args.repoId}" não encontrado no catálogo.`);
  } else {
    // Escolhe o primeiro pronto não agendado
    target = catalogData.catalog.find((c) => c.status === 'ready');
    if (!target) {
      console.log(`[Aviso] Todos os repositórios do catálogo já foram postados/agendados.`);
      console.log(`Reiniciando ciclo para o primeiro da lista.`);
      target = catalogData.catalog[0];
    }
  }

  console.log(`[Seleção] Repositório: ${target.name} (${target.repo})`);
  console.log(`[Seleção] Categoria: ${target.category} | Stars: ${target.stars}`);

  // Configura pasta de renderização
  const videoDir = path.join(VIDEOS_DIR, target.id);
  const assetsDir = path.join(videoDir, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  // Copia assets estáticos base (SFX + BGM) se não existirem
  if (fs.existsSync(TEMPLATE_ASSETS_DIR)) {
    for (const file of fs.readdirSync(TEMPLATE_ASSETS_DIR)) {
      const srcFile = path.join(TEMPLATE_ASSETS_DIR, file);
      const destFile = path.join(assetsDir, file);
      if (!fs.existsSync(destFile) && fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    }
  }

  // Gera áudio e transcript
  const audioPath = path.join(videoDir, 'audio.mp3');
  const transcriptPath = path.join(videoDir, 'audio.transcript.json');
  const scriptTrackPath = path.join(videoDir, 'script.txt');
  let audioDuration = 30.0;

  const scriptMatches = fs.existsSync(scriptTrackPath) && fs.readFileSync(scriptTrackPath, 'utf8').trim() === (target.scriptVoice || '').trim();
  const needsAudioGen = args.forceAudio || !fs.existsSync(audioPath) || !fs.existsSync(transcriptPath) || !scriptMatches;

  if (needsAudioGen) {
    const gen = generateVoiceover(target.scriptVoice, audioPath, transcriptPath);
    audioDuration = gen.duration;
    fs.writeFileSync(scriptTrackPath, (target.scriptVoice || '').trim(), 'utf8');
  } else {
    const transcript = readJsonOr(transcriptPath, []);
    if (transcript.length) {
      audioDuration = transcript[transcript.length - 1].end_sec;
    }
    console.log(`[Audio] Áudio já existente (${audioDuration.toFixed(2)}s).`);
  }

  // Gera index.html
  const transcript = readJsonOr(transcriptPath, []);
  const htmlContent = buildHyperFramesHtml(target, audioDuration, transcript);
  const htmlPath = path.join(videoDir, 'index.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');

  // Gera hyperframes.json e package.json
  writeJson(path.join(videoDir, 'hyperframes.json'), {
    $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json',
    registry: 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry',
    paths: { blocks: 'compositions', components: 'compositions/components', assets: 'assets' },
    media: { autoProxy: true },
  });

  writeJson(path.join(videoDir, 'package.json'), {
    name: target.id,
    version: '1.0.0',
    private: true,
    scripts: {
      check: 'npx --yes hyperframes@0.9.20 check',
      render: 'npx --yes hyperframes@0.9.20 render --output output.mp4',
    },
  });

  // Renderiza vídeo
  const outputMp4 = path.join(videoDir, 'output.mp4');
  console.log(`\n[Render] Iniciando renderização via HyperFrames GPU...`);
  const renderRes = spawnSync('npx', ['--yes', 'hyperframes@0.9.20', 'render', '--output', 'output.mp4'], {
    cwd: videoDir,
    encoding: 'utf8',
    timeout: 180_000,
  });

  if (renderRes.status !== 0) {
    throw new Error(`Falha ao renderizar vídeo: ${renderRes.stderr || renderRes.stdout}`);
  }
  console.log(`[Render] Concluído com sucesso! Arquivo: ${outputMp4}`);

  // Publicação / Agendamento no Postiz
  if (args.dryRun) {
    console.log(`\n[Dry-Run] Modo teste ativo. Postiz não acionado.`);
    return;
  }

  const scheduleIso = args.targetDate || getNextNoonBrtIso();
  const caption = buildInstagramCaption(target);
  console.log(`\n[Postiz] Agendando publicação para: ${scheduleIso} (12:00 BRT)`);
  console.log(`[Postiz] Canal: dev.remoto (${env.POSTIZ_INSTAGRAM_ID})`);

  const pubResult = publishVideoToPostiz({
    videoPath: outputMp4,
    caption,
    scheduleIso,
    mode: args.publishMode,
    integrationId: env.POSTIZ_INSTAGRAM_ID,
    envOverrides: env,
  });

  if (!pubResult.published) {
    console.error(`[Postiz] Falha no agendamento: ${pubResult.message}`);
    process.exit(1);
  }

  console.log(`\n✅ Post agendado com sucesso no Postiz!`);
  console.log(`   ID do Post: ${pubResult.response?.[0]?.postId || 'agendado'}`);
  console.log(`   Data: ${scheduleIso}`);

  // Atualiza histórico e catálogo
  target.status = 'scheduled';
  target.scheduledDate = scheduleIso;
  writeJson(CATALOG_PATH, catalogData);

  history.push({
    id: target.id,
    repo: target.repo,
    name: target.name,
    videoDir,
    videoPath: outputMp4,
    postId: pubResult.response?.[0]?.postId || null,
    integrationId: env.POSTIZ_INSTAGRAM_ID,
    scheduleIso,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  });
  writeJson(HISTORY_PATH, history);

  try {
    execSync(`node "${path.join(ROOT_DIR, 'sync-dashboard.mjs')}"`, { stdio: 'ignore' });
  } catch {}

  console.log(`\n[Sucesso] Pipeline concluído com sucesso!\n`);
}

main().catch((err) => {
  console.error(`\n❌ Erro no pipeline de vídeo:`, err.message);
  process.exit(1);
});
