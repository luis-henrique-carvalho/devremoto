#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(MODULE_DIR, '..');
const OUT_DIR = path.join(ROOT_DIR, 'brand-assets');
const careerOpsPkg = path.resolve(process.env.CAREER_OPS_ROOT || '/home/luis/vagas/career-ops', 'package.json');
const requireFromCareerOps = createRequire(careerOpsPkg);
const { chromium } = requireFromCareerOps('playwright');

const GOOGLE_FONTS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&display=swap" rel="stylesheet">
`;

// 1. Vector SVG Masters (1080x1080, circular-crop safe within r=460)
const AVATAR_SVGS = {
  'avatar-01-terminal-orb': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="bgAura" cx="72%" cy="24%" r="72%">
      <stop offset="0%" stop-color="#10A37F" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="#0D0D0F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cyanAura" cx="22%" cy="82%" r="60%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="#0D0D0F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10A37F"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.35"/>
    </linearGradient>
    <filter id="emeraldGlow" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
      <feGaussianBlur stdDeviation="22" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="#0D0D0F"/>
  <rect width="1080" height="1080" fill="url(#bgAura)"/>
  <rect width="1080" height="1080" fill="url(#cyanAura)"/>

  <!-- Subtle Safe-Zone Specular Ring -->
  <circle cx="540" cy="540" r="446" fill="#14151A" fill-opacity="0.65" stroke="url(#ringGrad)" stroke-width="4"/>
  <circle cx="540" cy="540" r="392" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="2" stroke-dasharray="10 14"/>

  <!--Elevated App Tile inside Avatar-->
  <rect x="260" y="260" width="560" height="560" rx="136" fill="#17181E" stroke="url(#ringGrad)" stroke-width="4"/>

  <!-- Terminal Chevron '>' -->
  <path d="M 378 424 L 516 540 L 378 656" fill="none" stroke="#F9FAFB" stroke-width="58" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Glowing Emerald Prompt Cursor / Bar '_' -->
  <rect x="556" y="614" width="152" height="54" rx="27" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>

  <!-- Live Remote Beacon Orb (Top-Right of Tile) -->
  <circle cx="678" cy="404" r="34" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)"/>
  <circle cx="678" cy="404" r="62" fill="none" stroke="#34D399" stroke-opacity="0.35" stroke-width="5"/>
</svg>`,

  'avatar-02-code-braces': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="aura2" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#10A37F" stop-opacity="0.36"/>
      <stop offset="68%" stop-color="#0D0D0F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="em2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10A37F"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
    <filter id="glow2" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1080">
      <feGaussianBlur stdDeviation="24" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="#0D0D0F"/>
  <rect width="1080" height="1080" fill="url(#aura2)"/>
  <circle cx="540" cy="540" r="446" fill="none" stroke="#34D399" stroke-opacity="0.28" stroke-width="4"/>

  <!-- Left Curly Brace { -->
  <path d="M 416 320 C 356 320 344 352 344 408 L 344 476 C 344 518 312 540 274 540 C 312 540 344 562 344 604 L 344 672 C 344 728 356 760 416 760"
        fill="none" stroke="#F9FAFB" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Right Curly Brace } -->
  <path d="M 664 320 C 724 320 736 352 736 408 L 736 476 C 736 518 768 540 806 540 C 768 540 736 562 736 604 L 736 672 C 736 728 724 760 664 760"
        fill="none" stroke="#F9FAFB" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Center Glowing OpenAI Emerald Radar Core -->
  <circle cx="540" cy="540" r="78" fill="url(#em2)" filter="url(#glow2)"/>
  <circle cx="540" cy="540" r="134" fill="none" stroke="#34D399" stroke-opacity="0.42" stroke-width="8"/>
  <circle cx="540" cy="540" r="188" fill="none" stroke="#38BDF8" stroke-opacity="0.22" stroke-width="4" stroke-dasharray="16 18"/>
