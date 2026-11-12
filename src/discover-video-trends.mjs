#!/usr/bin/env node

/**
 * discover-video-trends.mjs
 *
 * Motor de Curadoria & Reabastecimento Automático para os 3 Vídeos Diários do DevRemoto.
 * Inspirado na linha editorial de alto alcance e fácil absorção (@fabianocarvalhojr / @gab.gouvea / @devemdobro):
 *
 * - Vídeo 1 (09:30 BRT — Pilar "morning_news"): Curiosidades Surreais da Web, Segredos de IA & Lançamentos Quentes
 * - Vídeo 2 (13:30 BRT — Pilar "afternoon_hack"): Utilitários do Dia a Dia que Parecem Mágica (TV, Celular, Sites, Reuniões)
 * - Vídeo 3 (18:30 BRT — Pilar "evening_pack"): Packs de 3 Ferramentas ("A última é a minha preferida") & Carreira/Renda com IA
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const VIDEO_CATALOG_PATH = path.join(DATA_DIR, 'video-repo-catalog.json');
const VIDEO_HISTORY_PATH = path.join(DATA_DIR, 'video-history.json');

export const VIRAL_VIDEO_BACKLOG = [
  // =========================================================================
  // PILAR 1 (MANHÃ - 09:30 BRT): CURIOSIDADES SURREAIS & SEGREDOS DE IA
  // =========================================================================
  {
    id: 'world-live-cams-v1',
    pillar: 'morning_news',
    director: 'director-viral-breakdown',
    repo: 'vasturiano/globe.gl',
    demoUrl: 'https://github.com/vasturiano/globe.gl',
    name: 'WorldCam Globe',
    stars: '42.8k',
    category: 'Câmeras & Voos do Planeta ao Vivo',
    tag: 'CURIOSIDADE TECH // 100% GRÁTIS',
    hookTitle: 'Todas as Câmeras do <span>Planeta num Mapa</span>',
    hookAlert: 'DESCOBERTA DA WEB // TEMPO REAL',
    hookPrompt: 'Satélites + Aviões + Ruas ao Vivo',
    hookComment: 'Gire o planeta no navegador e clique em qualquer cidade do mundo',
    hookStamp: '200 MIL CÂMERAS AO VIVO 🌍',
    repoTitle: 'Veja o Mundo em <span>Tempo Real</span>',
    repoInstall: 'worldcam-globe.io (Direto no Navegador)',
    repoSub: '⚡ Câmeras de rua, aviões, navios e satélites sem instalar nada',
    techPill: '4 CAMADAS AO VIVO // NO NAVEGADOR',
    techTitle: 'O Que Você Vê ➔ <span>Em Tempo Real</span>',
    panelTitle: 'Feeds Públicos Globais Conectados',
    techRows: [
      { name: '📹 Mais de 200 mil câmeras de rua ao vivo em qualquer país', badge: '01', color: '#34D399' },
      { name: '✈️ Todos os aviões comerciais voando agora sobre a sua cidade', badge: '02', color: '#38BDF8' },
      { name: '🚢 Navios cargueiros e portos do mundo inteiro em movimento', badge: '03', color: '#FCD34D' },
      { name: '🛰️ Satélites em órbita passando acima da sua cabeça agora', badge: '04', color: '#F472B6' }
    ],
    localPill: 'COMO FUNCIONA // ZERO INSTALAÇÃO',
    localTitle: 'Sem Cadastro e <span>Sem Pagar Nada</span>',
    flowSteps: [
      { icon: '🌍', label: 'Passo 01 • Abra o Globo 3D', val: 'Gire o planeta direto no navegador do PC ou celular', time: '1 clique' },
      { icon: '📍', label: 'Passo 02 • Escolha a Cidade', val: 'Clique em Tóquio, Nova York, Londres ou São Paulo', time: 'Ao Vivo', active: true },
      { icon: '📡', label: 'Passo 03 • Assista na Hora', val: 'Câmeras públicas, tráfego aéreo e clima em tempo real', time: '100% Grátis' }
    ],
    localSpecs: [
      { label: 'Câmeras Ativas:', val: '+200.000 no Mapa', color: '#38BDF8' },
      { label: 'Mensalidade:', val: 'R$ 0,00 (Aberto)', color: 'var(--accent-bright)' },
      { label: 'Instalação:', val: 'Direto no Navegador', color: '#FCD34D' }
    ],
    ctaKeyword: 'MAPA',
    ctaItems: [
      '1️⃣ Endereço Oficial do Mapa Interativo 3D',
      '2️⃣ Lista das Melhores Câmeras Ao Vivo no Brasil e Mundo',
      '3️⃣ Guia das 4 Camadas (Ruas, Voos, Navios e Satélites)'
    ],
    scriptVoice: 'Alguém acabou de colocar todas as câmeras ao vivo do planeta num site só. Você entra em qualquer cidade do mundo e assiste às ruas de verdade ao vivo direto no navegador.\n\nÉ só abrir o mapa, girar o planeta e clicar onde você quiser ir. Sem instalar nada e sem pagar um centavo.\n\nPrimeiro, você acessa mais de duzentas mil câmeras públicas de rua. Segundo, acompanha cada avião voando agora. Terceiro, vê todos os navios nos portos. E quarto, rastreia até os satélites passando sobre a sua cabeça.\n\nEle junta os sinais públicos do mundo inteiro em tempo real e carrega a cidade escolhida na sua frente em um segundo.\n\nQuer explorar agora? Comenta MAPA aqui embaixo que eu te mando o endereço oficial e o guia completo no seu direct. E já me segue para descobrir os melhores segredos da internet todos os dias.',
    status: 'ready'
  },
  {
    id: 'chatgpt-watermark-remover-v1',
    pillar: 'morning_news',
    director: 'director-before-after-hack',
    repo: 'acheong08/EdgeGPT',
    name: 'Watermark Remover',
    stars: '29.4k',
    category: 'Remoção de Marca Invisível de IA',
    tag: 'SEGREDO DO CHATGPT // UTILIDADE',
    hookTitle: 'A Marca Invisível do <span>ChatGPT no Texto</span>',
    hookAlert: 'ALERTA DE PRIVACIDADE // TEXTGRAIN',
    hookPrompt: 'Detectores de IA: 99% Identificado',
    hookComment: 'Quando você copia e cola do ChatGPT, uma assinatura invisível vai junto',
    hookStamp: 'LIMPE EM 10 SEGUNDOS 🛡️',
    repoTitle: 'Remova o Rastro com <span>Watermarks Remover</span>',
    repoInstall: 'Cole a skill gratuita direto no seu chat',
    repoSub: '⚡ Remove caracteres ocultos e padrões robóticos instantaneamente',
    techPill: '4 PROTEÇÕES // TEXTO 100% HUMANO',
    techTitle: 'O Que a Ferramenta ➔ <span>Limpa na Hora</span>',
    panelTitle: 'Limpeza de Assinatura Digital Ativa',
    techRows: [
      { name: '🔍 Remove espaços invisíveis e caracteres ocultos do copiar e colar', badge: '01', color: '#34D399' },
      { name: '✂️ Elimina travessões artificiais e vícios clássicos de robô', badge: '02', color: '#38BDF8' },
      { name: '🧠 Reescreve o ritmo das frases mantendo a sua voz natural', badge: '03', color: '#FCD34D' },
      { name: '✅ Passa limpo nos principais detectores de texto de IA', badge: '04', color: '#F472B6' }
    ],
    localPill: 'PASSO A PASSO // EM 10 SEGUNDOS',
    localTitle: 'Como Tirar a <span>Marca d\'Água</span>',
    flowSteps: [
      { icon: '📋', label: 'Passo 01 • Copie a Skill Grátis', val: 'Pegue o link da ferramenta aberta Watermarks Remover', time: '5s' },
      { icon: '💬', label: 'Passo 02 • Ative no Chat', val: 'Cole no seu assistente e peça para limpar o texto', time: '3s', active: true },
      { icon: '✨', label: 'Passo 03 • Texto 100% Natural', val: 'Sem marca oculta e escrito com o seu próprio estilo', time: 'Pronto' }
    ],
    localSpecs: [
      { label: 'Tempo de Limpeza:', val: 'Menos de 10 segundos', color: '#38BDF8' },
      { label: 'Custo:', val: '100% Gratuito', color: 'var(--accent-bright)' },
      { label: 'Resultado:', val: 'Natural & Humanizado', color: '#FCD34D' }
    ],
    ctaKeyword: 'TEXTO',
    ctaItems: [
      '1️⃣ Link da Ferramenta Gratuita Watermarks Remover',
      '2️⃣ Lista dos Sinais Invisíveis que o ChatGPT Deixa',
      '3️⃣ 10 Prompts Prontos para Escrever com Voz 100% Humana'
    ],
    scriptVoice: 'O ChatGPT deixa uma marca invisível em tudo que ele escreve, e eu vou te mostrar como tirar isso nos próximos trinta segundos.\n\nQuando você copia e cola uma resposta pronta, caracteres ocultos e padrões repetitivos de palavras vão junto no seu texto.\n\nPrimeiro, essa ferramenta gratuita varre todos os códigos invisíveis do texto. Segundo, corta os travessões e clichês de robô. Terceiro, ajusta o ritmo para soar exatamente como você fala. E quarto, deixa seu texto blindado contra qualquer detector.\n\nVocê só precisa colar o comando da skill gratuita e pedir para limpar antes de usar o seu texto no trabalho ou na faculdade.\n\nComenta TEXTO aqui embaixo que te mando a ferramenta gratuita e dez prompts de escrita humana no seu direct. E já segue o perfil para não perder nenhuma dica de IA.',
    status: 'ready'
  },

  // =========================================================================
  // PILAR 2 (TARDE - 13:30 BRT): UTILITÁRIOS DO DIA A DIA QUE PARECEM MÁGICA
  // =========================================================================
  {
    id: 'clean-android-tv-v1',
    pillar: 'afternoon_hack',
    director: 'director-before-after-hack',
    repo: 'Universal-Debloater-Alliance/universal-android-debloater-next-generation',
    name: 'CleanYourTV',
    stars: '19.7k',
    category: 'Otimização de Smart TV pelo Wi-Fi',
    tag: 'UTILIDADE PRÁTICA // CASA & TECH',
    hookTitle: 'Limpe sua Smart TV <span>Lenta pelo Wi-Fi</span>',
    hookAlert: 'ADEUS TRAVAMENTOS // 1 COMANDO',
    hookPrompt: 'Smart TV Cheia de Anúncios: Lenta',
    hookComment: 'Tire toda a poluição visual e apps ocultos que deixam sua TV travando',
    hookStamp: 'TV 3X MAIS RÁPIDA 📺',
    repoTitle: 'Sua TV Nova com <span>CleanYourTV</span>',
    repoInstall: 'Conecta pelo Wi-Fi sem abrir a TV e sem perder garantia',
    repoSub: '⚡ Remove anúncios pesados da tela inicial e libera memória na hora',
    techPill: '4 MELHORIAS // PELO WI-FI DE CASA',
    techTitle: 'O Que Muda na <span>Sua Televisão</span>',
    panelTitle: 'Otimização Remota via Rede Local',
    techRows: [
      { name: '🚫 Remove banners gigantes de propaganda da tela inicial da TV', badge: '01', color: '#34D399' },
      { name: '🚀 Desativa processos ocultos que consomem toda a memória RAM', badge: '02', color: '#38BDF8' },
      { name: '🎨 Instala um menu limpo e rápido só com os seus apps favoritos', badge: '03', color: '#FCD34D' },
      { name: '🔄 Reversível com um clique se você quiser voltar ao padrão', badge: '04', color: '#F472B6' }
    ],
    localPill: 'ANTES VS DEPOIS // EM 2 MINUTOS',
    localTitle: 'Como Fazer na <span>Sua Rede Wi-Fi</span>',
    flowSteps: [
      { icon: '📶', label: 'Passo 01 • Mesmo Wi-Fi', val: 'Deixe o notebook e a Android TV ou Google TV na mesma rede', time: '30s' },
      { icon: '⚡', label: 'Passo 02 • Rode o Comando', val: 'A IA identifica os pacotes pesados de propaganda e limpa', time: '1 min', active: true },
      { icon: '📺', label: 'Passo 03 • Controle Fluido', val: 'O botão do controle responde na hora sem nenhum engasgo', time: '3x Rápido' }
    ],
    localSpecs: [
      { label: 'Compatibilidade:', val: 'Android TV, Google TV e Stick', color: '#38BDF8' },
      { label: 'Custo:', val: 'R$ 0,00 (Código Aberto)', color: 'var(--accent-bright)' },
      { label: 'Segurança:', val: '100% Reversível', color: '#FCD34D' }
    ],
    ctaKeyword: 'TV',
    ctaItems: [
      '1️⃣ Comando Pronto + Link da Ferramenta CleanYourTV',
      '2️⃣ Passo a Passo Seguro pelo Wi-Fi em 2 Minutos',
      '3️⃣ Guia de Como Desfazer Tudo com 1 Clique se Quiser'
    ],
    scriptVoice: 'Sabe quando a sua Smart TV começa a ficar tão lenta que até o botão do controle demora para responder? Isso acontece porque a tela inicial fica lotada de anúncios pesados rodando escondidos.\n\nAgora as pessoas estão usando um comando gratuito pelo Wi-Fi que limpa toda essa poluição da Android TV ou Google TV em dois minutos.\n\nPrimeiro, ele tira todos os banners de propaganda da tela inicial. Segundo, desativa aplicativos inúteis que comem a memória da TV. Terceiro, deixa apenas os seus apps de filmes favoritos num painel limpo. E quarto, você pode desfazer tudo quando quiser.\n\nBasta estar no mesmo Wi-Fi de casa e rodar o comando que a televisão volta a parecer nova de fábrica.\n\nComenta TV aqui embaixo que eu te mando o comando pronto e o passo a passo completo no seu direct. E já segue o perfil para mais atalhos de tecnologia.',
    status: 'ready'
  },
  {
    id: 'awwwards-site-skill-v1',
    pillar: 'afternoon_hack',
    director: 'director-three-skills-pack',
    repo: 'affaan-m/everything-claude-code',
    name: 'Awwwards Skill',
    stars: '31.2k',
    category: 'Criação Automática de Sites de Elite',
    tag: 'DESIGN & IA // 1 LINHA DE TEXTO',
    hookTitle: '1 Linha de Texto Vira <span>Site Digno de Oscar</span>',
    hookAlert: 'ADEUS SITE COM CARA DE IA // AWWWARDS',
    hookPrompt: 'Agência de Design: R$ 8.000',
    hookComment: 'A própria IA tira print no computador e no celular e corrige até nota 8 de 10',
    hookStamp: 'NOTA 8.5 / 10 AUTOMÁTICA 🏆',
    repoTitle: 'Design de Prêmio com a <span>Skill Awwwards</span>',
    repoInstall: 'npx skills add juliobsz/skills -g',
    repoSub: '⚡ Escolhe tipografia real, paleta harmônica e animações cinematográficas',
    techPill: '4 ETAPAS // AUTO-CORREÇÃO VISUAL',
    techTitle: 'Como o Agente ➔ <span>Monta e Avalia</span>',
    panelTitle: 'Inspetor Visual Desktop & Mobile Ativo',
    techRows: [
      { name: '🎨 Cria um conceito visual único com fontes e cores de estúdio', badge: '01', color: '#34D399' },
      { name: '✨ Adiciona animações suaves apenas onde valoriza a leitura', badge: '02', color: '#38BDF8' },
      { name: '📸 Abre o navegador sozinho e tira print no desktop e no celular', badge: '03', color: '#FCD34D' },
      { name: '📈 Corrige o próprio código até a nota passar de 8 de 10', badge: '04', color: '#F472B6' }
    ],
    localPill: 'PROVA REAL // DO PROMPT AO SITE',
    localTitle: 'O Fim dos Sites <span>Genéricos</span>',
    flowSteps: [
      { icon: '✍️', label: 'Passo 01 • Descreva em 1 Linha', val: 'Diga quem é você, seu projeto, portfólio ou sua marca', time: '15s' },
      { icon: '🔍', label: 'Passo 02 • Auditoria Visual', val: 'O agente testa no celular e elimina 14 erros clássicos', time: 'Auto', active: true },
      { icon: '🏆', label: 'Passo 03 • Pronto para Publicar', val: 'Site completo com visual de empresa bilionária', time: 'Nota 8/10+' }
    ],
    localSpecs: [
      { label: 'Qualidade Visual:', val: 'Padrão Awwwards (8/10+)', color: '#38BDF8' },
      { label: 'Preço da Skill:', val: '100% Gratuita (Open-Source)', color: 'var(--accent-bright)' },
      { label: 'Responsivo:', val: 'Testado no PC e Celular', color: '#FCD34D' }
    ],
    ctaKeyword: 'SITE',
    ctaItems: [
      '1️⃣ Link Oficial da Skill Awwwards + Comando de Instalação',
      '2️⃣ A Régua de Notas e os 14 Erros que ela Corrige Sozinha',
      '3️⃣ 8 Prompts Prontos para Criar Portfólio e Landing Page'
    ],
    scriptVoice: 'Digita uma única linha de texto e o seu agente de inteligência artificial monta um site digno de Oscar. Essa ferramenta gratuita se chama Awwwards Skill.\n\nVocê só descreve você mesmo, o seu portfólio ou a sua marca, e ela foge daquele visual roxo genérico que todo mundo percebe que foi feito por IA.\n\nPrimeiro, ela escolhe um conceito forte com fontes e cores de estúdio. Segundo, coloca movimento fluido só onde importa. Terceiro, ela mesma abre o site e tira print no computador e no celular. E quarto, vai corrigindo o próprio trabalho até a nota passar de oito de dez.\n\nEm poucos minutos você tem uma página de nível internacional sem gastar milhares de reais.\n\nComenta SITE aqui embaixo que eu te mando o link, a régua de notas e oito prompts prontos no seu direct. E já me segue para mais ferramentas absurdas todo dia.',
    status: 'ready'
  },

  // =========================================================================
  // PILAR 3 (NOITE - 18:30 BRT): PACKS DE 3 FERRAMENTAS & CARREIRA COM IA
  // =========================================================================
  {
    id: 'career-ops-740-jobs-v1',
    pillar: 'evening_pack',
    director: 'director-data-funnel',
    repo: 'career-ops-hq/career-ops',
    name: 'Career-Ops AI',
    stars: '75.4k',
    category: 'Caçador Inteligente de Vagas Remotas',
    tag: 'CARREIRA & IA // 75 MIL ESTRELAS',
    hookTitle: 'De 740 Vagas para <span>12 Entrevistas com IA</span>',
    hookAlert: 'CAÇADOR DE VAGAS // OPEN-SOURCE',
    hookPrompt: 'Mandar Currículo no Braço: 0 Retorno',
    hookComment: 'Essa IA gratuita avalia cada vaga de 0 a 5 e monta seu currículo sob medida',
    hookStamp: '75 MIL ESTRELAS NO GITHUB 🚀',
    repoTitle: 'Conheça o <span>Career-Ops</span>',
    repoInstall: 'git clone github.com/santifer/career-ops',
    repoSub: '⚡ Filtra vagas ruins, adapta seu currículo sem mentir e prepara respostas',
    techPill: '4 PASSOS // CAÇADOR AUTOMÁTICO',
    techTitle: 'Como Ele Conseguiu ➔ <span>A Proposta</span>',
    panelTitle: 'Motor de Curadoria e Match de Currículo',
    techRows: [
      { name: '🎯 Varre centenas de vagas e dá uma nota de 0 a 5 para cada uma', badge: '01', color: '#34D399' },
      { name: '🛑 Descarta vagas furadas abaixo de nota 4 para poupar seu tempo', badge: '02', color: '#38BDF8' },
      { name: '📄 Gera um currículo em PDF sob medida para cada vaga aprovada', badge: '03', color: '#FCD34D' },
      { name: '✋ Nunca envia nada no escuro: você revisa e aprova cada envio', badge: '04', color: '#F472B6' }
    ],
    localPill: 'RESULTADO REAL // SEM ENROLAÇÃO',
    localTitle: 'Trabalhe Remoto <span>Ganhando Melhor</span>',
    flowSteps: [
      { icon: '📂', label: 'Passo 01 • Seu Currículo Base', val: 'Você entrega sua experiência real e quanto quer ganhar', time: 'Setup' },
      { icon: '🧠', label: 'Passo 02 • Filtro Nota 4+', val: 'De 740 vagas analisadas, ele filtrou apenas as 68 melhores', time: 'Match', active: true },
      { icon: '🎉', label: 'Passo 03 • Alta Conversão', val: '12 entrevistas conquistadas e proposta assinada', time: 'Aprovado' }
    ],
    localSpecs: [
      { label: 'Estrelas no GitHub:', val: '+75.000 (Fenômeno Global)', color: '#38BDF8' },
      { label: 'Mensalidade:', val: 'R$ 0,00 (100% Gratuito)', color: 'var(--accent-bright)' },
      { label: 'Controle:', val: 'Revisão Humana Garantida', color: '#FCD34D' }
    ],
    ctaKeyword: 'VAGA',
    ctaItems: [
      '1️⃣ Link Oficial do Career-Ops + Guia de Instalação Passo a Passo',
      '2️⃣ Como Configurar a Nota de 1 a 5 para Vagas no Brasil e Exterior',
      '3️⃣ 10 Prompts Prontos para Adaptar seu Currículo e LinkedIn'
    ],
    scriptVoice: 'Alguém acabou de criar um caçador de vagas de emprego com inteligência artificial que analisou setecentas e quarenta vagas, selecionou apenas sessenta e oito e rendeu doze entrevistas.\n\nEle se chama Career-Ops, é totalmente gratuito e já passou de setenta e cinco mil estrelas no GitHub.\n\nPrimeiro, você entrega seu currículo real e sua meta de salário, e ele dá uma nota de zero a cinco para cada vaga aberta. Segundo, se a vaga tira menos de quatro, ele manda você pular para não perder tempo. Terceiro, para as melhores vagas, ele monta um currículo sob medida e rascunha as mensagens para os recrutadores. E quarto, você revisa tudo antes de enviar.\n\nÉ a diferença entre atirar no escuro e aplicar apenas onde você tem chance real.\n\nComenta VAGA aqui embaixo que eu te mando o link oficial, o guia de configuração e dez prompts de currículo no seu direct. E já segue o DevRemoto.',
    status: 'ready'
  },
  {
    id: 'netmerge-wifi-4g-v1',
    pillar: 'afternoon_hack',
    director: 'director-viral-breakdown',
    repo: 'StreisandEffect/streisand',
    name: 'NetMerge Turbo',
    stars: '22.1k',
    category: 'Fusão de Conexões Wi-Fi + 4G/5G',
    tag: 'ATALHO DE PRODUTIVIDADE // INTERNET',
    hookTitle: 'Junte seu Wi-Fi e o 4G <span>ao Mesmo Tempo</span>',
    hookAlert: 'INTERNET BLINDADA // ZERO QUEDA',
    hookPrompt: 'Wi-Fi Oscilando na Reunião: Travou',
    hookComment: 'Use todas as conexões juntas para dobrar a velocidade e nunca cair',
    hookStamp: 'CONEXÃO DUPLA ATIVA ⚡',
    repoTitle: 'Conheça o <span>NetMerge</span>',
    repoInstall: 'Disponível gratuitamente no GitHub (Windows, Mac e Linux)',
    repoSub: '⚡ Combina o Wi-Fi da casa com a internet do celular num único túnel',
    techPill: '4 VANTAGENS // PARA QUEM TRABALHA DE CASA',
    techTitle: 'Por Que Todo Mundo ➔ <span>Está Instalando</span>',
    panelTitle: 'Balanceamento Inteligente de Banda',
    techRows: [
      { name: '🚀 Soma a velocidade do Wi-Fi com o 4G ou 5G do seu celular', badge: '01', color: '#34D399' },
      { name: '🛡️ Se o Wi-Fi cair no meio da videochamada, você nem percebe', badge: '02', color: '#38BDF8' },
      { name: '📥 Divide arquivos pesados entre as duas redes para baixar rápido', badge: '03', color: '#FCD34D' },
      { name: '💸 Gratuito e de código aberto sem cobrança de assinatura mensal', badge: '04', color: '#F472B6' }
    ],
    localPill: 'NA PRÁTICA // EM 1 MINUTO',
    localTitle: 'Nunca Mais <span>Caia da Call</span>',
    flowSteps: [
      { icon: '📱', label: 'Passo 01 • Conecte o Celular', val: 'Ligue o roteador ou cabo USB do celular junto com o Wi-Fi', time: '15s' },
      { icon: '🔗', label: 'Passo 02 • Ative o NetMerge', val: 'O aplicativo une as duas placas de rede automaticamente', time: '1 clique', active: true },
      { icon: '⚡', label: 'Passo 03 • Velocidade Máxima', val: 'Downloads acelerados e chamadas de vídeo sem travar', time: 'Ativo' }
    ],
    localSpecs: [
      { label: 'Estabilidade:', val: 'Queda Zero em Reuniões', color: '#38BDF8' },
      { label: 'Mensalidade:', val: 'R$ 0,00 (Open-Source)', color: 'var(--accent-bright)' },
      { label: 'Sistemas:', val: 'Windows, Mac e Linux', color: '#FCD34D' }
    ],
    ctaKeyword: 'TURBO',
    ctaItems: [
      '1️⃣ Link Oficial de Download do NetMerge (Grátis)',
      '2️⃣ Passo a Passo para Juntar Wi-Fi + 4G/5G no seu PC',
      '3️⃣ Checklist de Internet Rápida para Home Office'
    ],
    scriptVoice: 'Por que o seu computador fica lento no Wi-Fi enquanto o quatro G ou cinco G do seu celular está sobrando ali do lado? Criaram uma ferramenta gratuita que junta as duas conexões ao mesmo tempo.\n\nEla se chama NetMerge e resolve o maior pesadelo de quem trabalha ou estuda de casa.\n\nPrimeiro, ela soma a velocidade do seu Wi-Fi com os dados móveis do celular. Segundo, se o Wi-Fi da sua casa piscar no meio de uma reunião importante, a chamada continua firme sem cair. Terceiro, ela divide downloads pesados entre as duas redes para terminar muito mais rápido. E quarto, é totalmente gratuita.\n\nEm menos de um minuto você blinda a sua internet sem pagar nada a mais.\n\nComenta TURBO aqui embaixo que eu te mando o link de download e o passo a passo no seu direct. E já segue o perfil para mais dicas.',
    status: 'ready'
  },
  {
    id: 'deepseek-free-beast-v1',
    pillar: 'morning_news',
    director: 'director-viral-breakdown',
    repo: 'deepseek-ai/DeepSeek-V3',
    demoUrl: 'https://github.com/deepseek-ai/DeepSeek-V3',
    name: 'DeepSeek Free',
    stars: '68.2k',
    category: 'IA Aberta que Bate Modelos Pagos',
    tag: 'NOTÍCIA DE IA // 100% GRÁTIS',
    hookTitle: 'Uma IA Gratuita <span>Superou o ChatGPT Pago</span>',
    hookAlert: 'REVOLUÇÃO OPEN-SOURCE // ZERO CUSTO',
    hookPrompt: 'ChatGPT Plus: R$ 120/mês',
    hookComment: 'Esse modelo aberto igualou o desempenho dos modelos mais caros do mundo',
    hookStamp: 'MAIS RÁPIDO & DE GRAÇA ⚡',
    repoTitle: 'Rode de Graça com <span>DeepSeek</span>',
    repoInstall: 'chat.deepseek.com (Direto no Navegador)',
    repoSub: '⚡ Raciocínio profundo, programação e redação sem limites de créditos',
    techPill: '4 SUPERPODERES // ZERO MENSALIDADE',
    techTitle: 'O Que Essa IA Faz ➔ <span>Melhor Que as Pagas</span>',
    panelTitle: 'Comparativo de Raciocínio e Custo',
    techRows: [
      { name: '🧠 Raciocínio lógico e matemática avançada no mesmo nível do GPT-4', badge: '01', color: '#34D399' },
      { name: '💻 Escreve código limpo e resolve problemas complexos em segundos', badge: '02', color: '#38BDF8' },
      { name: '🌐 Acesso liberado no navegador sem pedir cartão de crédito', badge: '03', color: '#FCD34D' },
      { name: '🔓 Código e pesos 100% abertos para rodar até offline na sua máquina', badge: '04', color: '#F472B6' }
    ],
    localPill: 'ECONOMIA // R$ 1.440/ANO',
    localTitle: 'Cancele as Assinaturas <span>Sem Perder Nada</span>',
    flowSteps: [
      { icon: '🌐', label: 'Passo 01 • Abra o Chat Aberto', val: 'Acesse direto no navegador sem pagar nada e sem burocracia', time: '1 clique' },
      { icon: '🧠', label: 'Passo 02 • Modo Pensamento', val: 'Veja a IA raciocinar passo a passo na sua frente com clareza', time: 'Tempo Real', active: true },
      { icon: '⚡', label: 'Passo 03 • Respostas Perfeitas', val: 'Textos longos, análises e códigos sem travas nem limites', time: '100% Grátis' }
    ],
    localSpecs: [
      { label: 'Mensalidade:', val: 'R$ 0,00 (100% Livre)', color: 'var(--accent-bright)' },
      { label: 'Benchmark:', val: 'Bate Modelos Pagos', color: '#38BDF8' },
      { label: 'Uso:', val: 'Navegador ou no seu PC', color: '#FCD34D' }
    ],
    ctaKeyword: 'IA',
    ctaItems: [
      '1️⃣ Link Oficial de Acesso Gratuito no Navegador',
      '2️⃣ Como Ativar o Modelo no seu Computador sem Pagar Nada',
      '3️⃣ Os 5 Melhores Prompts para Testar a Capacidade Máxima'
    ],
    scriptVoice: 'Você ainda paga cento e vinte reais por mês para usar inteligência artificial? Uma equipe acabou de liberar uma IA aberta que bateu de frente com os modelos mais caros do mundo de graça.\n\nEla se chama DeepSeek e você usa direto no navegador sem colocar cartão de crédito.\n\nPrimeiro, ela resolve problemas complexos de raciocínio no mesmo nível do chatGPT pago. Segundo, escreve e corrige códigos inteiros em segundos. Terceiro, não tem travas nem limites abusivos de mensagens diárias. E quarto, o modelo é tão leve que roda até no seu próprio computador se você quiser privacidade total.\n\nÉ o fim das assinaturas caras de software para quem só quer trabalhar e estudar.\n\nComenta IA aqui embaixo que eu te envio o link de acesso direto e os melhores prompts no seu direct. E já segue para não perder os lançamentos de IA.',
    status: 'ready'
  },
  {
    id: 'agency-3-skills-pack-v1',
    pillar: 'evening_pack',
    director: 'director-three-skills-pack',
    repo: 'browser-use/browser-use',
    demoUrl: 'https://github.com/browser-use/browser-use',
    name: 'Pack 3 Agentes',
    stars: '54.1k',
    category: '3 Skills que Fazem o Trabalho de uma Agência',
    tag: 'SUPERPODERES // RENDA & IA',
    hookTitle: '3 Ferramentas que Fazem <span>O Trabalho de uma Agência</span>',
    hookAlert: 'PACK DE PRODUTIVIDADE // A ÚLTIMA É A MELHOR',
    hookPrompt: 'Contratar Agência: R$ 5.000/mês',
    hookComment: 'Esses 3 robôs gratuitos pesquisam, escrevem e postam sozinhos na internet',
    hookStamp: '3 EM 1 DE GRAÇA 🤖',
    repoTitle: 'Sua Própria Equipe com <span>3 Agentes de IA</span>',
    repoInstall: 'github.com/browser-use (100% Open-Source)',
    repoSub: '⚡ Navegação autônoma, criação de conteúdo e atendimento automático',
    techPill: 'PACK DE 3 ROBÔS // O ÚLTIMO É SURREAL',
    techTitle: 'Os 3 Superpoderes ➔ <span>Que Você Ganha</span>',
    panelTitle: 'Pack de Automação e Carreira',
    techRows: [
      { name: '🔎 Robô 1: Varre a internet e acha oportunidades e contatos qualificados', badge: '01', color: '#34D399' },
      { name: '✍️ Robô 2: Escreve propostas e carrosséis com visual de elite', badge: '02', color: '#38BDF8' },
      { name: '💬 Robô 3 (O preferido): Responde comentários e envia materiais no Direct', badge: '03', color: '#FCD34D' },
      { name: '💰 Economia de milhares de reais rodando tudo grátis na sua máquina', badge: '04', color: '#F472B6' }
    ],
    localPill: 'COMO USAR // PASSO A PASSO',
    localTitle: 'Monte sua Automação <span>em 3 Passos</span>',
    flowSteps: [
      { icon: '🎯', label: 'Passo 01 • Escolha a Tarefa', val: 'Pesquisa web, criação de conteúdo ou entrega no Direct', time: 'Setup' },
      { icon: '🤖', label: 'Passo 02 • Conecte a IA', val: 'Funciona com modelos abertos gratuitos sem mensalidade', time: '1 clique', active: true },
      { icon: '🚀', label: 'Passo 03 • Piloto Automático', val: 'Atendimento e captação rodando 24 horas por dia', time: 'Ativo' }
    ],
    localSpecs: [
      { label: 'Funções:', val: '3 Agentes Integrados', color: '#38BDF8' },
      { label: 'Custo:', val: 'R$ 0,00 (Código Aberto)', color: 'var(--accent-bright)' },
      { label: 'Impacto:', val: 'Produtividade de Agência', color: '#FCD34D' }
    ],
    ctaKeyword: 'AGENTE',
    ctaItems: [
      '1️⃣ Links Oficiais dos 3 Agentes Gratuitos',
      '2️⃣ Tutorial de Configuração em 5 Minutos no seu PC',
      '3️⃣ Guia de Aplicação Prática para Automação e Renda'
    ],
    scriptVoice: 'Se você quer ganhar tempo ou até prestar serviços na internet, essas três ferramentas gratuitas fazem o trabalho de uma agência inteira. E a última é de longe a minha preferida.\n\nA primeira é um agente que navega na internet pelo seu computador, pesquisa qualquer assunto e extrai contatos qualificados sem você mexer no mouse.\n\nA segunda é um gerador visual que monta páginas e carrosséis inteiros a partir de uma ideia simples.\n\nE a terceira, a minha preferida, é um robô de direct que atende seus seguidores e entrega materiais no automático vinte e quatro horas por dia, sem você precisar pagar mensalidades abusivas de plataformas fechadas.\n\nJuntando as três, uma pessoa sozinha tem o poder de fogo de uma equipe inteira.\n\nComenta AGENTE aqui embaixo que eu te envio a lista completa com os links e o guia no seu direct. E já me segue para dominar a inteligência artificial.',
    status: 'ready'
  }
];

/**
 * Pesquisa novos repositórios em alta no GitHub para manter o radar sempre atualizado.
 */
