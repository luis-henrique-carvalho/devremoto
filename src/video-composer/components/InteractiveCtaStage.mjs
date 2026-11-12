/**
 * InteractiveCtaStage — Fechamento de Alta Conversão (Kit de 3 Entregáveis + Comentário + Follow Card)
 * Inspirado na engenharia de conversão de @fabianocarvalhojr (160% comment/like) e @gab.gouvea.
 */

export function renderInteractiveCtaStage(scene, sceneIdx) {
  const keyword = scene.ctaKeyword || "IA";
  const deliverables = scene.deliverables || [
    "1️⃣ Link Oficial + Acesso 100% Gratuito",
    "2️⃣ Passo a Passo de Instalação em 1 Minuto",
    "3️⃣ Guia Prático + Prompts Prontos para Usar"
  ];

  const delivHtml = deliverables.slice(0, 3).map((d, i) => `
    <div id="deliv-item-${sceneIdx}-${i + 1}" style="background: rgba(16, 163, 127, 0.14); border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 14px; padding: 12px 20px; font-size: 24px; font-weight: 700; color: #F9FAFB; display: flex; align-items: center; justify-content: space-between;" data-layout-ignore>
      <span>${d}</span>
      <span style="color: #34D399; font-family: var(--font-mono); font-size: 20px;">INCLUSO ✓</span>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group" style="align-items: center; gap: 6px;">
        <div class="cta-sticker-top" style="font-size: 38px; padding: 12px 38px;">💬 COMENTE AQUI EMBAIXO</div>
        <div class="cta-sticker-bottom" style="font-size: 52px; padding: 14px 52px;">▶ "${keyword}"</div>
      </div>

      <!-- Instagram Comment Simulator Bar -->
      <div class="ig-comment-simulator" id="ig-comment-bar-${sceneIdx}">
        <div class="ig-user-avatar">DR</div>
        <div class="ig-input-field">
          <span class="ig-typed-text" id="typewriter-text-${sceneIdx}"></span>
          <span class="ig-cursor">|</span>
        </div>
        <button class="ig-send-btn" id="ig-send-btn-${sceneIdx}">Publicar ↑</button>
      </div>

      <!-- Pacote Irresistível no Direct (Estilo @fabianocarvalhojr) -->
      <div class="emerald-card" id="cta-pack-card-${sceneIdx}" style="padding: 24px 28px; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;" data-layout-ignore>
          <span style="font-family: var(--font-mono); font-size: 22px; font-weight: 800; color: #34D399;">📩 O QUE VOCÊ RECEBE NO DIRECT NA HORA:</span>
          <span class="badge-status badge-auto" style="font-size: 19px;">ENVIO AUTOMÁTICO</span>
        </div>
        ${delivHtml}
      </div>

      <!-- Card Final de Conversão de Seguidor (Estilo @gab.gouvea) -->
      <div id="follow-card-${sceneIdx}" style="width: 960px; background: linear-gradient(90deg, rgba(16, 163, 127, 0.28) 0%, rgba(12, 18, 15, 0.96) 100%); border: 2px solid #34D399; border-radius: 22px; padding: 20px 30px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 16px 40px rgba(0,0,0,0.75);" data-layout-ignore>
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #10A37F, #34D399); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 28px; font-weight: 900; color: #060807; box-shadow: 0 0 20px rgba(52, 211, 153, 0.6);">DR</div>
          <div style="text-align: left;">
            <div style="font-size: 28px; font-weight: 900; color: #FFFFFF;">@devremoto.br</div>
            <div style="font-size: 21px; color: #D1FAE5; font-weight: 600;">3 vídeos por dia com o melhor de IA, Tech & Trabalho Remoto</div>
          </div>
        </div>
        <div id="follow-btn-${sceneIdx}" style="background: #34D399; color: #060807; font-family: var(--font-mono); font-size: 24px; font-weight: 900; padding: 12px 28px; border-radius: 999px; box-shadow: 0 0 20px rgba(52, 211, 153, 0.6);">
          + SEGUIR
        </div>
      </div>
    </section>
  `;

  const stickerTopTime = Number((scene.start + 0.10).toFixed(2));
  const stickerBotTime = Number((scene.start + 0.25).toFixed(2));
  const commentBarTime = Number((scene.start + 0.45).toFixed(2));
  const typingTime = Number((scene.start + 0.75).toFixed(2));
  const clickSendTime = Number((scene.start + 1.15).toFixed(2));
  const cardDropTime = Number((scene.start + 1.35).toFixed(2));
  const followCardTime = Number((scene.start + 2.10).toFixed(2));

  const gsapScript = `
    // Cena ${sceneIdx}: Interactive CTA + Deliverable Kit + Follow Loop
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-top", { y: -50, scale: 0.7, rotate: -12, opacity: 0 }, { y: 0, scale: 1, rotate: -2, opacity: 1, duration: 0.32, ease: "back.out(2)" }, ${stickerTopTime});
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-bottom", { y: -40, scale: 0.6, rotate: 12, opacity: 0 }, { y: 0, scale: 1, rotate: 2, opacity: 1, duration: 0.38, ease: "elastic.out(1.2, 0.4)" }, ${stickerBotTime});
    tl.fromTo("#ig-comment-bar-${sceneIdx}", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, ease: "back.out(1.5)" }, ${commentBarTime});

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

    tl.fromTo("#cta-pack-card-${sceneIdx}", { y: 40, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }, ${cardDropTime});
    tl.fromTo("#deliv-item-${sceneIdx}-1", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, ${(cardDropTime + 0.15).toFixed(2)});
    tl.fromTo("#deliv-item-${sceneIdx}-2", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, ${(cardDropTime + 0.35).toFixed(2)});
    tl.fromTo("#deliv-item-${sceneIdx}-3", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, ${(cardDropTime + 0.55).toFixed(2)});

    // Card de Follow entrando com destaque
    tl.fromTo("#follow-card-${sceneIdx}", { y: 50, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, ${followCardTime});
    tl.call(() => {
      const fbtn = document.getElementById('follow-btn-${sceneIdx}');
      if (fbtn) fbtn.textContent = "SEGUINDO ✓";
    }, null, ${(followCardTime + 1.1).toFixed(2)});
    tl.fromTo("#scene-${sceneIdx} .cta-sticker-bottom", { scale: 1 }, { scale: 1.06, duration: 0.38, repeat: 14, yoyo: true, ease: "sine.inOut" }, ${(cardDropTime + 0.4).toFixed(2)});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: Number((stickerBotTime + 0.04).toFixed(2)), volume: 0.35 },
      { type: 'click', time: Number((clickSendTime + 0.04).toFixed(2)), volume: 0.38 },
      { type: 'pop', time: Number((cardDropTime + 0.05).toFixed(2)), volume: 0.30 },
      { type: 'impact', time: Number((followCardTime + 0.05).toFixed(2)), volume: 0.34 }
    ]
  };
}
