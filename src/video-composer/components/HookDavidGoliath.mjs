/**
 * HookDavidGoliath — Cena 1: Hook de Choque Visual + Preview Real da Notícia/Projeto
 *
 * IMPORTANTE: Frame 0.0s já nasce 100% visível com a imagem visual do projeto (`assets/screen-hook.png`)
 * + comparativo David vs Golias para prender a atenção imediatamente no feed.
 */

export function renderHookDavidGoliath(scene, sceneIdx) {
  const compName = scene.competitor?.name || "Assinatura Tradicional";
  const compPrice = scene.competitor?.price || "R$ 200/mês";
  const compLimit = scene.competitor?.limit || "Com limites e mensalidade";
  const stampText = scene.stamp || "100% GRATUITO ⚡";

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group" id="hook-header-${sceneIdx}">
        <div class="alert-pill" data-layout-ignore>🔥 ${scene.alert || 'DESCOBERTA TECH // 100% GRÁTIS'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary); max-width: 900px; line-height: 1.3;">${scene.subtitle}</p>
      </div>

      <!-- Preview Visual da Notícia / Projeto em Ação (screen-hook.png) -->
      <div id="hook-visual-frame-${sceneIdx}" style="width: 960px; height: 360px; border-radius: 22px; overflow: hidden; border: 2px solid rgba(52, 211, 153, 0.45); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(16, 163, 127, 0.25); position: relative; background: #070B09;">
        <img id="hook-visual-img-${sceneIdx}" src="assets/screen-hook.png" alt="Preview do Projeto" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
      </div>

      <div class="emerald-card" id="hook-card-${sceneIdx}" style="position: relative; padding: 24px 32px; gap: 14px;">
        <div id="price-row-${sceneIdx}-1" class="table-row" style="border-color: rgba(239, 68, 68, 0.45); background: rgba(239, 68, 68, 0.10); padding: 16px 24px;">
          <span class="row-title" style="color: #FCA5A5; font-size: 25px;">❌ ${compName}</span>
          <span class="badge badge-danger" style="font-size: 23px;">${compPrice}</span>
        </div>
        <div id="price-row-${sceneIdx}-2" class="table-row" style="border-color: rgba(52, 211, 153, 0.65); background: rgba(16, 163, 127, 0.22); box-shadow: 0 0 30px rgba(16, 163, 127, 0.25); padding: 16px 24px;">
          <span class="row-title" style="color: #FFFFFF; font-size: 26px;">✅ Alternativa Aberta (${compLimit})</span>
          <span class="badge" style="background: var(--accent-bright); color: #060807; font-weight: 900; font-size: 23px;">R$ 0,00 (Grátis)</span>
        </div>

        <div id="stamp-${sceneIdx}" class="stamp-discard" data-layout-ignore style="border-color: var(--accent-bright); color: #060807; background: var(--accent-bright); box-shadow: 0 12px 35px rgba(52, 211, 153, 0.5); font-size: 26px; padding: 10px 28px; bottom: -22px;">${stampText}</div>
      </div>
    </section>
  `;

  const row2Time = Number((scene.start + 0.45).toFixed(2));
  const stampTime = Number((scene.start + 0.95).toFixed(2));
  const exitTime = Number((scene.start + scene.duration - 0.28).toFixed(2));

  const gsapScript = `
    // Cena ${sceneIdx}: Hook David vs Golias + Visual Screen
    tl.fromTo("#hook-header-${sceneIdx}", { scale: 0.94, y: -15 }, { scale: 1, y: 0, duration: 0.32, ease: "back.out(1.8)" }, ${scene.start});
    tl.fromTo("#hook-visual-frame-${sceneIdx}", { scale: 0.95, y: 20 }, { scale: 1, y: 0, duration: 0.38, ease: "back.out(1.5)" }, ${scene.start});
    tl.fromTo("#hook-visual-img-${sceneIdx}", { scale: 1.0 }, { scale: 1.06, duration: ${Math.max(1.5, scene.duration - 0.3).toFixed(2)}, ease: "sine.inOut" }, ${scene.start});
    tl.fromTo("#price-row-${sceneIdx}-1", { x: -35, scale: 0.96 }, { x: 0, scale: 1, duration: 0.28, ease: "back.out(1.6)" }, ${scene.start});
    tl.fromTo("#price-row-${sceneIdx}-2", { x: 45, opacity: 0, scale: 0.90 }, { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, ${row2Time});
    tl.fromTo("#stamp-${sceneIdx}", { scale: 2.2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.32, ease: "back.out(2.2)" }, ${stampTime});
    tl.to("#scene-${sceneIdx}", { x: -120, scale: 0.92, opacity: 0, duration: 0.28, ease: "power3.in" }, ${exitTime});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: row2Time, volume: 0.30 },
      { type: 'impact', time: stampTime + 0.04, volume: 0.38 },
      { type: 'whoosh', time: exitTime }
    ]
  };
}
