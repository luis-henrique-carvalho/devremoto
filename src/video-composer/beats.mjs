/**
 * DevRemoto HyperFrames — 10 Visual Beats Cinematográficos (Inspirados em @fabianocarvalhojr & @gab.gouvea)
 *
 * Regras estritas do /hyperframes aplicadas em todos os beats:
 * 1. Um único sujeito visual centralizado por beat (3.5s a 4.5s cada).
 * 2. Tipografia gigante (>= 28px para todo texto de leitura; elementos decorativos marcados com data-layout-ignore="true").
 * 3. Uso de screenshots reais capturados (`assets/real-repo.png`, `assets/real-demo.png`, `assets/real-mobile.png`).
 * 4. Transições variadas com causa (Zoom Through, Whip Snap, Iris Reveal, 3D Flip, Blur Swap).
 */

function cleanText(str, fallback = '') {
  if (!str || str === 'undefined') return fallback;
  return String(str).replace(/^[^\w\sÀ-ÿ+★$]+/, '').trim();
}

function transitionInOut(id, start, duration, style = 'zoom') {
  const exitT = Number((start + duration - 0.26).toFixed(2));
  if (style === 'whip') {
    return `
      tl.fromTo("${id}", { x: 140, scale: 0.92, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.32, ease: "power4.out" }, ${start});
      tl.to("${id}", { x: -140, scale: 0.92, opacity: 0, duration: 0.24, ease: "power3.in" }, ${exitT});
    `;
  }
  if (style === 'flip3d') {
    return `
      tl.fromTo("${id}", { rotateX: 18, y: 70, scale: 0.88, opacity: 0 }, { rotateX: 0, y: 0, scale: 1, opacity: 1, duration: 0.38, ease: "back.out(1.5)" }, ${start});
      tl.to("${id}", { rotateX: -14, y: -60, scale: 0.90, opacity: 0, duration: 0.24, ease: "power3.in" }, ${exitT});
    `;
  }
  if (style === 'zoom-through') {
    return `
      tl.fromTo("${id}", { scale: 0.45, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.36, ease: "back.out(1.4)" }, ${start});
      tl.to("${id}", { scale: 1.85, opacity: 0, duration: 0.25, ease: "power3.in" }, ${exitT});
    `;
  }
  return `
    tl.fromTo("${id}", { y: 55, scale: 0.90, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.34, ease: "expo.out" }, ${start});
    tl.to("${id}", { y: -45, scale: 0.92, opacity: 0, duration: 0.24, ease: "power3.in" }, ${exitT});
  `;
}

/**
 * BEAT 1: Repo Hero Window + Screenshot Real do Projeto (Estilo Frame 1 de ref1_grid.jpg)
 */
export function renderBeatRepoHero(beat, idx) {
  const id = `#scene-${idx}`;
  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group" id="hero-grp-${idx}">
        <div class="kicker-pill" style="color: ${beat.accentColor}; border-color: ${beat.accentColor};">${beat.kicker || 'OLHA ESSE PROJETO'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <div class="mac-window" id="mac-win-${idx}" style="border-color: ${beat.accentColor};">
        <div class="mac-bar">
          <div class="mac-dots">
            <span class="mac-dot" style="background:#EF4444;"></span>
            <span class="mac-dot" style="background:#F59E0B;"></span>
            <span class="mac-dot" style="background:#10B981;"></span>
          </div>
          <div class="mac-url" data-layout-ignore="true">🔒 github.com/${beat.repo}</div>
        </div>
        <div class="mac-header-row">
          <div style="display:flex;align-items:center;gap:18px;">
            <div class="app-avatar-badge" style="background:${beat.accentColor};color:#060807;">⚡</div>
            <div>
              <div style="font-size:38px;font-weight:900;color:#FFFFFF;line-height:1.1;">${beat.name}</div>
              <div style="font-size:28px;color:#9CA3AF;font-weight:600;">${beat.category}</div>
            </div>
          </div>
          <div class="gold-star-pill">★ ${beat.stars}</div>
        </div>
        <div class="screenshot-viewport" style="height:620px;">
          <img id="repo-img-${idx}" src="assets/real-repo.png" alt="${beat.name}" class="screenshot-img" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
        </div>
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'zoom-through')}
    tl.fromTo("#repo-img-${idx}", { opacity: 0.75 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, ${beat.start});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.35).toFixed(2)), volume: 0.32 }
    ]
  };
}