</svg>`,
};

function buildWordmarkAvatarHtml() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8">${GOOGLE_FONTS}
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px;
    background: #0D0D0F;
    background-image:
      radial-gradient(circle at 78% 20%, rgba(16, 163, 127, 0.36) 0%, transparent 56%),
      radial-gradient(circle at 18% 82%, rgba(56, 189, 248, 0.18) 0%, transparent 52%),
      radial-gradient(rgba(148, 163, 184, 0.12) 1.5px, transparent 1.5px);
    background-size: 100% 100%, 100% 100%, 32px 32px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    color: #F9FAFB;
  }
  .ring {
    width: 892px; height: 892px; border-radius: 999px;
    border: 4px solid rgba(52, 211, 153, 0.34);
    background: rgba(20, 21, 26, 0.72);
    box-shadow: inset 0 0 80px rgba(16, 163, 127, 0.12);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 28px;
  }
  .top-pill {
    display: inline-flex; align-items: center; gap: 16px;
    background: rgba(16, 163, 127, 0.18);
    border: 2px solid rgba(52, 211, 153, 0.40);
    padding: 14px 32px; border-radius: 999px;
    color: #34D399; font-size: 34px; font-weight: 700;
  }
  .dot {
    width: 22px; height: 22px; border-radius: 999px;
    background: linear-gradient(135deg, #10A37F, #34D399);
    box-shadow: 0 0 20px #34D399;
  }
  .word {
    display: flex; flex-direction: column; align-items: center; line-height: 0.96;
  }
  .w1 {
    font-family: 'Inter', sans-serif;
    font-size: 176px; font-weight: 900; letter-spacing: -0.045em; color: #F9FAFB;
  }
  .w2 {
    font-size: 108px; font-weight: 800; letter-spacing: -0.03em;
    background: linear-gradient(135deg, #34D399 0%, #38BDF8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .sub {
    font-size: 32px; font-weight: 600; color: #A1A1AA;
    background: #212228; border: 2px solid rgba(255,255,255,0.10);
    padding: 12px 30px; border-radius: 999px;
  }
</style>
</head>
<body>
  <div class="ring">
    <div class="top-pill"><span class="dot"></span>BR · 100% REMOTO</div>
    <div class="word">
      <span class="w1">dev</span>
      <span class="w2">.remoto</span>
    </div>
    <div class="sub">remote: true |</div>
  </div>
</body>
</html>`;
}

// 2. Five Story Highlight Covers (1080x1080)
const HIGHLIGHTS = [
  {
    file: 'highlight-01-hoje.png',
    label: 'HOJE',
    accent: '#34D399',
    svgIcon: `<circle cx="12" cy="12" r="4" fill="#34D399"/><circle cx="12" cy="12" r="8" fill="none" stroke="#34D399" stroke-width="1.8" stroke-opacity="0.65"/><circle cx="12" cy="12" r="11" fill="none" stroke="#38BDF8" stroke-width="1.2" stroke-dasharray="2 3"/>`,
  },
  {
    file: 'highlight-02-junior.png',
    label: 'JR & PLENO',
    accent: '#38BDF8',
    svgIcon: `<polyline points="7 8 11 12 7 16" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><line x1="13" y1="16" x2="18" y2="16" stroke="#34D399" stroke-width="2.2" stroke-linecap="round"/>`,
  },
  {
    file: 'highlight-03-stacks.png',
    label: 'STACKS',
    accent: '#C084FC',
    svgIcon: `<polyline points="8 7 3 12 8 17" fill="none" stroke="#C084FC" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><polyline points="16 7 21 12 16 17" fill="none" stroke="#34D399" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><line x1="13.5" y1="5" x2="10.5" y2="19" stroke="#F9FAFB" stroke-width="1.9" stroke-linecap="round"/>`,
  },
  {
    file: 'highlight-04-remoto.png',
    label: 'ANTI-HÍBRIDO',
    accent: '#34D399',
    svgIcon: `<path d="M12 3l7 3v5c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V6l7-3z" fill="none" stroke="#34D399" stroke-width="2" stroke-linejoin="round"/><polyline points="8.8 12.2 11 14.4 15.4 9.8" fill="none" stroke="#F9FAFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    file: 'highlight-05-anuncie.png',
    label: 'DIVULGAR',
    accent: '#FBBF24',
    svgIcon: `<line x1="7" y1="17" x2="17" y2="7" stroke="#34D399" stroke-width="2.3" stroke-linecap="round"/><polyline points="9 7 17 7 17 15" fill="none" stroke="#F9FAFB" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
];

function buildHighlightHtml(h) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8">${GOOGLE_FONTS}
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1080px;
    background: #0D0D0F;
    background-image: radial-gradient(circle at 75% 22%, rgba(16,163,127,0.28), transparent 58%);
    display: flex; align-items: center; justify-content: center;
  }
  .circle {
    width: 860px; height: 860px; border-radius: 999px;
    background: #17181E;
    border: 5px solid rgba(52, 211, 153, 0.34);
    box-shadow: 0 24px 60px rgba(0,0,0,0.5), inset 0 0 60px rgba(16,163,127,0.10);
    display: flex; align-items: center; justify-content: center;
  }
  svg { width: 410px; height: 410px; overflow: visible; }
