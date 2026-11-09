/**
 * BaseLayout — Fundações da Identidade OpenAI Emerald Noir e Safe Zones
 */

export function renderBaseStyles() {
  return `
    :root {
      --bg-canvas: #060807;
      --accent-emerald: #10A37F;
      --accent-bright: #34D399;
      --accent-cyan: #38BDF8;
      --accent-gold: #FCD34D;
      --accent-crimson: #EF4444;
      --text-primary: #F9FAFB;
      --text-secondary: #9CA3AF;
      --font-sans: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: var(--bg-canvas);
      font-family: var(--font-sans);
      color: var(--text-primary);
      -webkit-font-smoothing: antialiased;
    }

    #root {
      width: 1080px;
      height: 1920px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(circle at 50% 30%, #0d1a15 0%, #060807 70%);
    }

    .grid-plane {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(16, 163, 127, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(16, 163, 127, 0.08) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }

    .glow-orb-top {
      position: absolute;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      width: 900px;
      height: 700px;
      background: radial-gradient(circle, rgba(16, 163, 127, 0.22) 0%, transparent 70%);
      filter: blur(120px);
      pointer-events: none;
    }

    /* Safe Zone Superior (0 a 140px) */
    .header-fixed {
      position: absolute;
      top: 60px;
      left: 60px;
      right: 60px;
      height: 62px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(10, 15, 13, 0.85);
      border: 1px solid rgba(52, 211, 153, 0.35);
      padding: 10px 24px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 26px;
      font-weight: 700;
    }
    .brand-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-bright);
      box-shadow: 0 0 12px var(--accent-bright);
    }
    .tag-pill {
      font-family: var(--font-mono);
      font-size: 24px;
      font-weight: 800;
      color: var(--accent-bright);
      background: rgba(16, 24, 20, 0.85);
      border: 1px solid rgba(52, 211, 153, 0.3);
      padding: 10px 22px;
      border-radius: 999px;
      letter-spacing: 1px;
    }

    .camera-viewport {
      position: absolute;
      inset: 0;
      perspective: 1200px;
      perspective-origin: 50% 45%;
      overflow: hidden;
    }
    .camera-rig {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
    }

    /* Palco Central (top: 220px, height: 1380px) */
    .stage {
      position: absolute;
      top: 220px;
      left: 60px;
      right: 60px;
      height: 1380px;
    }

    .scene-clip {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 28px;
      padding: 10px 0;
      transform-style: preserve-3d;
    }

    .scene-title-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
    }

    .command-pill {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(16, 163, 127, 0.15);
      border: 1px solid rgba(52, 211, 153, 0.4);
      padding: 10px 26px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-bright);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      box-shadow: 0 0 25px rgba(16, 163, 127, 0.2);
    }

    .hero-title {
      font-size: 54px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
      color: #FFFFFF;
    }
    .hero-title span {
      color: var(--accent-bright);
    }

    .emerald-card {
      width: 960px;
      background: rgba(8, 14, 12, 0.85);
      border: 1px solid rgba(16, 163, 127, 0.24);
      border-radius: 28px;
      padding: 34px 38px;
      backdrop-filter: blur(20px);
      box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(16, 163, 127, 0.15);
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: relative;
      overflow: hidden;
    }

    .table-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .table-row:last-child {
      border-bottom: none;
    }
    .row-title {
      font-size: 28px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .badge-status {
      font-family: var(--font-mono);
      font-size: 24px;
      font-weight: 700;
      padding: 6px 18px;
      border-radius: 999px;
    }
    .badge-auto {
      background: var(--accent-bright);
      color: #060807;
      box-shadow: 0 0 15px rgba(52, 211, 153, 0.5);
    }

    .job-card {
      width: 100%;
      background: rgba(14, 20, 17, 0.98);
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: 20px;
      padding: 20px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Live Pipeline Flow */
    .live-flow-wrapper {
      width: 960px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
    }
    .flow-step {
      width: 100%;
      background: rgba(14, 20, 17, 0.95);
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .flow-step.active-flow {
      border-color: var(--accent-bright);
      background: rgba(16, 163, 127, 0.12);
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.25);
    }
    .flow-step.success-flow {
      border-color: #60A5FA;
      background: rgba(59, 130, 246, 0.12);
    }
    .flow-icon {
      font-size: 32px;
    }
    .flow-content {
      text-align: left;
      flex: 1;
      margin-left: 18px;
    }
    .flow-label {
      font-family: var(--font-mono);
      font-size: 20px;
      color: var(--text-secondary);
    }
    .flow-val {
      font-size: 26px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .flow-time {
      font-family: var(--font-mono);
      font-size: 22px;
      font-weight: 800;
      color: var(--accent-bright);
      background: rgba(0, 0, 0, 0.5);
      padding: 6px 14px;
      border-radius: 999px;
    }
    .flow-arrow {
      font-size: 20px;
      color: var(--accent-bright);
    }

    /* CTA Stickers & Simulated Comment Field */
    .cta-sticker-top {
      background: #000000;
      border: 2px solid #FFFFFF;
      color: #FFFFFF;
      font-size: 46px;
      font-weight: 900;
      padding: 16px 50px;
      border-radius: 24px;
      transform: rotate(-3deg);
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    }
    .cta-sticker-bottom {
      background: linear-gradient(135deg, #10A37F 0%, #34D399 100%);
      color: #060807;
      font-size: 58px;
      font-weight: 900;
      padding: 18px 60px;
      border-radius: 24px;
      transform: rotate(2deg);
      margin-top: -15px;
      box-shadow: 0 15px 40px rgba(52, 211, 153, 0.5);
    }

    .ig-comment-simulator {
      width: 960px;
      background: rgba(18, 24, 21, 0.98);
      border: 1.5px solid rgba(52, 211, 153, 0.4);
      border-radius: 999px;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
    }
    .ig-user-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--accent-emerald);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: #060807;
      font-size: 20px;
    }
    .ig-input-field {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 24px;
      font-family: var(--font-sans);
    }
    .ig-typed-text {
      font-weight: 700;
      color: #FFFFFF;
    }
    .ig-cursor {
      font-weight: 700;
      color: var(--accent-bright);
      margin-left: 2px;
      animation: cursorBlink 0.7s infinite;
    }
    @keyframes cursorBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .ig-send-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-family: var(--font-sans);
      font-size: 22px;
      font-weight: 800;
    }
    .ig-send-btn.active {
      color: var(--accent-bright);
    }

    /* Safe Zone Inferior de Legendas (1620px a 1740px) */
    .subtitle-rail-wrapper {
      position: absolute;
      top: 1640px;
      left: 60px;
      right: 60px;
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 200;
    }
    .subtitle-pill {
      background: rgba(10, 14, 12, 0.95);
      border: 1.5px solid rgba(52, 211, 153, 0.6);
      border-radius: 999px;
      padding: 16px 44px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(52, 211, 153, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      max-width: 960px;
      min-height: 80px;
    }
    .sub-word {
      font-size: 32px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      color: #E5E7EB;
    }
    .sub-word.active-badge {
      background: linear-gradient(135deg, #10A37F 0%, #34D399 100%);
      color: #060807;
      font-weight: 900;
      padding: 4px 18px;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(52, 211, 153, 0.7);
      transform: scale(1.08);
    }
  `;
}
