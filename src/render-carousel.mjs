import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { escapeHtml } from './curate-and-copy.mjs';

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const careerOpsPkgPath = path.resolve(
  process.env.CAREER_OPS_ROOT || '/home/luis/vagas/career-ops',
  'package.json',
);
const requireFromCareerOps = createRequire(careerOpsPkgPath);

const ROTATING_COMPOSER_BARS = [
  { prompt: 'Conhece um dev pra essa vaga? Mande a ele', action: 'Enviar ↗' },
  { prompt: 'Quer receber esse radar todo dia no feed?', action: 'Curtir ♥' },
  { prompt: 'Qual stack você quer ver amanhã? Comente', action: 'Comentar ↑' },
  { prompt: 'Lista completa pronta para salvar a seguir', action: 'Resumo →' },
];

export function buildThemeCss(brandKit) {
  const t = brandKit.tokens;
  return `
    :root {
      --bg-canvas: ${t.bgCanvas};
      --bg-card: ${t.bgCard};
      --bg-card-inner: ${t.bgCardInner};
      --bg-composer: ${t.bgComposer};
      --border-subtle: ${t.borderSubtle};
      --border-glow: ${t.borderGlow};
      --text-primary: ${t.textPrimary};
      --text-secondary: ${t.textSecondary};
      --text-muted: ${t.textMuted};
      --accent-main: ${t.accentMain};
      --accent-bright: ${t.accentBright};
      --accent-gradient: linear-gradient(135deg, ${t.accentMain} 0%, ${t.accentBright} 100%);
      --aura-1: radial-gradient(circle at 82% 14%, rgba(16, 163, 127, 0.30) 0%, rgba(16, 163, 127, 0) 58%);
      --aura-2: radial-gradient(circle at 12% 88%, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0) 52%);
      --pill-remote-bg: rgba(16, 163, 127, 0.16);
      --pill-remote-fg: ${t.accentBright};
      --pill-remote-border: rgba(52, 211, 153, 0.30);
      --pill-level-bg: rgba(56, 189, 248, 0.14);
      --pill-level-fg: ${t.syntaxCyan};
      --pill-level-border: rgba(56, 189, 248, 0.28);
      --pill-stack-bg: rgba(255, 255, 255, 0.05);
      --pill-stack-fg: #E4E4E7;
      --pill-stack-border: rgba(255, 255, 255, 0.10);
      --send-btn-bg: ${t.sendBtnBg};
      --send-btn-fg: ${t.sendBtnFg};
      --company-color: ${t.accentBright};
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: '${brandKit.typography.display}', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
      font-variant-numeric: tabular-nums;
      background: var(--bg-canvas);
    }
    .mono {
      font-family: '${brandKit.typography.mono}', monospace;
    }
    .ig-slide {
      width: ${brandKit.dimensions.width}px;
      height: ${brandKit.dimensions.height}px;
      background-color: var(--bg-canvas);
      background-image:
        var(--aura-1),
        var(--aura-2),
        radial-gradient(rgba(148, 163, 184, 0.10) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 28px 28px;
      color: var(--text-primary);
      padding: 64px 64px 56px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    /* Top Chrome */
    .top-chrome {
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }
    .brand-pill {
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 12px 22px;
      border-radius: 999px;
      backdrop-filter: blur(12px);
    }
    .openai-orb {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      background: var(--accent-gradient);
      box-shadow: 0 0 16px var(--border-glow);
    }
    .brand-text {
      font-family: '${brandKit.typography.mono}', monospace;
      font-weight: 700;
      font-size: 25px;
      letter-spacing: -0.02em;
      color: var(--text-primary);
    }
    .meta-counter {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 23px;
      font-weight: 500;
      color: var(--text-secondary);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 12px 22px;
      border-radius: 999px;
    }

    /* Cover Content */
    .cover-body {
      display: flex;
      flex-direction: column;
      gap: 30px;
      z-index: 2;
    }
    .status-chip {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: var(--pill-remote-bg);
      color: var(--pill-remote-fg);
      border: 1px solid var(--pill-remote-border);
      padding: 12px 24px;
      border-radius: 999px;
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 24px;
      font-weight: 600;
    }
    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: currentColor;
      box-shadow: 0 0 10px currentColor;
    }
    .cover-h1 {
      font-size: 72px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.035em;
      color: var(--text-primary);
    }
    .cover-h1.compact {
      font-size: 64px;
    }
    .cover-lead {
      font-size: 32px;
      line-height: 1.44;
      color: var(--text-secondary);
      font-weight: 400;
      max-width: 930px;
    }

    /* Terminal Snippet Card on Cover */
    .code-window {
      background: #0B0D13;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 24px;
      padding: 28px 34px;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
    }
    .win-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .win-dots {
      display: flex;
      gap: 9px;
    }
    .win-dots span {
      width: 13px;
      height: 13px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.18);
    }
    .win-title {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 21px;
      color: #94A3B8;
    }
    .code-lines {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 24px;
      line-height: 1.65;
      color: #E2E8F0;
    }
    .tok-k { color: ${t.syntaxViolet}; }
    .tok-f { color: ${t.syntaxCyan}; }
    .tok-s { color: ${t.accentBright}; }
    .tok-n { color: ${t.syntaxAmber}; }
    .tok-c { color: #64748B; }

    /* ChatGPT-Style Prompt Bar Footer */
    .composer-bar {
      background: var(--bg-composer);
      color: #F8FAFC;
      border: 1px solid var(--border-glow);
      border-radius: 999px;
      padding: 18px 22px 18px 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
      z-index: 2;
    }
    .composer-prompt {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 26px;
      font-weight: 500;
      color: #F1F5F9;
    }
    .composer-cursor {
      display: inline-block;
      width: 3px;
      height: 28px;
      background: var(--accent-bright);
    }
    .composer-send {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--send-btn-bg);
      color: var(--send-btn-fg);
      font-weight: 700;
      font-size: 24px;
      padding: 14px 26px;
      border-radius: 999px;
      flex-shrink: 0;
    }

    /* Section Header */
    .jobs-header {
      z-index: 2;
    }
    .jobs-eyebrow {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 23px;
      color: var(--company-color);
      font-weight: 600;
      margin-bottom: 10px;
    }
    .jobs-h2 {
      font-size: 54px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.08;
    }

    /* Interior Job Cards */
    .cards-list {
      display: flex;
      flex-direction: column;
      gap: 28px;
      z-index: 2;
    }
    .dev-job-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 28px;
      padding: 38px 42px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
    }
    .dev-job-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 36px;
      right: 36px;
      height: 2px;
      background: var(--accent-gradient);
      opacity: 0.85;
    }
    .job-row-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .job-company {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 29px;
      font-weight: 700;
      color: var(--company-color);
    }
    .badge-remote {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 22px;
      font-weight: 600;
      background: var(--pill-remote-bg);
      color: var(--pill-remote-fg);
      border: 1px solid var(--pill-remote-border);
      padding: 8px 18px;
      border-radius: 999px;
      flex-shrink: 0;
    }
    .job-title {
      font-size: 39px;
      font-weight: 700;
      line-height: 1.18;
      letter-spacing: -0.025em;
      color: var(--text-primary);
    }
    .job-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 4px;
    }
    .pill {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 22px;
      font-weight: 600;
      padding: 9px 18px;
      border-radius: 12px;
    }
    .pill-level {
      background: var(--pill-level-bg);
      color: var(--pill-level-fg);
      border: 1px solid var(--pill-level-border);
    }
    .pill-stack {
      background: var(--pill-stack-bg);
      color: var(--pill-stack-fg);
      border: 1px solid var(--pill-stack-border);
    }

    /* Slide 6: Cheat-Sheet Recap Table */
    .recap-board {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 28px;
      padding: 18px 32px;
      display: flex;
      flex-direction: column;
      z-index: 2;
      position: relative;
      box-shadow: 0 20px 44px rgba(0, 0, 0, 0.22);
    }
    .recap-board::before {
      content: '';
      position: absolute;
      top: 0;
      left: 36px;
      right: 36px;
      height: 2px;
      background: var(--accent-gradient);
      opacity: 0.85;
    }
    .recap-row {
      display: grid;
      grid-template-columns: 54px 1fr auto;
      align-items: center;
      gap: 18px;
      padding: 18px 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }
    .recap-row:last-child {
      border-bottom: none;
    }
    .recap-idx {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 21px;
      font-weight: 600;
      color: var(--text-muted);
    }
    .recap-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .recap-comp {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 20px;
      font-weight: 700;
      color: var(--company-color);
    }
    .recap-role {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .recap-lvl {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 19px;
      font-weight: 600;
      padding: 7px 15px;
      border-radius: 10px;
      background: var(--pill-level-bg);
      color: var(--pill-level-fg);
      border: 1px solid var(--pill-level-border);
      white-space: nowrap;
    }

    /* Slide 7: Quadruple Viral CTA */
    .cta-stack {
      display: flex;
      flex-direction: column;
      gap: 22px;
      z-index: 2;
    }
    .cta-hero {
      background: linear-gradient(145deg, rgba(16, 163, 127, 0.22) 0%, rgba(22, 23, 27, 0.95) 68%);
      border: 1px solid var(--border-glow);
      border-radius: 28px;
      padding: 36px 40px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 22px 48px rgba(0, 0, 0, 0.28);
    }
    .cta-hero-tag {
      align-self: flex-start;
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 20px;
      font-weight: 600;
      color: var(--pill-remote-fg);
      background: var(--pill-remote-bg);
      border: 1px solid var(--pill-remote-border);
      padding: 7px 16px;
      border-radius: 999px;
    }
    .cta-hero-h3 {
      font-size: 46px;
      font-weight: 800;
      line-height: 1.12;
      letter-spacing: -0.03em;
      color: var(--text-primary);
    }
    .cta-hero-h3 .kw {
      color: var(--accent-bright);
      font-family: '${brandKit.typography.mono}', monospace;
    }
    .cta-hero-sub {
      font-size: 25px;
      line-height: 1.42;
      color: var(--text-secondary);
    }
    .cta-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .cta-mini-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 22px;
      padding: 22px 28px;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }
    .cta-step {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 21px;
      font-weight: 700;
      color: var(--pill-level-fg);
      background: var(--pill-level-bg);
      border: 1px solid var(--pill-level-border);
      padding: 8px 14px;
      border-radius: 12px;
      flex-shrink: 0;
    }
    .cta-mini-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .cta-mini-title {
      font-size: 25px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .cta-mini-desc {
      font-size: 22px;
      line-height: 1.38;
      color: var(--text-secondary);
    }
  `;
}

