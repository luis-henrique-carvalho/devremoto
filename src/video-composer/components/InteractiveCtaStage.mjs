/**
 * InteractiveCtaStage — Fechamento com Simulador de Digitação de Comentário e Toast de Direct
 */

export function renderInteractiveCtaStage(scene, sceneIdx) {
  const keyword = scene.ctaKeyword || "REPLY";
  const repo = scene.repo || "diwenne/openreply";
  const directPreview = scene.directPreview || "Ferramenta Gratuita + Passo a Passo";

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group" style="align-items: center;">
        <div class="cta-sticker-top">💬 COMENTA</div>
        <div class="cta-sticker-bottom">▶ ${keyword}</div>
      </div>

      <!-- Instagram Comment Simulator Bar -->
      <div class="ig-comment-simulator" id="ig-comment-bar-${sceneIdx}">
        <div class="ig-user-avatar">DR</div>
        <div class="ig-input-field">
          <span class="ig-typed-text" id="typewriter-text-${sceneIdx}"></span>
          <span class="ig-cursor">|</span>
        </div>
        <button class="ig-send-btn" id="ig-send-btn-${sceneIdx}">Publicar</button>
      </div>

      <div class="emerald-card" style="margin-top: 10px;">
        <div class="job-card" style="margin: 0 0 16px 0; background: #000000; border-color: rgba(52, 211, 153, 0.5);" data-layout-ignore>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--accent-emerald); display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: var(--font-mono); font-size: 26px; color: #060807;" data-layout-ignore>DR</div>
            <span style="font-size: 30px; font-weight: 700; color: #FFFFFF;">${keyword} ✓</span>
          </div>
          <span style="font-size: 30px; color: var(--accent-bright);">✈</span>
        </div>

        <div class="job-card" style="margin: 0; background: rgba(52, 211, 153, 0.08); border-color: var(--accent-bright);" data-layout-ignore>
          <div>
            <div style="font-size: 26px; color: var(--accent-bright); font-family: var(--font-mono);">Nova mensagem • direct</div>
            <div style="font-size: 28px; font-weight: 700; margin-top: 6px;">${directPreview}</div>
          </div>
          <span style="font-size: 32px;">⭐</span>
        </div>

        <div style="text-align: center; margin-top: 18px; font-family: var(--font-mono); font-size: 22px; color: var(--text-secondary);" data-layout-ignore>
          • @devremoto
        </div>
      </div>
    </section>
  `;

  const stickerTopTime = scene.start + 0.35;
  const stickerBotTime = scene.start + 0.50;
  const commentBarTime = scene.start + 0.70;
  const typingTime = scene.start + 1.10;
  const clickSendTime = scene.start + 1.70;
  const cardDropTime = scene.start + 2.00;

  const gsapScript = `
    // Cena ${sceneIdx}: Interactive CTA
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-top", { y: -80, scale: 0.5, rotate: -20, opacity: 0 }, { y: 0, scale: 1, rotate: -3, opacity: 1, duration: 0.4, ease: "back.out(2)" }, ${stickerTopTime});
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-bottom", { y: -60, scale: 0.5, rotate: 20, opacity: 0 }, { y: 0, scale: 1, rotate: 2, opacity: 1, duration: 0.45, ease: "elastic.out(1.2, 0.4)" }, ${stickerBotTime});
    tl.fromTo("#ig-comment-bar-${sceneIdx}", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, ${commentBarTime});

    // Simulador de Digitação do Comentário
    tl.call(() => {
      const textEl = document.getElementById('typewriter-text-${sceneIdx}');
      if (textEl) textEl.textContent = "${keyword}";
    }, null, ${typingTime});

    // Clique no botão Publicar
    tl.call(() => {
      const btn = document.getElementById('ig-send-btn-${sceneIdx}');
      if (btn) btn.classList.add('active');
    }, null, ${clickSendTime});

    tl.fromTo("#scene-${sceneIdx} .emerald-card", { y: 50, scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, ${cardDropTime});
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-bottom", { scale: 1 }, { scale: 1.05, duration: 0.4, repeat: 12, yoyo: true, ease: "sine.inOut" }, ${cardDropTime + 0.5});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: stickerBotTime + 0.05, volume: 0.35 },
      { type: 'click', time: clickSendTime + 0.05, volume: 0.38 }, // Click exatamente no envio
      { type: 'pop', time: cardDropTime + 0.05, volume: 0.30 }
    ]
  };
}
