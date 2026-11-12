/**
 * semantic-scenes.mjs
 *
 * Motor de Cenas Semânticas com Motion Design Cinematográfico (HyperFrames)
 * Identidade Estrita OpenAI Emerald Noir + Espaçamento Vertical Áureo 9:16
 *
 * 1. Elimina vazios verticais com hierarquia de 3 blocos:
 *    [Top Title Group] ➔ [Hero Card com Visual Gigante] ➔ [Bottom Benefit Chip]
 * 2. Visual do README/Projeto ampliado para 620px-680px de altura.
 * 3. Safe zones rigorosas: 74px abaixo do HUD superior e 250px acima da pílula de legendas (1675px).
 * 4. Paleta 100% OpenAI Emerald Noir (#060807, #10A37F, #34D399, #FFFFFF, #9CA3AF) + Vermelho (#EF4444) restrito a alertas e descarte.
 */

function findWordTimestamp(transcript, word, startAfter = 0) {
  if (!Array.isArray(transcript)) return null;
  const clean = word.toLowerCase().replace(/[^\w]/g, '');
  const match = transcript.find(
    w => w.start_sec >= startAfter && w.text.toLowerCase().replace(/[^\w]/g, '').includes(clean)
  );
  return match ? Number(match.start_sec.toFixed(2)) : null;
}

