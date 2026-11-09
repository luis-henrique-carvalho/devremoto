import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const CATALOG_PATH = path.join(DATA_DIR, 'content-catalog.json');
const HISTORY_PATH = path.join(DATA_DIR, 'content-history.json');

/**
 * Pautas de alto impacto e amplo apelo para o DevRemoto.
 * Foco em superpoderes acessíveis, IAs gratuitas e ferramentas que substituem assinaturas caras.
 * Zero jargão restrito de programador, 100% utilidade prática tangível.
 */
export const BACKLOG_PIPELINES = [
  {
    id: 'ai-voice-cloning-v1',
    format: 'carousel',
    pillar: 'superpowers',
    headline: '4 IAs de Voz Gratuitas para Substituir a ElevenLabs',
    kicker: 'inteligência artificial // voz e áudio',
    stake: 'Pare de gastar mensalidades em dólar para gerar vozes e narrações. Estas 4 ferramentas de código aberto rodam no seu PC com qualidade humana e zero limites.',
    keyword: 'VOZ',
    items: [
      {
        name: 'Kokoro-82M',
        tag: 'Voz Neural · 100% Gratuito',
        desc: 'Modelo levíssimo que gera áudio com entonação humana natural em português e inglês em menos de 1 segundo sem precisar de placa de vídeo cara.',
        install: 'pip install kokoro',
        example: '$ kokoro "Seu texto aqui" --voice pt_br',
      },
      {
        name: 'F5-TTS',
        tag: 'Clonagem com 5 Segundos de Áudio',
        desc: 'Basta enviar um áudio de 5 segundos de qualquer pessoa para clonar a voz com precisão assustadora, preservando o sotaque e o timbre.',
        install: 'git clone github.com/SWivid/F5-TTS',
        example: '$ f5-tts --ref audio.wav --text "Nova fala"',
      },
      {
        name: 'AllTalk TTS',
        tag: 'Interface Web Completa',
        desc: 'Painel visual no navegador que conecta múltiplos motores de voz. Permite gerar audiolivros inteiros, dublar vídeos e exportar em MP3 com 1 clique.',
        install: 'git clone github.com/erew123/alltalk_tts',
        example: 'Acesse localhost:7851 no seu navegador',
      },
      {
        name: 'WhisperX',
        tag: 'Transcrição e Sincronização Fonética',
        desc: 'Transcreve qualquer reunião, podcast ou vídeo do YouTube com pontuação perfeita e timestamps palavra por palavra para legendas automáticas.',
        install: 'pip install whisperx',
        example: '$ whisperx audio.mp3 --align',
      },
    ],
  },
  {
    id: 'free-ai-tools-alternatives-v1',
    format: 'carousel',
    pillar: 'superpowers',
    headline: '4 IAs Secretas Que Parecem Ilegais de Tão Úteis',
    kicker: 'utilidades digitais // produtividade',
    stake: 'A maioria das pessoas gasta centenas de reais em assinaturas de softwares pagos. Estas ferramentas abertas fazem o mesmo trabalho de graça.',
    keyword: 'SUPER',
    items: [
      {
        name: 'BiRefNet (Rembg)',
        tag: 'Substituto do Photoshop',
        desc: 'Remove o fundo de qualquer foto ou vídeo em alta definição com recorte cirúrgico de cabelos e transparências em menos de 2 segundos.',
        install: 'pip install rembg',
        example: '$ rembg i foto.jpg sem_fundo.png',
      },
      {
        name: 'Browser-Use',
        tag: 'Robô que Navega por Você',
        desc: 'Um agente de IA que entra no Chrome, pesquisa preços, preenche formulários e clica em botões sozinho enquanto você toma um café.',
        install: 'pip install browser-use',
        example: '$ python agent.py "Pesquise voos baratos"',
      },
      {
        name: 'Docling',
        tag: 'Extrator Inteligente de PDFs',
        desc: 'Transforma PDFs bloqueados, tabelas complexas e contratos digitalizados em texto limpo e tabelas de Excel prontas para uso.',
        install: 'pip install docling',
        example: '$ docling contrato.pdf --to md',
      },
      {
        name: 'LocalSend',
        tag: 'AirDrop Universal para Todos os Sistemas',
        desc: 'Transfira arquivos, fotos e vídeos gigantes entre Windows, Mac, Android e iPhone pela rede Wi-Fi local sem limites e sem nuvem.',
        install: 'Baixe em localsend.org',
        example: 'Conecte seus aparelhos no mesmo Wi-Fi',
      },
    ],
  },
  {
    id: 'offline-ai-superpowers-v1',
    format: 'carousel',
    pillar: 'superpowers',
    headline: 'Como Ter um "ChatGPT" no PC Que Funciona Sem Internet',
    kicker: 'ia local // privacidade total',
    stake: 'Você não precisa mandar seus dados e arquivos confidenciais para servidores nos Estados Unidos. Estes modelos avançados rodam no seu computador offline.',
    keyword: 'CHAT',
    items: [
      {
        name: 'Ollama',
        tag: 'O Motor de IA Local',
        desc: 'Instalação com 1 clique para baixar e rodar modelos gigantes como DeepSeek, Llama 3 e Mistral diretamente na memória da sua máquina.',
        install: 'curl -fsSL https://ollama.com/install.sh | sh',
        example: '$ ollama run deepseek-r1',
      },
      {
        name: 'Open-WebUI',
        tag: 'Interface Idêntica ao ChatGPT',
        desc: 'Interface visual premium no navegador para conversar com seus modelos locais, anexar documentos, gerar imagens e salvar históricos.',
        install: 'docker run -d -p 3000:8080 open-webui',
        example: 'Abra localhost:3000 no navegador',
      },
      {
        name: 'AnythingLLM',
        tag: 'Converse com Qualquer Documento',
        desc: 'Arraste livros, planilhas e PDFs para dentro do app e faça perguntas em português para encontrar qualquer informação em segundos.',
        install: 'Baixe em useanything.com',
        example: 'Arraste seu arquivo e faça perguntas',
      },
      {
        name: 'Jan.ai',
        tag: 'Aplicativo Desktop 100% Offline',
        desc: 'Aplicativo nativo para Windows e Mac que já vem com loja de modelos integrados. Sem terminal e sem configurações difíceis.',
        install: 'Baixe em jan.ai',
        example: 'Escolha o modelo e comece a conversar',
      },
    ],
  },
  {
    id: 'remote-productivity-hacks-v1',
    format: 'carousel',
    pillar: 'superpowers',
    headline: '4 Ferramentas Que Economizam 10 Horas na Sua Semana',
    kicker: 'trabalho remoto // produtividade',
    stake: 'Quem trabalha de casa pela internet não pode perder tempo com tarefas repetitivas. Estes 4 atalhos aumentam seu rendimento imediatamente.',
    keyword: 'PRODUTIVIDADE',
    items: [
      {
        name: 'Espanso',
        tag: 'Expansor de Texto Universal',
        desc: 'Digite atalhos como ":email" ou ":chavepix" e ele expande automaticamente em frases completas, dados cadastrais ou respostas prontas.',
        install: 'Baixe em espanso.org',
        example: 'Digite :ola e veja o texto se completar',
      },
      {
        name: 'ShareX / Shottr',
        tag: 'Captura de Tela Profissional',
        desc: 'Tire prints com setas elegantes, desfoque automático de dados sensíveis (senhas e CPFs) e reconhecimento de texto (OCR) instantâneo.',
        install: 'Baixe em getsharex.com ou shottr.cc',
        example: 'Atalho rápido de captura com anotação',
      },
      {
        name: 'RustDesk',
        tag: 'Acesso Remoto Rápido e Seguro',
        desc: 'Alternativa open source ao TeamViewer e AnyDesk. Controle seu computador de qualquer lugar com velocidade máxima e sem cobrança surpresa.',
        install: 'Baixe em rustdesk.com',
        example: 'Controle seu PC pelo celular',
      },
      {
        name: 'Obsidian',
        tag: 'Segundo Cérebro e Anotações',
        desc: 'Organize suas ideias, projetos e aprendizados em notas interligadas que ficam salvas no seu computador para sempre.',
        install: 'Baixe em obsidian.md',
        example: 'Crie seu mapa de conhecimento',
      },
    ],
  },
];

