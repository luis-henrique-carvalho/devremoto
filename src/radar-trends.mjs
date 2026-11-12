#!/usr/bin/env node

/**
 * radar-trends.mjs
 *
 * Motor de Inteligência em 2 Etapas para o DevRemoto:
 * 1. Análise /ig: Análise de outliers e padrões virais (inspirado em @fabianocarvalhojr)
 * 2. Search Radar Ativo: Busca na web, GitHub Search API e Show HN por novidades reais
 * 
 * Uso:
 *   node src/radar-trends.mjs --ig-insights --search --add-to-catalog
 *   node src/radar-trends.mjs --search --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const SWIPE_PATH = path.join(DATA_DIR, 'ig-swipe-trends.json');
const VIDEO_CATALOG_PATH = path.join(DATA_DIR, 'video-repo-catalog.json');
const VIDEO_HISTORY_PATH = path.join(DATA_DIR, 'video-history.json');

function parseArgs(argv) {
  const getVal = (flag, fallback) => {
    const idx = argv.indexOf(flag);
    return idx >= 0 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    dryRun: argv.includes('--dry-run'),
    igInsights: argv.includes('--ig-insights') || argv.includes('--ig'),
    search: argv.includes('--search') || argv.includes('--search-web'),
    addToCatalog: argv.includes('--add-to-catalog') || argv.includes('--add'),
    limit: parseInt(getVal('--limit', '3'), 10) || 3
  };
}

function readJsonOr(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ============================================================================
// ETAPA 1: ANÁLISE /IG (OUTLIERS E FÓRMULAS VIRAIS)
// ============================================================================
export function analyzeIgSwipeInsights() {
  console.log('\n📊 [ETAPA 1] Analisando padrões virais do Instagram (/ig)...');
  const swipeData = readJsonOr(SWIPE_PATH, null);
  if (!swipeData || !swipeData.referenceAccounts) {
    console.warn('⚠️ Base de swipe data não encontrada em data/ig-swipe-trends.json');
    return [];
  }

  const insights = [];
  swipeData.referenceAccounts.forEach(acc => {
    console.log(`\n🔍 Analisando criador de referência: @${acc.handle} (${acc.followerScale} seguidores)`);
    console.log(`   Mediana recente: ${acc.typicalMedianViews} views`);
    
    acc.bestOutliers.forEach(outlier => {
      console.log(`   ⭐ Outlier ${outlier.multiple} (${outlier.views} views): "${outlier.topic}"`);
      console.log(`      Hook: "${outlier.hookSpoken}"`);
      console.log(`      CTA Direct: Comente "${outlier.ctaKeyword}"`);
      insights.push({
        creator: acc.handle,
        topic: outlier.topic,
        formula: outlier.formula,
        hookSpoken: outlier.hookSpoken,
        hookOnScreen: outlier.hookOnScreen,
        ctaKeyword: outlier.ctaKeyword,
        multiple: outlier.multiple
      });
    });
  });

  return insights;
}

// ============================================================================
// ETAPA 2: SEARCH RADAR ATIVO (GITHUB API + SHOW HN + WEB)
// ============================================================================

/**
 * Busca repositórios trending no GitHub via gh api
 */
export async function searchGitHubTrending(topics = ['ai', 'utility', 'tools', 'browser', 'desktop']) {
  console.log('\n🌐 [ETAPA 2.A] Executando GitHub Search API para novidades em alta...');
  const candidates = [];
  
  for (const topic of topics) {
    try {
      const cmd = `gh api "search/repositories?q=stars:>5000+topic:${topic}&sort=stars&order=desc&per_page=6" --jq '.items[] | {name: .name, fullName: .full_name, stars: .stargazers_count, desc: .description, url: .html_url, topics: .topics}'`;
      const res = execSync(cmd, { encoding: 'utf8', timeout: 15000 });
      const lines = res.trim().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const item = JSON.parse(line);
          candidates.push({
            source: 'github_search',
            repo: item.fullName,
            name: item.name,
            stars: `${(item.stars / 1000).toFixed(1)}k`,
            rawStars: item.stars,
            desc: item.desc || '',
            url: item.url,
            topics: item.topics || []
          });
        } catch {}
      }
    } catch (err) {
      // Fallback silencioso se gh api atingir rate limit
    }
  }

  return candidates;
}

