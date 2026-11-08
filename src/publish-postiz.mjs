import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export function loadDotEnv(envPath) {
  if (!envPath || !fs.existsSync(envPath)) return {};
  const loaded = {};
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx <= 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    loaded[key] = val;
  }
  return loaded;
}

export function nextMorningBrtIso(now = new Date()) {
  // Schedule for 09:00 BRT (12:00 UTC) today if before 11:50 UTC, otherwise tomorrow
  const candidate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
  if (candidate.getTime() <= now.getTime() + 10 * 60_000) {
    candidate.setUTCDate(candidate.getUTCDate() + 1);
  }
  return candidate.toISOString();
}

export function buildPostizCreateArgs({
  caption,
  scheduleIso,
  mode = 'draft',
  uploadedUrls,
  integrationId,
}) {
  if (!Array.isArray(uploadedUrls) || !uploadedUrls.length) {
    throw new Error('uploadedUrls must contain at least one Postiz media path.');
  }
  if (!integrationId) {
    throw new Error('integrationId is required to create an Instagram carousel post in Postiz.');
  }
  const normalizedMode = mode === 'schedule' ? 'schedule' : 'draft';
  return [
    'posts:create',
    '-c',
    caption,
    '-s',
    scheduleIso || nextMorningBrtIso(),
    '-t',
    normalizedMode,
    '--settings',
    JSON.stringify({ post_type: 'post' }),
    '-m',
    uploadedUrls.join(','),
    '-i',
    integrationId,
  ];
}

export function writePostizReplayScript({
  editionDir,
  slidePaths,
  captionPath,
  scheduleIso,
  mode = 'draft',
}) {
  const scriptPath = path.join(editionDir, 'publish-postiz.sh');
  const relSlides = slidePaths.map((p) => path.relative(editionDir, p));
  const relCaption = path.relative(editionDir, captionPath);
  const safeMode = mode === 'schedule' ? 'schedule' : 'draft';

  const lines = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    'cd "$(dirname "$0")"',
    '',
    'POSTIZ_BIN="${POSTIZ_BIN:-postiz}"',
    'IG_ID="${POSTIZ_INSTAGRAM_ID:-}"',
    '',
    'if [ -z "$IG_ID" ]; then',
    '  IG_ID="$("$POSTIZ_BIN" integrations:list | node -e \'const d=JSON.parse(require("fs").readFileSync(0,"utf8")); const items=Array.isArray(d)?d:(d.integrations||[]); const ig=items.find(x=>/instagram/i.test(x.identifier||x.provider||x.name||"")); if(ig?.id) process.stdout.write(ig.id);\')"',
    'fi',
    '',
    'if [ -z "$IG_ID" ]; then',
    '  echo "Erro: defina POSTIZ_INSTAGRAM_ID ou conecte o Instagram no Postiz primeiro." >&2',
    '  exit 1',
    'fi',
    '',
    'UPLOADED_URLS=()',
    `for SLIDE in ${relSlides.map((s) => JSON.stringify(s)).join(' ')}; do`,
    '  RAW="$("$POSTIZ_BIN" upload "$SLIDE")"',
    '  MEDIA_PATH="$(printf \'%s\' "$RAW" | node -e \'const d=JSON.parse(require("fs").readFileSync(0,"utf8")); if(!d.path) process.exit(1); process.stdout.write(d.path);\')"',
    '  UPLOADED_URLS+=("$MEDIA_PATH")',
    'done',
    '',
    'JOINED_MEDIA="$(IFS=,; echo "${UPLOADED_URLS[*]}")"',
    `CAPTION_TEXT="$(cat ${JSON.stringify(relCaption)})"`,
    '',
    '"$POSTIZ_BIN" posts:create \\',
    '  -c "$CAPTION_TEXT" \\',
    `  -s ${JSON.stringify(scheduleIso)} \\`,
    `  -t ${JSON.stringify(safeMode)} \\`,
    '  --settings \'{"post_type":"post"}\' \\',
    '  -m "$JOINED_MEDIA" \\',
    '  -i "$IG_ID"',
    '',
  ];

  fs.writeFileSync(scriptPath, lines.join('\n'), { encoding: 'utf8', mode: 0o755 });
  return scriptPath;
}

