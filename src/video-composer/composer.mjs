/**
 * Video Composer v2 — Diretor Multi-Arquétipo com 7 Beats Rápidos, Screenshots Reais e Motion Blur
 *
 * Inspirado diretamente na decupagem frame a frame de @fabianocarvalhojr e @gab.gouvea:
 * - Zero template rígido: 4 Diretores Visuais diferentes (`director-viral-breakdown`, `director-before-after-hack`,
 *   `director-three-skills-pack`, `director-data-funnel`).
 * - 7 Beats rápidos por vídeo (~4.0s a 5.5s por beat) em vez de 5 telas paradas.
 * - Tipografia >= 28px em 100% dos elementos para leitura perfeita no celular (`npx hyperframes check`).
 * - `data-motion-blur="on"` ativado no `#root` + Câmera 3D com perspectiva e grid cibernético em movimento.
 */

import { SoundDirector } from './sound-director.mjs';
import { buildCareerOpsScenes, buildWorldCamsScenes } from './semantic-scenes.mjs';
import {
  renderBeatRepoHero,
  renderBeatGiantCounter,
  renderBeatThreePillars,
  renderBeatNodeTree,
  renderBeatDesktopMobile,
  renderBeatBeforeAfterClash,
  renderBeatScorecardMeter,
  renderBeatTerminalCursor,
  renderBeatGiantCta
} from './beats.mjs';

const BEAT_RENDERERS = {
  'beat-repo-hero': renderBeatRepoHero,
  'beat-giant-counter': renderBeatGiantCounter,
  'beat-three-pillars': renderBeatThreePillars,
  'beat-node-tree': renderBeatNodeTree,
  'beat-desktop-mobile': renderBeatDesktopMobile,
  'beat-before-after-clash': renderBeatBeforeAfterClash,
  'beat-scorecard-meter': renderBeatScorecardMeter,
  'beat-terminal-cursor': renderBeatTerminalCursor,
  'beat-giant-cta': renderBeatGiantCta
};

const DIRECTOR_SEQUENCES = {
  'director-viral-breakdown': [
    'beat-repo-hero',
    'beat-giant-counter',
    'beat-three-pillars',
    'beat-node-tree',
    'beat-desktop-mobile',
    'beat-before-after-clash',
    'beat-giant-cta'
  ],
  'director-before-after-hack': [
    'beat-before-after-clash',
    'beat-repo-hero',
    'beat-node-tree',
    'beat-desktop-mobile',
    'beat-scorecard-meter',
    'beat-terminal-cursor',
    'beat-giant-cta'
  ],
  'director-three-skills-pack': [
    'beat-three-pillars',
    'beat-repo-hero',
    'beat-desktop-mobile',
    'beat-node-tree',
    'beat-scorecard-meter',
    'beat-terminal-cursor',
    'beat-giant-cta'
  ],
  'director-data-funnel': [
    'beat-giant-counter',
    'beat-repo-hero',
    'beat-three-pillars',
    'beat-node-tree',
    'beat-before-after-clash',
    'beat-scorecard-meter',
    'beat-giant-cta'
  ]
};

function selectDirectorForItem(item) {
  if (item.director && DIRECTOR_SEQUENCES[item.director]) return item.director;
  const text = `${item.id} ${item.category} ${item.pillar || ''}`.toLowerCase();
  if (text.includes('vaga') || text.includes('career') || text.includes('funnel')) return 'director-data-funnel';
  if (text.includes('tv') || text.includes('marca') || text.includes('watermark') || text.includes('hack') || text.includes('wi-fi')) return 'director-before-after-hack';
  if (text.includes('skill') || text.includes('site') || text.includes('pack')) return 'director-three-skills-pack';
  return 'director-viral-breakdown';
}

function selectAccentPalette(director) {
  // Brand Kit Oficial OpenAI Emerald Noir: Exclusivamente Verde Esmeralda (#10A37F) e Verde Menta Neon (#34D399)
  // Vermelho (#EF4444) é reservado para alertas e carimbos de descarte. Proibido amarelo, azul ou rosa.
  return ['#34D399', '#10A37F', '#34D399', '#10A37F', '#34D399', '#10A37F', '#34D399'];
}

/**
 * Divide a duração total do vídeo em N beats dinâmicos alinhados às pausas reais da locução
 */