</style>
</head>
<body>
  <div class="circle">
    <svg viewBox="0 0 24 24">${h.svgIcon}</svg>
  </div>
</body>
</html>`;
}

// 3. Reusable Story Template (1080x1920)
function buildStoryTemplateHtml() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8">${GOOGLE_FONTS}
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1080px; height: 1920px;
    background: #0D0D0F;
    background-image:
      radial-gradient(circle at 84% 12%, rgba(16, 163, 127, 0.34) 0%, transparent 52%),
      radial-gradient(circle at 14% 88%, rgba(56, 189, 248, 0.18) 0%, transparent 48%),
      radial-gradient(rgba(148, 163, 184, 0.10) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 28px 28px;
    color: #F9FAFB;
    font-family: 'Inter', sans-serif;
    padding: 130px 68px 150px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .top {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 22px;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'JetBrains Mono', monospace; font-size: 25px; font-weight: 700;
    color: #34D399; background: rgba(16,163,127,0.16);
    border: 1px solid rgba(52,211,153,0.34);
    padding: 12px 28px; border-radius: 999px;
  }
  .dot { width: 14px; height: 14px; border-radius: 999px; background: #34D399; box-shadow: 0 0 12px #34D399; }
  h1 {
    font-size: 68px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.06;
  }
  .sub { font-size: 30px; color: #A1A1AA; max-width: 820px; line-height: 1.38; }

  .post-slot {
    height: 980px;
    border-radius: 38px;
    border: 2px dashed rgba(52, 211, 153, 0.42);
    background: rgba(23, 24, 30, 0.62);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 20px; text-align: center; padding: 48px;
  }
  .slot-tag {
    font-family: 'JetBrains Mono', monospace; font-size: 26px; color: #38BDF8;
    background: rgba(56,189,248,0.12); border: 1px solid rgba(56,189,248,0.3);
    padding: 12px 24px; border-radius: 14px;
  }
  .slot-desc { font-size: 28px; color: #71717A; max-width: 620px; line-height: 1.4; }

  .bottom {
    display: flex; flex-direction: column; gap: 22px; align-items: center;
  }
  .sticker-zone {
    width: 100%;
    background: #212228;
    border: 1px solid rgba(16, 163, 127, 0.48);
    border-radius: 999px;
    padding: 24px 36px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .st-left { font-size: 28px; font-weight: 600; color: #F1F5F9; }
  .st-btn {
    background: #FFFFFF; color: #0D0D0F; font-weight: 800; font-size: 25px;
    padding: 14px 28px; border-radius: 999px;
  }
</style>
</head>
<body>
  <div class="top">
    <div class="chip"><span class="dot"></span>novo_radar · 100% remoto</div>
    <h1>Vagas Tech Abertas Hoje no Brasil</h1>
    <p class="sub">Zero híbrido disfarçado. Toque no post abaixo para ver todas as stacks e senioridades.</p>
  </div>

  <div class="post-slot">
    <div class="slot-tag">[ Cole aqui o Post do Feed ]</div>
    <p class="slot-desc">Compartilhe o carrossel do dia nos Stories e posicione o card centralizado nesta área.</p>
  </div>

  <div class="bottom">
    <div class="sticker-zone">
      <span class="st-left">Cole o Sticker de Link aqui →</span>
      <span class="st-btn">Links Diretos ↗</span>
    </div>
  </div>
</body>
</html>`;
}