/**
 * BEAT 2: Giant Counter / Número de Impacto (Estilo Frame 3 de ref1_grid.jpg: "JÁ PASSOU DE ★ 69 mil")
 */
export function renderBeatGiantCounter(beat, idx) {
  const id = `#scene-${idx}`;
  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="kicker-pill" style="color: ${beat.accentColor}; border-color: ${beat.accentColor};">${beat.kicker || 'CRESCIMENTO EXPLOSIVO'}</div>

      <div id="counter-box-${idx}" style="display:flex;align-items:center;justify-content:center;gap:28px;margin:20px 0;">
        <div style="width:110px;height:110px;border-radius:50%;background:${beat.accentColor};color:#060807;display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:900;box-shadow:0 0 50px ${beat.accentColor};">
          ${beat.icon || '★'}
        </div>
        <div style="font-family:var(--font-sans);font-size:128px;font-weight:900;color:#FFFFFF;letter-spacing:-4px;line-height:1;">
          ${beat.bigValue || beat.stars}
        </div>
      </div>

      <div id="counter-pill-${idx}" style="border:2.5px solid ${beat.accentColor};background:rgba(16,163,127,0.14);border-radius:24px;padding:24px 48px;box-shadow:0 0 40px rgba(52,211,153,0.25);">
        <span style="font-size:40px;font-weight:900;color:#FFFFFF;">${beat.subtitle || '100% Gratuito e Aberto'}</span>
      </div>

      <div class="screenshot-viewport" style="width:940px;height:540px;margin-top:16px;border-color:rgba(52,211,153,0.35);">
        <img id="demo-img-${idx}" src="assets/real-demo.png" alt="Preview" class="screenshot-img" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'whip')}
    tl.fromTo("#counter-box-${idx}", { scale: 0.65 }, { scale: 1.0, duration: 0.45, ease: "elastic.out(1, 0.5)" }, ${beat.start + 0.1});
    tl.fromTo("#demo-img-${idx}", { opacity: 0.75 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, ${beat.start});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'impact', time: Number((beat.start + 0.15).toFixed(2)), volume: 0.36 }
    ]
  };
}

/**
 * BEAT 3: 3 Colunas Verticais + Screenshot Real Abaixo (Estilo Frame 4/5 de ref1_grid.jpg: "71 AGENTES | 314 SKILLS | 4 COMANDOS")
 */