function renderTopChrome(brandKit, counterText) {
  return `
    <div class="top-chrome">
      <div class="brand-pill">
        <span class="openai-orb"></span>
        <span class="brand-text">${escapeHtml(brandKit.brandName)}</span>
      </div>
      <div class="meta-counter">${escapeHtml(counterText)}</div>
    </div>
  `;
}

function renderComposerBar(promptText, actionText) {
  return `
    <div class="composer-bar">
      <div class="composer-prompt">
        <span>${escapeHtml(promptText)}</span>
        <span class="composer-cursor"></span>
      </div>
      <div class="composer-send">${escapeHtml(actionText)}</div>
    </div>
  `;
}

function formatSlideCounter(indexOneBased, totalSlides, dateLabel = '') {
  const cur = String(indexOneBased).padStart(2, '0');
  const tot = String(totalSlides).padStart(2, '0');
  return dateLabel ? `${dateLabel} · ${cur}/${tot}` : `${cur}/${tot}`;
}

export function buildSlideMarkupList(edition, brandKit) {
  const totalSlides = 1 + edition.slidesPairs.length + 2;
  const slides = [];

  // 1. Cover Slide
  const stacksTokens = edition.uniqueStacks
    .map((s) => `<span class="tok-s">"${escapeHtml(s)}"</span>`)
    .join(', ');
  const headlineCompactClass = edition.hook.headline.length > 64 ? ' compact' : '';

  slides.push({
    fileName: 'slide-01-cover.png',
    innerHtml: `
      ${renderTopChrome(brandKit, formatSlideCounter(1, totalSlides, edition.dateLabel))}
      <div class="cover-body">
        <div class="status-chip">
          <span class="status-dot"></span>
          <span>scan_br: ${edition.count} vagas 100% remotas</span>
        </div>
        <h1 class="cover-h1${headlineCompactClass}">${escapeHtml(edition.hook.headline)}</h1>
        <p class="cover-lead">${escapeHtml(edition.hook.lead)}</p>

        <div class="code-window">
          <div class="win-bar">
            <div class="win-dots"><span></span><span></span><span></span></div>
            <div class="win-title">radar-br-remoto.ts</div>
          </div>
          <div class="code-lines">
            <div><span class="tok-k">const</span> edicaoHoje = {</div>
            <div>&nbsp;&nbsp;modalidade: <span class="tok-s">"100% Home Office (Brasil)"</span>,</div>
            <div>&nbsp;&nbsp;stacks: [${stacksTokens}],</div>
            <div>&nbsp;&nbsp;senioridade: <span class="tok-f">"${escapeHtml(edition.senioritySummary)}"</span>,</div>
            <div>&nbsp;&nbsp;hibrido: <span class="tok-n">false</span> <span class="tok-c">// verificado</span></div>
            <div>};</div>
          </div>
        </div>
      </div>
      ${renderComposerBar(`Explore as ${edition.count} vagas selecionadas hoje`, 'Deslizar ↑')}
    `,
  });

  // 2..N Interior Job Pair Slides
  edition.slidesPairs.forEach((pair, idx) => {
    const slideNumber = idx + 2;
    const composer = ROTATING_COMPOSER_BARS[idx % ROTATING_COMPOSER_BARS.length];
    const cardsHtml = pair.jobs.map((job) => `
      <div class="dev-job-card">
        <div class="job-row-top">
          <span class="job-company">${escapeHtml(job.handle)}</span>
          <span class="badge-remote">remote: true</span>
        </div>
        <div class="job-title">${escapeHtml(job.title)}</div>
        <div class="job-pills">
          <span class="pill pill-level">${escapeHtml(job.seniority)}</span>
          ${job.stacks.map((st) => `<span class="pill pill-stack">${escapeHtml(st)}</span>`).join('')}
        </div>
      </div>
    `).join('\n');

    slides.push({
      fileName: `slide-${String(slideNumber).padStart(2, '0')}-jobs.png`,
      innerHtml: `
        ${renderTopChrome(brandKit, formatSlideCounter(slideNumber, totalSlides))}
        <div class="jobs-header">
          <div class="jobs-eyebrow">${escapeHtml(pair.eyebrow)}</div>
          <h2 class="jobs-h2">${escapeHtml(pair.heading)}</h2>
        </div>
        <div class="cards-list">
          ${cardsHtml}
        </div>
        ${renderComposerBar(composer.prompt, composer.action)}
      `,
    });
  });

  // Slide N-1: Cheat-Sheet Recap Table (Save & Screenshot Magnet)
  const recapSlideNum = totalSlides - 1;
  const recapRows = edition.jobs.map((job, idx) => `
    <div class="recap-row">
      <span class="recap-idx">${String(idx + 1).padStart(2, '0')}</span>
      <div class="recap-main">
        <span class="recap-comp">${escapeHtml(job.handle)}</span>
        <span class="recap-role">${escapeHtml(job.title)}</span>
      </div>
      <span class="recap-lvl">${escapeHtml(job.seniority)}</span>
    </div>
  `).join('\n');

  slides.push({
    fileName: `slide-${String(recapSlideNum).padStart(2, '0')}-recap.png`,
    innerHtml: `
      ${renderTopChrome(brandKit, formatSlideCounter(recapSlideNum, totalSlides))}
      <div class="jobs-header">
        <div class="jobs-eyebrow">// cheat_sheet · edicao_${escapeHtml(edition.dateLabel)}</div>
        <h2 class="jobs-h2">Resumo Rápido para Salvar</h2>
      </div>
      <div class="recap-board">
        ${recapRows}
      </div>
      ${renderComposerBar('No celular? Salve para aplicar pelo PC', 'Salvar ↑')}
    `,
  });

  // Slide N: Quadruple Viral CTA Close
  const ctaSlideNum = totalSlides;
  slides.push({
    fileName: `slide-${String(ctaSlideNum).padStart(2, '0')}-cta.png`,
    innerHtml: `
      ${renderTopChrome(brandKit, formatSlideCounter(ctaSlideNum, totalSlides))}
      <div class="jobs-header">
        <div class="jobs-eyebrow">// proximo_passo · links_diretos</div>
        <h2 class="jobs-h2">Destrave as Candidaturas</h2>
      </div>
      <div class="cta-stack">
        <div class="cta-hero">
          <span class="cta-hero-tag">dm_direta · link_na_bio</span>
          <h3 class="cta-hero-h3">Quer os ${edition.count} links diretos? Comente <span class="kw">${escapeHtml(brandKit.ctaKeyword)}</span> aqui.</h3>
          <p class="cta-hero-sub">Enviamos a lista clicável com as páginas oficiais de candidatura (ou acesse agora no ${escapeHtml(brandKit.bioLinkLabel)}).</p>
        </div>

        <div class="cta-grid">
          <div class="cta-mini-card">
            <span class="cta-step">01</span>
            <div class="cta-mini-body">
              <div class="cta-mini-title">Qual stack entra no radar de amanhã?</div>
              <div class="cta-mini-desc">Comente sua stack + nível (Java, Python, C#, Node, QA, Dados, Júnior).</div>
            </div>
          </div>
          <div class="cta-mini-card">
            <span class="cta-step">02</span>
            <div class="cta-mini-body">
              <div class="cta-mini-title">Conhece alguém buscando 100% remoto?</div>
              <div class="cta-mini-desc">Envie no aviãozinho (↗) para aquele dev que cansou do presencial.</div>
            </div>
          </div>
          <div class="cta-mini-card">
            <span class="cta-step">03</span>
            <div class="cta-mini-body">
              <div class="cta-mini-title">Siga ${escapeHtml(brandKit.handle)}</div>
              <div class="cta-mini-desc">Curadoria diária de vagas tech 100% home office no Brasil.</div>
            </div>
          </div>
        </div>
      </div>
      ${renderComposerBar(`Digite ${brandKit.ctaKeyword} nos comentários abaixo`, 'Comentar ↑')}
    `,
  });

  return slides;
}

