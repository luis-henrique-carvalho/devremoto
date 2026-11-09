/**
 * Video Composer — Montador Modular e Dinâmico de Vídeos HyperFrames
 * 
 * Harmoniza 100% os elementos visuais, roteiro, efeitos sonoros (SFX) e legendas.
 */

import { SoundDirector } from './sound-director.mjs';
import { renderBaseStyles } from './components/BaseLayout.mjs';
import { renderHookDavidGoliath } from './components/HookDavidGoliath.mjs';
import { renderMobileDeviceDemo } from './components/MobileDeviceDemo.mjs';
import { renderBrowserWindowShowcase } from './components/BrowserWindowShowcase.mjs';
import { renderBeforeAfterWipe } from './components/BeforeAfterWipe.mjs';
import { renderAudioPlayerSpectrum } from './components/AudioPlayerSpectrum.mjs';
import { renderFeatureMatrixCards } from './components/FeatureMatrixCards.mjs';
import { renderLivePipelineFlow } from './components/LivePipelineFlow.mjs';
import { renderInteractiveCtaStage } from './components/InteractiveCtaStage.mjs';

const COMPONENT_REGISTRY = {
  'hook-david-goliath': renderHookDavidGoliath,
  'mobile-direct-demo': renderMobileDeviceDemo,
  'browser-window-showcase': renderBrowserWindowShowcase,
  'before-after-wipe': renderBeforeAfterWipe,
  'audio-player-spectrum': renderAudioPlayerSpectrum,
  'feature-matrix-cards': renderFeatureMatrixCards,
  'live-pipeline-flow': renderLivePipelineFlow,
  'interactive-cta': renderInteractiveCtaStage
};