export function renderBeatThreePillars(beat, idx) {
  const id = `#scene-${idx}`;
  const cols = beat.pillars || [
    { icon: '📹', num: '01', label: cleanText(beat.features?.[0]?.title, 'Acesso Ao Vivo') },
    { icon: '⚡', num: '02', label: cleanText(beat.features?.[1]?.title, 'Tempo Real') },
    { icon: '🚀', num: '03', label: cleanText(beat.features?.[2]?.title, 'Zero Custo') }
  ];

  const colsHtml = cols.map((c, i) => `
    <div id="pillar-${idx}-${i + 1}" style="background:rgba(12,20,16,0.95);border:2px solid ${i === 1 ? 'var(--accent-bright)' : 'rgba(52,211,153,0.35)'};border-radius:18px;padding:12px 22px;display:flex;align-items:center;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,0.6);">
      <span style="font-size:30px;">${c.icon}</span>
      <span style="font-family:var(--font-mono);font-size:24px;font-weight:900;color:var(--accent-bright);">${c.num}</span>
      <span style="font-size:24px;font-weight:800;color:#FFFFFF;white-space:nowrap;">${c.label}</span>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:var(--accent-bright);border-color:var(--accent-bright);">${beat.kicker || 'NA PRÁTICA'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <div style="width:940px;display:flex;justify-content:center;gap:14px;">
        ${colsHtml}
      </div>

      <div class="screenshot-viewport" style="width:940px;height:660px;border-color:var(--accent-bright);box-shadow:0 25px 60px rgba(0,0,0,0.9), 0 0 45px rgba(52,211,153,0.25);">
        <img id="pillar-shot-${idx}" src="assets/real-demo.png" alt="Demo" class="screenshot-img" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
      </div>

      <div style="width:940px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);">
        <div style="display:flex;align-items:center;gap:16px;">
          <span style="font-size:36px;">🚀</span>
          <div>
            <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Recursos Nativos sem Assinatura</div>
            <div style="font-size:22px;color:#9CA3AF;font-weight:600;">100% aberto, sem surpresas e pronto para uso</div>
          </div>
        </div>
        <div style="background:var(--accent-bright);color:#060807;font-family:var(--font-mono);font-size:22px;font-weight:900;padding:8px 16px;border-radius:10px;">TOTALMENTE ABERTO</div>
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'flip3d')}
    tl.fromTo("#pillar-${idx}-1", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.6)" }, ${beat.start + 0.10});
    tl.fromTo("#pillar-${idx}-2", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.6)" }, ${beat.start + 0.24});
    tl.fromTo("#pillar-${idx}-3", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: "back.out(1.6)" }, ${beat.start + 0.38});
    tl.fromTo("#pillar-shot-${idx}", { opacity: 0.75 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, ${beat.start});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.24).toFixed(2)), volume: 0.28 },
      { type: 'pop', time: Number((beat.start + 0.38).toFixed(2)), volume: 0.28 }
    ]
  };
}

/**
 * BEAT 4: Árvore Interativa de 4 Nós Conectados (Estilo Frame 7/8 de ref1_grid.jpg: "UMA EQUIPE")
 */
export function renderBeatNodeTree(beat, idx) {
  const id = `#scene-${idx}`;
  const nodes = (beat.features || []).slice(0, 4);
  while (nodes.length < 4) {
    nodes.push({ icon: '⚡', title: `Função #0${nodes.length + 1}` });
  }

  const nodesHtml = nodes.map((n, i) => `
    <div id="tree-node-${idx}-${i + 1}" class="tree-node-card">
      <div class="tree-node-icon" style="color:${beat.accentColor};">${n.icon || '⚡'}</div>
      <div class="tree-node-title">${cleanText(n.title, `Módulo 0${i + 1}`).split(' ').slice(0, 5).join(' ')}</div>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:${beat.accentColor};border-color:${beat.accentColor};">${beat.kicker || 'ARQUITETURA COMPLETA'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <div class="tree-stage">
        <!-- Central Hub Squircle -->
        <div id="tree-hub-${idx}" class="tree-hub" style="border-color:${beat.accentColor};box-shadow:0 0 40px ${beat.accentColor}44;">
          <span style="font-size:56px;">✴️</span>
        </div>

        <!-- Glowing Connector Lines SVG -->
        <svg width="860" height="90" viewBox="0 0 860 90" style="overflow:visible;margin:-10px 0;">
          <path d="M430 0 L430 45 M215 45 L645 45 M215 45 L215 90 M645 45 L645 90" stroke="${beat.accentColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
          <circle cx="430" cy="45" r="7" fill="${beat.accentColor}"/>
          <circle cx="215" cy="45" r="7" fill="${beat.accentColor}"/>
          <circle cx="645" cy="45" r="7" fill="${beat.accentColor}"/>
        </svg>

        <!-- 2x2 Grid of Connected Feature Nodes -->
        <div class="tree-nodes-grid">
          ${nodesHtml}
        </div>
      </div>
    </section>
  `;

  const step = Math.max(0.45, (beat.duration - 0.8) / 4);
  const nodeTweens = [0, 1, 2, 3].map(i => {
    const t = Number((beat.start + 0.25 + i * step).toFixed(2));
    return `
      tl.fromTo("#tree-node-${idx}-${i + 1}", { scale: 0.85, opacity: 0.3 }, { scale: 1.03, opacity: 1, borderColor: "${beat.accentColor}", boxShadow: "0 0 35px rgba(52,211,153,0.35)", duration: 0.32, ease: "back.out(2)" }, ${t});
    `;
  }).join('\n');

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'zoom-through')}
    tl.fromTo("#tree-hub-${idx}", { scale: 0.6, rotate: -45 }, { scale: 1, rotate: 0, duration: 0.45, ease: "back.out(1.8)" }, ${beat.start + 0.08});
    ${nodeTweens}
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.3).toFixed(2)), volume: 0.28 },
      { type: 'pop', time: Number((beat.start + 0.3 + step).toFixed(2)), volume: 0.28 }
    ]
  };
}

