/**
 * Sound Director — Engenharia e Sincronização Harmônica de SFX
 * 
 * Regras Estritas:
 * 1. Zero SFX aleatórios: todo efeito sonoro DEVE estar vinculado 1:1 a uma ação visual na tela.
 * 2. Whoosh: toca exatamente no início da transição/chicote de câmera (offset -0.15s para pico na transição).
 * 3. Impact: toca exatamente no milissegundo de contato/queda elástica de carimbos e blocos pesados.
 * 4. Pop: toca na revelação de cards sequenciais e badges flutuantes.
 * 5. Click: toca na ativação de botões ou fim da digitação de comandos.
 * 6. Volumes equilibrados: Voice 1.15, BGM 0.09, SFX entre 0.22 e 0.38 para textura sem sobrepor a voz.
 */

export class SoundDirector {
  constructor() {
    this.cues = [];
  }

  /**
   * Registra uma deixa sonora sincronizada
   * @param {string} type 'whoosh' | 'impact' | 'pop' | 'click' | 'riser'
   * @param {number} time timestamp em segundos no timeline
   * @param {number} [volume] volume opcional
   */
  addCue(type, time, volume) {
    const defaultDurs = {
      whoosh: 0.57,
      impact: 2.11,
      pop: 0.72,
      click: 0.36,
      riser: 10.03
    };
    const defaultVols = {
      whoosh: 0.28,
      impact: 0.40,
      pop: 0.25,
      click: 0.35,
      riser: 0.20
    };

    if (time < 0) time = 0;

    this.cues.push({
      type,
      time: Number(time.toFixed(3)),
      duration: defaultDurs[type] || 0.5,
      volume: volume || defaultVols[type] || 0.3
    });
  }

  /**
   * Retorna os elementos <audio> HTML determinísticos ordenados no tempo
   */
  renderAudioTags() {
    // Ordena cronologicamente e evita duplicatas do mesmo tipo em menos de 100ms
    const sorted = [...this.cues].sort((a, b) => a.time - b.time);
    const filtered = [];

    for (const cue of sorted) {
      const prev = filtered[filtered.length - 1];
      if (!prev || prev.type !== cue.type || (cue.time - prev.time > 0.12)) {
        filtered.push(cue);
      }
    }

    return filtered.map((c, i) => {
      const id = `sfx-${c.type}-${i + 1}`;
      return `      <audio id="${id}" src="assets/${c.type}.mp3" data-start="${c.time.toFixed(2)}" data-duration="${c.duration.toFixed(2)}" data-volume="${c.volume.toFixed(2)}"></audio>`;
    }).join('\n');
  }
}
