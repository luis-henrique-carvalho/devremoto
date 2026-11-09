/**
 * AudioPlayerSpectrum — Player com Ondas Sonoras e Espectro Radial (Ideal para Áudio / TTS / Kokoro)
 */

export function renderAudioPlayerSpectrum(scene, sceneIdx) {
  const bars = Array.from({ length: 40 }).map((_, i) => {
    const h = 18 + Math.floor(Math.sin(i * 0.5) * 28 + Math.cos(i * 0.3) * 15);
    return `<div class="audio-wave-bar" id="audio-bar-${sceneIdx}-${i}" style="height: ${Math.max(12, h)}px;"></div>`;
  }).join('');

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>🎙 ${scene.pill || 'PROVA VIVA AO VIVO'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || 'voz neural 100% indistinguível de humanos'}</p>
      </div>

      <!-- Audio Synthesizer Visualizer -->
      <div class="audio-player-card">
        <div class="player-top-status">
          <div class="voice-pulse-dot"></div>
          <span style="font-family: var(--font-mono); font-size: 22px; color: var(--accent-bright);">TRANSMISSÃO NEURAL AO VIVO</span>
        </div>

        <div class="audio-waves-container">
          ${bars}
        </div>

        <div class="audio-specs-grid">
          <div class="audio-stat-pill">
            <span class="stat-lbl">Latência:</span>
            <span class="stat-num">${scene.latency || '180ms'}</span>
          </div>
          <div class="audio-stat-pill">
            <span class="stat-lbl">Idiomas:</span>
            <span class="stat-num">${scene.languages || '147'}</span>
          </div>
          <div class="audio-stat-pill">
            <span class="stat-lbl">Custo:</span>
            <span class="stat-num" style="color: var(--accent-bright);">${scene.cost || 'R$ 0,00'}</span>
          </div>
        </div>
      </div>

      <div class="emerald-card" style="padding: 22px 32px;">
        <div class="table-row">
          <span class="row-title">Qualidade da Fala</span>
          <span class="badge-status badge-auto">100% Humana</span>
        </div>
        <div class="table-row">
          <span class="row-title">Esta Narração do Vídeo</span>
          <span style="font-family: var(--font-mono); font-size: 26px; color: var(--accent-bright); font-weight: 800;">Feita por esta IA</span>
        </div>
      </div>
    </section>
  `;

  const exitTime = scene.start + scene.duration - 0.35;

  const gsapScript = `
    // Cena ${sceneIdx}: Audio Player Spectrum
    tl.fromTo("#scene-${sceneIdx}", { y: 80, scale: 0.9, opacity: 0, filter: "blur(8px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    tl.fromTo(".audio-player-card", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.5)" }, ${scene.start + 0.15});

    // Ondas dançando com a voz
    tl.to(".audio-wave-bar", {
      scaleY: 1.8,
      duration: 0.25,
      repeat: 20,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.02, from: "center", repeat: 20, yoyo: true }
    }, ${scene.start + 0.3});

    tl.to("#scene-${sceneIdx}", { x: -90, scale: 0.93, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  const styles = `
    .audio-player-card {
      width: 960px;
      background: rgba(10, 15, 13, 0.96);
      border: 1.5px solid rgba(52, 211, 153, 0.35);
      border-radius: 28px;
      padding: 34px 40px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(16, 163, 127, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
    .player-top-status {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .voice-pulse-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #EF4444;
      box-shadow: 0 0 15px #EF4444;
      animation: pulseDot 0.8s infinite;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    .audio-waves-container {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .audio-wave-bar {
      width: 12px;
      border-radius: 6px;
      background: linear-gradient(to top, var(--accent-emerald), var(--accent-bright));
      transform-origin: center;
    }
    .audio-specs-grid {
      display: flex;
      gap: 20px;
    }
    .audio-stat-pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 10px 24px;
      border-radius: 14px;
      font-family: var(--font-mono);
      font-size: 22px;
      display: flex;
      gap: 10px;
    }
    .stat-lbl { color: var(--text-secondary); }
    .stat-num { font-weight: 800; color: #FFFFFF; }
  `;

  return {
    html,
    styles,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: scene.start + 0.3, volume: 0.25 },
      { type: 'whoosh', time: exitTime }
    ]
  };
}