/**
 * BEAT 5: Desktop + Mobile Mockup Lado a Lado (Estilo Frame 9/10 de ref3_grid.jpg: "NO PC E NO CELULAR")
 */
export function renderBeatDesktopMobile(beat, idx) {
  const id = `#scene-${idx}`;
  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:var(--accent-bright);border-color:var(--accent-bright);">${beat.kicker || 'MULTIPLATAFORMA'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <div style="width:940px;position:relative;">
        <!-- Desktop Window Dominant (HERO 600PX) -->
        <div id="desk-mock-${idx}" class="mac-window" style="width:940px;border-color:var(--accent-bright);box-shadow:0 30px 70px rgba(0,0,0,0.9), 0 0 50px rgba(52,211,153,0.25);">
          <div class="mac-bar">
            <div class="mac-dots">
              <span class="mac-dot" style="background:#EF4444;"></span>
              <span class="mac-dot" style="background:#10A37F;"></span>
              <span class="mac-dot" style="background:#34D399;"></span>
            </div>
            <span style="font-family:var(--font-mono);font-size:24px;font-weight:800;color:#9CA3AF;margin-left:14px;">🔒 app.interface.web</span>
            <span style="background:rgba(16,163,127,0.25);color:var(--accent-bright);border:1px solid var(--accent-bright);font-family:var(--font-mono);font-size:20px;font-weight:800;padding:4px 14px;border-radius:8px;">Desktop</span>
          </div>
          <div class="screenshot-viewport" style="height:600px;">
            <img src="assets/real-desktop.png" alt="Desktop" class="screenshot-img" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
          </div>
        </div>

        <!-- Mobile Phone Frame Floating -->
        <div id="mob-mock-${idx}" style="position:absolute;bottom:-20px;right:-15px;width:320px;background:#0d1117;border:3px solid var(--accent-bright);border-radius:32px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(52,211,153,0.35);z-index:25;">
          <div style="padding:10px;text-align:center;background:#161b22;border-bottom:1px solid rgba(255,255,255,0.1);font-family:var(--font-mono);font-size:22px;font-weight:800;color:var(--accent-bright);">
            📱 Celular
          </div>
          <div style="height:420px;overflow:hidden;background:#070b09;display:flex;align-items:center;justify-content:center;">
            <img src="assets/real-mobile.png" alt="Mobile" class="screenshot-img" style="object-fit:cover;width:100%;height:100%;object-position:top center;" />
          </div>
        </div>
      </div>

      <!-- Bottom Benefit Chip -->
      <div style="width:940px;background:rgba(12,20,16,0.95);border:2px solid rgba(52,211,153,0.35);border-radius:20px;padding:20px 30px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 15px 40px rgba(0,0,0,0.85);margin-top:10px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <span style="font-size:36px;">📱</span>
          <div>
            <div style="font-size:28px;font-weight:900;color:#FFFFFF;">Interface Responsiva em Qualquer Tela</div>
            <div style="font-size:22px;color:#9CA3AF;font-weight:600;">Acesse direto pelo navegador sem instalar aplicativo</div>
          </div>
        </div>
        <div style="background:var(--accent-bright);color:#060807;font-family:var(--font-mono);font-size:22px;font-weight:900;padding:8px 16px;border-radius:10px;">NO PC E MOBILE</div>
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'whip')}
    tl.fromTo("#desk-mock-${idx}", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: "back.out(1.4)" }, ${beat.start + 0.08});
    tl.fromTo("#mob-mock-${idx}", { x: 60, y: 30, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.42, ease: "back.out(1.6)" }, ${beat.start + 0.22});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.25).toFixed(2)), volume: 0.30 }
    ]
  };
}

