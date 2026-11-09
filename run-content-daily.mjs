#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderContentCarouselPngs } from './src/render-content-carousel.mjs';
import {
  checkAndReplenishCatalog,
  searchGithubTools,
} from './src/discover-trending.mjs';
import {
  loadDotEnv,
  publishCarouselToPostiz,
  publishVideoToPostiz,
} from './src/publish-postiz.mjs';
import { findNextAvailableSlot } from './src/slot-arbiter.mjs';
import { execSync } from 'node:child_process';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT_DIR, 'data');
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const CATALOG_PATH = path.join(DATA_DIR, 'content-catalog.json');
const HISTORY_PATH = path.join(DATA_DIR, 'content-history.json');
const BRAND_KIT_PATH = path.join(ROOT_DIR, 'brand-kit.json');
const DOTENV_PATH = path.join(ROOT_DIR, '.env');

function getTodaySlug() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function nextEveningBrtIso(now = new Date()) {
  try {
    const slot = findNextAvailableSlot('content', now);
    console.log(`[SlotArbiter] Próximo slot de conteúdo alocado: ${slot.slotBrt} (${slot.scheduleIso})`);
    return slot.scheduleIso;
  } catch (err) {
    console.warn('[SlotArbiter] Fallback para cálculo local:', err.message);
    const candidate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 21, 30, 0));
    if (candidate.getTime() <= now.getTime() + 15 * 60_000) {
      candidate.setUTCDate(candidate.getUTCDate() + 1);
    }
    return candidate.toISOString();
  }
}

function parseCliArgs(argv) {
  const getVal = (flag, fallback) => {
    const idx = argv.indexOf(flag);
    return idx >= 0 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    prepareOnly: argv.includes('--prepare'),
    replenishOnly: argv.includes('--replenish'),
    fromAiPath: getVal('--from-ai', ''),
    publish: argv.includes('--publish'),
    publishMode: getVal('--publish-mode', 'schedule'),
    dateSlug: getVal('--date', getTodaySlug()),
  };
}