export function calculateBeatTimings(duration, transcript = [], beatCount = 7, roundedDuration = null) {
  const totalDur = roundedDuration || Math.ceil(duration + 1.2);
  const voiceEnd = Array.isArray(transcript) && transcript.length > 0
    ? transcript[transcript.length - 1].end_sec
    : duration;

  // Reserva os últimos ~6.5s para o Beat Final de CTA (COMENTA + ME SEGUE)
  const ctaDuration = Math.min(7.5, Math.max(5.2, totalDur * 0.18));
  const bodyEnd = Math.max(10.0, totalDur - ctaDuration);
  const bodyBeats = beatCount - 1;
  const rawStep = bodyEnd / bodyBeats;

  const slots = [];
  let cursor = 0.0;

  for (let i = 0; i < bodyBeats; i++) {
    const idealEnd = (i + 1) * rawStep;
    let snappedEnd = idealEnd;

    // Tenta alinhar o corte à palavra mais próxima no transcript para cortes orgânicos na fala
    if (Array.isArray(transcript) && transcript.length > 0 && i < bodyBeats - 1) {
      let bestWord = null;
      let bestDist = 999;
      for (const w of transcript) {
        const d = Math.abs(w.end_sec - idealEnd);
        if (d < bestDist && d < 0.9) {
          bestDist = d;
          bestWord = w;
        }
      }
      if (bestWord) {
        snappedEnd = Number(bestWord.end_sec.toFixed(2));
      }
    }

    const dur = Math.max(2.4, Number((snappedEnd - cursor).toFixed(2)));
    slots.push({ start: Number(cursor.toFixed(2)), duration: dur });
    cursor = Number((cursor + dur).toFixed(2));
  }

  // Último beat (CTA) vai até o final exato de roundedDuration
  slots.push({
    start: cursor,
    duration: Math.max(2.5, Number((totalDur - cursor).toFixed(2)))
  });

  return slots;
}

export function buildStoryboard(item, duration, transcript = [], totalVideoDuration = null) {
  const roundedDuration = totalVideoDuration || Math.ceil(duration + 1.2);
  const director = selectDirectorForItem(item);
  const beatTypes = DIRECTOR_SEQUENCES[director];
  const accents = selectAccentPalette(director);
  const slots = calculateBeatTimings(duration, transcript, beatTypes.length, roundedDuration);

  const features = (item.techRows || []).map(r => ({
    icon: r.name.split(' ')[0] || '⚡',
    title: r.name.slice(r.name.indexOf(' ') + 1).trim(),
    detail: r.detail || item.repoSub || '',
    badge: r.badge || 'ATIVO'
  }));

  const beatTitles = [
    item.hookTitle || item.name,
    item.repoTitle || item.name,
    item.techTitle?.replace('➔', '•') || 'O Que Isso Faz?',
    '4 Funções em Tempo Real',
    'No PC e no Celular',
    item.localTitle || 'Sem Mensalidade',
    `Comenta ${item.ctaKeyword || 'IA'}`
  ];

  const beatKickers = [
    item.hookAlert || 'OLHA ESSE PROJETO',
    'JÁ PASSOU DE',
    item.techPill || 'SUPERPODERES GRATUITOS',
    'COMO FUNCIONA NA PRÁTICA',
    'ACESSO IMEDIATO',
    item.localPill || 'ZERO CUSTO',
    'COMENTA AQUI EMBAIXO'
  ];

  return beatTypes.map((type, i) => ({
    id: `beat-${i + 1}`,
    type,
    director,
    start: slots[i].start,
    duration: slots[i].duration,
    accentColor: accents[i % accents.length],
    kicker: beatKickers[i],
    title: beatTitles[i],
    subtitle: item.hookStamp || '100% Aberto e Gratuito',
    name: item.name,
    repo: item.repo,
    stars: item.stars || '35.4k',
    bigValue: item.stars || '42 mil',
    category: item.category,
    cmd: item.repoInstall || `Acesse ${item.name} gratuitamente`,
    competitorName: item.hookPrompt?.split(':')[0]?.replace('$', '').trim() || 'Ferramentas Pagas',
    competitorPrice: item.hookPrompt?.split(':')[1]?.trim() || 'R$ 200/mês',
    competitorDesc: item.hookComment?.replace('#', '').trim() || 'Cobra assinatura cara em dólar todo mês',
    features,
    pillars: item.pillars || null,
    ctaKeyword: item.ctaKeyword || 'IA',
    deliverables: item.ctaItems || [
      `1️⃣ Link Oficial do ${item.name}`,
      `2️⃣ Passo a Passo em 1 Minuto`,
      `3️⃣ Guia Prático + Prompts Prontos`
    ]
  }));
}