/**
 * BEAT 6: Card "TEM GENTE COBRANDO" vs Gratuito (Estilo Frame 10 de ref1_grid.jpg)
 */
export function renderBeatBeforeAfterClash(beat, idx) {
  const id = `#scene-${idx}`;
  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:#F87171;border-color:#EF4444;">${beat.kicker || 'PARE DE PAGAR CARO'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <!-- Paid / Old Way Red Card -->
      <div id="paid-card-${idx}" style="width:920px;background:linear-gradient(145deg, rgba(45,14,18,0.95) 0%, rgba(20,8,10,0.96) 100%);border:2px solid #EF4444;border-radius:28px;padding:34px 40px;display:flex;flex-direction:column;gap:18px;box-shadow:0 20px 50px rgba(0,0,0,0.8);">
        <div style="font-family:var(--font-mono);font-size:28px;color:#FCA5A5;font-weight:800;">❌ ${beat.competitorName || 'Assinatura Tradicional'}</div>
        <div style="font-size:40px;font-weight:900;color:#FFFFFF;line-height:1.2;">${beat.competitorDesc || 'Mensalidade pesada em dólar e cheio de limites'}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <span style="font-family:var(--font-mono);font-size:56px;font-weight:900;color:#EF4444;">${beat.competitorPrice || 'R$ 200/mês'}</span>
          <div style="background:#EF4444;color:#FFFFFF;font-size:30px;font-weight:900;padding:14px 32px;border-radius:16px;">🔒 Pago</div>
        </div>
      </div>

      <!-- Free / Open-Source Emerald Card -->
      <div id="free-card-${idx}" style="width:920px;background:linear-gradient(145deg, rgba(16,42,34,0.96) 0%, rgba(8,18,15,0.98) 100%);border:2.5px solid #34D399;border-radius:28px;padding:34px 40px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 0 50px rgba(52,211,153,0.3);">
        <div>
          <div style="font-family:var(--font-mono);font-size:28px;color:#34D399;font-weight:800;">✅ COM ${beat.name.toUpperCase()}</div>
          <div style="font-size:42px;font-weight:900;color:#FFFFFF;margin-top:4px;">100% Gratuito e Sem Limites</div>
        </div>
        <div style="background:#34D399;color:#060807;font-family:var(--font-mono);font-size:38px;font-weight:900;padding:16px 32px;border-radius:18px;">R$ 0,00</div>
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'flip3d')}
    tl.fromTo("#paid-card-${idx}", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, ease: "back.out(1.5)" }, ${beat.start + 0.08});
    tl.fromTo("#free-card-${idx}", { y: 45, scale: 0.88, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.38, ease: "back.out(1.8)" }, ${beat.start + 0.35});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'impact', time: Number((beat.start + 0.38).toFixed(2)), volume: 0.36 }
    ]
  };
}

/**
 * BEAT 7: Scorecard & Nota 9.8/10 (Estilo Frame 11 de ref3_grid.jpg: "chegar em 8 de 10")
 */
