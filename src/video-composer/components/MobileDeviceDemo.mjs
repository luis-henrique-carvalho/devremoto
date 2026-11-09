/**
 * MobileDeviceDemo — Mockup de Celular com Notificação Push e Direct no Instagram
 * Ideal para bots, automações de DM, apps mobile e respostas de stories.
 */

export function renderMobileDeviceDemo(scene, sceneIdx) {
  const mob = scene.mobile || {
    notification: 'Novo comentário no Instagram: "REPLY"',
    chatUser: 'devremoto.br',
    chatMessage: 'Oi! Aqui está o link que você pediu com a ferramenta 100% gratuita.',
    chatButton: 'Acessar Ferramenta 🚀'
  };

  const html = `
    <section id="scene-${sceneIdx}" class="scene-clip clip" data-start="${scene.start}" data-duration="${scene.duration}">
      <div class="scene-title-group">
        <div class="command-pill" data-layout-ignore>📱 ${scene.pill || 'AUTOMAÇÃO OFICIAL // INSTAGRAM'}</div>
        <h1 class="hero-title">${scene.title}</h1>
        <p style="font-size: 26px; color: var(--text-secondary);">${scene.subtitle || ''}</p>
      </div>

      <!-- Smartphone Mockup Stage -->
      <div class="phone-frame">
        <div class="phone-notch"></div>

        <!-- Push Notification Banner -->
        <div class="phone-notification" id="phone-push-toast">
          <div class="notif-icon">💬</div>
          <div class="notif-body">
            <div class="notif-header">
              <span class="notif-app">Instagram</span>
              <span class="notif-time">Agora</span>
            </div>
            <div class="notif-text">${mob.notification}</div>
          </div>
        </div>

        <!-- Direct Message Chat Mockup -->
        <div class="phone-chat-screen">
          <div class="chat-header">
            <div class="chat-avatar">DR</div>
            <div class="chat-info">
              <div class="chat-name">${mob.chatUser}</div>
              <div class="chat-status">Online agora</div>
            </div>
            <div class="chat-badge">Oficial ✓</div>
          </div>

          <div class="chat-messages">
            <!-- User trigger message -->
            <div class="msg-bubble msg-user" id="chat-msg-user">
              <span>REPLY</span>
            </div>

            <!-- Bot Instant Reply -->
            <div class="msg-bubble msg-bot" id="chat-msg-bot">
              <div class="bot-badge">⚡ Resposta Automática (1s)</div>
              <p>${mob.chatMessage}</p>
              <div class="chat-link-btn" id="chat-action-btn">
                <span>${mob.chatButton}</span>
                <span style="font-size: 22px;">↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const pushTime = scene.start + 0.6;
  const userMsgTime = scene.start + 1.6;
  const botReplyTime = scene.start + 2.5;
  const btnActionTime = scene.start + 3.4;
  const exitTime = scene.start + scene.duration - 0.35;

  const gsapScript = `
    // Cena ${sceneIdx}: Mobile Device Demo
    tl.fromTo("#scene-${sceneIdx}", { y: 80, scale: 0.9, opacity: 0, filter: "blur(8px)" }, { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "back.out(1.4)" }, ${scene.start});
    tl.fromTo(".phone-frame", { y: 50, scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }, ${scene.start + 0.15});
    tl.fromTo("#phone-push-toast", { y: -40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }, ${pushTime});
    tl.fromTo("#chat-msg-user", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, ${userMsgTime});
    tl.fromTo("#chat-msg-bot", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, ${botReplyTime});
    tl.fromTo("#chat-action-btn", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "elastic.out(1.2, 0.5)" }, ${btnActionTime});
    tl.to("#scene-${sceneIdx}", { x: -90, scale: 0.93, opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power3.in" }, ${exitTime});
  `;

  const styles = `
    .phone-frame {
      width: 720px;
      height: 980px;
      background: #090E0C;
      border: 3px solid rgba(52, 211, 153, 0.4);
      border-radius: 48px;
      padding: 24px;
      box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 163, 127, 0.2);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .phone-notch {
      width: 180px;
      height: 28px;
      background: #000000;
      border-radius: 20px;
      margin: 0 auto 16px auto;
    }
    .phone-notification {
      background: rgba(22, 32, 27, 0.96);
      border: 1px solid rgba(52, 211, 153, 0.35);
      border-radius: 20px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }
    .notif-icon {
      font-size: 32px;
    }
    .notif-body {
      flex: 1;
    }
    .notif-header {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }
    .notif-text {
      font-size: 22px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .phone-chat-screen {
      flex: 1;
      background: rgba(14, 20, 17, 0.8);
      border-radius: 28px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .chat-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .chat-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--accent-emerald);
      color: #060807;
      font-weight: 900;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chat-info {
      flex: 1;
      text-align: left;
    }
    .chat-name {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
    }
    .chat-status {
      font-size: 18px;
      color: var(--accent-bright);
    }
    .chat-badge {
      background: rgba(52, 211, 153, 0.15);
      color: var(--accent-bright);
      padding: 4px 14px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 18px;
      font-weight: 700;
    }
    .chat-messages {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 24px;
    }
    .msg-bubble {
      max-width: 85%;
      border-radius: 20px;
      padding: 16px 22px;
      font-size: 22px;
      line-height: 1.35;
    }
    .msg-user {
      align-self: flex-end;
      background: var(--accent-emerald);
      color: #060807;
      font-weight: 800;
      border-bottom-right-radius: 4px;
      font-size: 24px;
    }
    .msg-bot {
      align-self: flex-start;
      background: rgba(25, 36, 30, 0.95);
      border: 1px solid rgba(52, 211, 153, 0.3);
      color: #FFFFFF;
      border-bottom-left-radius: 4px;
      text-align: left;
    }
    .bot-badge {
      font-family: var(--font-mono);
      font-size: 17px;
      color: var(--accent-bright);
      font-weight: 700;
      margin-bottom: 8px;
    }
    .chat-link-btn {
      margin-top: 14px;
      background: linear-gradient(135deg, #10A37F 0%, #34D399 100%);
      color: #060807;
      font-weight: 800;
      font-size: 20px;
      padding: 12px 20px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 15px rgba(52, 211, 153, 0.4);
    }
  `;

  return {
    html,
    styles,
    gsapScript,
    sfxCues: [
      { type: 'whoosh', time: scene.start },
      { type: 'pop', time: pushTime + 0.05, volume: 0.35 },     // Pop na notificação
      { type: 'pop', time: userMsgTime + 0.05, volume: 0.25 },   // Pop no envio do comentário
      { type: 'pop', time: botReplyTime + 0.05, volume: 0.30 },  // Pop na resposta do robô
      { type: 'click', time: btnActionTime + 0.05, volume: 0.35 }, // Click no botão de ação
      { type: 'whoosh', time: exitTime }
    ]
  };
}