function normWord(s) {
  return String(s || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

/**
 * Alinha automaticamente os blocos do roteiro aos timestamps reais de cada palavra falada
 */
export function calculateSentenceTimings(scriptVoice, transcript, sceneCount = 5) {
  if (!Array.isArray(transcript) || transcript.length === 0) {
    const slot = 30.0 / sceneCount;
    return Array.from({ length: sceneCount }).map((_, i) => ({
      start: Number((i * slot).toFixed(2)),
      duration: Number(slot.toFixed(2))
    }));
  }

  const totalDur = transcript[transcript.length - 1].end_sec;

  // Separa por pontuação mantendo a integridade semântica
  let raw = (scriptVoice || '').split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean);

  let groups = [];
  if (raw.length === sceneCount) {
    groups = [...raw];
  } else {
    // Se houver mais frases que cenas, funde perguntas curtas com a próxima frase explicativa
    const merged = [];
    for (let i = 0; i < raw.length; i++) {
      const s = raw[i];
      if (s.endsWith("?") && i + 1 < raw.length && raw.length > sceneCount) {
        merged.push(s + " " + raw[i + 1]);
        i++;
      } else {
        merged.push(s);
      }
    }

    if (merged.length === sceneCount) {
      groups = [...merged];
    } else if (merged.length > sceneCount) {
      const ratio = merged.length / sceneCount;
      for (let i = 0; i < sceneCount; i++) {
        const startIdx = Math.floor(i * ratio);
        const endIdx = i === sceneCount - 1 ? merged.length : Math.floor((i + 1) * ratio);
        groups.push(merged.slice(startIdx, endIdx).join(' '));
      }
    } else {
      groups = [...merged];
      while (groups.length < sceneCount) {
        groups.push(groups[groups.length - 1]);
      }
    }
  }

  let wordIdx = 0;
  const timings = [];

  for (let i = 0; i < groups.length; i++) {
    const grp = groups[i];
    const grpWords = grp.split(/\s+/).map(normWord).filter(Boolean);
    const lastWord = grpWords[grpWords.length - 1];

    const startSec = i === 0 ? 0.0 : timings[i - 1].start + timings[i - 1].duration;

    let foundIdx = -1;
    for (let w = wordIdx; w < transcript.length; w++) {
      if (normWord(transcript[w].text) === lastWord) {
        foundIdx = w;
        break;
      }
    }

    let endSec;
    if (foundIdx !== -1 && i < groups.length - 1) {
      endSec = Number(transcript[foundIdx].end_sec.toFixed(2));
      wordIdx = foundIdx + 1;
    } else {
      endSec = Number(totalDur.toFixed(2));
    }

    const duration = Math.max(1.5, Number((endSec - startSec).toFixed(2)));
    timings.push({ start: startSec, duration, end: Number((startSec + duration).toFixed(2)) });
  }

  return timings;
}

/**
 * Constrói a lista normalizada de cenas baseada no item do catálogo e no transcript de áudio
 */
export function buildStoryboard(item, duration, transcript = []) {
  const roundedDuration = Math.ceil(duration);
  const timeSlots = calculateSentenceTimings(item.scriptVoice, transcript, 5);

  // Se o item já tiver scenes customizadas
  if (Array.isArray(item.scenes) && item.scenes.length > 0) {
    const rawScenes = item.scenes;
    const count = rawScenes.length;
    const slots = calculateSentenceTimings(item.scriptVoice, transcript, count);

    return rawScenes.map((sc, i) => ({
      ...sc,
      start: slots[i].start,
      duration: slots[i].duration
    }));
  }

  // Fallback inteligente para itens legados do catálogo:
  // Detecta o tipo de ferramenta e monta um storyboard adaptativo único!
  const isDirectBot = item.category?.toLowerCase().includes('direct') || item.category?.toLowerCase().includes('automação') || item.id?.includes('openreply');
  const isImageTool = item.category?.toLowerCase().includes('design') || item.category?.toLowerCase().includes('visão') || item.id?.includes('birefnet');
  const isAudioTool = item.category?.toLowerCase().includes('voz') || item.category?.toLowerCase().includes('áudio') || item.id?.includes('kokoro');

  const scenes = [];

  // Cena 1: Sempre o Hook David vs Golias
  scenes.push({
    id: 'hook',
    type: 'hook-david-goliath',
    start: timeSlots[0].start,
    duration: timeSlots[0].duration,
    alert: item.hookAlert || 'ALERTA // ZERO MENSALIDADE',
    title: item.hookTitle || 'Clonaram a Ferramenta',
    subtitle: item.hookComment?.replace('#', '').trim() || '',
    competitor: {
      name: item.hookPrompt?.split(':')[0]?.replace('$', '').trim() || 'Ferramenta Paga',
      price: item.hookPrompt?.split(':')[1]?.trim() || '$150/mês',
      limit: 'Cobrança em dólar por limite de uso'
    },
    stamp: item.hookStamp || 'ASSINATURA CARA 💸'
  });

  // Cena 2: Adaptativa ao nicho!
  if (isDirectBot) {
    scenes.push({
      id: 'showcase-mobile',
      type: 'mobile-direct-demo',
      start: timeSlots[1].start,
      duration: timeSlots[1].duration,
      pill: 'AUTOMAÇÃO OFICIAL // INSTAGRAM',
      title: item.repoTitle || 'Automação no Instagram',
      subtitle: item.repoSub || 'respostas imediatas para comentários e stories',
      mobile: {
        notification: `Novo comentário no seu post: "${item.ctaKeyword || 'REPLY'}"`,
        chatUser: 'devremoto.br',
        chatMessage: `Oi! Aqui está o link que você pediu com a ferramenta 100% gratuita.`,
        chatButton: 'Acessar Ferramenta 🚀'
      }
    });
  } else if (isImageTool) {
    scenes.push({
      id: 'showcase-wipe',
      type: 'before-after-wipe',
      start: timeSlots[1].start,
      duration: timeSlots[1].duration,
      pill: 'RECORTE CIRÚRGICO // IA VISUAL',
      title: item.repoTitle || 'Recorte em 1 Segundo',
      subtitle: item.repoSub || 'separa até fios de cabelo em alta resolução',
      originalLabel: 'Foto Original',
      cutoutLabel: 'Fundo Removido (Transparente)'
    });
  } else if (isAudioTool) {
    scenes.push({
      id: 'showcase-audio',
      type: 'audio-player-spectrum',
      start: timeSlots[1].start,
      duration: timeSlots[1].duration,
      pill: 'VOZ NEURAL // TEMPO REAL',
      title: item.repoTitle || 'Voz Neural Indistinguível',
      subtitle: item.repoSub || 'clona vozes e dubla em tempo real',
      latency: '180ms',
      languages: '147 Idiomas',
      cost: 'R$ 0,00'
    });
  } else {
    scenes.push({
      id: 'showcase-browser',
      type: 'browser-window-showcase',
      start: timeSlots[1].start,
      duration: timeSlots[1].duration,
      tag: item.tag || 'FERRAMENTA DO DIA // GRÁTIS',
      title: item.repoTitle || 'Conheça a Ferramenta',
      repo: item.repo,
      name: item.name,
      stars: item.stars,
      category: item.category,
      repoSub: item.repoSub,
      cmd: item.repoInstall
    });
  }

  // Cena 3: Superpoderes
  scenes.push({
    id: 'superpowers',
    type: 'feature-matrix-cards',
    start: timeSlots[2].start,
    duration: timeSlots[2].duration,
    pill: item.techPill || '4 SUPERPODERES // ZERO CUSTO',
    title: item.techTitle || '4 Superpoderes ➔ Automático',
    subtitle: 'respostas inteligentes 24 horas por dia',
    panelTitle: item.panelTitle || 'Modo Automático Ativado',
    features: (item.techRows || []).map((r, i) => ({
      icon: r.name.split(' ')[0],
      title: r.name.slice(r.name.indexOf(' ') + 1),
      badge: r.badge,
      color: r.color
    }))
  });

  // Cena 4: Demonstração do Fluxo ou Prova Viva
  if (isDirectBot) {
    scenes.push({
      id: 'live-flow',
      type: 'live-pipeline-flow',
      start: timeSlots[3].start,
      duration: timeSlots[3].duration,
      pill: item.localPill || 'PROVA REAL AO VIVO',
      title: item.localTitle || 'Quer ver a Mágica ao Vivo?',
      subtitle: 'teste agora mesmo no seu direct',
      steps: [
        { icon: "💬", label: "Comentário no Post", val: `Alguém comentou "${item.ctaKeyword || 'REPLY'}"`, time: "0.1s" },
        { icon: "⚡", label: "Robô em Tempo Real", val: "Prepara a mensagem instantânea", time: "0.8s", active: true },
        { icon: "📩", label: "Direct Entregue", val: "Link exclusivo entregue no direct", time: "2.1s" }
      ],
      specs: item.localSpecs || [
        { label: "Velocidade:", val: "Menos de 3 segundos", color: "#60A5FA" },
        { label: "Mensalidade:", val: "R$ 0,00 (Zero cobranças)", color: "var(--accent-bright)" },
        { label: "Segurança:", val: "100% Oficial do Instagram", color: "#FCD34D" }
      ]
    });
  } else {
    scenes.push({
      id: 'live-browser-showcase',
      type: 'browser-window-showcase',
      start: timeSlots[3].start,
      duration: timeSlots[3].duration,
      tag: item.tag || 'FERRAMENTA DO DIA // GRÁTIS',
      title: item.localTitle || 'Sabe essa Ferramenta?',
      repo: item.repo,
      name: item.name,
      stars: item.stars,
      category: item.category,
      repoSub: item.repoSub,
      cmd: item.repoInstall
    });
  }

  // Cena 5: Fechamento com CTA Interativo
  scenes.push({
    id: 'cta',
    type: 'interactive-cta',
    start: timeSlots[4].start,
    duration: timeSlots[4].duration,
    ctaKeyword: item.ctaKeyword || 'REPLY',
    repo: item.repo,
    directPreview: 'Ferramenta Gratuita + Passo a Passo'
  });

  return scenes;
}

/**
 * Compila o HTML completo determinístico do HyperFrames
 */
export function compileVideoHtml(item, duration, transcript = []) {
  const roundedDuration = Math.ceil(duration);
  const soundDirector = new SoundDirector();
  const storyboard = buildStoryboard(item, duration, transcript);

  const sceneHtmls = [];
  const sceneStyles = [];
  const sceneGsapScripts = [];

  // Renderiza cada cena com seu componente específico
  storyboard.forEach((scene, idx) => {
    const sceneIdx = idx + 1;
    const renderer = COMPONENT_REGISTRY[scene.type] || renderBrowserWindowShowcase;
    const result = renderer(scene, sceneIdx);

    sceneHtmls.push(result.html);
    if (result.styles) sceneStyles.push(result.styles);
    if (result.gsapScript) sceneGsapScripts.push(result.gsapScript);

    // Registra os SFX sincronizados da cena no sound director
    if (Array.isArray(result.sfxCues)) {
      result.sfxCues.forEach(cue => {
        soundDirector.addCue(cue.type, cue.time, cue.volume);
      });
    }
  });

  // Legendas sincronizadas palavra por palavra (WordBoundary)
  let subCalls = [];
  if (Array.isArray(transcript) && transcript.length > 0) {
    let curr = [];
    const groups = [];
    for (let i = 0; i < transcript.length; i++) {
      const w = transcript[i];
      curr.push(w);
      const isPause = i < transcript.length - 1 && (transcript[i + 1].start_sec - w.end_sec > 0.22);
      if (curr.length >= 3 || isPause || i === transcript.length - 1) {
        groups.push([...curr]);
        curr = [];
      }
    }

    for (const g of groups) {
      const texts = g.map(w => w.text.toUpperCase());
      for (let i = 0; i < g.length; i++) {
        const t = Number(g[i].start_sec.toFixed(2));
        const htmlGroup = texts.map((txt, idx) => {
          return idx === i 
            ? `<span class="sub-word active-badge">${txt}</span>` 
            : `<span class="sub-word">${txt}</span>`;
        }).join(' ');
        subCalls.push(`      tl.call(() => { setSubText(\`${htmlGroup}\`); }, null, ${t});`);
      }
    }

    // Limpa legendas nas transições de cena
    storyboard.forEach(sc => {
      subCalls.push(`      tl.call(() => { setSubText(""); }, null, ${Number((sc.start + sc.duration - 0.1).toFixed(2))});`);
    });
  }

  // Gera áudio tags com SFX perfeitamente sincronizados
  const sfxTags = soundDirector.renderAudioTags();

  return `<!doctype html>
<html lang="pt-BR" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>${item.name}: ${item.category} - DevRemoto</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
${renderBaseStyles()}
${sceneStyles.join('\n')}
    </style>
  </head>
  <body>
    <div id="root" class="clip" data-composition-id="main" data-width="1080" data-height="1920" data-start="0" data-duration="${roundedDuration}.0">
      <div class="grid-plane"></div>
      <div class="glow-orb-top"></div>

      <!-- Áudio Principal da Voz e Trilha BGM -->
      <audio id="voice" src="audio.mp3" data-start="0" data-duration="${(duration - 0.5).toFixed(2)}" data-volume="1.15"></audio>
      <audio id="bgm" src="assets/bgm.mp3" data-start="0" data-duration="${roundedDuration}.0" data-volume="0.09"></audio>
      
      <!-- SFX Sincronizados 1:1 com os Eventos Visuais -->
${sfxTags}

      <header class="header-fixed" data-layout-ignore>
        <div class="brand-badge" data-layout-ignore>
          <div class="brand-dot"></div>
          <span data-layout-ignore>dev.remoto</span>
        </div>
        <div class="tag-pill" data-layout-ignore>${item.tag || 'GITHUB TRENDING // IA'}</div>
      </header>

      <div class="camera-viewport">
        <div id="camera" class="camera-rig" data-layout-allow-overflow>
          <main class="stage">
${sceneHtmls.join('\n')}
          </main>
        </div>
      </div>

      <!-- Dynamic Subtitles -->
      <footer class="subtitle-rail-wrapper">
        <div id="sub-pill" class="subtitle-pill">
          <span id="sub-content">
            <span class="sub-word active-badge">${item.name.toUpperCase()}</span>
          </span>
        </div>
      </footer>
    </div>

    <script>
      const tl = gsap.timeline({ paused: true });

      function setSubText(html) {
        const el = document.getElementById('sub-content');
        if (el) el.innerHTML = html;
      }

      // Câmera 3D Cinematic Rig com micro-movimentos contínuos
      tl.fromTo("#camera", { z: 40, rotateX: 3 }, { z: 0, rotateX: 0, duration: 1.0, ease: "power2.out" }, 0.0);
      tl.to("#camera", { z: 25, rotateY: -2, duration: 1.2, ease: "sine.inOut" }, 5.5);
      tl.to("#camera", { z: 15, rotateX: -2, rotateY: 1, duration: 1.2, ease: "sine.inOut" }, 12.8);
      tl.to("#camera", { z: 30, rotateX: 2, rotateY: 0, duration: 1.0, ease: "sine.inOut" }, 21.0);
      tl.to("#camera", { z: 45, rotateX: 0, rotateY: 0, duration: 1.2, ease: "back.out(1.5)" }, 25.4);

      // Tweens das Cenas Modulares
${sceneGsapScripts.join('\n')}

      // Legendas Sincronizadas
${subCalls.join('\n')}

      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>`;
}