/**
 * Searches GitHub for broad-appeal, high-utility open-source AI and productivity tools.
 */
export function searchGithubTools(query = 'local AI voice OR "background removal" OR "browser automation"', limit = 10) {
  try {
    const raw = execSync(
      `gh search repos "${query}" --sort stars --order desc --limit ${limit} --json name,owner,description,stargazersCount,url`,
      { encoding: 'utf8' }
    );
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Discover] Erro ao buscar no GitHub:`, err.message);
    return [];
  }
}

/**
 * Checks pending items count and auto-replenishes if needed.
 */
export function checkAndReplenishCatalog(minPending = 3) {
  const catalogData = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const historyData = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));

  const pendingItems = catalogData.catalog.filter((c) => c.status === 'pending');
  console.log(`[Discover] Pautas pendentes atuais: ${pendingItems.length}`);

  if (pendingItems.length >= minPending) {
    console.log(`[Discover] Catálogo abastecido com ${pendingItems.length} pautas pendentes.`);
    return { replenished: 0, totalPending: pendingItems.length };
  }

  const existingIds = new Set([
    ...catalogData.catalog.map((c) => c.id),
    ...historyData.history.map((h) => h.id),
  ]);

  let addedCount = 0;
  for (const pack of BACKLOG_PIPELINES) {
    if (!existingIds.has(pack.id)) {
      catalogData.catalog.push({
        ...pack,
        status: 'pending',
      });
      existingIds.add(pack.id);
      addedCount++;
      console.log(`[Discover] Nova edição adicionada ao catálogo: "${pack.headline}" (${pack.id})`);
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalogData, null, 2), 'utf8');
    console.log(`[Discover] Catálogo atualizado com sucesso (+${addedCount} novas edições).`);
  }

  const newTotalPending = catalogData.catalog.filter((c) => c.status === 'pending').length;
  return { replenished: addedCount, totalPending: newTotalPending };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const res = checkAndReplenishCatalog(3);
  console.log('[Discover] Concluído:', res);
}
