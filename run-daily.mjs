#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  parsePipelineJobs,
  curateDailyEdition,
  buildInstagramCaption,
  buildBioLinksHtml,
} from './src/curate-and-copy.mjs';
import { renderCarouselPngs } from './src/render-carousel.mjs';
import {
  loadDotEnv,
  nextMorningBrtIso,
  publishCarouselToPostiz,
  writePostizReplayScript,
} from './src/publish-postiz.mjs';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const CAREER_OPS_DIR = process.env.CAREER_OPS_ROOT
  ? path.resolve(process.env.CAREER_OPS_ROOT)
  : '/home/luis/vagas/career-ops';
const DATA_DIR = path.join(ROOT_DIR, 'data');
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');

const PIPELINE_PATH = path.join(DATA_DIR, 'pipeline.md');
const SCAN_HISTORY_PATH = path.join(DATA_DIR, 'scan-history.tsv');
const PORTALS_PATH = path.join(ROOT_DIR, 'portals-br-remoto.yml');
const PROFILE_PATH = path.join(ROOT_DIR, 'profile-br-remoto.yml');
const POSTED_JOBS_PATH = path.join(DATA_DIR, 'posted-jobs.json');
const STATE_PATH = path.join(DATA_DIR, 'state.json');
const BRAND_KIT_PATH = path.join(ROOT_DIR, 'brand-kit.json');
const DOTENV_PATH = path.join(ROOT_DIR, '.env');

function parseCliArgs(argv) {
  const getVal = (flag, fallback) => {
    const idx = argv.indexOf(flag);
    return idx >= 0 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    prepareOnly: argv.includes('--prepare'),
    fromAiPath: getVal('--from-ai', ''),
    forceScan: argv.includes('--scan'),
    skipScan: argv.includes('--skip-scan'),
    publish: argv.includes('--publish'),
    publishMode: getVal('--publish-mode', 'draft'),
    markPosted: argv.includes('--mark-posted'),
    targetCount: Math.max(4, Number(getVal('--count', '8')) || 8),
    dateSlug: getVal('--date', formatBrtDateIso(new Date())),
  };
}