// 4. Master Brand Guidelines + Live iOS Instagram Profile Mockup (1920x1240)
function buildBrandBookHtml(avatarSvg1, avatarSvg2, wordmarkDataUri) {
  const hlCircles = HIGHLIGHTS.map((h) => `
    <div class="ig-hl-item">
      <div class="ig-hl-ring">
        <svg viewBox="0 0 24 24" width="32" height="32">${h.svgIcon}</svg>
      </div>
      <span>${h.label}</span>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8">${GOOGLE_FONTS}
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1920px; height: 1240px;
    background: #07080B;
    background-image:
      radial-gradient(circle at 88% 12%, rgba(16, 163, 127, 0.22), transparent 48%),
      radial-gradient(circle at 12% 90%, rgba(56, 189, 248, 0.12), transparent 45%);
    color: #F9FAFB;
    font-family: 'Inter', sans-serif;
    padding: 48px 56px;
    display: grid;
    grid-template-columns: 600px 1fr;
    gap: 48px;
    overflow: hidden;
  }

  /* Left Column: Realistic iOS Instagram Dark Mode Profile Mockup */
  .phone-frame {
    background: #000000;
    border: 2px solid rgba(255,255,255,0.15);
    border-radius: 48px;
    padding: 28px 26px 26px;
    display: flex; flex-direction: column; gap: 20px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.65);
    overflow: hidden;
  }
  .ig-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 4px 6px 8px;
    font-weight: 700; font-size: 22px; letter-spacing: -0.02em;
  }
  .ig-profile-row {
    display: flex; align-items: center; gap: 28px; padding: 0 6px;
  }
  .ig-avatar-wrap {
    width: 112px; height: 112px; border-radius: 999px;
    padding: 4px;
    background: linear-gradient(135deg, #10A37F, #34D399, #38BDF8);
    flex-shrink: 0;
  }
  .ig-avatar-inner {
    width: 100%; height: 100%; border-radius: 999px; overflow: hidden;
    border: 3px solid #000;
  }
  .ig-avatar-inner svg { width: 100%; height: 100%; display: block; }
  .ig-stats {
    display: grid; grid-template-columns: repeat(3, 1fr); flex: 1; text-align: center;
  }
  .ig-stat-num { font-size: 21px; font-weight: 800; }
  .ig-stat-lbl { font-size: 14px; color: #A1A1AA; margin-top: 2px; }

  .ig-bio { padding: 0 6px; display: flex; flex-direction: column; gap: 5px; font-size: 16px; line-height: 1.42; }
  .ig-name { font-weight: 800; font-size: 17px; color: #FFFFFF; }
  .ig-cat { color: #71717A; font-size: 15px; }
  .ig-link { color: #38BDF8; font-weight: 600; font-family: 'JetBrains Mono', monospace; font-size: 14.5px; margin-top: 3px; }

  .ig-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 2px 6px; }
  .ig-btn-primary { background: #10A37F; color: #041F17; font-weight: 800; font-size: 16px; text-align: center; padding: 10px; border-radius: 10px; }
  .ig-btn-sec { background: #1C1D22; color: #F9FAFB; font-weight: 700; font-size: 16px; text-align: center; padding: 10px; border-radius: 10px; }

  .ig-highlights {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; padding: 6px 4px;
  }
  .ig-hl-item { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 12px; color: #D4D4D8; font-weight: 500; }
  .ig-hl-ring {
    width: 68px; height: 68px; border-radius: 999px;
    background: #14151A; border: 1.5px solid rgba(52,211,153,0.45);
    display: flex; align-items: center; justify-content: center;
  }

  .ig-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-top: 4px; flex: 1;
  }
  .ig-tile {
    background: #0D0D0F;
    background-image: radial-gradient(circle at 80% 15%, rgba(16,163,127,0.32), transparent 60%);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 6px; padding: 14px 12px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .tile-tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #34D399; }
  .tile-h { font-size: 15px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
  .tile-code { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; color: #94A3B8; background: #14161D; padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08); }

  /* Right Column: Brand Kit Spec Panels */
  .right-col { display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
  .head-row { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
  .head-title { font-size: 38px; font-weight: 800; letter-spacing: -0.03em; }
  .head-sub { font-size: 18px; color: #A1A1AA; margin-top: 4px; }
  .badge-official { font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 700; color: #34D399; background: rgba(16,163,127,0.16); border: 1px solid rgba(52,211,153,0.35); padding: 10px 20px; border-radius: 999px; }

  .panel { background: #111217; border: 1px solid rgba(255,255,255,0.09); border-radius: 24px; padding: 26px 30px; }
  .panel-lbl { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: #34D399; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 18px; }

  .avatars-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .av-card { background: #181920; border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 20px; display: flex; align-items: center; gap: 18px; }
  .av-preview { width: 96px; height: 96px; border-radius: 999px; overflow: hidden; border: 2px solid rgba(52,211,153,0.45); flex-shrink: 0; }
  .av-preview svg, .av-preview img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .av-title { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
  .av-desc { font-size: 14px; color: #A1A1AA; line-height: 1.35; }

  .tokens-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .swatch { border-radius: 16px; padding: 16px; height: 118px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,0.12); }
  .sw-name { font-size: 15px; font-weight: 700; }
  .sw-hex { font-family: 'JetBrains Mono', monospace; font-size: 14px; opacity: 0.9; }

  .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
</style>
</head>
<body>
  <!-- Left: Instagram Mobile Mockup -->
  <div class="phone-frame">
    <div class="ig-topbar">
      <span>devremoto.br</span>
      <span style="color:#34D399; font-family:'JetBrains Mono',monospace; font-size:14px;">● LIVE PREVIEW</span>
    </div>

    <div class="ig-profile-row">
      <div class="ig-avatar-wrap">
        <div class="ig-avatar-inner">${avatarSvg1}</div>
      </div>
      <div class="ig-stats">
        <div><div class="ig-stat-num">142</div><div class="ig-stat-lbl">posts</div></div>
        <div><div class="ig-stat-num">18,4 mil</div><div class="ig-stat-lbl">seguidores</div></div>
        <div><div class="ig-stat-num">48</div><div class="ig-stat-lbl">seguindo</div></div>
      </div>
    </div>

    <div class="ig-bio">
      <div class="ig-name">dev.remoto | Vagas Tech 100% Remotas 🇧🇷</div>
      <div class="ig-cat">Mídia / Tecnologia & Engenharia de Software</div>
      <div>⚡ Radar diário de vagas 100% Home Office no Brasil</div>
      <div>🛡️ Zero híbrido disfarçado · De Júnior a Especialista</div>
      <div>💻 Java · C# · Node · Python · React · Mobile · Dados · QA</div>
      <div>👇 Links oficiais da edição de hoje:</div>
      <div class="ig-link">🔗 devremoto.br/vagas-hoje</div>
    </div>

    <div class="ig-btns">
      <div class="ig-btn-primary">Seguir</div>
      <div class="ig-btn-sec">Enviar mensagem</div>
    </div>

    <div class="ig-highlights">${hlCircles}</div>

    <div class="ig-grid">
      <div class="ig-tile">
        <span class="tile-tag">07.nov · 8 vagas</span>
        <div class="tile-h">Stone, OLX, Boticário e +5 remotas hoje.</div>
        <div class="tile-code">hibrido: false</div>
      </div>
      <div class="ig-tile">
        <span class="tile-tag">06.nov · 8 vagas</span>
        <div class="tile-h">Radar Dev: 8 vagas 100% home office.</div>
        <div class="tile-code">remote: true</div>
      </div>
      <div class="ig-tile">
        <span class="tile-tag">05.nov · 8 vagas</span>
        <div class="tile-h">Nubank, VTEX e +6 contratando de casa.</div>
        <div class="tile-code">stack: "all"</div>
      </div>
      <div class="ig-tile">
        <span class="tile-tag">04.nov · 8 vagas</span>
        <div class="tile-h">O remoto não acabou: 8 vagas (tem Jr!).</div>
        <div class="tile-code">nivel: "Jr->Sr"</div>
      </div>
      <div class="ig-tile">
        <span class="tile-tag">03.nov · 8 vagas</span>
        <div class="tile-h">iFood, Caju e +6 empresas sem presencial.</div>
        <div class="tile-code">remoto: 100%</div>
      </div>
      <div class="ig-tile">
        <span class="tile-tag">02.nov · 8 vagas</span>
        <div class="tile-h">Java, .NET, Python e QA 100% de casa.</div>
        <div class="tile-code">brasil: true</div>
      </div>
    </div>
  </div>

  <!-- Right: Brand Kit System -->
  <div class="right-col">
    <div class="head-row">
      <div>
        <div class="head-title">Brand Kit Oficial · @devremoto.br</div>
        <div class="head-sub">OpenAI Emerald Noir · Identidade Visual, Avatares, Destaques & Guia de Perfil</div>
      </div>
      <div class="badge-official">v1.0 · PRODUCTION</div>
    </div>

    <div class="panel">
      <div class="panel-lbl">01 · Opções de Foto de Perfil (1080×1080 · Crop Circular Seguro)</div>
      <div class="avatars-row">
        <div class="av-card">
          <div class="av-preview">${avatarSvg1}</div>
          <div>
            <div class="av-title">01 · Terminal Orb ★</div>
            <div class="av-desc">Recomendada. Prompt <code>&gt;_</code> + beacon esmeralda. Máxima leitura em 32px nos comentários.</div>
          </div>
        </div>
        <div class="av-card">
          <div class="av-preview">${avatarSvg2}</div>
          <div>
            <div class="av-title">02 · Code Braces</div>
            <div class="av-desc">Chaves <code>{ • }</code> com núcleo de radar OpenAI. Minimalista estilo Vercel/Linear.</div>
          </div>
        </div>
        <div class="av-card">
          <div class="av-preview"><img src="${wordmarkDataUri}" alt="Wordmark"/></div>
          <div>
            <div class="av-title">03 · IDE Wordmark</div>
            <div class="av-desc">Assinatura <code>dev.remoto</code> explícita para reconhecimento imediato da marca.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-lbl">02 · Paleta de Cores Oficial (OpenAI Emerald Noir)</div>
      <div class="tokens-grid">
        <div class="swatch" style="background:#0D0D0F; color:#F9FAFB;"><span class="sw-name">Obsidian Canvas</span><span class="sw-hex">#0D0D0F</span></div>
        <div class="swatch" style="background:#17181E; color:#F9FAFB;"><span class="sw-name">Elevated Card</span><span class="sw-hex">#17181E</span></div>
        <div class="swatch" style="background:#212228; color:#F9FAFB;"><span class="sw-name">Composer Bar</span><span class="sw-hex">#212228</span></div>
        <div class="swatch" style="background:linear-gradient(135deg,#10A37F,#34D399); color:#041F17; border:none;"><span class="sw-name">OpenAI Emerald</span><span class="sw-hex">#10A37F → #34D399</span></div>
        <div class="swatch" style="background:#0C2D3F; color:#38BDF8; border-color:rgba(56,189,248,0.4);"><span class="sw-name">Syntax Cyan</span><span class="sw-hex">#38BDF8</span></div>
      </div>
    </div>

    <div class="two-cols">
      <div class="panel">
        <div class="panel-lbl">03 · Tipografia & Código</div>
        <div style="font-size:28px; font-weight:800; letter-spacing:-0.03em; margin-bottom:6px;">Inter Display (700 / 800)</div>
        <div style="font-size:15px; color:#A1A1AA; margin-bottom:14px;">Headlines magnéticas, títulos de cargos e leitura mobile sem ruído.</div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:20px; font-weight:700; color:#34D399; margin-bottom:6px;">JetBrains Mono · remote: true</div>
        <div style="font-size:15px; color:#A1A1AA;">Handles de empresas, tags de stack, senioridade e janela TypeScript.</div>
      </div>

      <div class="panel">
        <div class="panel-lbl">04 · Pacote de Ativos Gerados</div>
        <div style="font-size:15.5px; color:#D4D4D8; line-height:1.62; font-family:'JetBrains Mono',monospace;">
          ✓ 3× Fotos de Perfil PNG (1080×1080) + SVGs<br/>
          ✓ 5× Capas de Destaques (1080×1080)<br/>
          ✓ 1× Template de Story 9:16 (1080×1920)<br/>
          ✓ Guia SEO de Nome, Bio & Destaques (.md)
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({ deviceScaleFactor: 1 });

    // 1. Save SVG vectors & render 1080x1080 PNGs for Avatars 01 & 02
    for (const [name, svg] of Object.entries(AVATAR_SVGS)) {
      const svgPath = path.join(OUT_DIR, `${name}.svg`);
      fs.writeFileSync(svgPath, svg, 'utf8');

      const page = await context.newPage();
      await page.setViewportSize({ width: 1080, height: 1080 });
      await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;width:1080px;height:1080px;overflow:hidden;">${svg}</body></html>`);
      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), type: 'png' });
      await page.close();
    }

    // 2. Render Avatar 03 (Wordmark Badge 1080x1080)
    const pWord = await context.newPage();
    await pWord.setViewportSize({ width: 1080, height: 1080 });
    await pWord.setContent(buildWordmarkAvatarHtml(), { waitUntil: 'networkidle' });
    await pWord.evaluate(() => document.fonts.ready);
    const avatar3Path = path.join(OUT_DIR, 'avatar-03-wordmark-badge.png');
    await pWord.screenshot({ path: avatar3Path, type: 'png' });
    await pWord.close();

    // 3. Render 5 Story Highlight Covers (1080x1080)
    for (const h of HIGHLIGHTS) {
      const pHl = await context.newPage();
      await pHl.setViewportSize({ width: 1080, height: 1080 });
      await pHl.setContent(buildHighlightHtml(h), { waitUntil: 'networkidle' });
      await pHl.screenshot({ path: path.join(OUT_DIR, h.file), type: 'png' });
      await pHl.close();
    }

    // 4. Render 1080x1920 Story Template
    const pStory = await context.newPage();
    await pStory.setViewportSize({ width: 1080, height: 1920 });
    await pStory.setContent(buildStoryTemplateHtml(), { waitUntil: 'networkidle' });
    await pStory.evaluate(() => document.fonts.ready);
    await pStory.screenshot({ path: path.join(OUT_DIR, 'story-new-post-template.png'), type: 'png' });
    await pStory.close();

    // 5. Render 1920x1240 Master Brand Guidelines + Instagram iOS Profile Mockup
    const wordmarkB64 = `data:image/png;base64,${fs.readFileSync(avatar3Path).toString('base64')}`;
    const pBook = await context.newPage();
    await pBook.setViewportSize({ width: 1920, height: 1240 });
    await pBook.setContent(
      buildBrandBookHtml(AVATAR_SVGS['avatar-01-terminal-orb'], AVATAR_SVGS['avatar-02-code-braces'], wordmarkB64),
      { waitUntil: 'networkidle' },
    );
    await pBook.evaluate(() => document.fonts.ready);
    await pBook.screenshot({ path: path.join(OUT_DIR, 'brand-book-overview.png'), type: 'png' });
    await pBook.close();

    console.log(`Generated complete Brand Kit pack in ${OUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