async function main() {
  const opts = parseCliArgs(process.argv.slice(2));
  const env = loadDotEnv(DOTENV_PATH);
  const brandKit = JSON.parse(fs.readFileSync(BRAND_KIT_PATH, 'utf8'));

  if (opts.replenishOnly) {
    console.log('[Content Engine] Executando rotina de pesquisa e reabastecimento de pautas...');
    const result = checkAndReplenishCatalog(3);
    console.log(`[Content Engine] Reabastecimento concluído: +${result.replenished} novas edições. Total pendente: ${result.totalPending}`);
    return;
  }

  // Auto-replenish if pending items fall below threshold
  checkAndReplenishCatalog(3);

  const editionDir = path.join(OUTPUT_DIR, `${opts.dateSlug}-content`);
  const slidesDir = path.join(editionDir, 'slides');
  fs.mkdirSync(editionDir, { recursive: true });

  const catalogData = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const historyData = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));

  if (opts.prepareOnly) {
    // Find next pending item
    const pendingItem = catalogData.catalog.find((c) => c.status === 'pending') || catalogData.catalog[0];
    const candidatePath = path.join(editionDir, 'candidate.json');
    fs.writeFileSync(candidatePath, JSON.stringify(pendingItem, null, 2), 'utf8');

    console.log(`[Content Engine] Pauta selecionada: ${pendingItem.headline} (${pendingItem.id})`);
    console.log(`[Content Engine] Salvo em: ${candidatePath}`);
    return;
  }

  let content;
  const candidatePath = path.join(editionDir, 'candidate.json');
  if (opts.fromAiPath) {
    const resolvedPath = path.resolve(opts.fromAiPath);
    content = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  } else if (fs.existsSync(candidatePath)) {
    content = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
  } else {
    content = catalogData.catalog.find((c) => c.status === 'pending') || catalogData.catalog[0];
  }

  const isVideo = content.format === 'video';
  const kw = content.keyword || (isVideo ? 'LISTA' : 'TERMINAL');
  const captionPath = path.join(editionDir, 'caption.txt');
  let caption = content.caption;
  if (!caption && fs.existsSync(captionPath)) {
    const existing = fs.readFileSync(captionPath, 'utf8').trim();
    if (existing) caption = existing;
  }
  if (!caption) {
    caption = `${content.headline}\n\n${content.stake}\n\nComente "${kw}" que te mando os links no direct!\n\n#devremoto #desenvolvedor #programacao #tecnologia`;
  }
  fs.writeFileSync(captionPath, caption, 'utf8');

  let renderedPaths = [];
  let videoPath = null;

  if (isVideo) {
    console.log(`[Content Engine] Processando formato VÍDEO para: ${content.headline}...`);
    const projectFolder = content.videoFolder
      ? (path.isAbsolute(content.videoFolder) ? content.videoFolder : path.join(ROOT_DIR, '..', content.videoFolder))
      : path.join(ROOT_DIR, 'videos', content.id);

    const targetMp4 = content.videoMp4 || `${content.id}-final.mp4`;
    videoPath = path.join(projectFolder, targetMp4);

    if (!fs.existsSync(videoPath)) {
      console.log(`[Content Engine] Renderizando vídeo MP4 via HyperFrames em ${projectFolder}...`);
      execSync('npx --yes hyperframes@0.9.20 render', { cwd: projectFolder, stdio: 'inherit' });
    } else {
      console.log(`[Content Engine] Vídeo MP4 validado em: ${videoPath}`);
    }
  } else {
    console.log(`[Content Engine] Renderizando 7 slides PNG para: ${content.headline}...`);
    renderedPaths = await renderContentCarouselPngs({
      content,
      brandKit,
      outputSlidesDir: slidesDir,
      dateStr: opts.dateSlug.slice(5),
    });
    console.log(`[Content Engine] 7 slides PNG gerados em: ${slidesDir}`);
  }

  if (opts.publish) {
    console.log(`[Content Engine] Enviando para o Postiz (${opts.publishMode})...`);
    const scheduleIso = nextEveningBrtIso();

    let result;
    if (isVideo) {
      result = publishVideoToPostiz({
        videoPath,
        caption,
        scheduleIso,
        mode: opts.publishMode,
        integrationId: env.POSTIZ_INSTAGRAM_ID || 'cmw6m87yh0001qjy4vy20eyss',
        envOverrides: env,
      });
    } else {
      result = publishCarouselToPostiz({
        slidePaths: renderedPaths,
        caption,
        scheduleIso,
        mode: opts.publishMode,
        integrationId: env.POSTIZ_INSTAGRAM_ID || 'cmw6m87yh0001qjy4vy20eyss',
        envOverrides: env,
      });
    }

    const resultPath = path.join(editionDir, 'postiz-result.json');
    fs.writeFileSync(resultPath, JSON.stringify(result, null, 2), 'utf8');

    if (result.published) {
      console.log(`[Content Engine] Publicação (${isVideo ? 'Vídeo Reel' : 'Carrossel'}) agendada com sucesso no Postiz para ${scheduleIso}!`);
      // Update catalog & history
      const itemInCatalog = catalogData.catalog.find((c) => c.id === content.id);
      if (itemInCatalog) {
        Object.assign(itemInCatalog, content, { status: 'posted' });
      }
      fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalogData, null, 2), 'utf8');

      historyData.history.push({
        id: content.id,
        format: content.format || 'carousel',
        headline: content.headline,
        keyword: content.keyword,
        posted_at: new Date().toISOString(),
        postizScheduleIso: scheduleIso,
        postId: result.response?.[0]?.postId || null,
        videoUrl: result.videoUrl || null,
      });
      fs.writeFileSync(HISTORY_PATH, JSON.stringify(historyData, null, 2), 'utf8');

      try {
        execSync(`node "${path.join(ROOT_DIR, 'sync-dashboard.mjs')}"`, { stdio: 'ignore' });
      } catch {}
    } else {
      console.error(`[Content Engine] Falha no agendamento:`, result.message);
    }
  }
}

main().catch((err) => {
  console.error('[Content Engine] Erro fatal:', err);
  process.exit(1);
});