export function wrapSlideDocument(innerHtml, brandKit) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${brandKit.typography.googleFontsUrl}" rel="stylesheet">
<style>${buildThemeCss(brandKit)}</style>
</head>
<body>
  <div class="ig-slide">${innerHtml}</div>
</body>
</html>`;
}

export async function renderCarouselPngs({ edition, brandKit, outputSlidesDir }) {
  fs.mkdirSync(outputSlidesDir, { recursive: true });
  const slides = buildSlideMarkupList(edition, brandKit);
  const { chromium } = requireFromCareerOps('playwright');

  const browser = await chromium.launch({ headless: true });
  const renderedPaths = [];

  try {
    const context = await browser.newContext({
      viewport: {
        width: brandKit.dimensions.width,
        height: brandKit.dimensions.height,
      },
      deviceScaleFactor: 1,
    });

    for (const slide of slides) {
      const page = await context.newPage();
      const fullHtml = wrapSlideDocument(slide.innerHtml, brandKit);
      await page.setContent(fullHtml, { waitUntil: 'networkidle', timeout: 20_000 });
      await page.evaluate(() => document.fonts.ready);
      const outPath = path.join(outputSlidesDir, slide.fileName);
      await page.screenshot({ path: outPath, type: 'png' });
      await page.close();

      const stat = fs.statSync(outPath);
      if (!stat.size) throw new Error(`Rendered empty PNG at ${outPath}`);
      renderedPaths.push(outPath);
    }
  } finally {
    await browser.close();
  }

  return renderedPaths;
}