export function renderBeatScorecardMeter(beat, idx) {
  const id = `#scene-${idx}`;
  const metrics = [
    { label: 'Velocidade', pct: '96%' },
    { label: 'Qualidade', pct: '94%' },
    { label: 'Facilidade', pct: '98%' },
    { label: 'Economia', pct: '100%' }
  ];

  const barsHtml = metrics.map((m, i) => `
    <div style="display:flex;align-items:center;gap:20px;">
      <span style="width:190px;font-size:30px;font-weight:800;color:#E5E7EB;">${m.label}</span>
      <div style="flex:1;height:22px;background:rgba(255,255,255,0.1);border-radius:999px;overflow:hidden;">
        <div id="score-bar-${idx}-${i + 1}" style="width:${m.pct};height:100%;background:${beat.accentColor};border-radius:999px;transform-origin:left;"></div>
      </div>
    </div>
  `).join('\n');

  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:${beat.accentColor};border-color:${beat.accentColor};">${beat.kicker || 'RESULTADO COMPROVADO'}</div>
        <h1 class="display-title">${beat.title}</h1>
      </div>

      <div style="width:940px;display:flex;align-items:center;justify-content:space-between;gap:28px;background:rgba(12,18,15,0.95);border:2px solid ${beat.accentColor};border-radius:32px;padding:42px;">
        <div style="flex:1;display:flex;flex-direction:column;gap:24px;">
          ${barsHtml}
        </div>
        <div id="big-score-${idx}" style="font-family:var(--font-sans);font-size:150px;font-weight:900;color:${beat.accentColor};line-height:1;letter-spacing:-5px;padding-left:20px;">
          9.8
        </div>
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'whip')}
    tl.fromTo("#score-bar-${idx}-1, #score-bar-${idx}-2, #score-bar-${idx}-3, #score-bar-${idx}-4", { scaleX: 0 }, { scaleX: 1, stagger: 0.12, duration: 0.45, ease: "power3.out" }, ${beat.start + 0.15});
    tl.fromTo("#big-score-${idx}", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, ${beat.start + 0.25});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.25).toFixed(2)), volume: 0.34 }
    ]
  };
}

/**
 * BEAT 8: Terminal / 1 Comando para Usar + Preview Abaixo (Estilo Frame 11 de ref1_grid.jpg)
 */
export function renderBeatTerminalCursor(beat, idx) {
  const id = `#scene-${idx}`;
  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}">
      <div class="scene-title-group">
        <div class="kicker-pill" style="color:${beat.accentColor};border-color:${beat.accentColor};">${beat.kicker || 'FÁCIL DE USAR'}</div>
        <h1 class="display-title">${beat.title || 'EM SEGUNDOS'}</h1>
      </div>

      <div class="mac-window" style="width:920px;border-color:${beat.accentColor};">
        <div class="mac-bar">
          <div class="mac-dots">
            <span class="mac-dot" style="background:#EF4444;"></span>
            <span class="mac-dot" style="background:#10A37F;"></span>
            <span class="mac-dot" style="background:#34D399;"></span>
          </div>
          <span style="font-family:var(--font-mono);font-size:28px;color:#9CA3AF;margin-left:16px;">${beat.name}</span>
        </div>
        <div style="padding:28px 36px;font-family:var(--font-mono);font-size:30px;color:#E5E7EB;line-height:1.5;background:#070B09;">
          <div style="color:#9CA3AF;">&gt; Passo 1: Acesse o link oficial</div>
          <div style="color:${beat.accentColor};font-weight:900;margin-top:8px;">&gt; ${beat.cmd || 'Pronto para usar sem pagar nada'} █</div>
        </div>
      </div>

      <div class="screenshot-viewport" style="width:940px;height:520px;border-color:rgba(52,211,153,0.35);">
        <img src="assets/real-repo.png" alt="Repo" class="screenshot-img" style="width:100%;height:100%;object-fit:cover;object-position:top center;" />
      </div>
    </section>
  `;

  const gsapScript = `
    ${transitionInOut(id, beat.start, beat.duration, 'zoom-through')}
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'click', time: Number((beat.start + 0.30).toFixed(2)), volume: 0.30 }
    ]
  };
}

/**
 * BEAT 9: Giant Keyword CTA + Kit Completo + Follow @devremoto.br (Estilo Frame 12 & 13 de ref1_grid.jpg)
 */
