#!/usr/bin/env node

/**
 * DevRemoto: Capturador de Imagens Reais do README dos Projetos (Playwright)
 *
 * Isola o `article.markdown-body` (README oficial do projeto no GitHub em Dark Mode),
 * removendo a barra lateral direita (Contributors/Languages), cabeçalhos e badges quebrados,
 * para capturar imagens 100% legíveis, centralizadas e SEM CORTES:
 *
 * - `real-repo.png`    (920x440 — Topo do README: Título, Descrição e Imagem Hero do Projeto)
 * - `real-demo.png`    (920x400 — Imagens/Screenshots reais de dentro do README do projeto)
 * - `real-desktop.png` (620x460 — Enquadramento 4:3 sem cortes para o mockup Desktop)
 * - `real-mobile.png`  (320x480 — Enquadramento vertical do README para o mockup Celular)
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const careerOpsPkgPath = path.resolve(
  process.env.CAREER_OPS_ROOT || '/home/luis/vagas/career-ops',
  'package.json',
);
const requireFromCareerOps = createRequire(careerOpsPkgPath);
const { chromium } = requireFromCareerOps('playwright');

const CLEAN_README_CSS = `
  header, .AppHeader, .gh-header,
  .Layout-sidebar, [data-testid="repos-file-tree-container"],
  .file-navigation, .Box-header, .js-cookie-consent-banner,
  #cookie-consent-banner, .signup-prompt-bg, .flash-full,
  div[data-target="react-partial.embeddedData"],
  .react-directory-filename-column,
  .BorderGrid, .pagehead, .repohead, nav {
    display: none !important;
  }
  body, html, main, .application-main, .Layout, .Layout-main {
    background: #0d1117 !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  article.markdown-body {
    background: #0d1117 !important;
    color: #e6edf3 !important;
    padding: 24px 36px !important;
    margin: 0 auto !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    font-size: 18px !important;
    line-height: 1.5 !important;
    border: none !important;
  }
  article.markdown-body img {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 10px !important;
  }
`;

function buildReadmeImagesShowcaseHtml(imageUrls, width, height) {
  const imgs = imageUrls.slice(0, 4);
  const count = imgs.length;

  let gridStyle = 'grid-template-columns: 1fr; grid-template-rows: 1fr;';
  if (count === 2) {
    gridStyle = width >= height
      ? 'grid-template-columns: repeat(2, 1fr); grid-template-rows: 1fr;'
      : 'grid-template-columns: 1fr; grid-template-rows: repeat(2, 1fr);';
  } else if (count === 3) {
    gridStyle = 'grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr;';
  } else if (count >= 4) {
    gridStyle = 'grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr);';
  }

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: ${width}px;
      height: ${height}px;
      background: #0d1117;
      padding: ${count === 1 ? '10px' : '14px'};
      display: grid;
      ${gridStyle}
      gap: 12px;
      overflow: hidden;
      align-items: center;
      justify-items: center;
    }
    .img-cell {
      width: 100%;
      height: 100%;
      background: #0d1117;
      border: ${count === 1 ? 'none' : '1px solid rgba(255,255,255,0.12)'};
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .img-cell img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  ${imgs.map((src) => `<div class="img-cell"><img src="${src}" /></div>`).join('\n')}
</body>
</html>`;
}

export async function generateProjectVisualAssets(item, assetsDir) {
  fs.mkdirSync(assetsDir, { recursive: true });

  const repoPath = path.join(assetsDir, 'real-repo.png');
  const demoPath = path.join(assetsDir, 'real-demo.png');
  const desktopPath = path.join(assetsDir, 'real-desktop.png');
  const mobilePath = path.join(assetsDir, 'real-mobile.png');

  const githubUrl = item.githubUrl || `https://github.com/${item.repo}`;

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 920, height: 600 },
      colorScheme: 'dark',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    const resp = await page.goto(githubUrl, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => null);
    if (resp && resp.status() === 200) {
      const extractedImages = await page.evaluate(() => {
        const article = document.querySelector('article.markdown-body');
        if (!article) return [];

        const allImgs = Array.from(article.querySelectorAll('img'));
        const seen = new Set();
        const goodUrls = [];

        for (const img of allImgs) {
          const src = img.currentSrc || img.src || '';
          const canonical = (img.getAttribute('data-canonical-src') || '').toLowerCase();
          const alt = (img.alt || '').toLowerCase();
          const lower = `${src.toLowerCase()} ${canonical} ${alt}`;

          const rect = img.getBoundingClientRect();
          const w = Math.max(img.naturalWidth || 0, rect.width || 0);
          const h = Math.max(img.naturalHeight || 0, rect.height || 0);

          const isBadgeOrAvatar =
            h < 110 ||
            w < 220 ||
            lower.includes('shields.io') ||
            lower.includes('badgen') ||
            lower.includes('badge') ||
            lower.includes('paypal') ||
            lower.includes('donate') ||
            lower.includes('bundlephobia') ||
            lower.includes('travis') ||
            lower.includes('star-history') ||
            lower.includes('contributors') ||
            lower.includes('avatargroup') ||
            lower.includes('logo');

          // Esconde pequenos badges de dentro do README (ex: bundlephobia rate limited / donate)
          if (h > 0 && h < 75) {
            const parentLink = img.closest('a');
            if (parentLink && parentLink.children.length === 1) {
              parentLink.style.display = 'none';
            } else {
              img.style.display = 'none';
            }
          }

          if (!isBadgeOrAvatar && w >= 240 && h >= 130 && src.startsWith('http')) {
            // Evita duplicar imagens claro/escuro dentro da mesma tag <picture> ou links repetidos
            const dedupeKey = canonical || src.split('?')[0];
            if (!seen.has(dedupeKey)) {
              seen.add(dedupeKey);
              goodUrls.push(src);
            }
          }
        }

        // Isola o article.markdown-body direto no body para não existir sidebar nem corte
        const clone = article.cloneNode(true);
        document.body.innerHTML = '';
        document.body.appendChild(clone);
        window.scrollTo(0, 0);
        return goodUrls;
      });

      await page.addStyleTag({ content: CLEAN_README_CSS }).catch(() => {});
      await page.waitForTimeout(450);

      // 1. `real-repo.png` (920x440): Topo do README isolado, centralizado e sem cortes
      await page.setViewportSize({ width: 920, height: 440 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);
      await page.screenshot({ path: repoPath });

      // 2. `real-demo.png` e `real-desktop.png`: Imagens reais extraídas do README (ou segunda dobra do README sem cortes)
      if (extractedImages.length > 0) {
        const showcasePage = await context.newPage();

        // real-demo.png (920x400)
        await showcasePage.setViewportSize({ width: 920, height: 400 });
        await showcasePage.setContent(
          buildReadmeImagesShowcaseHtml(extractedImages, 920, 400),
          { waitUntil: 'networkidle', timeout: 12000 }
        ).catch(() => {});
        await showcasePage.waitForTimeout(350);
        await showcasePage.screenshot({ path: demoPath });

        // real-desktop.png (620x460)
        await showcasePage.setViewportSize({ width: 620, height: 460 });
        await showcasePage.setContent(
          buildReadmeImagesShowcaseHtml(extractedImages, 620, 460),
          { waitUntil: 'networkidle', timeout: 12000 }
        ).catch(() => {});
        await showcasePage.waitForTimeout(300);
        await showcasePage.screenshot({ path: desktopPath });

        await showcasePage.close();
      } else {
        await page.setViewportSize({ width: 920, height: 400 });
        await page.evaluate(() => window.scrollTo(0, 340));
        await page.waitForTimeout(250);
        await page.screenshot({ path: demoPath });

        await page.setViewportSize({ width: 620, height: 460 });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(250);
        await page.screenshot({ path: desktopPath });
      }

      // 3. `real-mobile.png` (360x560): README real renderizado em tela Mobile sem cortes
      await page.setViewportSize({ width: 380, height: 580 });
      await page.evaluate(() => window.scrollTo(0, 180));
      await page.waitForTimeout(250);
      await page.screenshot({ path: mobilePath });
    }

    console.log(`[VisualAssets] Imagens limpas do README salvas sem cortes em ${assetsDir}`);
  } finally {
    await browser.close();
  }
}