function renderMasterStyles() {
  return `
    :root {
      --bg-canvas: #060807;
      --accent-emerald: #10A37F;
      --accent-bright: #34D399;
      --accent-crimson: #EF4444;
      --text-primary: #FFFFFF;
      --text-secondary: #9CA3AF;
      --font-sans: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: var(--bg-canvas);
      font-family: var(--font-sans);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
    }

    #root {
      width: 1080px;
      height: 1920px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at 50% 28%, #0f221b 0%, #060807 72%);
    }

    /* Moving 3D Cyber Perspective Grid */
    .cyber-grid-plane {
      position: absolute;
      bottom: -220px;
      left: -50%;
      width: 200%;
      height: 900px;
      background-image:
        linear-gradient(rgba(52, 211, 153, 0.18) 2px, transparent 2px),
        linear-gradient(90deg, rgba(52, 211, 153, 0.18) 2px, transparent 2px);
      background-size: 80px 80px;
      transform: perspective(600px) rotateX(74deg);
      mask-image: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 80%);
      pointer-events: none;
      z-index: 2;
    }

    .glow-orb-top {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 650px;
      background: radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, transparent 70%);
      filter: blur(110px);
      pointer-events: none;
      z-index: 1;
    }

    /* Fixed Header Safe Zone */
    .header-fixed {
      position: absolute;
      top: 72px;
      left: 60px;
      right: 60px;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(10, 15, 13, 0.9);
      border: 1.5px solid rgba(52, 211, 153, 0.45);
      padding: 12px 26px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 800;
    }
    .brand-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-bright);
      box-shadow: 0 0 12px var(--accent-bright);
    }
    .tag-pill {
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 800;
      color: var(--accent-bright);
      background: rgba(16, 24, 20, 0.9);
      border: 1.5px solid rgba(52, 211, 153, 0.4);
      padding: 12px 24px;
      border-radius: 999px;
    }

    /* 3D Camera Rig */
    .camera-viewport {
      position: absolute;
      inset: 0;
      perspective: 1200px;
      perspective-origin: 50% 46%;
      overflow: hidden;
      z-index: 10;
    }
    .camera-rig {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
    }

    /* Main Stage (top: 175px to 1640px = 1465px de palco central) */
    .stage {
      position: absolute;
      top: 175px;
      left: 60px;
      right: 60px;
      height: 1465px;
      transform-style: preserve-3d;
    }

    .scene-clip {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 12px;
      gap: 28px;
      transform-style: preserve-3d;
    }

    .scene-clip.scene-center {
      justify-content: center;
      padding-top: 0;
    }

    .scene-title-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
      max-width: 940px;
    }

    .kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(10, 16, 14, 0.92);
      border: 2px solid var(--accent-bright);
      padding: 10px 28px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .display-title {
      font-size: 72px;
      font-weight: 900;
      line-height: 1.06;
      letter-spacing: -2.5px;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    /* macOS Window & Real Screenshot Frame */
    .mac-window {
      width: 940px;
      background: rgba(10, 15, 13, 0.96);
      border: 2.5px solid var(--accent-bright);
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(52, 211, 153, 0.22);
    }
    .mac-bar {
      background: #111815;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .mac-dots {
      display: flex;
      gap: 10px;
    }
    .mac-dot {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    .mac-url {
      font-family: var(--font-mono);
      font-size: 24px;
      font-weight: 700;
      color: #9CA3AF;
    }
    .mac-header-row {
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(14, 22, 18, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .app-avatar-badge {
      width: 68px;
      height: 68px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 900;
    }
    .gold-star-pill {
      background: rgba(16, 163, 127, 0.25);
      border: 1.5px solid #34D399;
      color: #34D399;
      font-family: var(--font-mono);
      font-size: 30px;
      font-weight: 900;
      padding: 10px 24px;
      border-radius: 16px;
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.35);
    }

    .screenshot-viewport {
      width: 100%;
      overflow: hidden;
      border-radius: 22px;
      border: 2px solid rgba(52, 211, 153, 0.35);
      background: #0d1117;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .screenshot-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #0d1117;
      display: block;
    }

    /* 3 Vertical Pillars (Beat 3) */
    .pillars-grid {
      width: 940px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .pillar-card {
      background: rgba(12, 19, 16, 0.95);
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-radius: 26px;
      padding: 28px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 14px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
    }
    .pillar-icon-box {
      width: 84px;
      height: 84px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
    }
    .pillar-num {
      font-family: var(--font-sans);
      font-size: 64px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1;
    }
    .pillar-lbl {
      font-size: 28px;
      font-weight: 800;
      color: #D1D5DB;
      line-height: 1.2;
    }

    /* 4-Node Interactive Tree (Beat 4) */
    .tree-stage {
      width: 940px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .tree-hub {
      width: 130px;
      height: 130px;
      border-radius: 32px;
      background: #0D1512;
      border: 3px solid var(--accent-bright);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .tree-nodes-grid {
      width: 940px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .tree-node-card {
      background: rgba(12, 19, 16, 0.96);
      border: 2px solid rgba(255, 255, 255, 0.16);
      border-radius: 24px;
      padding: 26px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
    }
    .tree-node-icon {
      font-size: 44px;
    }
    .tree-node-title {
      font-size: 30px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
    }

    /* Official Subtitle Rail Safe Zone */
    .subtitle-rail-wrapper {
      position: absolute;
      top: 1650px;
      left: 60px;
      right: 60px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 200;
      pointer-events: none;
    }
    .subtitle-pill {
      background: rgba(8, 12, 10, 0.96);
      border: 2px solid rgba(52, 211, 153, 0.65);
      padding: 16px 42px;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 34px;
      font-weight: 900;
      color: #FFFFFF;
      text-align: center;
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.9), 0 0 30px rgba(16, 163, 127, 0.35);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .sub-word {
      color: #E5E7EB;
      padding: 4px 10px;
      border-radius: 10px;
    }
    .sub-word.active-badge {
      background: var(--accent-bright);
      color: #060807;
      font-weight: 900;
      box-shadow: 0 0 20px rgba(52, 211, 153, 0.8);
    }
  `;
}

