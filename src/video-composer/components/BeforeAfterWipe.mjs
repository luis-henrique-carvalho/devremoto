/**
 * BeforeAfterWipe — Comparativo Visual com Scanner Wipe Laser (Ideal para Visão / Design / BiRefNet)
 */

export function renderBeforeAfterWipe(scene, sceneIdx) {
  const original = scene.originalLabel || "Foto Original";
  const processed = scene.cutoutLabel || "Fundo Removido (Transparente)";

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>✂ ${scene.pill || 'RECORTE CIRÚRGICO // IA VISUAL'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || 'precisão milimétrica sem Photoshop'}</p>
      </div>

      <!-- Split Scanner Stage -->
      <div class="scanner-stage" id="scanner-stage-${sceneIdx}">
        <div class="scanner-side before-side">
          <div class="side-badge">RAW // ${original}</div>
          <div class="subject-placeholder before-silhouette">
            <div class="silhouette-head"></div>
            <div class="silhouette-body"></div>
          </div>
        </div>

        <!-- Laser Divider Line -->
        <div class="scanner-laser" id="scanner-laser-${sceneIdx}">
          <div class="laser-dot"></div>
        </div>

        <div class="scanner-side after-side">
          <div class="side-badge badge-clean">AI 100% // ${processed}</div>
          <div class="subject-placeholder after-silhouette">
            <div class="silhouette-head hair-cut"></div>
            <div class="silhouette-body clean-edges"></div>
          </div>
        </div>
      </div>

      <div class="emerald-card" style="padding: 20px 32px;">
        <div class="table-row">
          <span class="row-title">Separação de Fios de Cabelo</span>
          <span class="badge-status badge-auto">Perfeita</span>
        </div>
        <div class="table-row">
          <span class="row-title">Velocidade de Processamento</span>
          <span style="font-family: var(--font-mono); font-size: 26px; color: var(--accent-bright); font-weight: 800;">0.8s por quadro</span>
        </div>
        <div class="table-row">
          <span class="row-title">Custo de Assinatura Adobe</span>
          <span style="font-family: var(--font-mono); font-size: 26px; color: var(--accent-bright); font-weight: 800;">R$ 0,00</span>
        </div>
      </div>
    </section>
  `;

  const laserTime = scene.start + 1.2;
  const exitTime = scene.start + scene.duration - 0.35;

  const gsapScript = `
    // Cena ${sceneIdx}: Before After Scanner Wipe
    tl.fromTo("#scene-${sceneIdx}", { y: 80, scale: 0.9, opacity: 0, filter: "blur(8px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    tl.fromTo("#scanner-stage-${sceneIdx}", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }, ${scene.start + 0.15});
    tl.fromTo("#scanner-laser-${sceneIdx}", { left: "10%" }, { left: "90%", duration: 2.2, ease: "power1.inOut" }, ${laserTime});
    tl.to("#scene-${sceneIdx}", { x: -90, scale: 0.93, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  const styles = `
    .scanner-stage {
      width: 960px;
      height: 620px;
      background: #090E0C;
      border: 1.5px solid rgba(52, 211, 153, 0.35);
      border-radius: 28px;
      position: relative;
      overflow: hidden;
      display: flex;
    }
    .scanner-side {
      flex: 1;
      height: 100%;
      padding: 24px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .before-side {
      background: radial-gradient(circle at center, rgba(60, 50, 40, 0.5) 0%, rgba(15, 18, 16, 0.95) 75%);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
    .after-side {
      background-color: #080D0B;
      background-image: 
        linear-gradient(45deg, rgba(255, 255, 255, 0.04) 25%, transparent 25%), 
        linear-gradient(-45deg, rgba(255, 255, 255, 0.04) 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.04) 75%), 
        linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.04) 75%);
      background-size: 24px 24px;
      background-position: 0 0, 0 12px, 12px -12px, -12px 0px;
    }
    .subject-placeholder {
      width: 240px;
      height: 340px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
    }
    .silhouette-head {
      width: 120px;
      height: 140px;
      border-radius: 50% 50% 45% 45%;
      background: #2D3A35;
      position: relative;
      margin-bottom: 8px;
    }
    .silhouette-body {
      width: 220px;
      height: 180px;
      border-radius: 100px 100px 0 0;
      background: #1E2925;
    }
    .before-side .subject-placeholder {
      filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
    }
    .after-side .silhouette-head {
      background: #14352B;
      border: 2px solid var(--accent-bright);
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.4);
    }
    .after-side .silhouette-body {
      background: #0D241D;
      border: 2px solid var(--accent-bright);
      border-bottom: none;
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.4);
    }
    .side-badge {
      position: absolute;
      top: 20px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 6px 18px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 18px;
      color: #9CA3AF;
    }
    .side-badge.badge-clean {
      border-color: var(--accent-bright);
      color: var(--accent-bright);
    }
    .scanner-laser {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--accent-bright);
      box-shadow: 0 0 20px var(--accent-bright), 0 0 40px var(--accent-emerald);
      z-index: 10;
      left: 50%;
    }
    .laser-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 0 15px #FFFFFF;
      margin-left: -5px;
      margin-top: 10px;
    }
  `;

  return {
    html,
    styles,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'click', time: laserTime + 0.1, volume: 0.25 },
      { type: 'whoosh', time: exitTime }
    ]
  };
}
