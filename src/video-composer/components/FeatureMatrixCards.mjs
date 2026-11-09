/**
 * FeatureMatrixCards — 4 Superpoderes com entrada sequencial sincronizada ao áudio
 */

export function renderFeatureMatrixCards(scene, sceneIdx) {
  const features = scene.features || [
    { title: "Superpoder 1", badge: "[01/04]", color: "var(--accent-bright)" },
    { title: "Superpoder 2", badge: "[02/04]", color: "#60A5FA" },
    { title: "Superpoder 3", badge: "[03/04]", color: "var(--accent-gold)" },
    { title: "Superpoder 4", badge: "[04/04]", color: "#34D399" }
  ];

  const rowsHtml = features.map((f, i) => `
    <div id="feat-card-${sceneIdx}-${i + 1}" class="job-card" style="margin: 0; border-color: rgba(52, 211, 153, 0.4);" data-layout-ignore>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 32px;">${f.icon || '⚡'}</span>
        <span style="font-size: 28px; font-weight: 700;">${f.title}</span>
      </div>
      <span class="badge-status badge-auto" style="background: ${f.color || 'var(--accent-bright)'};" data-layout-ignore>${(f.badge || `[0${i+1}/04]`).replace(/[\[\]]/g, '')}</span>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>⚡ ${scene.pill || '4 SUPERPODERES // ZERO CUSTO'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || 'execução limpa e otimizada'}</p>
      </div>

      <div class="emerald-card" style="padding: 18px 28px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" data-layout-ignore>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--accent-bright); box-shadow: 0 0 10px var(--accent-bright);"></div>
            <span style="font-family: var(--font-mono); font-size: 22px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">MODO AUTOMÁTICO</span>
          </div>
          <span class="badge-status" style="background: rgba(52, 211, 153, 0.15); color: var(--accent-bright); font-size: 20px;">Ativo 24h</span>
        </div>
        <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 24px; font-weight: 600; color: #FFFFFF;">${scene.panelTitle || 'Automação de Respostas Inteligentes'}</span>
          <span style="font-family: var(--font-mono); font-size: 22px; color: var(--accent-bright); font-weight: 700;">100% Grátis</span>
        </div>
      </div>

      <div style="width: 960px; display: flex; flex-direction: column; gap: 14px;">
        ${rowsHtml}
      </div>
    </section>
  `;

  // Intervalo dinâmico de entrada de cada card baseado na duração da cena
  const step = (scene.duration - 1.2) / features.length;
  const cardTweens = [];
  const sfxCues = [{ type: 'whoosh', time: scene.start }];

  features.forEach((_, i) => {
    const t = scene.start + 0.6 + (i * step);
    cardTweens.push(`tl.fromTo("#feat-card-${sceneIdx}-${i + 1}", { x: -35, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, ${t.toFixed(2)});`);
    sfxCues.push({ type: 'pop', time: t + 0.05, volume: 0.22 }); // Pop sincronizado no surgimento de cada card
  });

  const exitTime = scene.start + scene.duration - 0.35;
  sfxCues.push({ type: 'whoosh', time: exitTime });

  const gsapScript = `
    // Cena ${sceneIdx}: Feature Matrix Cards
    tl.fromTo("#scene-${sceneIdx}", { x: 90, scale: 0.93, opacity: 0, filter: "blur(8px)" }, { x: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    ${cardTweens.join('\n    ')}
    tl.to("#scene-${sceneIdx}", { scale: 0.88, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  return { html, gsapScript, sfxCues };
}