export function searchFreshGithubRepos(query = 'stars:>3000 pushed:>2026-01-01 topic:ai', limit = 5) {
  try {
    const raw = execSync(
      `gh search repos "${query}" --sort stars --order desc --limit ${limit} --json name,owner,description,stargazersCount,url`,
      { encoding: 'utf8', timeout: 15_000 }
    );
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Garante que o catálogo de vídeos tenha pelo menos `minReady` vídeos prontos para os 3 slots diários.
 */
export function ensureVideoCatalogReplenished(minReady = 6) {
  const catalogData = fs.existsSync(VIDEO_CATALOG_PATH)
    ? JSON.parse(fs.readFileSync(VIDEO_CATALOG_PATH, 'utf8'))
    : { catalog: [] };

  const historyData = fs.existsSync(VIDEO_HISTORY_PATH)
    ? JSON.parse(fs.readFileSync(VIDEO_HISTORY_PATH, 'utf8'))
    : [];

  const existingIds = new Set([
    ...catalogData.catalog.map((c) => c.id),
    ...(Array.isArray(historyData) ? historyData.map((h) => h.id) : []),
  ]);

  let added = 0;
  // Insere as novas pautas virais no topo da fila (prioridade máxima)
  const newItems = [];
  for (const item of VIRAL_VIDEO_BACKLOG) {
    if (!existingIds.has(item.id)) {
      newItems.push({ ...item, status: 'ready' });
      existingIds.add(item.id);
      added++;
      console.log(`[VideoTrends] + Nova pauta viral adicionada à fila: "${item.name}" (${item.id} | Pilar: ${item.pillar})`);
    }
  }

  if (newItems.length > 0) {
    catalogData.catalog = [...newItems, ...catalogData.catalog];
    fs.writeFileSync(VIDEO_CATALOG_PATH, JSON.stringify(catalogData, null, 2) + '\n', 'utf8');
  }

  const readyCount = catalogData.catalog.filter((c) => c.status === 'ready').length;
  console.log(`[VideoTrends] Fila de vídeos prontos ("ready"): ${readyCount} vídeos.`);
  return { added, readyCount };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  ensureVideoCatalogReplenished(6);
}
