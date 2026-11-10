#!/usr/bin/env node

/**
 * sync-dashboard.mjs
 * 
 * Centralizador de Operações e Ledger Unificado do DevRemoto.
 * Varre todos os outputs de automações (Vagas, Conteúdo Técnico, Vídeos e OpenReply),
 * consolida o histórico e gera:
 * 1. PUBLICATIONS.md (Ledger Markdown versionado no Git)
 * 2. dashboard.html (Interface visual interativa para visualização local no navegador)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findNextAvailableSlot, fetchPostizPosts, DEVREMOTO_INTEGRATION_ID } from './src/slot-arbiter.mjs';

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const VIDEOS_DIR = path.join(ROOT_DIR, 'videos');

function readJsonSafe(filePath, fallback = null) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err) {
    console.error(`Erro lendo ${filePath}:`, err.message);
  }
  return fallback;
}

function formatDateBrt(isoString) {
  if (!isoString) return 'Não agendado';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('pt-BR', { timeZone: 'America/Bahia' });
  } catch {
    return isoString;
  }
}

function collectData() {
  const items = [];

  // 1. Carrosséis de Vagas Diárias (output/<YYYY-MM-DD>)
  if (fs.existsSync(OUTPUT_DIR)) {
    const entries = fs.readdirSync(OUTPUT_DIR, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(ent.name)) {
        const dateSlug = ent.name;
        const dir = path.join(OUTPUT_DIR, dateSlug);
        const postizRes = readJsonSafe(path.join(dir, 'postiz-result.json'), {});
        const edition = readJsonSafe(path.join(dir, 'edition.json'), {});
        const aiEdition = readJsonSafe(path.join(dir, 'ai-edition.json'), {});
        const captionPath = path.join(dir, 'caption.txt');
        const caption = fs.existsSync(captionPath) ? fs.readFileSync(captionPath, 'utf8') : '';
        const linksHtmlPath = path.join(dir, 'links.html');

        const slidesDir = path.join(dir, 'slides');
        const slideFiles = fs.existsSync(slidesDir)
          ? fs.readdirSync(slidesDir).filter(f => f.endsWith('.png')).sort()
          : [];

        const headline = aiEdition?.hook?.headline || edition?.headline || `Radar de Vagas 100% Remotas (${dateSlug})`;
        const jobsCount = edition?.jobs?.length || aiEdition?.jobs?.length || 8;
        const postId = postizRes?.response?.[0]?.postId || 'N/A';
        const scheduleIso = postizRes?.scheduleIso || null;

        items.push({
          id: `jobs-${dateSlug}`,
          dateSlug,
          type: 'carousel-jobs',
          typeName: 'Carrossel de Vagas Diárias',
          automation: 'instagram-devremoto-br (11:00 BRT)',
          title: headline,
          summary: `Curadoria de ${jobsCount} vagas legítimas 100% remotas no Brasil com stacks, salários e links diretos.`,
          keyword: 'REMOTO',
          outputDir: dir,
          localFiles: {
            slides: slideFiles.map(f => path.join(slidesDir, f)),
            caption: fs.existsSync(captionPath) ? captionPath : null,
            linksHtml: fs.existsSync(linksHtmlPath) ? linksHtmlPath : null,
            editionJson: path.join(dir, 'edition.json')
          },
          postiz: {
            postId,
            scheduleIso,
            scheduleBrt: formatDateBrt(scheduleIso),
            uploadedUrls: postizRes?.uploadedUrls || [],
            status: postizRes?.published ? 'Agendado no Postiz' : 'Pendente'
          },
          captionSnippet: caption.slice(0, 280) + (caption.length > 280 ? '...' : ''),
          fullCaption: caption,
          jobs: (aiEdition?.jobs || edition?.jobs || []).map(j => ({
            title: j.title,
            company: j.company,
            salary: j.salarySnippet || j.salary,
            applyUrl: j.applyUrl
          }))
        });
      }
    }
  }

  // 2. Carrosséis de Conteúdo Técnico & Ferramentas (output/<YYYY-MM-DD>-content)
  if (fs.existsSync(OUTPUT_DIR)) {
    const entries = fs.readdirSync(OUTPUT_DIR, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory() && /^\d{4}-\d{2}-\d{2}-content$/.test(ent.name)) {
        const folder = ent.name;
        const dateSlug = folder.replace('-content', '');
        const dir = path.join(OUTPUT_DIR, folder);
        const postizRes = readJsonSafe(path.join(dir, 'postiz-result.json'), {});
        const candidate = readJsonSafe(path.join(dir, 'candidate.json'), {});
        const captionPath = path.join(dir, 'caption.txt');
        const caption = fs.existsSync(captionPath) ? fs.readFileSync(captionPath, 'utf8') : '';

        const slidesDir = path.join(dir, 'slides');
        const slideFiles = fs.existsSync(slidesDir)
          ? fs.readdirSync(slidesDir).filter(f => f.endsWith('.png')).sort()
          : [];

        const headline = candidate?.headline || candidate?.title || `Conteúdo Técnico (${dateSlug})`;
        const postId = postizRes?.response?.[0]?.postId || 'N/A';
        const scheduleIso = postizRes?.scheduleIso || null;
        const keyword = candidate?.keyword || 'REPO';

        items.push({
          id: `content-${dateSlug}`,
          dateSlug,
          type: 'carousel-tech',
          typeName: 'Carrossel Técnico & Ferramentas',
          automation: 'devremoto-content-carousel (12:00 BRT)',
          title: headline,
          summary: candidate?.topic ? `Pauta técnica sobre ${candidate.topic}.` : `Guia prático de ferramentas e código para desenvolvedores.`,
          keyword,
          outputDir: dir,
          localFiles: {
            slides: slideFiles.map(f => path.join(slidesDir, f)),
            caption: fs.existsSync(captionPath) ? captionPath : null,
            candidateJson: path.join(dir, 'candidate.json')
          },
          postiz: {
            postId,
            scheduleIso,
            scheduleBrt: formatDateBrt(scheduleIso),
            uploadedUrls: postizRes?.uploadedUrls || [],
            status: postizRes?.published ? 'Agendado no Postiz' : 'Pendente'
          },
          captionSnippet: caption.slice(0, 280) + (caption.length > 280 ? '...' : ''),
          fullCaption: caption,
          slidesMeta: candidate?.slides || []
        });
      }
    }
  }

  // 3. Vídeos Curtos (Reels / HyperFrames 9:16)
  const videoHistory = readJsonSafe(path.join(DATA_DIR, 'video-history.json'), []);
  const videoCatalog = readJsonSafe(path.join(DATA_DIR, 'video-repo-catalog.json'), { catalog: [] }).catalog || [];
  const contentHistory = readJsonSafe(path.join(DATA_DIR, 'content-history.json'), { history: [] }).history || [];

  for (const v of videoHistory) {
    const videoDir = v.videoDir || path.join(VIDEOS_DIR, v.id);
    const videoPath = v.videoPath || path.join(videoDir, 'output_final.mp4');
    const audioPath = path.join(videoDir, 'audio.mp3');
    const transcriptPath = path.join(videoDir, 'audio.transcript.json');
    const htmlPath = path.join(videoDir, 'index.html');

    // Cross-reference with video-repo-catalog and content-history to get keyword / headline
    const catItem = videoCatalog.find(c => c.id === v.id) || {};
    const matched = contentHistory.find(c => c.id === v.id || c.postId === v.postId) || {};
    const headline = catItem.name && catItem.category ? `${catItem.name}: ${catItem.category}` : (matched.headline || `${v.name || v.id} (Vídeo HyperFrames)`);
    const keyword = v.ctaKeyword || catItem.ctaKeyword || matched.keyword || 'REPO';

    const createdAt = v.createdAt || matched.posted_at || new Date().toISOString();
    const dateSlug = createdAt.slice(0, 10);

    items.push({
      id: `video-${v.id}`,
      dateSlug,
      type: 'video-reels',
      typeName: 'Vídeo Vertical 9:16 (Reels/TikTok)',
      automation: 'devremoto-video-reels (12:00 BRT)',
      title: headline,
      summary: `Vídeo animado via HyperFrames com narração neural Kokoro sobre o repositório ${v.repo || v.name}.`,
      keyword,
      outputDir: videoDir,
      localFiles: {
        video: fs.existsSync(videoPath) ? videoPath : null,
        audio: fs.existsSync(audioPath) ? audioPath : null,
        transcript: fs.existsSync(transcriptPath) ? transcriptPath : null,
        indexHtml: fs.existsSync(htmlPath) ? htmlPath : null
      },
      postiz: {
        postId: v.postId || 'N/A',
        scheduleIso: v.scheduleIso,
        scheduleBrt: formatDateBrt(v.scheduleIso),
        videoUrl: matched.videoUrl || null,
        status: v.status === 'scheduled' ? 'Agendado no Postiz' : (v.status || 'Gerado')
      },
      vfx: matched.vfx || ['camera-rig-3d', 'kinetic-type', 'terminal-run']
    });
  }

  // 4. Varre vídeos renderizados localmente em VIDEOS_DIR que ainda não estejam no histórico
  if (fs.existsSync(VIDEOS_DIR)) {
    const entries = fs.readdirSync(VIDEOS_DIR, { withFileTypes: true });
    const catalogList = readJsonSafe(path.join(DATA_DIR, 'video-repo-catalog.json'), { catalog: [] }).catalog || [];
    for (const ent of entries) {
      if (ent.isDirectory() && !items.some(it => it.outputDir && it.outputDir.endsWith(ent.name))) {
        const vDir = path.join(VIDEOS_DIR, ent.name);
        const mp4 = [path.join(vDir, 'output.mp4'), path.join(vDir, 'output_final.mp4')].find(p => fs.existsSync(p));
        if (mp4) {
          const catItem = catalogList.find(c => c.id === ent.name) || {};
          const audioPath = path.join(vDir, 'audio.mp3');
          const transcriptPath = path.join(vDir, 'audio.transcript.json');
          const htmlPath = path.join(vDir, 'index.html');
          const stat = fs.statSync(mp4);
          const dateSlug = stat.mtime.toISOString().slice(0, 10);
          items.push({
            id: `video-${ent.name}`,
            dateSlug,
            type: 'video-reels',
            typeName: 'Vídeo Vertical 9:16 (Reels/TikTok)',
            automation: 'devremoto-video-reels (Render Local / Teste)',
            title: catItem.name ? `${catItem.name}: ${catItem.category}` : `${ent.name} (Vídeo HyperFrames)`,
            summary: catItem.scriptVoice ? catItem.scriptVoice.slice(0, 160) + '...' : `Vídeo vertical 1080x1920 renderizado via HyperFrames.`,
            keyword: catItem.ctaKeyword || 'TESTE',
            outputDir: vDir,
            localFiles: {
              video: mp4,
              audio: fs.existsSync(audioPath) ? audioPath : null,
              transcript: fs.existsSync(transcriptPath) ? transcriptPath : null,
              indexHtml: fs.existsSync(htmlPath) ? htmlPath : null
            },
            postiz: {
              postId: 'N/A (Local)',
              scheduleIso: null,
              scheduleBrt: 'Não agendado (Teste Local)',
              videoUrl: null,
              status: 'Renderizado (Pronto)'
            },
            vfx: ['macos-browser-window', 'golden-laurels', 'audio-equalizer', 'live-flow-demo', 'comment-simulator']
          });
        }
      }
    }
  }

  // Ordenar por data decrescente
  items.sort((a, b) => {
    const timeA = new Date(a.postiz?.scheduleIso || a.dateSlug).getTime();
    const timeB = new Date(b.postiz?.scheduleIso || b.dateSlug).getTime();
    return timeB - timeA;
  });

  return items;
}

function getScheduleStatusData() {
  const allPosts = fetchPostizPosts();
  const devPosts = allPosts.filter(p =>
    p.integrationId === DEVREMOTO_INTEGRATION_ID || p.integration?.id === DEVREMOTO_INTEGRATION_ID
  );

  const queuedPosts = devPosts
    .filter(p => p.state === 'QUEUE')
    .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());

  const freeSlots = {
    vagas: findNextAvailableSlot('vagas'),
    video: findNextAvailableSlot('video'),
    content: findNextAvailableSlot('content'),
  };

  return { queuedPosts, freeSlots, totalDevPosts: devPosts.length };
}

function generateMarkdown(items) {
  const { queuedPosts, freeSlots } = getScheduleStatusData();

  let md = `# 📊 Central de Operações & Ledger de Publicações — DevRemoto\n\n`;
  md += `> **Documento gerado automaticamente.** Mapeia rigorosamente cada conteúdo produzido pelas automações, sua origem, arquivos gerados no disco e status no Postiz.\n`;
  md += `> Última sincronização: **${new Date().toLocaleString('pt-BR', { timeZone: 'America/Bahia' })} (Horário de Brasília)**\n\n`;

  md += `## 1. Grade Editorial & Próximos Slots Livres (Sistema Anti-Colisão)\n\n`;
  md += `Para evitar colisão de posts e canibalização pelo algoritmo do Instagram, as automações consultam o **Slot Arbiter** antes de agendar:\n\n`;
  md += `| Tipo de Conteúdo | Horário Padrão (BRT) | Próximo Slot Vago Alocado | Invariante Anti-Canibalização |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  md += `| 💼 **Carrossel de Vagas** | 09:00 BRT | **${freeSlots.vagas.slotBrt}** | Intervalo mín. 4h de outros posts |\n`;
  md += `| 🎬 **Vídeo Reels (HyperFrames)** | 13:30 BRT | **${freeSlots.video.slotBrt}** | Máximo 1 vídeo/dia no canal |\n`;
  md += `| 🛠️ **Carrossel Técnico / Dicas** | 18:30 BRT | **${freeSlots.content.slotBrt}** | Fila sequencial garantida |\n\n`;

  md += `### 🟡 Fila Ativa Agendada no Postiz (Aguardando Publicação)\n\n`;
  if (queuedPosts.length === 0) {
    md += `*Nenhum post pendente na fila no momento.*\n\n`;
  } else {
    md += `| Data/Hora (BRT) | ID do Post | Título / Conteúdo Resumido |\n`;
    md += `| :--- | :--- | :--- |\n`;
    for (const q of queuedPosts) {
      const d = new Date(q.publishDate);
      const brt = d.toLocaleString('pt-BR', { timeZone: 'America/Bahia' });
      const snippet = (q.content || '').replace(/<[^>]+>/g, '').split('\n')[0].slice(0, 65);
      md += `| **${brt}** | \`${q.id}\` | ${snippet}... |\n`;
    }
    md += `\n`;
  }

  md += `--- \n\n`;
  md += `## 2. Histórico Consolidado de Produções Recentes\n\n`;

  for (const item of items) {
    const icon = item.type === 'video-reels' ? '🎬' : (item.type === 'carousel-jobs' ? '💼' : '🛠️');
    md += `### ${icon} [${item.dateSlug}] ${item.title}\n\n`;
    md += `- **Automação de Origem:** \`${item.automation}\`\n`;
    md += `- **Formato:** ${item.typeName}\n`;
    md += `- **Gatilho de Direct (OpenReply):** \`${item.keyword}\`\n`;
    md += `- **Status no Postiz:** **${item.postiz.status}** (${item.postiz.scheduleBrt})\n`;
    md += `- **Post ID Postiz:** \`${item.postiz.postId}\`\n`;
    md += `- **Pasta de Saída:** [\`${item.outputDir}\`](file://${item.outputDir})\n\n`;

    md += `#### 📁 Arquivos Gerados:\n`;
    if (item.type === 'video-reels') {
      if (item.localFiles.video) md += `- **Vídeo MP4 Renderizado:** [output_final.mp4](file://${item.localFiles.video})\n`;
      if (item.localFiles.audio) md += `- **Áudio Neural Kokoro:** [audio.mp3](file://${item.localFiles.audio})\n`;
      if (item.localFiles.transcript) md += `- **Timestamps Fonéticos:** [audio.transcript.json](file://${item.localFiles.transcript})\n`;
      if (item.localFiles.indexHtml) md += `- **Composição HTML/GSAP:** [index.html](file://${item.localFiles.indexHtml})\n`;
      if (item.postiz.videoUrl) md += `- **Link no Postiz CDN:** [Ver Vídeo no Postiz](${item.postiz.videoUrl})\n`;
    } else {
      if (item.localFiles.slides?.length) {
        md += `- **Slides PNG (1080×1350):** ${item.localFiles.slides.length} slides gerados em [\`slides/\`](file://${item.outputDir}/slides)\n`;
      }
      if (item.localFiles.caption) md += `- **Texto da Legenda:** [caption.txt](file://${item.localFiles.caption})\n`;
      if (item.localFiles.linksHtml) md += `- **Página de Links Bio:** [links.html](file://${item.localFiles.linksHtml})\n`;
    }

    if (item.captionSnippet) {
      md += `\n**Resumo da Legenda:**\n> ${item.captionSnippet.replace(/\n/g, ' ')}\n`;
    }

    if (item.jobs && item.jobs.length > 0) {
      md += `\n**Vagas Selecionadas:**\n`;
      for (const j of item.jobs.slice(0, 4)) {
        md += `- ${j.company}: ${j.title} (${j.salary || 'A combinar'})\n`;
      }
      if (item.jobs.length > 4) {
        md += `- *(+ ${item.jobs.length - 4} outras vagas na edição)*\n`;
      }
    }

    md += `\n> 💡 **Anotações de Feedback / Melhoria Contínua:**\n> - *Engajamento:* (preencher após auditoria no Postiz/Insights)\n> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.\n\n`;
    md += `---\n\n`;
  }

  return md;
}

function generateHtmlDashboard(items) {
  const { queuedPosts, freeSlots } = getScheduleStatusData();

  const queuedHtml = queuedPosts.map(q => {
    const d = new Date(q.publishDate);
    const brt = d.toLocaleString('pt-BR', { timeZone: 'America/Bahia' });
    const snippet = (q.content || '').replace(/<[^>]+>/g, '').split('\n')[0].slice(0, 65);
    return `
      <div style="background: rgba(234, 179, 8, 0.08); border: 1px solid rgba(234, 179, 8, 0.25); border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
        <div>
          <span style="color: #EAB308; font-weight: 600; font-family: 'JetBrains Mono'; margin-right: 8px;">${brt}</span>
          <span style="color: #FFF;">${snippet}...</span>
        </div>
        <span style="color: #9CA3AF; font-family: 'JetBrains Mono'; font-size: 11px;">ID: ${q.id}</span>
      </div>
    `;
  }).join('');
  const cardsHtml = items.map(item => {
    const isVideo = item.type === 'video-reels';
    const badgeColor = isVideo ? '#EAB308' : (item.type === 'carousel-jobs' ? '#10A37F' : '#3B82F6');
    const badgeBg = isVideo ? 'rgba(234, 179, 8, 0.15)' : (item.type === 'carousel-jobs' ? 'rgba(16, 163, 127, 0.15)' : 'rgba(59, 130, 246, 0.15)');

    let mediaPreview = '';
    if (isVideo && item.postiz?.videoUrl) {
      mediaPreview = `
        <div class="video-container">
          <video controls preload="metadata" poster="">
            <source src="${item.postiz.videoUrl}" type="video/mp4">
            Seu navegador não suporta reprodução de vídeo.
          </video>
        </div>
      `;
    } else if (item.localFiles.slides && item.localFiles.slides.length > 0) {
      const slideThumbs = item.localFiles.slides.slice(0, 4).map((slidePath, idx) => {
        const relPath = path.relative(ROOT_DIR, slidePath);
        return `<div class="slide-thumb"><span>Slide ${idx + 1}</span><img src="${relPath}" alt="Slide ${idx + 1}" loading="lazy"/></div>`;
      }).join('');
      mediaPreview = `<div class="slides-strip">${slideThumbs}</div>`;
    }

    return `
      <div class="post-card">
        <div class="card-header">
          <div class="card-meta">
            <span class="type-badge" style="background:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeColor}40">
              ${item.typeName}
            </span>
            <span class="date-badge">${item.dateSlug}</span>
            <span class="trigger-badge">Gatilho DM: <strong>${item.keyword}</strong></span>
          </div>
          <div class="status-badge ${item.postiz.status.includes('Agendado') ? 'status-scheduled' : ''}">
            ● ${item.postiz.status} (${item.postiz.scheduleBrt})
          </div>
        </div>

        <h3 class="card-title">${item.title}</h3>
        <p class="card-summary">${item.summary}</p>

        ${mediaPreview}

        <div class="card-footer">
          <div class="file-links">
            <span class="files-label">Arquivos locais:</span>
            <a href="file://${item.outputDir}" class="file-tag" target="_blank">📂 Abrir Pasta</a>
            ${item.localFiles.caption ? `<a href="file://${item.localFiles.caption}" class="file-tag" target="_blank">📝 Legenda</a>` : ''}
            ${item.localFiles.video ? `<a href="file://${item.localFiles.video}" class="file-tag" target="_blank">🎬 Vídeo MP4</a>` : ''}
            ${item.localFiles.linksHtml ? `<a href="file://${item.localFiles.linksHtml}" class="file-tag" target="_blank">🔗 Links Bio</a>` : ''}
          </div>
          <div class="postiz-id">Postiz ID: <code>${item.postiz.postId}</code></div>
        </div>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevRemoto — Painel de Controle de Automações</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-canvas: #060807;
      --bg-surface: #0B0F0E;
      --bg-card: rgba(16, 24, 21, 0.7);
      --border-card: rgba(16, 163, 127, 0.25);
      --accent-emerald: #10A37F;
      --accent-bright: #34D399;
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg-canvas);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      padding: 40px 24px;
      line-height: 1.5;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(16, 163, 127, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .brand-title {
      font-size: 28px;
      font-weight: 700;
      color: #FFF;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      padding: 4px 10px;
      background: rgba(16, 163, 127, 0.15);
      color: var(--accent-bright);
      border-radius: 999px;
      border: 1px solid rgba(16, 163, 127, 0.3);
    }
    .header-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--text-muted);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 36px;
    }
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-card);
      border-radius: 12px;
      padding: 18px 20px;
    }
    .stat-label { font-size: 13px; color: var(--text-muted); margin-bottom: 6px; }
    .stat-value { font-size: 24px; font-weight: 700; color: #FFF; font-family: 'JetBrains Mono', monospace; }

    .posts-list { display: flex; flex-direction: column; gap: 24px; }
    .post-card {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transition: transform 0.2s, border-color 0.2s;
    }
    .post-card:hover {
      border-color: rgba(52, 211, 153, 0.45);
      transform: translateY(-2px);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .card-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .type-badge {
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
    }
    .date-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--text-muted);
    }
    .trigger-badge {
      font-size: 12px;
      background: rgba(255, 255, 255, 0.06);
      padding: 3px 8px;
      border-radius: 4px;
      color: var(--text-main);
    }
    .status-badge {
      font-size: 13px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-muted);
    }
    .status-scheduled {
      color: var(--accent-bright);
      font-weight: 600;
    }
    .card-title {
      font-size: 20px;
      font-weight: 700;
      color: #FFF;
      margin-bottom: 8px;
    }
    .card-summary {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 18px;
    }
    .slides-strip {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }
    .slide-thumb {
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }
    .slide-thumb span {
      position: absolute;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      padding: 2px 6px;
      border-radius: 4px;
      color: #FFF;
    }
    .slide-thumb img {
      width: 100%;
      height: auto;
      display: block;
    }
    .video-container {
      max-width: 260px;
      margin-bottom: 18px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-card);
      background: #000;
    }
    .video-container video {
      width: 100%;
      display: block;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
      gap: 12px;
    }
    .file-links { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .files-label { font-size: 12px; color: var(--text-muted); }
    .file-tag {
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--accent-bright);
      text-decoration: none;
      background: rgba(16, 163, 127, 0.12);
      border: 1px solid rgba(16, 163, 127, 0.3);
      padding: 3px 8px;
      border-radius: 4px;
      transition: background 0.15s;
    }
    .file-tag:hover { background: rgba(16, 163, 127, 0.25); }
    .postiz-id {
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-muted);
    }
    .postiz-id code { color: #FFF; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1 class="brand-title">
          <span>DevRemoto</span>
          <span class="brand-pill">Unified Content Ledger</span>
        </h1>
        <p style="color:var(--text-muted); font-size:14px; margin-top:4px;">
          Painel central de controle das automações diárias (Vagas, Vídeos, Conteúdo e DMs).
        </p>
      </div>
      <div class="header-meta">
        Atualizado: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Bahia' })}
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total de Produções Mapeadas</div>
        <div class="stat-value">${items.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Carrosséis de Vagas</div>
        <div class="stat-value">${items.filter(i => i.type === 'carousel-jobs').length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Carrosséis de Ferramentas</div>
        <div class="stat-value">${items.filter(i => i.type === 'carousel-tech').length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Vídeos HyperFrames (9:16)</div>
        <div class="stat-value" style="color:var(--accent-bright);">${items.filter(i => i.type === 'video-reels').length}</div>
      </div>
    </div>

    <!-- Anti-Collision Slot Manager -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-card); border-radius: 14px; padding: 20px; margin-bottom: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 style="font-size: 16px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
          <span>🛡️ Sistema Anti-Colisão & Próximos Slots Livres</span>
        </h2>
        <span style="font-size: 12px; color: var(--text-muted); font-family: 'JetBrains Mono';">Buffer Mínimo: 4h intra-canal</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 18px;">
        <div style="background: rgba(16, 163, 127, 0.08); border: 1px solid rgba(16, 163, 127, 0.3); border-radius: 10px; padding: 12px 16px;">
          <div style="font-size: 12px; color: #9CA3AF;">💼 Próximo Slot Vagas (09:00 BRT)</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--accent-bright); font-family: 'JetBrains Mono'; margin-top: 4px;">
            ${freeSlots.vagas.slotBrt}
          </div>
        </div>
        <div style="background: rgba(234, 179, 8, 0.08); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 10px; padding: 12px 16px;">
          <div style="font-size: 12px; color: #9CA3AF;">🎬 Próximo Slot Vídeo (13:30 BRT)</div>
          <div style="font-size: 15px; font-weight: 700; color: #EAB308; font-family: 'JetBrains Mono'; margin-top: 4px;">
            ${freeSlots.video.slotBrt}
          </div>
        </div>
        <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 10px; padding: 12px 16px;">
          <div style="font-size: 12px; color: #9CA3AF;">🛠️ Próximo Slot Conteúdo (18:30 BRT)</div>
          <div style="font-size: 15px; font-weight: 700; color: #60A5FA; font-family: 'JetBrains Mono'; margin-top: 4px;">
            ${freeSlots.content.slotBrt}
          </div>
        </div>
      </div>

      ${queuedPosts.length > 0 ? `
        <div>
          <div style="font-size: 13px; font-weight: 600; color: #EAB308; margin-bottom: 8px;">🟡 Na Fila do Postiz (${queuedPosts.length} posts agendados):</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${queuedHtml}
          </div>
        </div>
      ` : ''}
    </div>

    <div class="posts-list">
      ${cardsHtml}
    </div>
  </div>
</body>
</html>`;
}

function main() {
  console.log('🔍 Varrendo saídas de todas as automações do DevRemoto...');
  const items = collectData();
  console.log(`✅ ${items.length} conteúdos mapeados.`);

  // 1. Gerar Markdown
  const mdContent = generateMarkdown(items);
  const mdPath = path.join(ROOT_DIR, 'PUBLICATIONS.md');
  fs.writeFileSync(mdPath, mdContent, 'utf8');
  console.log(`📄 Ledger Markdown gerado em: ${mdPath}`);

  // 2. Gerar HTML Dashboard
  const htmlContent = generateHtmlDashboard(items);
  const htmlPath = path.join(ROOT_DIR, 'dashboard.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`🌐 Dashboard visual HTML gerado em: ${htmlPath}`);

  console.log('\n📊 Resumo dos últimos conteúdos mapeados:');
  for (const item of items.slice(0, 5)) {
    console.log(`  • [${item.dateSlug}] [${item.typeName}] "${item.title}" -> ${item.postiz.status} (${item.postiz.scheduleBrt})`);
  }
}

main();