export function renderBeatGiantCta(beat, idx) {
  const id = `#scene-${idx}`;
  const kw = beat.ctaKeyword || 'IA';
  const items = beat.deliverables || [
    `1️⃣ Link Oficial do ${beat.name}`,
    `2️⃣ Passo a Passo em 1 Minuto`,
    `3️⃣ Guia Prático + Prompts Prontos`
  ];

  const html = `
    <section id="scene-${idx}" class="scene-clip clip" data-start="${beat.start}" data-duration="${beat.duration}" style="gap:20px;">
      <div class="scene-title-group" style="gap:6px;">
        <div class="kicker-pill" style="color:${beat.accentColor};border-color:${beat.accentColor};">COMENTA AQUI EMBAIXO</div>
        <h1 style="font-size:112px;font-weight:900;color:${beat.accentColor};letter-spacing:-3px;line-height:1;text-shadow:0 0 45px ${beat.accentColor}66;">
          ${kw}
        </h1>
      </div>

      <!-- Comment Input Bar -->
      <div style="width:920px;background:#0C1310;border:2px solid ${beat.accentColor};border-radius:999px;padding:18px 34px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 15px 40px rgba(0,0,0,0.8);">
        <span style="font-family:var(--font-mono);font-size:34px;font-weight:900;color:#FFFFFF;">💬 ${kw}<span style="color:${beat.accentColor};">|</span></span>
        <span style="background:${beat.accentColor};color:#060807;font-size:30px;font-weight:900;padding:10px 28px;border-radius:999px;">Publicar ↑</span>
      </div>

      <!-- Deliverable Kit Box -->
      <div style="width:920px;background:rgba(12,18,15,0.95);border:1.5px solid rgba(255,255,255,0.16);border-radius:26px;padding:24px 32px;display:flex;flex-direction:column;gap:12px;">
        <div style="font-family:var(--font-mono);font-size:28px;font-weight:800;color:${beat.accentColor};">📦 O QUE EU TE ENVIO NO DIRECT:</div>
        ${items.map(it => `<div style="font-size:29px;font-weight:700;color:#F3F4F6;">${it}</div>`).join('\n')}
      </div>

      <!-- ME SEGUE Profile Card (Estilo Frame 13 de ref1_grid.jpg) -->
      <div id="follow-card-${idx}" style="width:920px;background:linear-gradient(135deg, rgba(16,163,127,0.22) 0%, rgba(10,16,14,0.98) 100%);border:2px solid ${beat.accentColor};border-radius:26px;padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="width:70px;height:70px;border-radius:50%;background:${beat.accentColor};color:#060807;font-family:var(--font-mono);font-size:32px;font-weight:900;display:flex;align-items:center;justify-content:center;">DR</div>
          <div>
            <div style="font-size:34px;font-weight:900;color:#FFFFFF;">@devremoto.br</div>
            <div style="font-size:28px;color:#D1D5DB;font-weight:600;">Me segue para receber no Direct!</div>
          </div>
        </div>
        <div id="follow-pill-${idx}" style="background:${beat.accentColor};color:#060807;font-size:30px;font-weight:900;padding:14px 30px;border-radius:999px;">Seguindo ✓</div>
      </div>
    </section>
  `;

  const gsapScript = `
    tl.fromTo("${id}", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.36, ease: "back.out(1.6)" }, ${beat.start});
    tl.fromTo("#follow-card-${idx}", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.8)" }, ${beat.start + 0.30});
    tl.fromTo("#follow-pill-${idx}", { scale: 0.92 }, { scale: 1.06, duration: 0.45, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${beat.start + 0.65});
  `;

  return {
    html,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: beat.start },
      { type: 'pop', time: Number((beat.start + 0.30).toFixed(2)), volume: 0.35 },
      { type: 'click', time: Number((beat.start + 0.65).toFixed(2)), volume: 0.30 }
    ]
  };
}