function formatBrtDateIso(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function readJsonOr(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function runIsolatedCareerOpsScan() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const res = spawnSync(
    process.execPath,
    ['scan.mjs', '--since', '7', '--quiet'],
    {
      cwd: CAREER_OPS_DIR,
      env: {
        ...process.env,
        CAREER_OPS_ROOT: CAREER_OPS_DIR,
        CAREER_OPS_PORTALS: PORTALS_PATH,
        CAREER_OPS_PIPELINE: PIPELINE_PATH,
        CAREER_OPS_SCAN_HISTORY: SCAN_HISTORY_PATH,
        CAREER_OPS_PROFILE: PROFILE_PATH,
      },
      encoding: 'utf8',
      timeout: 15 * 60_000,
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  if (res.status !== 0) {
    throw new Error(`Isolated CareerOps scan failed (status ${res.status}): ${(res.stderr || res.stdout || '').slice(0, 600)}`);
  }
  const match = (res.stdout || '').match(/New offers added:\s*(\d+)/i);
  return { newOffersAdded: match ? Number(match[1]) : 0 };
}

async function main() {
  const opts = parseCliArgs(process.argv.slice(2));
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const shouldScan = opts.forceScan || (!opts.skipScan && !fs.existsSync(PIPELINE_PATH));
  let scanSummary = { skipped: !shouldScan };
  if (shouldScan) {
    scanSummary = { skipped: false, ...runIsolatedCareerOpsScan() };
  }

  const brandKit = JSON.parse(fs.readFileSync(BRAND_KIT_PATH, 'utf8'));
  const postedStore = readJsonOr(POSTED_JOBS_PATH, { postedUrls: [], editions: [] });
  const state = readJsonOr(STATE_PATH, { hookRotationIndex: 0 });
  const postedSet = new Set(Array.isArray(postedStore.postedUrls) ? postedStore.postedUrls : []);

  const rawJobs = parsePipelineJobs(PIPELINE_PATH);
  const editionDir = path.join(OUTPUT_DIR, opts.dateSlug);
  fs.mkdirSync(editionDir, { recursive: true });

  if (opts.prepareOnly) {
    const poolEdition = curateDailyEdition(rawJobs, postedSet, 30, state.hookRotationIndex || 0);
    const baselineEdition = curateDailyEdition(rawJobs, postedSet, opts.targetCount, state.hookRotationIndex || 0);
    const candidatesPath = path.join(editionDir, 'candidates.json');
    const payload = {
      dateSlug: opts.dateSlug,
      rawCount: rawJobs.length,
      candidateCount: poolEdition.jobs.length,
      candidates: poolEdition.jobs,
      baselineEdition,
    };
    fs.writeFileSync(candidatesPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    process.stdout.write(`${JSON.stringify({ status: 'prepared', dateSlug: opts.dateSlug, candidatesPath, candidateCount: poolEdition.jobs.length }, null, 2)}\n`);
    return;
  }

  let edition;
  let customCaption = '';
  if (opts.fromAiPath) {
    const resolvedAiPath = path.resolve(opts.fromAiPath);
    const aiPayload = JSON.parse(fs.readFileSync(resolvedAiPath, 'utf8'));
    edition = aiPayload.edition || aiPayload;
    customCaption = typeof aiPayload.caption === 'string' ? aiPayload.caption.trim() : '';
  } else {
    edition = curateDailyEdition(rawJobs, postedSet, opts.targetCount, state.hookRotationIndex || 0);
  }

  if (!edition?.jobs || edition.jobs.length < 2) {
    throw new Error(`Not enough eligible unposted Brazilian remote roles in ${PIPELINE_PATH} (found ${edition?.jobs?.length || 0}). Run with --scan first.`);
  }
  edition.count = edition.jobs.length;
  edition.date = edition.date || opts.dateSlug;

  const slidesDir = path.join(editionDir, 'slides');
  fs.mkdirSync(slidesDir, { recursive: true });

  const caption = customCaption || buildInstagramCaption(edition, brandKit);
  const linksHtml = buildBioLinksHtml(edition, brandKit);
  const scheduleIso = nextMorningBrtIso();

  const slidePaths = await renderCarouselPngs({
    edition,
    brandKit,
    outputSlidesDir: slidesDir,
  });

  const editionJsonPath = path.join(editionDir, 'edition.json');
  const captionPath = path.join(editionDir, 'caption.txt');
  const linksPath = path.join(editionDir, 'links.html');
  const latestLinksPath = path.join(OUTPUT_DIR, 'latest-links.html');

  fs.writeFileSync(editionJsonPath, `${JSON.stringify(edition, null, 2)}\n`, 'utf8');
  fs.writeFileSync(captionPath, `${caption}\n`, 'utf8');
  fs.writeFileSync(linksPath, linksHtml, 'utf8');
  fs.writeFileSync(latestLinksPath, linksHtml, 'utf8');

  // Automatic sync to devremoto-web hub
  const webHubVagasDir = '/home/luis/repositories/devremoto-web/content/vagas';
  if (fs.existsSync(webHubVagasDir)) {
    const webHubJsonPath = path.join(webHubVagasDir, `${opts.dateSlug}.json`);
    fs.writeFileSync(webHubJsonPath, `${JSON.stringify(edition, null, 2)}\n`, 'utf8');

    // Also update editions.json
    const editionsPath = path.join(webHubVagasDir, 'editions.json');
    let editions = [];
    if (fs.existsSync(editionsPath)) {
      try {
        editions = JSON.parse(fs.readFileSync(editionsPath, 'utf8'));
      } catch {}
    }
    const editionWithDate = { date: opts.dateSlug, ...edition };
    editions = [editionWithDate, ...editions.filter((e) => e.date !== opts.dateSlug)];
    editions.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    fs.writeFileSync(editionsPath, `${JSON.stringify(editions, null, 2)}\n`, 'utf8');
    process.stdout.write(`[devremoto-web] Synced edition to ${webHubJsonPath} and editions.json\n`);

    // Auto-commit and push to GitHub so Cloudflare automatically builds and deploys the new edition
    try {
      execSync('git add . && git commit -m "feat(vagas): publish edition ' + opts.dateSlug + '" && git push origin main', {
        cwd: '/home/luis/repositories/devremoto-web',
        stdio: 'pipe',
      });
      process.stdout.write(`[devremoto-web] Pushed edition ${opts.dateSlug} to GitHub (Cloudflare auto-deploy triggered)\n`);
    } catch (gitErr) {
      process.stdout.write(`[devremoto-web] Git push info: ${gitErr.message}\n`);
    }
  }

  const replayScriptPath = writePostizReplayScript({
    editionDir,
    slidePaths,
    captionPath,
    scheduleIso,
    mode: opts.publishMode,
  });

  // Advance hook rotation for the next daily edition
  fs.writeFileSync(
    STATE_PATH,
    `${JSON.stringify({ hookRotationIndex: (state.hookRotationIndex || 0) + 1, updatedAt: new Date().toISOString() }, null, 2)}\n`,
    'utf8',
  );

  let postizResult = { published: false, reason: 'publish_flag_not_set' };
  if (opts.publish) {
    const envOverrides = loadDotEnv(DOTENV_PATH);
    postizResult = publishCarouselToPostiz({
      slidePaths,
      caption,
      scheduleIso,
      mode: opts.publishMode,
      envOverrides,
    });
    fs.writeFileSync(path.join(editionDir, 'postiz-result.json'), `${JSON.stringify(postizResult, null, 2)}\n`, 'utf8');
  }

  if (postizResult.published || opts.markPosted) {
    const nextUrls = [...new Set([...postedSet, ...edition.jobs.map((j) => j.url)])];
    const nextEditions = [
      { dateSlug: opts.dateSlug, count: edition.count, generatedAt: edition.generatedAt },
      ...(Array.isArray(postedStore.editions) ? postedStore.editions : []).slice(0, 89),
    ];
    fs.writeFileSync(
      POSTED_JOBS_PATH,
      `${JSON.stringify({ postedUrls: nextUrls, editions: nextEditions }, null, 2)}\n`,
      'utf8',
    );
  }

  const summary = {
    status: 'ok',
    dateSlug: opts.dateSlug,
    scan: scanSummary,
    rawCandidatesInLane: rawJobs.length,
    curatedCount: edition.count,
    hookAngle: edition.hook.angle,
    hookHeadline: edition.hook.headline,
    editionDir,
    slidesCount: slidePaths.length,
    slidePaths,
    captionPath,
    linksPath,
    replayScriptPath,
    postiz: postizResult,
  };

  try {
    execSync(`node "${path.join(ROOT_DIR, 'sync-dashboard.mjs')}"`, { stdio: 'ignore' });
  } catch {}

  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.stack || err.message : String(err)}\n`);
  process.exitCode = 1;
});
