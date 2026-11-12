/**
 * LivePipelineFlow — Demonstração do Fluxo em Tempo Real (Input -> Worker -> Direct)
 */

export function renderLivePipelineFlow(scene, sceneIdx) {
  const steps = scene.steps || [
    { icon: "💬", label: "Comentário no Post", val: 'Pessoa comentou "REPLY"', time: "0.1s" },
    { icon: "⚡", label: "Robô em Tempo Real", val: "Prepara a mensagem instantânea", time: "0.8s", active: true },
    { icon: "📩", label: "Direct Entregue", val: "Link exclusivo entregue no inbox", time: "2.1s" }
  ];

  const specs = scene.specs || [
    { label: "Velocidade:", val: "Menos de 3 segundos", color: "var(--accent-bright)" },
    { label: "Mensalidade:", val: "R$ 0,00 (Zero cobranças)", color: "var(--accent-bright)" },
    { label: "Segurança:", val: "100% Oficial do Instagram", color: "var(--accent-emerald)" }
  ];

  const stepsHtml = steps.map((s, i) => `
    <div class="flow-step ${s.active ? 'active-flow' : (i === steps.length - 1 ? 'success-flow' : '')}" id="flow-step-${sceneIdx}-${i + 1}">
      <div class="flow-icon">${s.icon}</div>
      <div class="flow-content">
        <div class="flow-label">${s.label}</div>
        <div class="flow-val">${s.val}</div>
      </div>
      <div class="flow-time">${s.time}</div>
    </div>
    ${i < steps.length - 1 ? `<div class="flow-arrow" id="flow-arrow-${sceneIdx}-${i + 1}">▼</div>` : ''}
  `).join('\n');

  const specsHtml = specs.map((s, i) => `
    <div id="flow-spec-${sceneIdx}-${i + 1}" class="table-row">
      <span class="row-title">${s.label.replace(':', '')}</span>
      <span style="font-family: var(--font-mono); font-size: 26px; color: ${s.color}; font-weight: 800;">${s.val}</span>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>🔒 ${scene.pill || 'PROVA VIVA AO VIVO'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || 'resposta em tempo real'}</p>
      </div>

      <div class="live-flow-wrapper">
        ${stepsHtml}
      </div>

      <div class="emerald-card" style="padding: 20px 32px;">
        ${specsHtml}
      </div>
    </section>
  `;

  const sfxCues = [{ type: 'whoosh', time: scene.start }];
  const tweens = [];
  const baseT = scene.start + 0.3;

  steps.forEach((_, i) => {
    const tStep = baseT + (i * 0.7);
    tweens.push(`tl.fromTo("#flow-step-${sceneIdx}-${i + 1}", { ${i % 2 === 0 ? 'x: -30' : 'x: 30'}, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, ${tStep.toFixed(2)});`);
    sfxCues.push({ type: 'pop', time: tStep + 0.05, volume: 0.25 });

    if (i < steps.length - 1) {
      const tArrow = tStep + 0.35;
      tweens.push(`tl.fromTo("#flow-arrow-${sceneIdx}-${i + 1}", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, ${tArrow.toFixed(2)});`);
    }
  });

  const exitTime = scene.start + scene.duration - 0.35;
  sfxCues.push({ type: 'whoosh', time: exitTime });

  const gsapScript = `
    // Cena ${sceneIdx}: Live Pipeline Flow
    tl.fromTo("#scene-${sceneIdx}", { y: 70, scale: 0.9, opacity: 0, filter: "blur(8px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    ${tweens.join('\n    ')}
    tl.to("#scene-${sceneIdx}", { y: -60, scale: 0.94, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  return { html, gsapScript, sfxCues };
}
