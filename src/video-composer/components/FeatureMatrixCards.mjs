/**
 * FeatureMatrixCards — Cena 3: Carrossel Cinético + Monitor Visual de 4 Telas do Projeto
 *
 * Exibe:
 * 1. Monitor Visual Superior (960x340) que troca a imagem real da funcionalidade
 *    (screen-feat-1.png -> screen-feat-2.png -> screen-feat-3.png -> screen-feat-4.png)
 *    conforme cada um dos 4 superpoderes é anunciado!
 * 2. Barra de progresso 01–04 + Lista numerada abaixo.
 */

export function renderFeatureMatrixCards(scene, sceneIdx) {
  const features = scene.features || [
    { icon: "💬", title: "Responde Comentários no Post", badge: "AUTOMÁTICO", color: "var(--accent-bright)" },
    { icon: "📩", title: "Envia o Link no Direct na Hora", badge: "TEMPO REAL", color: "var(--accent-emerald)" },
    { icon: "🔥", title: "Reage aos Stories Automaticamente", badge: "ILIMITADO", color: "var(--accent-bright)" },
    { icon: "🤖", title: "IA que Conversa e Tira Dúvidas", badge: "100% GRÁTIS", color: "var(--accent-emerald)" }
  ];

  const numberColors = ["#34D399", "#10A37F", "#34D399", "#10A37F"];

  // 4 Telas empilhadas no monitor superior que trocam a cada passo
  const screensHtml = features.map((f, i) => `
    <img
      id="feat-screen-${sceneIdx}-${i + 1}"
      src="assets/screen-feat-${(i % 4) + 1}.png"
      alt="Funcionalidade ${i + 1}"
      style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: ${i === 0 ? 1 : 0};"
    />
  `).join('\n');

  // Mini-cards de progresso no topo (estilo cheat-sheet do @devemdobro)
  const topProgressHtml = features.map((f, i) => `
    <div id="top-pill-${sceneIdx}-${i + 1}" style="flex: 1; background: rgba(16, 24, 20, 0.92); border: 1.5px solid ${numberColors[i % 4]}; border-radius: 14px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; opacity: 0.35;">
      <span style="font-family: var(--font-mono); font-size: 18px; font-weight: 900; color: ${numberColors[i % 4]};">#0${i + 1}</span>
      <span style="font-size: 16px; font-weight: 700; color: #E5E7EB; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">${f.title.split(' ').slice(0, 2).join(' ')}</span>
    </div>
  `).join('\n');

  const rowsHtml = features.map((f, i) => {
    const numColor = numberColors[i % 4];
    return `
    <div id="feat-card-${sceneIdx}-${i + 1}" class="emerald-card" style="padding: 16px 24px; border-radius: 20px; border-left: 6px solid ${numColor}; background: rgba(10, 16, 14, 0.95); display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 18px; opacity: 0;">
      <div style="display: flex; align-items: center; gap: 18px;">
        <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(52, 211, 153, 0.14); border: 2px solid ${numColor}; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 28px; font-weight: 900; color: ${numColor}; flex-shrink: 0;">
          ${i + 1}
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="font-size: 25px; font-weight: 800; color: #FFFFFF; line-height: 1.2;">${f.title}</span>
        </div>
      </div>
      <div style="font-size: 32px; flex-shrink: 0;">${f.icon}</div>
    </div>
  `;
  }).join('\n');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group" style="margin-bottom: 4px;">
        <div class="command-pill" data-layout-ignore>⚡ ${scene.pill || '4 SUPERPODERES // NA PRÁTICA'}</div>
        <h1 class="hero-title" style="font-size: 54px;">${scene.title}</h1>
      </div>

      <!-- Monitor Visual que troca a imagem a cada funcionalidade (screen-feat-1..4.png) -->
      <div style="width: 960px; height: 340px; border-radius: 22px; overflow: hidden; border: 2px solid rgba(52, 211, 153, 0.5); position: relative; background: #070B09; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(16, 163, 127, 0.25);">
        ${screensHtml}
      </div>

      <!-- Barra de Progresso Visual (01 a 04) -->
      <div style="width: 960px; display: flex; gap: 10px;" data-layout-ignore>
        ${topProgressHtml}
      </div>

      <div style="width: 960px; display: flex; flex-direction: column; gap: 12px;">
        ${rowsHtml}
      </div>
    </section>
  `;

  // Intervalo dinâmico: cada funcionalidade troca a tela do monitor superior + anima o card abaixo!
  const step = Math.max(0.8, (scene.duration - 0.8) / features.length);
  const cardTweens = [];
  const sfxCues = [{ type: 'whoosh', time: scene.start }];

  features.forEach((_, i) => {
    const t = Number((scene.start + 0.20 + (i * step)).toFixed(2));
    cardTweens.push(`
      tl.fromTo("#feat-card-${sceneIdx}-${i + 1}", { x: ${i % 2 === 0 ? -70 : 70}, scale: 0.88, opacity: 0 }, { x: 0, scale: 1.02, opacity: 1, duration: 0.30, ease: "back.out(1.8)" }, ${t});
      tl.to("#feat-card-${sceneIdx}-${i + 1}", { scale: 1.0, duration: 0.22, ease: "sine.out" }, ${(t + 0.32).toFixed(2)});
      tl.to("#top-pill-${sceneIdx}-${i + 1}", { opacity: 1, scale: 1.04, duration: 0.25, ease: "back.out(2)" }, ${t});
      ${i > 0 ? `tl.to("#feat-screen-${sceneIdx}-${i}", { opacity: 0, duration: 0.20 }, ${t});` : ''}
      tl.fromTo("#feat-screen-${sceneIdx}-${i + 1}", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1.0, duration: 0.35, ease: "power2.out" }, ${t});
    `);
    sfxCues.push({ type: 'pop', time: Number((t + 0.04).toFixed(2)), volume: 0.28 });
  });

  const exitTime = Number((scene.start + scene.duration - 0.28).toFixed(2));
  sfxCues.push({ type: 'whoosh', time: exitTime });

  const gsapScript = `
    // Cena ${sceneIdx}: Kinetic Numbered Listicle + 4 Feature Visual Screens
    tl.fromTo("#scene-${sceneIdx}", { x: 90, scale: 0.94, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.32, ease: "power3.out" }, ${scene.start});
    ${cardTweens.join('\n    ')}
    tl.to("#scene-${sceneIdx}", { x: -90, scale: 0.92, opacity: 0, duration: 0.28, ease: "power3.in" }, ${exitTime});
  `;

  return { html, gsapScript, sfxCues };
}
