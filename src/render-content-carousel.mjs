import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const careerOpsPkgPath = path.resolve(
  process.env.CAREER_OPS_ROOT || '/home/luis/vagas/career-ops',
  'package.json',
);
const requireFromCareerOps = createRequire(careerOpsPkgPath);

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildContentThemeCss(brandKit) {
  const t = brandKit.tokens;
  return `
    :root {
      --bg-canvas: #060807;
      --bg-card: rgba(18, 24, 22, 0.92);
      --bg-card-inner: #0B0F0E;
      --bg-composer: #121815;
      --border-subtle: rgba(52, 211, 153, 0.22);
      --border-glow: rgba(16, 163, 127, 0.45);
      --text-primary: #FFFFFF;
      --text-secondary: #9CA3AF;
      --text-muted: #6B7280;
      --accent-main: #10A37F;
      --accent-bright: #34D399;
      --accent-gradient: linear-gradient(135deg, #10A37F 0%, #34D399 100%);
      --aura-1: radial-gradient(circle at 85% 15%, rgba(16, 163, 127, 0.28) 0%, transparent 60%);
      --aura-2: radial-gradient(circle at 15% 85%, rgba(52, 211, 153, 0.15) 0%, transparent 55%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: '${brandKit.typography.display}', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
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
        radial-gradient(rgba(52, 211, 153, 0.08) 1.5px, transparent 1.5px);
      background-size: 100% 100%, 100% 100%, 32px 32px;
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
      backdrop-filter: blur(14px);
    }
    .openai-orb {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      background: var(--accent-gradient);
      box-shadow: 0 0 18px var(--border-glow);
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
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 12px 22px;
      border-radius: 999px;
    }

    /* Kicker & Headers */
    .kicker {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 26px;
      color: var(--accent-bright);
      text-transform: lowercase;
      letter-spacing: 0.04em;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .kicker-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-bright);
      box-shadow: 0 0 10px var(--accent-bright);
    }

    .slide-headline {
      font-size: 58px;
      font-weight: 900;
      line-height: 1.14;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      margin-bottom: 20px;
    }
    .slide-headline .highlight {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .slide-desc {
      font-size: 28px;
      line-height: 1.45;
      color: var(--text-secondary);
      margin-bottom: 28px;
    }

    /* Terminal Mockup */
    .terminal-window {
      background: rgba(11, 15, 14, 0.95);
      border: 1.5px solid var(--border-subtle);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
    }
    .terminal-header {
      background: rgba(18, 24, 22, 0.95);
      padding: 16px 22px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }
    .terminal-title {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 22px;
      color: var(--text-secondary);
      margin-left: 8px;
    }
    .terminal-body {
      padding: 26px 30px;
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 26px;
      line-height: 1.6;
      color: #E5E7EB;
    }
    .terminal-body .cmd {
      color: var(--accent-bright);
      font-weight: 700;
    }
    .terminal-body .comment {
      color: var(--text-muted);
    }

    /* Item Card Layout */
    .item-card {
      background: var(--bg-card);
      border: 1.5px solid var(--border-subtle);
      border-radius: 24px;
      padding: 36px 40px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-name {
      font-size: 44px;
      font-weight: 900;
      color: #FFFFFF;
      font-family: '${brandKit.typography.mono}', monospace;
    }
    .item-badge {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 22px;
      font-weight: 700;
      color: var(--accent-bright);
      background: rgba(16, 163, 127, 0.16);
      border: 1px solid rgba(52, 211, 153, 0.35);
      padding: 8px 18px;
      border-radius: 999px;
    }
    .item-desc {
      font-size: 28px;
      line-height: 1.5;
      color: var(--text-secondary);
    }

    /* Recap Table */
    .recap-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 20px 0;
    }
    .recap-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 20, 18, 0.9);
      border: 1.5px solid var(--border-subtle);
      padding: 20px 28px;
      border-radius: 16px;
    }
    .recap-tool {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 30px;
      font-weight: 800;
      color: var(--accent-bright);
    }
    .recap-cmd {
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 24px;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.06);
      padding: 8px 16px;
      border-radius: 10px;
    }

    /* Bottom Composer Bar */
    .composer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-composer);
      border: 1px solid var(--border-subtle);
      padding: 16px 26px;
      border-radius: 999px;
      z-index: 2;
    }
    .composer-prompt {
      font-size: 24px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .composer-cursor {
      display: inline-block;
      width: 2px;
      height: 24px;
      background: var(--accent-bright);
    }
    .composer-action {
      background: var(--text-primary);
      color: #060807;
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 22px;
      font-weight: 800;
      padding: 10px 22px;
      border-radius: 999px;
    }

    /* CTA Card (Slide 7) */
    .cta-container {
      background: var(--bg-card);
      border: 1.5px solid var(--border-subtle);
      border-radius: 24px;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 26px;
      text-align: center;
    }
    .cta-dm-bubble {
      background: rgba(10, 14, 12, 0.95);
      border: 1.5px solid rgba(52, 211, 153, 0.4);
      border-radius: 20px;
      padding: 30px;
      text-align: left;
      font-size: 28px;
      line-height: 1.5;
      color: #E5E7EB;
    }
    .cta-btn {
      background: var(--accent-gradient);
      color: #060807;
      font-family: '${brandKit.typography.mono}', monospace;
      font-size: 38px;
      font-weight: 900;
      padding: 24px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      box-shadow: 0 16px 40px rgba(52, 211, 153, 0.45);
    }
  `;
}

