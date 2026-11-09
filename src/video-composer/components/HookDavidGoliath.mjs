/**
 * HookDavidGoliath — Cena de Choque (Assinatura Cara vs Open-Source)
 */

export function renderHookDavidGoliath(scene, sceneIdx) {
  const comp = scene.competitor || { name: "Plataforma Paga", price: "$100/mês", limit: "Cobrança Recorrente" };
  const stamp = scene.stamp || "ASSINATURA CARA 💸";

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>⚠ ${scene.alert || 'ALERTA // ZERO MENSALIDADE'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || ''}</p>
      </div>

      <div class="emerald-card" style="border-color: rgba(239, 68, 68, 0.45);">
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 28px; padding-bottom: 18px; margin-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);" data-layout-ignore>
          <span><span style="color: #EF4444;">$</span> ${comp.name}: ${comp.price}</span>
          <span class="badge-status" style="background: rgba(239, 68, 68, 0.18); color: #EF4444;" data-layout-ignore>Assinatura Cara</span>
        </div>
        <div id="cost-row-2" class="table-row">
          <span class="row-title">Cobrança por Seguidor</span>
          <span class="badge-status" style="background: rgba(239, 68, 68, 0.18); color: #EF4444;" data-layout-ignore>${comp.limit || 'Paga a mais se crescer'}</span>
        </div>
        <div id="cost-row-3" class="table-row">
          <span class="row-title">Limite de Mensagens</span>
          <span class="badge-status" style="background: rgba(239, 68, 68, 0.18); color: #EF4444;" data-layout-ignore>Bloqueia no limite</span>
        </div>
        <div id="cost-row-4" class="table-row">
          <span class="row-title">Alternativa Aberta</span>
          <span class="badge-status" style="background: rgba(52, 211, 153, 0.2); color: var(--accent-bright);" data-layout-ignore>100% Grátis e Ilimitado</span>
        </div>
      </div>

      <div id="cost-stamp" style="background: #000000; border: 2px solid #EF4444; color: #EF4444; font-family: var(--font-mono); font-size: 28px; font-weight: 900; padding: 12px 36px; border-radius: 18px; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.8);" data-layout-ignore>
        ${stamp}
      </div>
    </section>
  `;

  // Retorna HTML, CSS adicional e os tweens GSAP sincronizados dinamicamente
  const row2Time = (scene.start + (scene.duration * 0.22)).toFixed(2);
  const row3Time = (scene.start + (scene.duration * 0.42)).toFixed(2);
  const row4Time = (scene.start + (scene.duration * 0.62)).toFixed(2);
  const stampTime = Number((scene.start + (scene.duration * 0.78)).toFixed(2));
  const exitTime = Number((scene.start + scene.duration - 0.35).toFixed(2));

  const gsapScript = `
    // Cena ${sceneIdx}: Hook David vs Goliath
    tl.fromTo("#scene-${sceneIdx} .command-pill", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, ${scene.start + 0.05});
    tl.fromTo("#scene-${sceneIdx} .hero-title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, ${scene.start + 0.15});
    tl.fromTo("#scene-${sceneIdx} .emerald-card", { y: 35, rotateX: 10, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, ${scene.start + 0.25});
    tl.fromTo("#cost-row-2", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, ${row2Time});
    tl.fromTo("#cost-row-3", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, ${row3Time});
    tl.fromTo("#cost-row-4", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, ${row4Time});
    tl.fromTo("#cost-stamp", { scale: 2.4, opacity: 0, rotate: -25 }, { scale: 1, opacity: 1, rotate: -2, duration: 0.45, ease: "elastic.out(1.2, 0.4)" }, ${stampTime});
    tl.to("#scene-${sceneIdx}", { y: -80, scale: 0.94, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start + 0.05 },
      { type: 'impact', time: stampTime + 0.05, volume: 0.42 }, // Impacto exatamente na queda do carimbo
      { type: 'whoosh', time: exitTime }
    ]
  };
}