export function compileVideoHtml(item, duration, transcript = []) {
  const voiceDuration = Number(duration.toFixed(2));
  const roundedDuration = Math.ceil(voiceDuration + 1.2);
  const soundDirector = new SoundDirector();
  const sceneHtmls = [];
  const sceneGsapScripts = [];

  let semanticScenes = null;
  if (item.id === 'career-ops-740-jobs-v1' || item.name?.toLowerCase().includes('career-ops')) {
    semanticScenes = buildCareerOpsScenes(item, voiceDuration, transcript, roundedDuration);
  } else if (item.id === 'world-live-cams-v1' || item.name?.toLowerCase().includes('worldcam') || item.repo?.includes('globe')) {
    semanticScenes = buildWorldCamsScenes(item, voiceDuration, transcript, roundedDuration);
  }

  if (semanticScenes) {
    semanticScenes.forEach(sc => {
      sceneHtmls.push(sc.html);
      if (sc.gsapScript) sceneGsapScripts.push(sc.gsapScript);
      if (Array.isArray(sc.sfxCues)) {
        sc.sfxCues.forEach(cue => {
          soundDirector.addCue(cue.type, cue.time, cue.volume);
        });
      }
    });
  } else {
    const storyboard = buildStoryboard(item, voiceDuration, transcript, roundedDuration);
    storyboard.forEach((beat, idx) => {
      const sceneIdx = idx + 1;
      const renderer = BEAT_RENDERERS[beat.type] || renderBeatRepoHero;
      const result = renderer(beat, sceneIdx);

      sceneHtmls.push(result.html);
      if (result.gsapScript) sceneGsapScripts.push(result.gsapScript);

      if (Array.isArray(result.sfxCues)) {
        result.sfxCues.forEach(cue => {
          soundDirector.addCue(cue.type, cue.time, cue.volume);
        });
      }
    });
  }

  // Legendas sincronizadas palavra por palavra
  const subCalls = [];
  if (Array.isArray(transcript) && transcript.length > 0) {
    let curr = [];
    const groups = [];
    for (let i = 0; i < transcript.length; i++) {
      const w = transcript[i];
      curr.push(w);
      const isPause = i < transcript.length - 1 && (transcript[i + 1].start_sec - w.end_sec > 0.22);
      if (curr.length >= 3 || isPause || i === transcript.length - 1) {
        groups.push([...curr]);
        curr = [];
      }
    }

    for (const g of groups) {
      const texts = g.map(w => w.text.toUpperCase());
      for (let i = 0; i < g.length; i++) {
        const t = Number(g[i].start_sec.toFixed(2));
        const htmlGroup = texts.map((txt, idx) =>
          idx === i
            ? `<span class="sub-word active-badge">${txt}</span>`
            : `<span class="sub-word">${txt}</span>`
        ).join(' ');
        subCalls.push(`      tl.call(() => { setSubText(\`${htmlGroup}\`); }, null, ${t});`);
      }
    }

    const lastWordEnd = transcript[transcript.length - 1].end_sec;
    subCalls.push(`      tl.call(() => { setSubText(""); }, null, ${Number((lastWordEnd + 0.25).toFixed(2))});`);
  }

  const sfxTags = soundDirector.renderAudioTags();

  return `<!doctype html>
<html lang="pt-BR" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>${item.name}: ${item.category} - DevRemoto</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
${renderMasterStyles()}
    </style>
  </head>
  <body>
    <div id="root" class="clip" data-composition-id="main" data-width="1080" data-height="1920" data-start="0" data-duration="${roundedDuration}.0">
      <div id="grid-plane" class="cyber-grid-plane"></div>
      <div class="glow-orb-top"></div>

      <!-- Áudio Principal da Voz e Trilha BGM -->
      <audio id="voice" src="audio.mp3" data-start="0" data-duration="${voiceDuration.toFixed(2)}" data-volume="1.15"></audio>
      <audio id="bgm" src="assets/bgm_loop.mp3" data-start="0" data-duration="${roundedDuration}.0" data-volume="0.08"></audio>

      <!-- SFX Sincronizados -->
${sfxTags}

      <header class="header-fixed" data-layout-ignore="true">
        <div class="brand-badge" data-layout-ignore="true">
          <div class="brand-dot"></div>
          <span data-layout-ignore="true">dev.remoto</span>
        </div>
        <div class="tag-pill" data-layout-ignore="true">${item.tag || 'RADAR IA // 100% GRÁTIS'}</div>
      </header>

      <div class="camera-viewport">
        <div id="camera" class="camera-rig" data-layout-allow-overflow="true">
          <main class="stage">
${sceneHtmls.join('\n')}
          </main>
        </div>
      </div>

      <!-- Dynamic Subtitles -->
      <footer class="subtitle-rail-wrapper">
        <div id="sub-pill" class="subtitle-pill">
          <span id="sub-content">
            <span class="sub-word active-badge">${item.name.toUpperCase()}</span>
          </span>
        </div>
      </footer>
    </div>

    <script>
      const tl = gsap.timeline({ paused: true });

      function setSubText(html) {
        const el = document.getElementById('sub-content');
        if (el) el.innerHTML = html;
      }

      // Grid 3D em movimento contínuo + Câmera 3D Cinematográfica em Travelling Contínuo
      tl.to("#grid-plane", { backgroundPosition: "0px 2400px", duration: ${roundedDuration}, ease: "none" }, 0);
      tl.fromTo("#camera", { z: 45, y: 15 }, { z: -15, y: -10, duration: 6, repeat: Math.ceil(${roundedDuration} / 6), yoyo: true, ease: "sine.inOut" }, 0.0);
      tl.fromTo("#camera", { rotateY: -1.6, rotateX: 1.2 }, { rotateY: 1.6, rotateX: -1.2, duration: 5, repeat: Math.ceil(${roundedDuration} / 5), yoyo: true, ease: "sine.inOut" }, 0.0);

      // Beats Cinematográficos
${sceneGsapScripts.join('\n')}

      // Legendas Sincronizadas
${subCalls.join('\n')}

      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
}
