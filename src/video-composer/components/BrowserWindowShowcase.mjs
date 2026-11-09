/**
 * BrowserWindowShowcase — Janela macOS com Laurels, Badges de OS, Comando Copy e Equalizer
 */

export function renderBrowserWindowShowcase(scene, sceneIdx) {
  const repo = scene.repo || "diwenne/openreply";
  const name = scene.name || "OpenReply";
  const stars = scene.stars || "18.5k";
  const category = scene.category || "Automação Open-Source";
  const sub = scene.repoSub || "Código aberto oficial para rodar no seu servidor";
  const cmd = scene.cmd || `git clone https://github.com/${repo}`;

  const eqHeights = [14, 22, 34, 42, 26, 18, 36, 46, 30, 16, 24, 40, 48, 32, 18, 34, 44, 38, 22, 38, 44, 28, 20, 34, 46, 30, 16, 30, 40, 24, 18, 28, 36, 20];
  const eqBarsHtml = eqHeights.map((h, i) => `
    <div class="eq-bar" id="eq-bar-${i}" style="height: ${h}px;"></div>
  `).join('');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>★ ${scene.tag || 'GITHUB TRENDING // OPEN-SOURCE'}</div>
        <h1 class="hero-title">${scene.title}</h1>
      </div>

      <div class="browser-window">
        <div class="window-titlebar">
          <div class="window-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="window-address-bar">
            <span style="opacity: 0.6;">🔒</span>
            <span>${repo}</span>
          </div>
        </div>

        <div class="window-body">
          <div class="app-nav-row">
            <div class="app-brand">
              <div class="app-icon">⚡</div>
              <span class="app-name">${name}</span>
            </div>
            <div class="app-actions">
              <div class="app-stars-badge">
                <span style="color: var(--accent-gold);">★</span>
                <span>${stars}</span>
              </div>
              <div class="app-btn-download">
                <span>GitHub ↗</span>
              </div>
            </div>
          </div>

          <!-- Golden Laurels Award Banner -->
          <div class="laurel-award-wrapper">
            <svg class="laurel-branch left" width="60" height="75" viewBox="0 0 64 84" fill="#E5A93C">
              <path d="M52 78 C40 60, 28 36, 32 6" stroke="#E5A93C" stroke-width="4" stroke-linecap="round" fill="none"/>
              <path d="M42 66 C32 61, 22 65, 25 74 C34 77, 43 70, 42 66 Z"/>
              <path d="M37 52 C26 47, 18 52, 21 61 C29 63, 38 56, 37 52 Z"/>
              <path d="M34 38 C23 34, 16 40, 19 48 C26 50, 35 43, 34 38 Z"/>
              <path d="M33 24 C24 20, 18 26, 22 33 C28 35, 34 29, 33 24 Z"/>
              <path d="M35 10 C28 6, 23 11, 26 17 C31 19, 36 14, 35 10 Z"/>
            </svg>

            <div class="laurel-pill-box">
              <div class="laurel-number">1</div>
              <div class="laurel-text-block">
                <div class="laurel-sub">GITHUB TRENDING</div>
                <div class="laurel-title">#1 Repository Of The Day</div>
              </div>
              <svg class="sparkle-star" width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
              </svg>
            </div>

            <svg class="laurel-branch right" width="60" height="75" viewBox="0 0 64 84" fill="#E5A93C">
              <path d="M52 78 C40 60, 28 36, 32 6" stroke="#E5A93C" stroke-width="4" stroke-linecap="round" fill="none"/>
              <path d="M42 66 C32 61, 22 65, 25 74 C34 77, 43 70, 42 66 Z"/>
              <path d="M37 52 C26 47, 18 52, 21 61 C29 63, 38 56, 37 52 Z"/>
              <path d="M34 38 C23 34, 16 40, 19 48 C26 50, 35 43, 34 38 Z"/>
              <path d="M33 24 C24 20, 18 26, 22 33 C28 35, 34 29, 33 24 Z"/>
              <path d="M35 10 C28 6, 23 11, 26 17 C31 19, 36 14, 35 10 Z"/>
            </svg>
          </div>

          <div class="window-hero-text">
            <h2 class="window-title">${category}</h2>
            <p class="window-desc">${sub}</p>
          </div>

          <div class="platform-chips-row">
            ${(scene.chips || ['100% Grátis', 'Sem Mensalidade', 'Uso Ilimitado', 'Super Rápido']).map(c => `<span class="chip">${c}</span>`).join('\n            ')}
          </div>

          <div class="terminal-copy-bar">
            <span class="cmd-text"><span style="color: var(--accent-bright); font-size: 20px;">⚡</span> ${scene.accessLabel || 'Acesso Imediato e Gratuito'}</span>
            <button class="copy-btn">
              <span>Acessar</span>
            </button>
          </div>
        </div>

        <!-- Audio Equalizer Spectrum -->
        <div class="eq-spectrum-strip">
          ${eqBarsHtml}
        </div>
      </div>
    </section>
  `;

  const laurelTime = scene.start + 0.5;
  const sparkleTime = scene.start + 0.8;
  const copyPulseTime = scene.start + 2.0;
  const exitTime = scene.start + scene.duration - 0.35;

  const gsapScript = `
    // Cena ${sceneIdx}: Browser Window Showcase
    tl.fromTo("#scene-${sceneIdx}", { y: 80, scale: 0.9, opacity: 0, filter: "blur(8px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    tl.fromTo(".browser-window", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, ${scene.start + 0.15});
    tl.fromTo(".laurel-award-wrapper", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "elastic.out(1.2, 0.5)" }, ${laurelTime});
    tl.fromTo(".sparkle-star", { scale: 0, rotate: -45 }, { scale: 1.2, rotate: 15, duration: 0.4, ease: "back.out(2)" }, ${sparkleTime});
    tl.fromTo(".copy-btn", { scale: 0.8 }, { scale: 1.05, duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${copyPulseTime});

    // Equalizer sincronizado
    tl.to(".eq-bar", {
      scaleY: 1.5,
      duration: 0.35,
      repeat: 14,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.03, from: "center", repeat: 14, yoyo: true }
    }, ${scene.start});

    tl.to("#scene-${sceneIdx}", { x: -90, scale: 0.93, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  const styles = `
    .browser-window {
      width: 960px;
      background: rgba(10, 15, 13, 0.96);
      border: 1.5px solid rgba(52, 211, 153, 0.35);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(16, 163, 127, 0.2);
      display: flex;
      flex-direction: column;
    }
    .window-titlebar {
      background: rgba(16, 22, 19, 0.95);
      padding: 14px 22px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .window-dots {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
    }
    .dot-red { background: #EF4444; }
    .dot-yellow { background: #F59E0B; }
    .dot-green { background: #10B981; }
    .window-address-bar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 24px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 20px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .window-body {
      padding: 26px 32px 18px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
    }
    .app-nav-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .app-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .app-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #10A37F 0%, #34D399 100%);
      color: #060807;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 900;
    }
    .app-name {
      font-size: 32px;
      font-weight: 800;
      color: #FFFFFF;
    }
    .app-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .app-stars-badge {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 18px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .app-btn-download {
      background: #FFFFFF;
      color: #060807;
      font-weight: 800;
      font-size: 20px;
      padding: 8px 20px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .laurel-award-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 6px 0;
      position: relative;
    }
    .laurel-branch.right {
      transform: scaleX(-1);
    }
    .laurel-pill-box {
      background: #F8F6E9;
      border: 2px solid #E5A93C;
      border-radius: 14px;
      padding: 8px 22px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 8px 25px rgba(229, 169, 60, 0.25);
      position: relative;
    }
    .laurel-number {
      font-size: 44px;
      font-weight: 900;
      color: #1E293B;
      line-height: 1;
    }
    .laurel-text-block {
      text-align: left;
    }
    .laurel-sub {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 800;
      color: #475569;
      letter-spacing: 0.5px;
    }
    .laurel-title {
      font-size: 20px;
      font-weight: 800;
      color: #0F172A;
    }
    .sparkle-star {
      position: absolute;
      top: -12px;
      right: -12px;
      filter: drop-shadow(0 0 8px #FCD34D);
    }
    .window-hero-text .window-title {
      font-size: 36px;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: -0.5px;
    }
    .window-hero-text .window-desc {
      font-size: 22px;
      color: var(--text-secondary);
      line-height: 1.4;
      margin-top: 4px;
      max-width: 820px;
    }
    .platform-chips-row {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .platform-chips-row .chip {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 6px 16px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 19px;
      font-weight: 600;
      color: #D1D5DB;
    }
    .terminal-copy-bar {
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 12px;
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 20px;
    }
    .cmd-text {
      color: #D1D5DB;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 720px;
    }
    .cmd-prompt {
      color: var(--accent-bright);
      font-weight: 800;
      margin-right: 8px;
    }
    .copy-btn {
      background: #FFFFFF;
      color: #060807;
      border: none;
      border-radius: 8px;
      padding: 6px 14px;
      font-family: var(--font-sans);
      font-size: 17px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .eq-spectrum-strip {
      width: 100%;
      height: 44px;
      background: rgba(8, 12, 10, 0.95);
      border-top: 1px solid rgba(52, 211, 153, 0.2);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 8px;
      padding: 0 20px 8px 20px;
    }
    .eq-bar {
      width: 14px;
      border-radius: 4px;
      background: linear-gradient(to top, var(--accent-emerald), var(--accent-bright));
      transform-origin: bottom;
    }
  `;

  return {
    html,
    styles,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: laurelTime + 0.05, volume: 0.32 },
      { type: 'click', time: copyPulseTime + 0.05, volume: 0.30 },
      { type: 'whoosh', time: exitTime }
    ]
  };
}