// ============================================================================
// 1. CAREER-OPS AI — MOTION DESIGN CINEMATOGRÁFICO
// ============================================================================
export function buildCareerOpsScenes(item, voiceDuration, transcript, totalDuration) {
  const tSetecentas = findWordTimestamp(transcript, 'setecentas', 2) || 4.16;
  const tDoze = findWordTimestamp(transcript, 'doze', 6) || 7.73;
  const tReveal = findWordTimestamp(transcript, 'chama', 8) || 9.47;
  const tPrimeiro = findWordTimestamp(transcript, 'primeiro', 14) || 15.14;
  const tSegundo = findWordTimestamp(transcript, 'segundo', 20) || 21.81;
  const tTerceiro = findWordTimestamp(transcript, 'terceiro', 25) || 26.90;
  const tQuarto = findWordTimestamp(transcript, 'quarto', 32) || 33.50;
  const tClash = findWordTimestamp(transcript, 'diferença', 35) || 36.88;
  const tCta = findWordTimestamp(transcript, 'comenta', 40) || 41.16;

  const scenes = [];

  // --------------------------------------------------------------------------
  // CENA 1: FUNIL COM CONTADORES CINÉTICOS & CAMERA SHAKE
  // --------------------------------------------------------------------------
  const d1 = Number((tReveal - 0).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-1" class="scene-clip clip" data-start="0" data-duration="${d1}">
        <div class="scene-title-group" id="title-grp-1">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">CAÇADOR DE VAGAS COM IA</div>
          <h1 class="display-title">DE 740 VAGAS PARA 12 ENTREVISTAS</h1>
        </div>

        <div style="width:960px;display:flex;flex-direction:column;gap:20px;position:relative;">
          <!-- Laser Scan Beam -->
          <div id="laser-scan-1" style="position:absolute;top:0;left:0;right:0;height:4px;background:#34D399;box-shadow:0 0 20px #34D399;z-index:10;pointer-events:none;opacity:0.8;"></div>

          <!-- Card 1: 740 Vagas -->
          <div id="funnel-740" style="background:rgba(12,19,16,0.96);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px 34px;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:20px;">
              <span style="font-size:44px;">🔍</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Vagas Remotas Analisadas</div>
                <div style="font-size:24px;color:#9CA3AF;font-weight:600;">Varredura completa no Brasil e Exterior</div>
              </div>
            </div>
            <div id="num-740" style="font-family:var(--font-mono);font-size:48px;font-weight:900;color:#34D399;">740</div>
          </div>

          <!-- Card 2: 68 Aprovadas -->
          <div id="funnel-68" style="background:rgba(14,26,21,0.96);border:2px solid #10A37F;border-radius:24px;padding:28px 34px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 0 35px rgba(16,163,127,0.25);">
            <div style="display:flex;align-items:center;gap:20px;">
              <span style="font-size:44px;">🎯</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Apenas Vagas Nota 4+</div>
                <div style="font-size:26px;color:#34D399;font-weight:600;">Vagas furadas descartadas automaticamente</div>
              </div>
            </div>
            <div id="num-68" style="font-family:var(--font-mono);font-size:48px;font-weight:900;color:#34D399;">68</div>
          </div>

          <!-- Card 3: 12 Entrevistas -->
          <div id="funnel-12" style="background:linear-gradient(135deg, rgba(16,45,35,0.98) 0%, rgba(8,20,16,0.98) 100%);border:3px solid #34D399;border-radius:24px;padding:30px 34px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 0 45px rgba(52,211,153,0.35);">
            <div style="display:flex;align-items:center;gap:20px;">
              <span style="font-size:48px;">🎉</span>
              <div>
                <div style="font-size:34px;font-weight:900;color:#FFFFFF;">Entrevistas Conquistadas</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Alta conversão com recrutadores reais</div>
              </div>
            </div>
            <div id="num-12" style="font-family:var(--font-mono);font-size:56px;font-weight:900;color:#FFFFFF;">12</div>
          </div>

          <!-- Conversion Rate Banner -->
          <div style="background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;margin-top:4px;">
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">🎯 Taxa de Conversão em Entrevistas:</span>
            <span style="font-family:var(--font-mono);font-size:26px;font-weight:900;color:#34D399;">17.6% (12/68)</span>
          </div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-1", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power4.out" }, 0.0);
      tl.fromTo("#title-grp-1", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 0.1);
      tl.fromTo("#laser-scan-1", { y: 0 }, { y: 360, duration: 2.2, repeat: 3, yoyo: true, ease: "sine.inOut" }, 0.3);
      tl.fromTo("#funnel-740", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: "back.out(1.4)" }, 0.3);
      tl.fromTo("#funnel-68", { x: -80, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, ${tSetecentas + 1.2});
      tl.fromTo("#funnel-12", { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, ${tDoze});
      tl.fromTo("#camera", { y: -10, rotateZ: -0.6 }, { y: 0, rotateZ: 0, duration: 0.25, ease: "elastic.out(1, 0.4)" }, ${tDoze});
      tl.to("#scene-1", { scale: 1.8, opacity: 0, duration: 0.28, ease: "power3.in" }, ${d1 - 0.28});
    `,
    sfxCues: [
      { type: 'whoosh', time: 0 },
      { type: 'pop', time: tSetecentas + 1.2, volume: 0.32 },
      { type: 'impact', time: tDoze, volume: 0.4 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 2: GITHUB & TERMINAL COM DASHBOARD REAL AMPLIFICADO (560PX)
  // --------------------------------------------------------------------------
  const d2 = Number((tPrimeiro - tReveal).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-2" class="scene-clip clip" data-start="${tReveal}" data-duration="${d2}">
        <div class="scene-title-group" id="title-grp-2">
          <div class="kicker-pill" style="color:#34D399;border-color:rgba(52,211,153,0.5);">CÓDIGO ABERTO // 100% GRATUITO</div>
          <h1 class="display-title">CONHEÇA O CAREER-OPS AI</h1>
        </div>

        <div id="mac-win-2" class="mac-window" style="width:960px;border-color:#34D399;position:relative;">
          <div class="mac-bar">
            <div class="mac-dots">
              <span class="mac-dot" style="background:#EF4444;"></span>
              <span class="mac-dot" style="background:#10A37F;"></span>
              <span class="mac-dot" style="background:#34D399;"></span>
            </div>
            <div class="mac-url">🔒 github.com/career-ops-hq/career-ops</div>
          </div>
          <div class="mac-header-row">
            <div style="display:flex;align-items:center;gap:18px;">
              <div id="co-logo" class="app-avatar-badge" style="background:#34D399;color:#060807;">CO</div>
              <div>
                <div style="font-size:36px;font-weight:900;color:#FFFFFF;line-height:1.1;">career-ops</div>
                <div style="font-size:24px;color:#9CA3AF;font-weight:600;">The open-source AI job search agent</div>
              </div>
            </div>
            <div id="gold-stars" class="gold-star-pill">★ 75.4k Stars</div>
          </div>
          <div style="padding:18px 22px;background:#0d1117;display:flex;flex-direction:column;gap:14px;">
            <!-- Real Dashboard Preview Image - HERO 720PX -->
            <div style="height:720px;background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:18px;overflow:hidden;position:relative;">
              <img id="co-dash-img" src="assets/career-dashboard.png" alt="Career-Ops Dashboard" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
              <div style="position:absolute;top:14px;right:16px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:6px 14px;font-family:var(--font-mono);font-size:20px;color:#34D399;">
                ● DASHBOARD OFICIAL DO PROJETO
              </div>
            </div>
            <!-- Terminal com digitação ativa -->
            <div style="background:#070b09;border:1.5px solid rgba(52,211,153,0.4);border-radius:16px;padding:16px 22px;font-family:var(--font-mono);font-size:26px;color:#34D399;display:flex;align-items:center;gap:8px;">
              <span>&gt; career-ops scan</span>
              <span id="term-typing" style="color:#FFFFFF;font-weight:800;"></span>
              <span class="cursor-blink" style="color:#34D399;">█</span>
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">⚡</span>
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">Código Aberto no GitHub • Roda no seu PC</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">SEM MENSALIDADE</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-2", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.5)" }, ${tReveal});
      tl.fromTo("#gold-stars", { scale: 0.5, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.4, ease: "back.out(2)" }, ${tReveal + 0.2});
      tl.fromTo("#co-dash-img", { scale: 1.0 }, { scale: 1.08, duration: ${d2}, ease: "sine.inOut" }, ${tReveal});
      tl.call(() => {
        const el = document.getElementById("term-typing");
        if (el) el.textContent = "--remote";
      }, null, ${tReveal + 0.6});
      tl.call(() => {
        const el = document.getElementById("term-typing");
        if (el) el.textContent = "--remote --brazil";
      }, null, ${tReveal + 1.2});
      tl.call(() => {
        const el = document.getElementById("term-typing");
        if (el) el.textContent = "--remote --brazil --latam [READY]";
      }, null, ${tReveal + 2.0});
      tl.to("#scene-2", { x: -350, opacity: 0, duration: 0.26, ease: "power3.in" }, ${tReveal + d2 - 0.26});
    `,
    sfxCues: [
      { type: 'whoosh', time: tReveal },
      { type: 'pop', time: tReveal + 0.2, volume: 0.35 },
      { type: 'click', time: tReveal + 0.6, volume: 0.25 },
      { type: 'click', time: tReveal + 1.2, volume: 0.25 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.1: PASSO 1 - NOTA 4.8 / 5.0 COM VARREDURA REAL (620PX)
  // --------------------------------------------------------------------------
  const d3_1 = Number((tSegundo - tPrimeiro).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-3" class="scene-clip clip" data-start="${tPrimeiro}" data-duration="${d3_1}">
        <div class="scene-title-group" id="title-grp-3">
          <div class="kicker-pill" style="color:#34D399;border-color:rgba(52,211,153,0.5);">PASSO 01 // AVALIAÇÃO DE 0 A 5</div>
          <h1 class="display-title">ANALISA CADA VAGA ABERTA</h1>
        </div>

        <div id="job-card-approved" style="width:960px;background:rgba(12,20,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:22px 24px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 50px rgba(52,211,153,0.35);">
          <!-- Dashboard real da varredura - HERO 620PX -->
          <div style="height:620px;background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;overflow:hidden;position:relative;">
            <img id="co-scan-real" src="assets/career-dashboard.png" alt="Career-Ops Scan" style="width:100%;height:100%;object-fit:cover;object-position:top left;" />
            <!-- Floating HUD Overlays -->
            <div style="position:absolute;top:16px;left:16px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:6px 16px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
              ● 740 VAGAS REMOTAS ANALISADAS
            </div>
            <div style="position:absolute;top:16px;right:16px;background:rgba(8,14,12,0.92);border:2px solid #34D399;border-radius:14px;padding:8px 20px;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,0,0,0.85);">
              <span style="font-size:22px;color:#9CA3AF;font-weight:700;">NOTA:</span>
              <span id="score-val" style="font-family:var(--font-mono);font-size:38px;font-weight:900;color:#34D399;">4.8 / 5.0 ⭐</span>
            </div>
            <div style="position:absolute;bottom:16px;left:16px;right:16px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:14px;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Senior Fullstack Engineer (US$ 5,500/mês)</div>
                <div style="font-size:22px;color:#34D399;font-weight:700;">Match com seu Perfil: React • TypeScript • Node • AWS</div>
              </div>
              <div id="badge-approved" style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:22px;font-weight:900;padding:6px 16px;border-radius:10px;">APROVADA</div>
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">🔍</span>
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">Analisa Requisitos Reais e Salário sem Pegadinhas</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">MATCH 98%</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-3", { x: 350, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: "power4.out" }, ${tPrimeiro});
      tl.fromTo("#co-scan-real", { scale: 1.0 }, { scale: 1.08, duration: ${d3_1}, ease: "sine.inOut" }, ${tPrimeiro});
      tl.fromTo("#score-val", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, ${tPrimeiro + 0.3});
      tl.fromTo("#badge-approved", { scale: 0.9, y: 20, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.6)" }, ${tPrimeiro + 0.6});
      tl.to("#scene-3", { y: -200, scale: 0.9, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tPrimeiro + d3_1 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tPrimeiro },
      { type: 'pop', time: tPrimeiro + 0.3, volume: 0.32 },
      { type: 'pop', time: tPrimeiro + 0.6, volume: 0.3 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.2: PASSO 2 - CARIMBO VERMELHO "PULAR VAGA"
  // --------------------------------------------------------------------------
  const d3_2 = Number((tTerceiro - tSegundo).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-4" class="scene-clip clip" data-start="${tSegundo}" data-duration="${d3_2}">
        <div class="scene-title-group" id="title-grp-4">
          <div class="kicker-pill" style="color:#EF4444;border-color:#EF4444;">PASSO 02 // FILTRO ANTI-FURADA</div>
          <h1 class="display-title">DESCARTA VAGAS RUINS NA HORA</h1>
        </div>

        <div id="job-card-discarded" style="width:960px;background:rgba(28,12,14,0.96);border:2.5px solid #EF4444;border-radius:28px;padding:36px 40px;display:flex;flex-direction:column;gap:22px;position:relative;overflow:hidden;box-shadow:0 0 45px rgba(239,68,68,0.3);">
          <!-- Carimbo Gigante "PULAR VAGA" -->
          <div id="stamp-skip" data-layout-allow-overlap="true" style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) rotate(-12deg);border:6px solid #EF4444;background:rgba(239,68,68,0.92);color:#FFFFFF;padding:16px 36px;border-radius:18px;font-family:var(--font-sans);font-size:46px;font-weight:900;letter-spacing:2px;box-shadow:0 10px 40px rgba(0,0,0,0.9);z-index:20;display:none;">
            🚫 PULAR VAGA
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-size:36px;font-weight:900;color:#FFFFFF;">Dev Fullstack "Híbrido 4x"</div>
              <div style="font-size:26px;color:#F87171;font-weight:700;">Híbrido disfarçado // Salário a Combinar</div>
            </div>
            <div style="background:#EF4444;color:#FFFFFF;font-family:var(--font-mono);font-size:28px;font-weight:900;padding:8px 20px;border-radius:12px;">Descartada</div>
          </div>

          <div style="height:1px;background:rgba(255,255,255,0.12);"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-size:26px;color:#9CA3AF;font-weight:600;">Motivo do Descarte:</div>
              <div style="font-size:30px;font-weight:800;color:#FCA5A5;margin-top:4px;">Exigências abusivas e salário abaixo do mercado</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:24px;color:#EF4444;font-weight:700;">NOTA DA IA</div>
              <div style="font-family:var(--font-mono);font-size:56px;font-weight:900;color:#EF4444;">1.8 <span style="font-size:32px;">/ 5.0 ❌</span></div>
            </div>
          </div>

          <div style="background:rgba(239,68,68,0.18);border:1px solid #EF4444;border-radius:16px;padding:16px 24px;display:flex;align-items:center;justify-content:center;gap:14px;">
            <span style="font-size:32px;">🛑</span>
            <span style="font-size:28px;font-weight:900;color:#FCA5A5;text-transform:uppercase;">VOCÊ NÃO PERDE SEU TEMPO</span>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(28,12,14,0.95);border:1.5px solid rgba(239,68,68,0.4);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">🛑</span>
            <span style="font-size:24px;font-weight:800;color:#FCA5A5;">Elimina Vagas Híbridas Disfarçadas de Remotas</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#EF4444;">ZERO RLS</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-4", { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, ${tSegundo});
      tl.call(() => {
        const st = document.getElementById("stamp-skip");
        if (st) st.style.display = "block";
      }, null, ${tSegundo + 0.8});
      tl.fromTo("#stamp-skip", { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.8)" }, ${tSegundo + 0.8});
      tl.fromTo("#camera", { y: -14, rotateZ: 0.8 }, { y: 0, rotateZ: 0, duration: 0.24, ease: "elastic.out(1, 0.4)" }, ${tSegundo + 0.8});
      tl.to("#scene-4", { y: 220, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tSegundo + d3_2 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tSegundo },
      { type: 'impact', time: tSegundo + 0.8, volume: 0.42 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.3: PASSO 3 - CURRÍCULO SOB MEDIDA E MENSAGEM AO RH
  // --------------------------------------------------------------------------
  const d3_3 = Number((tQuarto - tTerceiro).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-5" class="scene-clip clip" data-start="${tTerceiro}" data-duration="${d3_3}">
        <div class="scene-title-group" id="title-grp-5">
          <div class="kicker-pill" style="color:#34D399;border-color:rgba(52,211,153,0.5);">PASSO 03 // ADAPTAÇÃO & OUTREACH</div>
          <h1 class="display-title">CURRÍCULO SOB MEDIDA EM PDF</h1>
        </div>

        <div style="width:960px;display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <!-- Card Currículo -->
          <div id="card-pdf" style="background:rgba(12,20,18,0.96);border:2.5px solid #34D399;border-radius:26px;padding:34px 28px;display:flex;flex-direction:column;gap:18px;box-shadow:0 0 35px rgba(52,211,153,0.25);">
            <div style="display:flex;align-items:center;gap:14px;">
              <span style="font-size:48px;">📄</span>
              <div>
                <div style="font-size:30px;font-weight:900;color:#FFFFFF;">Currículo Adaptado</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Formatado em PDF</div>
              </div>
            </div>
            <div style="font-size:26px;color:#E5E7EB;line-height:1.45;display:flex;flex-direction:column;gap:8px;">
              <div>✓ 98% Match ATS</div>
              <div>✓ Destaca skills reais</div>
              <div>✓ Sem mentiras de robô</div>
            </div>
          </div>

          <!-- Card Mensagem Recrutador -->
          <div id="card-msg" style="background:rgba(10,18,14,0.96);border:2.5px solid #10A37F;border-radius:26px;padding:34px 28px;display:flex;flex-direction:column;gap:18px;box-shadow:0 0 35px rgba(16,163,127,0.25);">
            <div style="display:flex;align-items:center;gap:14px;">
              <span style="font-size:48px;">💬</span>
              <div>
                <div style="font-size:30px;font-weight:900;color:#FFFFFF;">Mensagem ao RH</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Texto Personalizado</div>
              </div>
            </div>
            <div style="font-size:26px;color:#E5E7EB;line-height:1.45;display:flex;flex-direction:column;gap:8px;">
              <div>✓ Abordagem direta</div>
              <div>✓ Conecta skills à vaga</div>
              <div>✓ Pronta para o LinkedIn</div>
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">📄</span>
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">Pronto para Enviar na Gupy, LinkedIn e Workana</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">FORMATO PDF</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-5", { opacity: 0 }, { opacity: 1, duration: 0.1 }, ${tTerceiro});
      tl.fromTo("#card-pdf", { x: -180, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: "back.out(1.5)" }, ${tTerceiro});
      tl.fromTo("#card-msg", { x: 180, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: "back.out(1.5)" }, ${tTerceiro + 0.15});
      tl.to("#scene-5", { scale: 0.85, opacity: 0, duration: 0.22, ease: "power3.in" }, ${tTerceiro + d3_3 - 0.22});
    `,
    sfxCues: [
      { type: 'whoosh', time: tTerceiro },
      { type: 'pop', time: tTerceiro + 0.15, volume: 0.32 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.4: PASSO 4 - CONTROLE E TOGGLE ATIVO
  // --------------------------------------------------------------------------
  const d3_4 = Number((tClash - tQuarto).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-6" class="scene-clip clip" data-start="${tQuarto}" data-duration="${d3_4}">
        <div class="scene-title-group" id="title-grp-6">
          <div class="kicker-pill" style="color:#34D399;border-color:rgba(52,211,153,0.5);">PASSO 04 // CONTROLE TOTAL</div>
          <h1 class="display-title">VOCÊ REVISA E APROVA TUDO</h1>
        </div>

        <div style="width:960px;background:rgba(12,19,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:38px 42px;display:flex;flex-direction:column;gap:24px;box-shadow:0 0 50px rgba(52,211,153,0.3);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:18px;">
              <span style="font-size:52px;">🛡️</span>
              <div>
                <div style="font-size:34px;font-weight:900;color:#FFFFFF;">Nenhum envio no escuro</div>
                <div style="font-size:26px;color:#9CA3AF;font-weight:600;">Controle humano garantido antes do clique</div>
              </div>
            </div>
            <!-- Physical Toggle Switch -->
            <div id="toggle-track" style="width:100px;height:54px;background:#34D399;border-radius:999px;padding:5px;display:flex;align-items:center;box-shadow:0 0 25px rgba(52,211,153,0.6);">
              <div id="toggle-knob" style="width:44px;height:44px;background:#060807;border-radius:50%;transform:translateX(46px);"></div>
            </div>
          </div>

          <!-- Pulsing Approval Button -->
          <div id="btn-approve" style="background:#34D399;color:#060807;font-size:34px;font-weight:900;padding:22px;border-radius:20px;text-align:center;box-shadow:0 0 40px rgba(52,211,153,0.5);letter-spacing:1px;">
            ✅ APROVAR E ENVIAR CANDIDATURA
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">🛡️</span>
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">Nenhum robô se candidata sem sua autorização prévia</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">100% HUMANO</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-6", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }, ${tQuarto});
      tl.fromTo("#btn-approve", { scale: 1 }, { scale: 0.96, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.inOut" }, ${tQuarto + 0.8});
      tl.to("#scene-6", { x: -300, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tQuarto + d3_4 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tQuarto },
      { type: 'click', time: tQuarto + 0.8, volume: 0.35 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 4: CLASH ATIRAR NO ESCURO VS CAREER-OPS
  // --------------------------------------------------------------------------
  const d4 = Number((tCta - tClash).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-7" class="scene-clip clip" data-start="${tClash}" data-duration="${d4}">
        <div class="scene-title-group" id="title-grp-7">
          <div class="kicker-pill" style="color:#34D399;border-color:rgba(52,211,153,0.5);">RESULTADO COMPROVADO</div>
          <h1 class="display-title">ATIRAR NO ESCURO VS CAREER-OPS</h1>
        </div>

        <div style="width:960px;display:flex;flex-direction:column;gap:18px;">
          <!-- Card Escuro -->
          <div id="card-clash-red" style="background:rgba(28,12,14,0.96);border:2px solid #EF4444;border-radius:24px;padding:28px 34px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-family:var(--font-mono);font-size:24px;color:#F87171;font-weight:800;">❌ ATIRAR NO ESCURO (MANUAL)</div>
              <div style="font-size:32px;font-weight:900;color:#FFFFFF;margin-top:4px;">500 currículos enviados sem critério</div>
            </div>
            <div style="font-family:var(--font-mono);font-size:42px;font-weight:900;color:#EF4444;">0 Respostas</div>
          </div>

          <!-- Card Career-Ops -->
          <div id="card-clash-green" style="background:linear-gradient(135deg, rgba(16,45,35,0.98) 0%, rgba(8,20,16,0.98) 100%);border:3px solid #34D399;border-radius:24px;padding:30px 34px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 0 50px rgba(52,211,153,0.4);">
            <div>
              <div style="font-family:var(--font-mono);font-size:24px;color:#34D399;font-weight:800;">✅ COM CAREER-OPS AI</div>
              <div style="font-size:34px;font-weight:900;color:#FFFFFF;margin-top:4px;">68 candidaturas altamente qualificadas</div>
            </div>
            <div style="font-family:var(--font-mono);font-size:52px;font-weight:900;color:#34D399;">12 Entrevistas</div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:1.5px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.7);">
          <div style="display:flex;align-items:center;gap:14px;">
            <span style="font-size:30px;">🚀</span>
            <span style="font-size:24px;font-weight:800;color:#FFFFFF;">Mais entrevistas reais com menos esforço e zero frustração</span>
          </div>
          <span style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">RESULTADO REAL</span>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-7", { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.36, ease: "power4.out" }, ${tClash});
      tl.to("#card-clash-red", { opacity: 0.5, scale: 0.96, duration: 0.4 }, ${tClash + 0.8});
      tl.fromTo("#card-clash-green", { scale: 0.95 }, { scale: 1.04, duration: 0.4, ease: "back.out(1.8)" }, ${tClash + 0.8});
      tl.to("#scene-7", { y: -180, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tClash + d4 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tClash },
      { type: 'impact', time: tClash + 0.8, volume: 0.38 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 5: CTA COM DIGITAÇÃO NO COMMENT E PULSO RÍTMICO
  // --------------------------------------------------------------------------
  const d5 = Number((totalDuration - tCta).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-8" class="scene-clip scene-center clip" data-start="${tCta}" data-duration="${d5}" style="gap:20px;">
        <div class="scene-title-group" style="gap:6px;">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">COMENTA AQUI EMBAIXO</div>
          <h1 id="hero-vaga-cta" style="font-size:120px;font-weight:900;color:#34D399;letter-spacing:-3px;line-height:1;text-shadow:0 0 50px rgba(52,211,153,0.75);">
            VAGA
          </h1>
        </div>

        <!-- Simulated Typing Input Bar -->
        <div style="width:920px;background:#0C1310;border:2.5px solid #34D399;border-radius:999px;padding:18px 34px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <span style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:#FFFFFF;display:flex;align-items:center;gap:6px;">
            💬 <span id="vaga-input-text"></span><span class="cursor-blink" style="color:#34D399;">|</span>
          </span>
          <span id="btn-publish" style="background:#34D399;color:#060807;font-size:30px;font-weight:900;padding:10px 28px;border-radius:999px;">Publicar ↑</span>
        </div>

        <div style="width:920px;background:rgba(12,18,15,0.96);border:1.5px solid rgba(255,255,255,0.18);border-radius:26px;padding:24px 32px;display:flex;flex-direction:column;gap:12px;">
          <div style="font-family:var(--font-mono);font-size:28px;font-weight:800;color:#34D399;">📦 O QUE EU TE ENVIO NO DIRECT:</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">1️⃣ Link Oficial do Career-Ops (GitHub)</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">2️⃣ Guia de Configuração da Nota de 1 a 5</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">3️⃣ 10 Prompts Prontos para Adaptar seu Currículo</div>
        </div>

        <div id="follow-card-cta" style="width:920px;background:linear-gradient(135deg, rgba(16,163,127,0.25) 0%, rgba(10,16,14,0.98) 100%);border:2px solid #34D399;border-radius:26px;padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:20px;">
            <div style="width:70px;height:70px;border-radius:50%;background:#34D399;color:#060807;font-family:var(--font-mono);font-size:32px;font-weight:900;display:flex;align-items:center;justify-content:center;">DR</div>
            <div>
              <div style="font-size:34px;font-weight:900;color:#FFFFFF;">@devremoto.br</div>
              <div style="font-size:28px;color:#D1D5DB;font-weight:600;">Me segue para receber no Direct!</div>
            </div>
          </div>
          <div id="follow-pill-cta" style="background:#34D399;color:#060807;font-size:30px;font-weight:900;padding:14px 30px;border-radius:999px;">Seguindo ✓</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-8", { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "back.out(1.5)" }, ${tCta});
      tl.fromTo("#hero-vaga-cta", { scale: 0.6 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }, ${tCta + 0.1});
      tl.call(() => {
        const el = document.getElementById("vaga-input-text");
        if (el) el.textContent = "V";
      }, null, ${tCta + 0.4});
      tl.call(() => {
        const el = document.getElementById("vaga-input-text");
        if (el) el.textContent = "VA";
      }, null, ${tCta + 0.55});
      tl.call(() => {
        const el = document.getElementById("vaga-input-text");
        if (el) el.textContent = "VAG";
      }, null, ${tCta + 0.7});
      tl.call(() => {
        const el = document.getElementById("vaga-input-text");
        if (el) el.textContent = "VAGA";
      }, null, ${tCta + 0.85});
      tl.fromTo("#btn-publish", { scale: 1 }, { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 }, ${tCta + 1.1});
      tl.to("#follow-pill-cta", { scale: 1.08, duration: 0.6, repeat: 8, yoyo: true, ease: "sine.inOut" }, ${tCta + 1.2});
    `,
    sfxCues: [
      { type: 'whoosh', time: tCta },
      { type: 'impact', time: tCta + 0.15, volume: 0.38 },
      { type: 'click', time: tCta + 1.1, volume: 0.3 }
    ]
  });

  return scenes;
}

// ============================================================================
// 2. WORLDCAM GLOBE — MOTION DESIGN CINEMATOGRÁFICO (EMERALD NOIR PURO)
// ============================================================================
export function buildWorldCamsScenes(item, voiceDuration, transcript, totalDuration) {
  const tNav = findWordTimestamp(transcript, 'mapa', 8) || 9.85;
  const tPrimeiro = findWordTimestamp(transcript, 'primeiro', 14) || 16.55;
  const tSegundo = findWordTimestamp(transcript, 'segundo', 19) || 20.80;
  const tTerceiro = findWordTimestamp(transcript, 'terceiro', 23) || 24.04;
  const tQuarto = findWordTimestamp(transcript, 'quarto', 26) || 27.38;
  const tJunta = findWordTimestamp(transcript, 'junta', 30) || 31.40;
  const tCta = findWordTimestamp(transcript, 'comenta', 37) || 39.17;

  const scenes = [];

  // --------------------------------------------------------------------------
  // CENA 1: HOOK - MAPA COM RADAR E FEED AO VIVO (HERO GLOBO 660PX)
  // --------------------------------------------------------------------------
  const d1 = Number((tNav - 0).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-1" class="scene-clip clip" data-start="0" data-duration="${d1}">
        <div class="scene-title-group" id="title-grp-1">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">DESCOBERTA DA WEB // AO VIVO</div>
          <h1 class="display-title">TODAS AS CÂMERAS DO PLANETA NUM SÓ MAPA</h1>
        </div>

        <div id="mac-win-globe" class="mac-window" style="width:960px;border-color:#34D399;position:relative;">
          <div class="mac-bar">
            <div class="mac-dots">
              <span class="mac-dot" style="background:#EF4444;"></span>
              <span class="mac-dot" style="background:#10A37F;"></span>
              <span class="mac-dot" style="background:#34D399;"></span>
            </div>
            <div class="mac-url">🔒 worldcam-globe.live</div>
          </div>
          <div style="background:#070b09;padding:20px 28px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="display:flex;align-items:center;gap:14px;">
              <span id="rec-dot" style="width:18px;height:18px;border-radius:50%;background:#EF4444;box-shadow:0 0 16px #EF4444;display:inline-block;"></span>
              <span style="font-size:28px;font-weight:900;color:#FFFFFF;">200.000 CÂMERAS TRANSMITINDO AGORA</span>
            </div>
            <span style="background:rgba(16,163,127,0.2);color:#34D399;border:1px solid #34D399;font-family:var(--font-mono);font-size:22px;font-weight:800;padding:6px 16px;border-radius:10px;">100% Grátis</span>
          </div>
          <!-- Live Preview Window - HERO 720PX -->
          <div style="height:720px;background:#070b09;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border-radius:0 0 16px 16px;">
            <img id="globe-live-img" src="assets/globe-hero.png" alt="WorldCam" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;bottom:20px;left:24px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:12px;padding:10px 20px;font-family:var(--font-mono);font-size:24px;color:#FFFFFF;">
              🔴 Tóquio - Shibuya Crossing [AO VIVO 4K]
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div id="globe-sub-chip" style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:22px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:40px;">🌍</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">200.000 Câmeras Públicas no Globo 3D</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Direto no navegador sem instalar extensões</div>
            </div>
          </div>
          <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:22px;font-weight:900;padding:8px 16px;border-radius:10px;">SEM CADASTRO</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-1", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "power4.out" }, 0.0);
      tl.to("#rec-dot", { opacity: 0.2, duration: 0.5, repeat: 10, yoyo: true, ease: "steps(1)" }, 0.2);
      tl.fromTo("#globe-live-img", { scale: 1.0 }, { scale: 1.08, duration: ${d1}, ease: "sine.inOut" }, 0.0);
      tl.to("#scene-1", { scale: 1.7, opacity: 0, duration: 0.26, ease: "power3.in" }, ${d1 - 0.26});
    `,
    sfxCues: [
      { type: 'whoosh', time: 0 },
      { type: 'pop', time: 0.35, volume: 0.35 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 2: NAVEGAÇÃO - CLIQUE VIRTUAL EM CIDADES + LIVE PLANET ZOOM
  // --------------------------------------------------------------------------
  const d2 = Number((tPrimeiro - tNav).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-2" class="scene-clip clip" data-start="${tNav}" data-duration="${d2}">
        <div class="scene-title-group" id="title-grp-2">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">DIRETO NO NAVEGADOR</div>
          <h1 class="display-title">GIRE O PLANETA E CLIQUE ONDE QUISER</h1>
        </div>

        <div style="width:960px;display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative;">
          <!-- Simulated Cursor Pointer -->
          <div id="virtual-cursor" style="position:absolute;top:30px;left:40px;font-size:52px;filter:drop-shadow(0 0 15px #34D399);z-index:30;">
            👆
          </div>

          <!-- Cidade 1 (Tóquio) -->
          <div id="city-tokyo" style="background:rgba(12,20,18,0.96);border:2.5px solid #34D399;border-radius:22px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 0 40px rgba(52,211,153,0.35);">
            <div>
              <div style="font-size:30px;font-weight:900;color:#FFFFFF;">🇯🇵 Tóquio</div>
              <div style="font-size:22px;color:#34D399;font-weight:700;">Shibuya & Shinjuku</div>
            </div>
            <span style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:20px;font-weight:900;padding:6px 12px;border-radius:8px;">AO VIVO</span>
          </div>

          <!-- Cidade 2 -->
          <div id="city-ny" style="background:rgba(12,20,18,0.96);border:2px solid rgba(255,255,255,0.16);border-radius:22px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:30px;font-weight:900;color:#FFFFFF;">🇺🇸 Nova York</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Times Square</div>
            </div>
            <span style="background:rgba(255,255,255,0.1);color:#FFFFFF;font-family:var(--font-mono);font-size:20px;font-weight:800;padding:6px 12px;border-radius:8px;">AO VIVO</span>
          </div>

          <!-- Cidade 3 -->
          <div id="city-london" style="background:rgba(12,20,18,0.96);border:2px solid rgba(255,255,255,0.16);border-radius:22px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:30px;font-weight:900;color:#FFFFFF;">🇬🇧 Londres</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Tower Bridge</div>
            </div>
            <span style="background:rgba(255,255,255,0.1);color:#FFFFFF;font-family:var(--font-mono);font-size:20px;font-weight:800;padding:6px 12px;border-radius:8px;">AO VIVO</span>
          </div>

          <!-- Cidade 4 -->
          <div id="city-sp" style="background:rgba(12,20,18,0.96);border:2px solid rgba(255,255,255,0.16);border-radius:22px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:30px;font-weight:900;color:#FFFFFF;">🇧🇷 São Paulo</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Av. Paulista</div>
            </div>
            <span style="background:rgba(255,255,255,0.1);color:#FFFFFF;font-family:var(--font-mono);font-size:20px;font-weight:800;padding:6px 12px;border-radius:8px;">AO VIVO</span>
          </div>
        </div>

        <!-- Live Preview Tokyo Zoom Below Cities -->
        <div id="nav-preview-card" style="width:960px;background:#070b09;border:2.5px solid #34D399;border-radius:24px;height:560px;overflow:hidden;position:relative;box-shadow:0 20px 50px rgba(0,0,0,0.9);">
          <img id="nav-preview-img" src="assets/globe-cities.png" alt="Tokyo Zoom" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
          <div style="position:absolute;bottom:16px;left:20px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:8px 18px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
            🎯 ZOOM AUTOMÁTICO • TÓQUIO 60 FPS
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">⚡</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Mais de 1.200 Cidades Mapeadas</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Transmissões em 4K sem buffering e sem anúncios</div>
            </div>
          </div>
          <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:22px;font-weight:900;padding:8px 16px;border-radius:10px;">ZERO LATÊNCIA</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-2", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, ${tNav});
      tl.fromTo("#virtual-cursor", { x: 400, y: 150, opacity: 0 }, { x: 260, y: 25, opacity: 1, duration: 0.6, ease: "power3.out" }, ${tNav + 0.3});
      tl.to("#virtual-cursor", { scale: 0.8, duration: 0.12, yoyo: true, repeat: 1 }, ${tNav + 0.95});
      tl.fromTo("#city-tokyo", { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)" }, ${tNav + 0.95});
      tl.fromTo("#nav-preview-img", { scale: 1.0 }, { scale: 1.12, duration: ${d2}, ease: "sine.inOut" }, ${tNav});
      tl.to("#scene-2", { x: -320, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tNav + d2 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tNav },
      { type: 'click', time: tNav + 0.95, volume: 0.35 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.1: CAMADA 1 - CÂMERAS DE RUA (HERO GLOBO 660PX)
  // --------------------------------------------------------------------------
  const d3_1 = Number((tSegundo - tPrimeiro).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-3" class="scene-clip clip" data-start="${tPrimeiro}" data-duration="${d3_1}">
        <div class="scene-title-group" id="title-grp-3">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">CAMADA 01 // CÂMERAS DE RUA</div>
          <h1 class="display-title">+200.000 CÂMERAS PÚBLICAS AO VIVO</h1>
        </div>

        <div style="width:960px;background:rgba(12,20,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:22px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 50px rgba(52,211,153,0.35);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <span style="font-size:44px;">📹</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Feed #84.219 • Tóquio, Japão</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Cruzamento de Shibuya • 60 FPS 4K</div>
              </div>
            </div>
            <div style="background:#EF4444;color:#FFFFFF;font-family:var(--font-mono);font-size:24px;font-weight:900;padding:8px 18px;border-radius:12px;">● AO VIVO</div>
          </div>
          <!-- Imagem Real do README: Cidades e Câmeras do Globo 3D - HERO 720PX -->
          <div style="background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:18px;height:720px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
            <img id="globe-cities-img" src="assets/globe-cities.png" alt="Camera Feed" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;bottom:16px;left:20px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:8px 18px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
              ● SHIBUYA CROSSING • 35°39'N 139°42'E
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:20px 30px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">📹</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Cruzamentos & Avenidas de 128 Países</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Transmissões abertas em 4K e 60 quadros por segundo</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">24H AO VIVO</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-3", { x: 320, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power4.out" }, ${tPrimeiro});
      tl.fromTo("#globe-cities-img", { scale: 1.0 }, { scale: 1.08, duration: ${d3_1}, ease: "sine.inOut" }, ${tPrimeiro});
      tl.to("#scene-3", { y: -160, opacity: 0, duration: 0.22, ease: "power3.in" }, ${tPrimeiro + d3_1 - 0.22});
    `,
    sfxCues: [
      { type: 'whoosh', time: tPrimeiro },
      { type: 'pop', time: tPrimeiro + 0.3, volume: 0.3 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.2: CAMADA 2 - TRÁFEGO AÉREO (HERO GLOBO 660PX)
  // --------------------------------------------------------------------------
  const d3_2 = Number((tTerceiro - tSegundo).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-4" class="scene-clip clip" data-start="${tSegundo}" data-duration="${d3_2}">
        <div class="scene-title-group" id="title-grp-4">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">CAMADA 02 // TRÁFEGO AÉREO</div>
          <h1 class="display-title">TODOS OS AVIÕES EM VOO NO RADAR</h1>
        </div>

        <div style="width:960px;background:rgba(12,20,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:22px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 50px rgba(52,211,153,0.35);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <span id="plane-icon" style="font-size:44px;display:inline-block;">✈️</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Voo LA8090 • Boeing 787-9</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">São Paulo (GRU) ➔ Londres (LHR)</div>
              </div>
            </div>
            <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:24px;font-weight:900;padding:8px 18px;border-radius:12px;">38.000 pés</div>
          </div>
          <!-- Imagem Real do README: Rotas Aéreas no Globo 3D - HERO 720PX -->
          <div style="background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:18px;height:720px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
            <img id="globe-flights-img" src="assets/globe-flights.png" alt="Airline Routes" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;bottom:16px;left:20px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:8px 18px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
              ✈️ ROTAS AÉREAS ADS-B • 915 KM/H
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:20px 30px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">✈️</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Radares ADS-B Comerciais e Privados</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Altitude, velocidade e rota de qualquer voo ativo</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">915 KM/H</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-4", { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power4.out" }, ${tSegundo});
      tl.fromTo("#globe-flights-img", { scale: 1.0 }, { scale: 1.08, duration: ${d3_2}, ease: "sine.inOut" }, ${tSegundo});
      tl.fromTo("#plane-icon", { x: -20 }, { x: 20, duration: ${d3_2}, ease: "sine.inOut" }, ${tSegundo});
      tl.to("#scene-4", { x: -300, opacity: 0, duration: 0.22, ease: "power3.in" }, ${tSegundo + d3_2 - 0.22});
    `,
    sfxCues: [
      { type: 'whoosh', time: tSegundo },
      { type: 'pop', time: tSegundo + 0.3, volume: 0.3 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.3: CAMADA 3 - NAVIOS NOS PORTOS (HERO GLOBO 660PX)
  // --------------------------------------------------------------------------
  const d3_3 = Number((tQuarto - tTerceiro).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-5" class="scene-clip clip" data-start="${tTerceiro}" data-duration="${d3_3}">
        <div class="scene-title-group" id="title-grp-5">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">CAMADA 03 // RADAR MARÍTIMO</div>
          <h1 class="display-title">NAVIOS CARGUEIROS E PORTOS</h1>
        </div>

        <div style="width:960px;background:rgba(12,20,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:22px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 50px rgba(52,211,153,0.35);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <span style="font-size:44px;">🚢</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Navio Cargueiro Ever Given</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Porto de Santos • Rumo ao Panamá</div>
              </div>
            </div>
            <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:24px;font-weight:900;padding:8px 18px;border-radius:12px;">400m Comp.</div>
          </div>
          <!-- Imagem Real do README: Rotas Oceânicas e Cabos Submarinos no Globo 3D - HERO 720PX -->
          <div style="background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:18px;height:720px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
            <img id="globe-ships-img" src="assets/globe-ships.png" alt="Maritime Routes" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;bottom:16px;left:20px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:8px 18px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
              🚢 ROTAS OCEÂNICAS & CABOS SUBMARINOS
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:20px 30px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">🚢</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Mais de 80.000 Cargueiros e Petroleiros</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Portos internacionais, canais e cabos submarinos</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">ROTA NAVAL</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-5", { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power4.out" }, ${tTerceiro});
      tl.fromTo("#globe-ships-img", { scale: 1.0 }, { scale: 1.08, duration: ${d3_3}, ease: "sine.inOut" }, ${tTerceiro});
      tl.to("#scene-5", { y: -160, opacity: 0, duration: 0.22, ease: "power3.in" }, ${tTerceiro + d3_3 - 0.22});
    `,
    sfxCues: [
      { type: 'whoosh', time: tTerceiro },
      { type: 'pop', time: tTerceiro + 0.3, volume: 0.3 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 3.4: CAMADA 4 - SATÉLITES EM ÓRBITA (HERO GLOBO 660PX)
  // --------------------------------------------------------------------------
  const d3_4 = Number((tJunta - tQuarto).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-6" class="scene-clip clip" data-start="${tQuarto}" data-duration="${d3_4}">
        <div class="scene-title-group" id="title-grp-6">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">CAMADA 04 // RASTREAMENTO ORBITAL</div>
          <h1 class="display-title">SATÉLITES EM ÓRBITA NO CÉU</h1>
        </div>

        <div style="width:960px;background:rgba(12,20,16,0.96);border:2.5px solid #34D399;border-radius:28px;padding:22px 26px;display:flex;flex-direction:column;gap:14px;box-shadow:0 0 50px rgba(52,211,153,0.35);">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <span id="sat-icon" style="font-size:44px;display:inline-block;">🛰️</span>
              <div>
                <div style="font-size:32px;font-weight:900;color:#FFFFFF;">Estação Espacial Internacional (ISS)</div>
                <div style="font-size:24px;color:#34D399;font-weight:700;">Órbita Terrestre Baixa // Satélites Starlink</div>
              </div>
            </div>
            <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:24px;font-weight:900;padding:8px 18px;border-radius:12px;">418 km Alt.</div>
          </div>
          <!-- Imagem Real do README: Satélites em Órbita no Globo 3D - HERO 720PX -->
          <div style="background:#070b09;border:1.5px solid rgba(52,211,153,0.35);border-radius:18px;height:720px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">
            <img id="globe-sat-img" src="assets/globe-satellites.png" alt="Orbital Satellites" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;bottom:16px;left:20px;background:rgba(8,14,12,0.92);border:1.5px solid #34D399;border-radius:10px;padding:8px 18px;font-family:var(--font-mono);font-size:22px;color:#34D399;">
              🛰️ ISS & CONSTELAÇÃO STARLINK • 27.600 KM/H
            </div>
          </div>
        </div>

        <!-- Bottom Benefit Chip -->
        <div style="width:960px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:20px 30px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <div style="display:flex;align-items:center;gap:16px;">
            <span style="font-size:36px;">🛰️</span>
            <div>
              <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Estação Espacial ISS & Starlink</div>
              <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Órbita baixa e trajetória tridimensional em tempo real</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono);font-size:22px;font-weight:900;color:#34D399;">418 KM ALT</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-6", { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power4.out" }, ${tQuarto});
      tl.fromTo("#globe-sat-img", { scale: 1.0 }, { scale: 1.08, duration: ${d3_4}, ease: "sine.inOut" }, ${tQuarto});
      tl.fromTo("#sat-icon", { rotate: -15, scale: 0.9 }, { rotate: 15, scale: 1.1, duration: ${d3_4}, ease: "sine.inOut" }, ${tQuarto});
      tl.to("#scene-6", { scale: 0.85, opacity: 0, duration: 0.22, ease: "power3.in" }, ${tQuarto + d3_4 - 0.22});
    `,
    sfxCues: [
      { type: 'whoosh', time: tQuarto },
      { type: 'pop', time: tQuarto + 0.3, volume: 0.3 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 4: INTEGRAÇÃO DOS 4 SINAIS COM MOSAICO VISUAL (EMERALD NOIR)
  // --------------------------------------------------------------------------
  const d4 = Number((tCta - tJunta).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-7" class="scene-clip clip" data-start="${tJunta}" data-duration="${d4}">
        <div class="scene-title-group" id="title-grp-7">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">SINAIS PÚBLICOS UNIFICADOS</div>
          <h1 class="display-title">CARREGA TUDO EM 1 SEGUNDO</h1>
        </div>

        <div style="width:960px;display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div id="quad-1" style="background:#070b09;border:2.5px solid #34D399;border-radius:22px;overflow:hidden;position:relative;height:370px;box-shadow:0 0 25px rgba(52,211,153,0.25);">
            <img src="assets/globe-cities.png" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%);"></div>
            <div style="position:absolute;bottom:18px;left:18px;color:#34D399;font-weight:900;font-size:28px;">📹 Câmeras de Rua</div>
          </div>
          <div id="quad-2" style="background:#070b09;border:2.5px solid #10A37F;border-radius:22px;overflow:hidden;position:relative;height:370px;box-shadow:0 0 25px rgba(16,163,127,0.25);">
            <img src="assets/globe-flights.png" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%);"></div>
            <div style="position:absolute;bottom:18px;left:18px;color:#34D399;font-weight:900;font-size:28px;">✈️ Tráfego Aéreo</div>
          </div>
          <div id="quad-3" style="background:#070b09;border:2.5px solid #10A37F;border-radius:22px;overflow:hidden;position:relative;height:370px;box-shadow:0 0 25px rgba(16,163,127,0.25);">
            <img src="assets/globe-ships.png" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%);"></div>
            <div style="position:absolute;bottom:18px;left:18px;color:#34D399;font-weight:900;font-size:28px;">🚢 Rotas Marítimas</div>
          </div>
          <div id="quad-4" style="background:#070b09;border:2.5px solid #34D399;border-radius:22px;overflow:hidden;position:relative;height:370px;box-shadow:0 0 25px rgba(52,211,153,0.25);">
            <img src="assets/globe-satellites.png" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%);"></div>
            <div style="position:absolute;bottom:18px;left:18px;color:#34D399;font-weight:900;font-size:28px;">🛰️ Satélites em Órbita</div>
          </div>
        </div>

        <div id="lat-badge" style="width:960px;background:linear-gradient(135deg, rgba(16,45,35,0.98) 0%, rgba(8,20,16,0.98) 100%);border:2.5px solid #34D399;border-radius:24px;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 40px rgba(52,211,153,0.35);">
          <div>
            <div style="font-size:32px;font-weight:900;color:#FFFFFF;">⚡ Latência: 0.4s • Direto no Navegador</div>
            <div style="font-size:22px;color:#9CA3AF;font-weight:600;margin-top:4px;">Sem cadastro, sem servidores intermediários</div>
          </div>
          <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:30px;font-weight:900;padding:12px 26px;border-radius:14px;">R$ 0,00</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-7", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.38, ease: "back.out(1.5)" }, ${tJunta});
      tl.fromTo("#quad-1, #quad-2, #quad-3, #quad-4", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: "back.out(1.6)" }, ${tJunta + 0.1});
      tl.to("#scene-7", { y: -160, opacity: 0, duration: 0.24, ease: "power3.in" }, ${tJunta + d4 - 0.24});
    `,
    sfxCues: [
      { type: 'whoosh', time: tJunta },
      { type: 'pop', time: tJunta + 0.2, volume: 0.32 }
    ]
  });

  // --------------------------------------------------------------------------
  // CENA 5: CTA COM DIGITAÇÃO E PULSO (EMERALD NOIR)
  // --------------------------------------------------------------------------
  const d5 = Number((totalDuration - tCta).toFixed(2));
  scenes.push({
    html: `
      <section id="scene-8" class="scene-clip scene-center clip" data-start="${tCta}" data-duration="${d5}" style="gap:20px;">
        <div class="scene-title-group" style="gap:6px;">
          <div class="kicker-pill" style="color:#34D399;border-color:#34D399;">COMENTA AQUI EMBAIXO</div>
          <h1 id="hero-mapa-cta" style="font-size:120px;font-weight:900;color:#34D399;letter-spacing:-3px;line-height:1;text-shadow:0 0 50px rgba(52,211,153,0.75);">
            MAPA
          </h1>
        </div>

        <div style="width:920px;background:#0C1310;border:2.5px solid #34D399;border-radius:999px;padding:18px 34px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
          <span style="font-family:var(--font-mono);font-size:36px;font-weight:900;color:#FFFFFF;display:flex;align-items:center;gap:6px;">
            💬 <span id="mapa-input-text"></span><span class="cursor-blink" style="color:#34D399;">|</span>
          </span>
          <span id="btn-pub-mapa" style="background:#34D399;color:#060807;font-size:30px;font-weight:900;padding:10px 28px;border-radius:999px;">Publicar ↑</span>
        </div>

        <div style="width:920px;background:rgba(12,18,15,0.96);border:1.5px solid rgba(255,255,255,0.18);border-radius:26px;padding:24px 32px;display:flex;flex-direction:column;gap:12px;">
          <div style="font-family:var(--font-mono);font-size:28px;font-weight:800;color:#34D399;">📦 O QUE EU TE ENVIO NO DIRECT:</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">1️⃣ Endereço Oficial do Mapa 3D no Navegador</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">2️⃣ Lista das 50 Melhores Câmeras Ao Vivo no Mundo</div>
          <div style="font-size:28px;font-weight:700;color:#F3F4F6;">3️⃣ Guia das 4 Camadas (Ruas, Voos, Navios e Satélites)</div>
        </div>

        <div id="follow-card-mapa" style="width:920px;background:linear-gradient(135deg, rgba(16,163,127,0.25) 0%, rgba(10,16,14,0.98) 100%);border:2px solid #34D399;border-radius:26px;padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:20px;">
            <div style="width:70px;height:70px;border-radius:50%;background:#34D399;color:#060807;font-family:var(--font-mono);font-size:32px;font-weight:900;display:flex;align-items:center;justify-content:center;">DR</div>
            <div>
              <div style="font-size:34px;font-weight:900;color:#FFFFFF;">@devremoto.br</div>
              <div style="font-size:28px;color:#D1D5DB;font-weight:600;">Me segue para descobrir segredos da internet!</div>
            </div>
          </div>
          <div id="follow-pill-mapa" style="background:#34D399;color:#060807;font-size:30px;font-weight:900;padding:14px 30px;border-radius:999px;">Seguindo ✓</div>
        </div>
      </section>
    `,
    gsapScript: `
      tl.fromTo("#scene-8", { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: "back.out(1.5)" }, ${tCta});
      tl.fromTo("#hero-mapa-cta", { scale: 0.6 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }, ${tCta + 0.1});
      tl.call(() => {
        const el = document.getElementById("mapa-input-text");
        if (el) el.textContent = "M";
      }, null, ${tCta + 0.4});
      tl.call(() => {
        const el = document.getElementById("mapa-input-text");
        if (el) el.textContent = "MA";
      }, null, ${tCta + 0.55});
      tl.call(() => {
        const el = document.getElementById("mapa-input-text");
        if (el) el.textContent = "MAP";
      }, null, ${tCta + 0.7});
      tl.call(() => {
        const el = document.getElementById("mapa-input-text");
        if (el) el.textContent = "MAPA";
      }, null, ${tCta + 0.85});
      tl.fromTo("#btn-pub-mapa", { scale: 1 }, { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 }, ${tCta + 1.1});
      tl.to("#follow-pill-mapa", { scale: 1.08, duration: 0.6, repeat: 8, yoyo: true, ease: "sine.inOut" }, ${tCta + 1.2});
    `,
    sfxCues: [
      { type: 'whoosh', time: tCta },
      { type: 'impact', time: tCta + 0.15, volume: 0.38 },
      { type: 'click', time: tCta + 1.1, volume: 0.3 }
    ]
  });

  return scenes;
}