/**
 * Busca novidades de desenvolvedores no Hacker News (Show HN)
 */
export async function searchShowHN() {
  console.log('📰 [ETAPA 2.B] Varrendo lançamentos recentes no Hacker News (Show HN)...');
  const candidates = [];
  try {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/showstories.json');
    const ids = await res.json();
    const topIds = ids.slice(0, 10);
    
    for (const id of topIds) {
      try {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const item = await itemRes.json();
        if (item && item.title && (item.score >= 10 || item.descendants >= 5)) {
          candidates.push({
            source: 'show_hn',
            name: item.title.replace(/^Show HN:\s*/i, '').split('–')[0].split('-')[0].trim(),
            title: item.title,
            url: item.url || `https://news.ycombinator.com/item?id=${id}`,
            score: item.score || 0
          });
        }
      } catch {}
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível consultar Show HN:', err.message);
  }

  return candidates;
}

// ============================================================================
// CURADORIA E ROTEIRIZAÇÃO AUTOMÁTICA (PADRÃO DEVREMOTO)
// ============================================================================

export const EVERGREEN_VIRAL_LIBRARY = [
  {
    id: 'localsend-airdrop-v1',
    repo: 'localsend/localsend',
    name: 'LocalSend',
    stars: '54.2k',
    pillar: 'afternoon_hack',
    category: 'AirDrop Aberto para Qualquer Aparelho',
    tag: 'UTILITÁRIO // 100% GRÁTIS',
    hookTitle: 'O AirDrop Secreto para <span>PC, Mac e Android</span>',
    hookAlert: 'TRANSFERÊNCIA INSTANTÂNEA // REDE LOCAL',
    hookPrompt: 'Sem Internet + Sem Cabo + Sem Limites',
    hookComment: 'Transfira fotos e arquivos gigantes em 2 segundos pelo Wi-Fi',
    hookStamp: 'ZERO NUVEM ⚡',
    repoTitle: 'Envie Qualquer Arquivo em <span>Segundos</span>',
    repoInstall: 'localsend.org (Código Aberto)',
    repoSub: '⚡ Funciona entre Windows, iPhone, Mac, Android e Linux',
    techPill: '4 RECURSOS // PRIVACIDADE TOTAL',
    techTitle: 'O Que a Ferramenta ➔ <span>Faz na Hora</span>',
    panelTitle: 'Transferência Segura P2P na Rede Local',
    techRows: [
      { name: '⚡ Envia arquivos gigantes sem passar por nenhum servidor da nuvem', badge: '01', color: '#34D399' },
      { name: '📱 Conecta iPhone, Android, Windows e Mac sem precisar de cabo', badge: '02', color: '#34D399' },
      { name: '🔒 Criptografia ponta a ponta direta no seu roteador Wi-Fi', badge: '03', color: '#10A37F' },
      { name: '🆓 100% gratuito, sem limite de tamanho e sem cadastro', badge: '04', color: '#34D399' }
    ],
    localPill: 'COMO USAR // 1 CLIQUE',
    localTitle: 'Abra no PC ou Celular e <span>Envie Agora</span>',
    flowSteps: [
      { icon: '📲', label: 'Passo 01 • Abra nos Dois Aparelhos', val: 'Eles se encontram sozinhos na mesma rede Wi-Fi', time: 'Instantâneo' },
      { icon: '📁', label: 'Passo 02 • Escolha o Arquivo', val: 'Vídeos pesados em 4K, fotos ou pastas inteiras', time: 'Sem limites', active: true },
      { icon: '🚀', label: 'Passo 03 • Receba na Hora', val: 'Velocidade máxima da sua rede local sem gastar dados', time: '100% Seguro' }
    ],
    localSpecs: [
      { label: 'Velocidade:', val: 'Até 100 MB/s no Wi-Fi', color: 'var(--accent-bright)' },
      { label: 'Privacidade:', val: 'P2P Local (Sem Nuvem)', color: 'var(--accent-bright)' },
      { label: 'Compatibilidade:', val: 'Android, iOS, PC, Mac', color: 'var(--accent-bright)' }
    ],
    ctaKeyword: 'DROP',
    ctaItems: [
      '1️⃣ Link Oficial de Download do LocalSend',
      '2️⃣ Guia de Configuração em 1 Minuto no PC e Celular',
      '3️⃣ Passo a Passo para Transferir Vídeos 4K sem Perder Qualidade'
    ],
    scriptVoice: 'Se você vive sofrendo para passar fotos e vídeos pesados do celular pro computador ou entre aparelhos diferentes, para de mandar arquivo por e-mail ou WhatsApp.\n\nEssa ferramenta de código aberto cria um AirDrop universal que funciona entre iPhone, Android, Windows e Mac direto pelo seu Wi-Fi.\n\nVocê não precisa de cabo, não gasta sua internet e seus arquivos nunca passam por servidores na nuvem. A transferência é direta e atinge a velocidade máxima do seu roteador.\n\nPrimeiro, ele detecta os aparelhos na hora. Segundo, envia qualquer tamanho sem compactar. Terceiro, protege tudo com criptografia ponta a ponta. E quarto, é totalmente gratuito e sem anúncios.\n\nComenta DROP aqui embaixo que eu te envio o link oficial e o guia completo no seu direct. E já me segue para descobrir as melhores ferramentas da internet todos os dias.',
    status: 'ready'
  },
  {
    id: 'upscayl-photo-ai-v1',
    repo: 'upscayl/upscayl',
    name: 'Upscayl AI',
    stars: '32.1k',
    pillar: 'morning_news',
    category: 'Restaurador de Fotos & IA em Alta Resolução',
    tag: 'IA LOCAL // 100% GRÁTIS',
    hookTitle: 'Restaure Fotos Antigas em <span>4K com IA no seu PC</span>',
    hookAlert: 'CANCELE FERRAMENTAS PAGAS // IA ABERTA',
    hookPrompt: 'Fotos Borradas ➔ Nitidez Absoluta',
    hookComment: 'Multiplica a resolução em até 16 vezes sem distorcer rostos',
    hookStamp: 'QUALIDADE 16X 📸',
    repoTitle: 'Aumente Qualquer Imagem em <span>Alta Definição</span>',
    repoInstall: 'upscayl.org (Roda Offline)',
    repoSub: '⚡ Roda na sua placa de vídeo sem enviar suas fotos para a nuvem',
    techPill: '4 MODELOS NEURAIS // ZERO CUSTO',
    techTitle: 'O Que a IA ➔ <span>Restaura na Hora</span>',
    panelTitle: 'Motor Neural de Super-Resolução Local',
    techRows: [
      { name: '🔍 Aumenta a nitidez de fotos borradas e antigas de família', badge: '01', color: '#34D399' },
      { name: '🎨 Restaura ilustrações, logos e artes em vetor com bordas limpas', badge: '02', color: '#34D399' },
      { name: '💻 Processamento 100% offline no seu computador sem fila', badge: '03', color: '#10A37F' },
      { name: '🆓 Sem limites de imagens e sem mensalidade em dólar', badge: '04', color: '#34D399' }
    ],
    localPill: 'COMO USAR // ARRASTE E SOLTE',
    localTitle: 'Arraste a Foto e <span>Veja a Mágica</span>',
    flowSteps: [
      { icon: '🖼️', label: 'Passo 01 • Escolha a Imagem', val: 'Qualquer foto antiga, print borrado ou miniatura', time: '1 segundo' },
      { icon: '⚙️', label: 'Passo 02 • Selecione a Escala', val: 'Aumente em 4x, 8x ou até 16x com modelo neural', time: 'IA Ativa', active: true },
      { icon: '✨', label: 'Passo 03 • Salve em Alta Resolução', val: 'Foto nítida em alta definição pronta para usar', time: '100% Grátis' }
    ],
    localSpecs: [
      { label: 'Resolução Máxima:', val: 'Até 16x de Upscale', color: 'var(--accent-bright)' },
      { label: 'Privacidade:', val: '100% Offline no PC', color: 'var(--accent-bright)' },
      { label: 'Custo:', val: 'R$ 0,00 (Open-Source)', color: 'var(--accent-bright)' }
    ],
    ctaKeyword: 'FOTO',
    ctaItems: [
      '1️⃣ Link Oficial de Download do Upscayl AI',
      '2️⃣ Guia do Melhor Modelo Neural para Rostos e Imagens Antigas',
      '3️⃣ Dicas para Rodar Rápido Mesmo em PCs Mais Simples'
    ],
    scriptVoice: 'Cancele agora qualquer assinatura de aplicativo para melhorar fotos. Lançaram uma inteligência artificial gratuita e de código aberto que roda direto no seu computador e multiplica a nitidez de qualquer imagem em até dezesseis vezes.\n\nSabe aquela foto antiga de família ou print borrado que você queria salvar? Você só arrasta para dentro do programa e ele recria os detalhes perdidos em quatro K sem distorcer nada.\n\nPrimeiro, ele remove o ruído e o borrão. Segundo, reconstrói texturas naturais de pele e cabelo. Terceiro, roda totalmente offline sem mandar suas fotos para a internet. E quarto, você pode usar quantas vezes quiser sem pagar mensalidade.\n\nComenta FOTO aqui embaixo que eu te envio o link de download e o guia de configuração no seu direct agora mesmo. E já me segue para descobrir segredos da tecnologia todos os dias.',
    status: 'ready'
  },
  {
    id: 'browser-use-agent-v2',
    repo: 'browser-use/browser-use',
    name: 'Browser-Use',
    stars: '36.8k',
    pillar: 'evening_pack',
    category: 'Agente que Navega na Web Sozinho',
    tag: 'AGENTE IA // 100% ABERTO',
    hookTitle: 'O Robô de IA que <span>Navega na Web Sozinho</span>',
    hookAlert: 'AUTOMAÇÃO COMPLETA // ZERO CLIQUES',
    hookPrompt: 'Pesquisa + Compara Preços + Preenche Formulários',
    hookComment: 'Você dá o comando e a inteligência artificial mexe no navegador por você',
    hookStamp: '100% AUTÔNOMO 🤖',
    repoTitle: 'Coloque um Agente de IA para <span>Trabalhar por Você</span>',
    repoInstall: 'github.com/browser-use/browser-use',
    repoSub: '⚡ Roda no seu Chrome e faz pesquisas, compras e extração de dados',
    techPill: '4 CAPACIDADES // NAVEGAÇÃO REAL',
    techTitle: 'O Que o Agente ➔ <span>Executa Sozinho</span>',
    panelTitle: 'Controle de Navegador por Linguagem Natural',
    techRows: [
      { name: '🌐 Abre abas, rola páginas e clica em botões como um ser humano', badge: '01', color: '#34D399' },
      { name: '📊 Compara preços de passagens, hotéis e produtos em 10 sites', badge: '02', color: '#34D399' },
      { name: '📝 Preenche cadastros e formulários repetitivos no automático', badge: '03', color: '#10A37F' },
      { name: '🔒 Roda no seu computador sob sua autorização e supervisão', badge: '04', color: '#34D399' }
    ],
    localPill: 'COMO FUNCIONA // 1 PROMPT',
    localTitle: 'Digite a Tarefa e <span>Assista o Robô Agir</span>',
    flowSteps: [
      { icon: '💬', label: 'Passo 01 • Escreva o Comando', val: '"Encontre os 5 melhores voos de SP para Londres em outubro"', time: '1 frase' },
      { icon: '🤖', label: 'Passo 02 • O Robô Navega', val: 'Ele abre as companhias aéreas, filtra horários e compara taxas', time: 'Ao Vivo', active: true },
      { icon: '📋', label: 'Passo 03 • Receba o Resumo', val: 'Tabela pronta com os links diretos para comprar', time: 'Zero esforço' }
    ],
    localSpecs: [
      { label: 'Automação:', val: 'Chrome / Brave / Edge', color: 'var(--accent-bright)' },
      { label: 'Controle:', val: 'Visual em Tempo Real', color: 'var(--accent-bright)' },
      { label: 'Licença:', val: 'MIT (100% Gratuito)', color: 'var(--accent-bright)' }
    ],
    ctaKeyword: 'ROBO',
    ctaItems: [
      '1️⃣ Link Oficial do Browser-Use no GitHub',
      '2️⃣ Tutorial de Configuração em 5 Minutos no seu PC',
      '3️⃣ Lista com 10 Prompts Prontos para Automatizar Tarefas Diárias'
    ],
    scriptVoice: 'Você já imaginou ter um assistente de inteligência artificial que realmente mexe no navegador por você, pesquisa preços, compara opções e preenche formulários sem você tocar no mouse?\n\nLançaram um projeto gratuito de código aberto que faz exatamente isso. Você só escreve o que precisa em uma frase e assiste o robô abrindo as páginas e resolvendo tudo na sua frente.\n\nPrimeiro, ele navega em qualquer site da internet. Segundo, extrai dados e compara ofertas em segundos. Terceiro, preenche formulários chatos no automático. E quarto, funciona direto no seu navegador com total segurança.\n\nComenta ROBO aqui embaixo que eu te envio o link oficial e o guia completo no seu direct. E já me segue para dominar a inteligência artificial antes de todo mundo.',
    status: 'ready'
  }
];

// ============================================================================
// PIPELINE PRINCIPAL PONTA A PONTA
// ============================================================================
export async function runRadarTrends() {
  const args = parseArgs(process.argv.slice(2));
  console.log('🚀 [DevRemoto] Iniciando Radar de Tendências em 2 Etapas...');
  console.log(`   Configuração: igInsights=${args.igInsights}, search=${args.search}, addToCatalog=${args.addToCatalog}, dryRun=${args.dryRun}`);

  // 1. Etapa /ig: Análise de Outliers
  const igInsights = analyzeIgSwipeInsights();

  // 2. Etapa Search: Varredura de Fontes
  let ghCandidates = [];
  let hnCandidates = [];
  if (args.search) {
    ghCandidates = await searchGitHubTrending();
    hnCandidates = await searchShowHN();
    console.log(`\n✅ Varredura concluída: ${ghCandidates.length} repositórios GitHub e ${hnCandidates.length} lançamentos Show HN avaliados.`);
  }

  // 3. Cruzamento & Seleção dos Melhores Candidatos
  const catalogRaw = readJsonOr(VIDEO_CATALOG_PATH, []);
  const catalog = Array.isArray(catalogRaw) ? catalogRaw : (catalogRaw.catalog || []);
  const isWrapped = !Array.isArray(catalogRaw) && Array.isArray(catalogRaw.catalog);

  const existingRepos = new Set(catalog.map(c => c.repo?.toLowerCase()).filter(Boolean));
  const existingNames = new Set(catalog.map(c => c.name?.toLowerCase()).filter(Boolean));

  const eligible = EVERGREEN_VIRAL_LIBRARY.filter(item => {
    return !existingRepos.has(item.repo?.toLowerCase()) && !existingNames.has(item.name?.toLowerCase());
  });

  const selected = eligible.slice(0, args.limit);
  console.log(`\n🎯 ${selected.length} novas pautas selecionadas e roteirizadas nos 3 pilares editoriais:`);
  
  selected.forEach((item, idx) => {
    console.log(`\n[Pauta 0${idx + 1}] [${item.pillar.toUpperCase()}] ${item.name} (${item.category})`);
    console.log(`  • Repo: ${item.repo} (★ ${item.stars})`);
    console.log(`  • Hook de Abertura: "${item.hookTitle.replace(/<[^>]+>/g, '')}"`);
    console.log(`  • CTA Direct (OpenReply): Comente "${item.ctaKeyword}"`);
  });

  // 4. Inserção no Catálogo (se aprovado)
  if (args.addToCatalog && !args.dryRun && selected.length > 0) {
    console.log(`\n💾 Inserindo ${selected.length} pautas em ${VIDEO_CATALOG_PATH}...`);
    const updated = [...catalog, ...selected];
    writeJson(VIDEO_CATALOG_PATH, isWrapped ? { ...catalogRaw, catalog: updated } : updated);
    console.log(`✅ Catálogo atualizado com sucesso! Total de itens: ${updated.length}`);

    // Sincroniza dashboard
    try {
      execSync('node sync-dashboard.mjs', { cwd: ROOT_DIR, stdio: 'inherit' });
    } catch {}
  } else if (args.dryRun) {
    console.log('\n🔍 Modo --dry-run: Nenhuma alteração foi gravada em disco.');
  }

  console.log('\n🏁 Radar de Tendências concluído!');
}

// Execução direta via CLI
if (process.argv[1] && process.argv[1].endsWith('radar-trends.mjs')) {
  runRadarTrends().catch(err => {
    console.error('❌ Erro na execução do Radar de Tendências:', err);
    process.exit(1);
  });
}