function parseJsonFromStdout(stdout) {
  const text = String(stdout || '').trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    // Fallback if CLI prints banner lines before JSON
    const firstBrace = text.search(/[\[{]/);
    if (firstBrace >= 0) {
      try {
        return JSON.parse(text.slice(firstBrace));
      } catch {
        return null;
      }
    }
    return null;
  }
}

export function publishCarouselToPostiz({
  slidePaths,
  caption,
  scheduleIso = nextMorningBrtIso(),
  mode = 'draft',
  integrationId = '',
  envOverrides = {},
  spawnFn = spawnSync,
}) {
  const postizBin = envOverrides.POSTIZ_BIN || process.env.POSTIZ_BIN || 'postiz';
  const basePath = envOverrides.PATH || process.env.PATH || '';
  const childEnv = {
    ...process.env,
    ...envOverrides,
    PATH: basePath.includes('.asdf/shims') ? basePath : `${basePath}:/home/luis/.asdf/shims`,
  };

  const authRes = spawnFn(postizBin, ['auth:status'], { encoding: 'utf8', env: childEnv, timeout: 15_000 });
  const authOut = `${authRes.stdout || ''}\n${authRes.stderr || ''}`;
  if (authRes.status !== 0 || /not authenticated|❌/i.test(authOut)) {
    return {
      published: false,
      reason: 'not_authenticated',
      message: 'Postiz CLI is not authenticated yet. Set POSTIZ_API_KEY in instagram-br/.env or run `postiz login`, then execute publish-postiz.sh.',
    };
  }

  let resolvedIgId = integrationId || childEnv.POSTIZ_INSTAGRAM_ID || '';
  if (!resolvedIgId) {
    const listRes = spawnFn(postizBin, ['integrations:list'], { encoding: 'utf8', env: childEnv, timeout: 20_000 });
    const parsed = parseJsonFromStdout(listRes.stdout);
    const list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.integrations) ? parsed.integrations : []);
    const ig = list.find((item) => /instagram/i.test(`${item.identifier || ''} ${item.provider || ''} ${item.name || ''}`));
    if (ig?.id) resolvedIgId = ig.id;
  }

  if (!resolvedIgId) {
    return {
      published: false,
      reason: 'missing_instagram_integration',
      message: 'Authenticated in Postiz, but no Instagram integration was found. Connect @devremoto.br in Postiz or set POSTIZ_INSTAGRAM_ID.',
    };
  }

  const uploadedUrls = [];
  for (const slidePath of slidePaths) {
    const upRes = spawnFn(postizBin, ['upload', slidePath], { encoding: 'utf8', env: childEnv, timeout: 45_000 });
    if (upRes.status !== 0) {
      return {
        published: false,
        reason: 'upload_failed',
        message: `Failed uploading ${path.basename(slidePath)}: ${(upRes.stderr || upRes.stdout || '').trim()}`,
      };
    }
    const upJson = parseJsonFromStdout(upRes.stdout);
    if (!upJson?.path) {
      return {
        published: false,
        reason: 'upload_parse_failed',
        message: `Postiz upload did not return a .path for ${path.basename(slidePath)}.`,
      };
    }
    uploadedUrls.push(upJson.path);
  }

  const createArgs = buildPostizCreateArgs({
    caption,
    scheduleIso,
    mode,
    uploadedUrls,
    integrationId: resolvedIgId,
  });

  const createRes = spawnFn(postizBin, createArgs, { encoding: 'utf8', env: childEnv, timeout: 45_000 });
  if (createRes.status !== 0) {
    return {
      published: false,
      reason: 'create_failed',
      message: `Postiz posts:create failed: ${(createRes.stderr || createRes.stdout || '').trim()}`,
    };
  }

  return {
    published: true,
    mode: mode === 'schedule' ? 'schedule' : 'draft',
    integrationId: resolvedIgId,
    scheduleIso,
    uploadedUrls,
    response: parseJsonFromStdout(createRes.stdout) || (createRes.stdout || '').trim(),
  };
}

export function publishVideoToPostiz({
  videoPath,
  caption,
  scheduleIso,
  mode = 'schedule',
  integrationId,
  envOverrides = {},
  spawnFn = spawnSync,
}) {
  const childEnv = { ...process.env, ...envOverrides };
  const postizBin = childEnv.POSTIZ_BIN || 'postiz';

  const authRes = spawnFn(postizBin, ['auth:status'], { encoding: 'utf8', env: childEnv, timeout: 30_000 });
  if (authRes.status !== 0) {
    return {
      published: false,
      reason: 'not_authenticated',
      message: `Postiz auth check failed: ${(authRes.stderr || authRes.stdout || '').trim()}`,
    };
  }

  let resolvedIgId = integrationId || childEnv.POSTIZ_INSTAGRAM_ID;
  if (!resolvedIgId) {
    const listRes = spawnFn(postizBin, ['integrations:list'], { encoding: 'utf8', env: childEnv, timeout: 30_000 });
    if (listRes.status === 0) {
      resolvedIgId = resolveInstagramIntegrationId(listRes.stdout);
    }
  }

  if (!resolvedIgId) {
    return {
      published: false,
      reason: 'missing_instagram_integration',
      message: 'Authenticated in Postiz, but no Instagram integration was found.',
    };
  }

  // Upload video file
  console.log(`[Postiz] Fazendo upload do vídeo: ${path.basename(videoPath)}...`);
  const upRes = spawnFn(postizBin, ['upload', videoPath], { encoding: 'utf8', env: childEnv, timeout: 120_000 });
  if (upRes.status !== 0) {
    return {
      published: false,
      reason: 'upload_failed',
      message: `Failed uploading ${path.basename(videoPath)}: ${(upRes.stderr || upRes.stdout || '').trim()}`,
    };
  }

  const upJson = parseJsonFromStdout(upRes.stdout);
  if (!upJson?.path) {
    return {
      published: false,
      reason: 'upload_parse_failed',
      message: `Postiz upload did not return a .path for ${path.basename(videoPath)}.`,
    };
  }

  const normalizedMode = mode === 'schedule' ? 'schedule' : 'draft';
  const createArgs = [
    'posts:create',
    '-c',
    caption,
    '-s',
    scheduleIso || nextMorningBrtIso(),
    '-t',
    normalizedMode,
    '--settings',
    JSON.stringify({ post_type: 'post' }),
    '-m',
    upJson.path,
    '-i',
    resolvedIgId,
  ];

  console.log(`[Postiz] Criando post de vídeo (${normalizedMode})...`);
  const createRes = spawnFn(postizBin, createArgs, { encoding: 'utf8', env: childEnv, timeout: 45_000 });
  if (createRes.status !== 0) {
    return {
      published: false,
      reason: 'create_failed',
      message: `Postiz posts:create failed: ${(createRes.stderr || createRes.stdout || '').trim()}`,
    };
  }

  return {
    published: true,
    mode: normalizedMode,
    integrationId: resolvedIgId,
    scheduleIso,
    videoUrl: upJson.path,
    response: parseJsonFromStdout(createRes.stdout) || (createRes.stdout || '').trim(),
  };
}