function renderTopChrome(brandKit, slideNum, totalSlides = 7, dateStr = '') {
  const padNum = String(slideNum).padStart(2, '0');
  const padTotal = String(totalSlides).padStart(2, '0');
  const counterText = dateStr ? `${dateStr} · ${padNum}/${padTotal}` : `${padNum}/${padTotal}`;

  return `
    <div class="top-chrome">
      <div class="brand-pill">
        <div class="openai-orb"></div>
        <span class="brand-text">${escapeHtml(brandKit.brandName)}</span>
      </div>
      <div class="meta-counter">${escapeHtml(counterText)}</div>
    </div>
  `;
}

function renderComposerBar(prompt, action) {
  return `
    <div class="composer-bar">
      <div class="composer-prompt">
        <span>${escapeHtml(prompt)}</span>
        <span class="composer-cursor"></span>
      </div>
      <div class="composer-action">${escapeHtml(action)}</div>
    </div>
  `;
}

export function buildContentSlideList(content, brandKit, dateStr = '') {
  const slides = [];
  const totalSlides = 7;
  const items = content.items || [];

  // ==========================================
  // SLIDE 1: CAPA
  // ==========================================
  slides.push({
    fileName: 'slide-01-cover.png',
    innerHtml: `
      ${renderTopChrome(brandKit, 1, totalSlides, dateStr)}
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 30px 0;">
        <div class="kicker">
          <span class="kicker-dot"></span>
          <span>${escapeHtml(content.kicker || 'descoberta // open source')}</span>
        </div>
        <h1 class="slide-headline">${escapeHtml(content.headline)}</h1>
        <p class="slide-desc">${escapeHtml(content.stake)}</p>
        <div class="terminal-window">
          <div class="terminal-header">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="terminal-title">quick-tools.sh</span>
          </div>
          <div class="terminal-body">
            <span class="comment"># 4 ferramentas modernas prontas para instalar:</span><br/>
            ${items.slice(0, 3).map((it) => `<span class="cmd">$</span> ${escapeHtml(it.install)}<br/>`).join('')}
          </div>
        </div>
      </div>
      ${renderComposerBar('Explore as ferramentas selecionadas hoje', 'Deslizar →')}
    `,
  });

  // ==========================================
  // SLIDES 2 A 5: ITENS INDIVIDUAIS
  // ==========================================
  items.slice(0, 4).forEach((item, idx) => {
    const slideIndex = idx + 2;
    slides.push({
      fileName: `slide-0${slideIndex}-item.png`,
      innerHtml: `
        ${renderTopChrome(brandKit, slideIndex, totalSlides, dateStr)}
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 30px 0;">
          <div class="kicker">
            <span class="kicker-dot"></span>
            <span>ferramenta #${idx + 1} de ${items.length}</span>
          </div>
          <div class="item-card">
            <div class="item-header">
              <span class="item-name">${escapeHtml(item.name)}</span>
              <span class="item-badge">${escapeHtml(item.tag)}</span>
            </div>
            <p class="item-desc">${escapeHtml(item.desc)}</p>
            <div class="terminal-window">
              <div class="terminal-header">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
                <span class="terminal-title">instalação & uso</span>
              </div>
              <div class="terminal-body">
                <span class="comment"># Instalação:</span><br/>
                <span class="cmd">$</span> ${escapeHtml(item.install)}<br/><br/>
                <span class="comment"># Exemplo prático:</span><br/>
                <span style="color: #34D399;">${escapeHtml(item.example)}</span>
              </div>
            </div>
          </div>
        </div>
        ${renderComposerBar('Conhece um dev que precisa disso? Mande a ele', 'Enviar ↗')}
      `,
    });
  });

  // ==========================================
  // SLIDE 6: RECAP / CHEAT-SHEET (SLIDE DO PRINT)
  // ==========================================
  slides.push({
    fileName: 'slide-06-recap.png',
    innerHtml: `
      ${renderTopChrome(brandKit, 6, totalSlides, dateStr)}
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 30px 0;">
        <div class="kicker">
          <span class="kicker-dot"></span>
          <span>resumo // cheat-sheet</span>
        </div>
        <h1 class="slide-headline" style="font-size: 48px; margin-bottom: 12px;">Tabela Rápida para Salvar</h1>
        <p class="slide-desc" style="font-size: 24px; margin-bottom: 20px;">
          Tire um print deste slide para consultar os comandos quando precisar configurar sua máquina.
        </p>
        <div class="recap-grid">
          ${items.slice(0, 4).map((it) => `
            <div class="recap-row">
              <span class="recap-tool">${escapeHtml(it.name)}</span>
              <span class="recap-cmd">${escapeHtml(it.install)}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ${renderComposerBar('Salve para consultar quando for configurar seu setup', 'Salvar 📌')}
    `,
  });

  // ==========================================
  // SLIDE 7: CTA COM PALAVRA-CHAVE
  // ==========================================
  const kw = content.keyword || 'TERMINAL';
  slides.push({
    fileName: 'slide-07-cta.png',
    innerHtml: `
      ${renderTopChrome(brandKit, 7, totalSlides, dateStr)}
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 30px 0;">
        <div class="kicker">
          <span class="kicker-dot"></span>
          <span>proximo_passo // atalhos</span>
        </div>
        <div class="cta-container">
          <h1 class="slide-headline" style="font-size: 52px; margin-bottom: 14px;">
            Quer os links e guias completos?
          </h1>
          <div class="cta-dm-bubble">
            Comente <strong style="color: #34D399;">${escapeHtml(kw)}</strong> abaixo que te mando a lista com todos os repositórios oficiais e atalhos de configuração direto no seu direct!
          </div>
          <div class="cta-btn">
            <span>Comente "${escapeHtml(kw)}"</span>
            <span>💬</span>
          </div>
          <p style="font-size: 22px; color: var(--text-secondary);">
            Envio automático direto no seu inbox pelo @devremoto.br
          </p>
        </div>
      </div>
      ${renderComposerBar(`Digite ${kw} nos comentários abaixo`, 'Comentar ↑')}
    `,
  });

  return slides;
}

export function wrapContentSlideHtml(innerHtml, brandKit) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${brandKit.typography.googleFontsUrl}" rel="stylesheet">
<style>${buildContentThemeCss(brandKit)}</style>
</head>
<body>
  <div class="ig-slide">${innerHtml}</div>
</body>
</html>`;
}

export async function renderContentCarouselPngs({ content, brandKit, outputSlidesDir, dateStr = '' }) {
  fs.mkdirSync(outputSlidesDir, { recursive: true });
  const slides = buildContentSlideList(content, brandKit, dateStr);
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
      const fullHtml = wrapContentSlideHtml(slide.innerHtml, brandKit);
      await page.setContent(fullHtml, { waitUntil: 'networkidle', timeout: 25_000 });
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
