# DevRemoto: Diretrizes do Agente Antigravity

Bem-vindo ao ecossistema do **DevRemoto** (`@devremoto.br` / `devremoto.luis-carvalho.online`).

## 1. Missão do Projeto
O DevRemoto é um canal de mídia e curadoria de vagas de tecnologia **100% remotas no Brasil e LatAm para brasileiros**.
Nosso objetivo é conectar desenvolvedores a vagas legítimas sem pegadinhas de "híbrido disfarçado", oferecendo valor real, dicas técnicas de preparação e design premium.

## 2. Identidade Visual (Brand Kit: OpenAI Emerald Noir)
- **Fundo Primário:** `#060807` / Fundo Secundário: `#0B0F0E` (`--bg-canvas`)
- **Acento Primário:** Verde Esmeralda (`#10A37F` / `--accent-emerald`)
- **Acento Brilhante:** Verde Menta Neon (`#34D399` / `--accent-bright`)
- **Texto:** Branco neve (`#FFFFFF` / `#F3F4F6`) e cinza suave (`#9CA3AF`)
- **Tipografia:** JetBrains Mono para código, métricas e chips; Inter para títulos e chamadas.
- **Dimensões:**
  - Carrossel: 1080×1350 (4:5)
  - Vídeos: 1080×1920 (9:16)
- ⚠️ **Proibição Estrita de Cores Destoantes**: É terminantemente proibido utilizar cores saturadas de terceiros (ex: laranja do Hacker News, azul do LinkedIn) que quebrem a harmonia do canal. Toda referência externa deve ser adaptada e renderizada na paleta OpenAI Emerald Noir. O vermelho (`#EF4444`) é reservado exclusivamente para status de alerta, concorrência e carimbos de descarte.

## 2.1. Invariantes de Composição Vertical 9:16 (Anti-Vazio & UI Autêntica)
1. **Anti-Vazio e Arquitetura Modular de Cards (Padrão dev-agent-skills)**:
   - Em 1080×1920, o palco central (`.stage`) deve ter respiro harmônico com cards modulares independentes (`.emerald-card`) de largura ~900px a 940px e altura automática (`auto-height`).
   - ❌ **Proibição de Container Monolítico**: Nunca use caixas ou containers monolíticos cobrindo a tela toda com bordas duras (ex: altura fixa de 1000px+ com fundo opaco). O canvas escuro e o grid sutil devem respirar ao redor dos componentes.
   - Cantos arredondados de 24px a 28px, fundo translúcido (`rgba(8, 14, 12, 0.85)` / `backdrop-filter: blur(12px)`), borda esmeralda suave (`rgba(16, 163, 127, 0.25)`) e sombra volumétrica (`box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7)`).
   - Proibido deixar telas ou cenas finais de CTA com caixas soltas e espaço escuro vazio.
   - **Cena de CTA Obrigatória**: Deve exibir o benefício concreto (ex: mockup do Instagram Direct ou inbox recebendo os links com o botão de ação pulsante).
2. **Diversidade de Elementos por Cena e Dinâmica Visual**:
   - Cada cena deve apresentar um componente de UI rico e diferenciado:
     - Mockup de browser com barra de URL e dots de navegação.
     - Terminal monospace com citação direta de fundadores ou código com cursor piscante (`.cursor-blink`).
     - Árvore de arquivos com status do Git (`[M] MODIFIED`, `[+] NEW`) e ícones autênticos.
     - Editor de código com syntax highlighting multicolorido e marcadores de diff.
     - Badges de tecnologias e cards de métricas (tempo de contratação, remuneração em moeda forte).
     - Carimbos angulados de status (ex: "0% EFICIÊNCIA", "0% CHANCE", "PRÉ-APROVADO") com leve *camera shake* no impacto.
     - Mockup de Direct Message / notificação com os links para fechamento de CTA.
   - **Câmera 3D Cinematográfica**: Usar rig de câmera com perspectiva (`perspective: 1200px`) com micro-movimentos contínuos, *rush warp* nas acelerações e *macro zoom* nos detalhes. O HUD (header fixo e pílula de legenda) deve permanecer ancorado em 2D fora da câmera.
3. **Padrão Oficial de Legendas Fonéticas Dinâmicas (audio.transcript.json)**:
   - Container fixado na safe zone oficial em `top: 1675px; height: 90px;` com pílula flutuante `.subtitle-pill`:
     - `border-radius: 999px;`
     - `padding: 16px 40px;`
     - Glassmorphism escuro (`rgba(10, 14, 12, 0.95)`, `backdrop-filter: blur(14px)`)
     - Borda sutil esmeralda (`rgba(52, 211, 153, 0.6)`)
     - Posicionamento rigoroso na safe zone acima da descrição do Reels/TikTok.
   - **Sincronização Fonética Obrigatória (Karaokê)**: As legendas devem ser extraídas diretamente dos timestamps de palavras do `audio.transcript.json` (Kokoro TTS / Faster-Whisper), organizadas em frases curtas de 2 a 4 palavras. A classe `.active-badge` destaca a palavra exata vocalizada a cada segundo.
   - **Proibição de CSS transition**: Proibido usar regras de `transition` no CSS de legendas, mantendo a timeline determinística por frames via GSAP.
4. **Engenharia de Áudio HyperFrames**:
   - BGM com `data-volume="0.10"` e fade-in/fade-out.
   - Narração de voz neural com ganho `data-volume="1.15"`.
   - SFX pontuais entre `0.30` e `0.40` (`whoosh`, `impact`, `pop`, `click`).
   - ⚠️ **Invariante de ID em Áudio**: Todo elemento `<audio>` de SFX ou narração **deve conter um id único**, caso contrário é descartado pelo motor de mixagem do HyperFrames.
   - Loudness final auditado entre **-15.0 e -16.0 LUFS** com True Peak máximo de **-1.0 dBFS** via `tools/short_qa.py`.
5. **Diretrizes de Motion Design e VFX Cinematográfico (Anti-Vídeo Chapado)**:
   - **Câmera 3D com Perspectiva Contínua**: O container `.camera-viewport` deve ter `perspective: 1200px` com câmera em movimento contínuo (órbita sutil ou travelling).
   - **Transições com Causa (Transitions with a Cause)**: Proibido crossfade genérico entre telas. Toda cena deve possuir animação explícita de entrada E saída sincronizada. Use *Zoom Through* (a câmera mergulha no cursor do prompt para abrir o próximo cenário) ou *Whip Snap* direcional.
   - **Micro-transições Ativas**: Varreduras a laser em código ou consoles devem usar transforms GPU (`y`, nunca `top`/`left`), dados numéricos com entrada em cascata (*stagger: 0.15s*) e selos com elasticidade (`back.out(2)`).
   - **Tipografia Cinética com Scramble Text**: Hooks de abertura devem usar decodificação de caracteres aleatórios nos primeiros 0.7s para reforçar a atmosfera hacker/tech.
   - **Impactos com Aberração Cromática**: Carimbos de alerta ou rejeição devem disparar um glitch RGB temporário (separação vermelha e ciano) com camera shake.
   - **Feedback Físico de Comandos**: Execuções de terminal ou botões importantes devem emitir uma onda de choque radial (*Shockwave Ring*).
   - **Isolamento do HUD 2D**: O cabeçalho de marca e a pílula de legendas ficam fixos no `#root` fora do container 3D, blindados contra distorções e cortes de safe zone.
6. **Invariante de Variedade Criativa e Memória Anti-Repetição**:
   - Antes de planejar qualquer novo vídeo, o agente deve consultar os últimos 3 itens de [`data/content-history.json`](file:///home/luis/repositories/canais/devremoto/data/content-history.json) e a **Matriz Combinatória de 400 Combos** em [`devremoto-video-hyperframes/SKILL.md`](file:///home/luis/repositories/canais/.agents/skills/devremoto-video-hyperframes/SKILL.md).
   - É expressamente proibido repetir o mesmo tipo de gancho, transição ou layout do vídeo imediatamente anterior.
   - O agente deve pesquisar e utilizar componentes modulares do catálogo nativo sempre que necessário via `npx hyperframes catalog <termo>` (ex: `before-after-wipe`, `animated-bar-chart`, `browser-device-stage`).

## 3. Grade Editorial Diária e Arquitetura de Postagens

### A. Grade de Publicação (3 Lotes Segmentados + Vídeo)
1. **Lote 1 (08:30 BRT): Front-End, Mobile e UI/UX**
   - Stacks: React, Next.js, Vue, Angular, React Native, Flutter, iOS (Swift), Android (Kotlin).
   - Formato: Carrossel ou Card de Destaque matinal.
2. **Lote 2 (12:30 BRT): Back-End, DevOps e Cloud**
   - Stacks: Node/TypeScript, Python, Java/Spring, C#/.NET, Go, PHP, AWS, Kubernetes, Docker.
   - Formato: Carrossel de vagas para a pausa do almoço.
3. **Lote 3 (18:30 BRT): Dados, Inteligência Artificial, QA e Vagas Júnior/Estágio**
   - Stacks: Data Engineer, Analytics, ML/LLM, Automação de Testes, QA, vagas Júnior e Estágio.
   - Formato: Carrossel de fechamento do dia com alto potencial de compartilhamento comunitário.
4. **Vídeo Diário (15:00 BRT): Reels / Shorts / TikTok**
   - Formato vertical de 30s a 45s com retenção imediata nos primeiros 3 segundos.
5. **Radar Semanal (Domingo 19:30 BRT):**
   - Compilado das 10 melhores oportunidades da semana.

### B. Extensibilidade de Conteúdo e Automação Diária
O ecossistema do DevRemoto opera com dois fluxos principais de conteúdo:
1. **Vídeos Verticais 9:16 (HyperFrames)**: Criados via código HTML + GSAP para Reels/TikTok.
2. **Carrosséis Automatizados 4:5 (1080×1350 via Playwright)**: Gerados em código e agendados no Postiz via cron diário às 11:00 BRT.

### C. Pipeline Automatizado de Carrosséis (Playwright Headless)
Os carrosséis diários **não usam Canva nem templates manuais**. São desenhados em código HTML/CSS e renderizados via Playwright (Chromium headless):

1. **Estrutura Oficial de 7 Slides**:
   - **Slide 1 (Capa)**: Orb iluminado, contador do lote, gancho editorial rotativo e code-block mockado (`radar-br-remoto.ts`).
   - **Slides 2 a 5 (Miolo)**: Vagas organizadas em pares por slide, com badges de Senioridade, tag `remote: true`, stacks e remuneração.
   - **Slide 6 (Cheat-Sheet)**: Tabela resumo de todas as 8 vagas com links curtos numerados.
   - **Slide 7 (CTA Final)**: Chamada de ação com a palavra-chave do dia para os comentários (ex: `Comente REMOTO`) e composer interativo.
2. **Arquivos do Pipeline**:
   - `src/render-carousel.mjs`: Script Playwright que injeta o HTML dos slides, aguarda webfonts (`Inter` e `JetBrains Mono`) e captura screenshots PNG 1080×1350 de alta fidelidade em `output/<YYYY-MM-DD>/slides/`.
   - `src/curate-and-copy.mjs`: Parser de vagas, curadoria semântica e geração da legenda anti-slop para o Instagram.
   - `src/publish-postiz.mjs`: Upload dos 7 PNGs e agendamento via API local do Postiz (`integrationId: cmw6m87yh0001qjy4vy20eyss`).
   - `run-daily.mjs`: Orquestrador CLI ponta a ponta.
3. **Comandos de Execução**:
   - Curadoria de Vagas:
     - Preparar pool: `node run-daily.mjs --prepare`
     - Renderizar e Agendar: `node run-daily.mjs --skip-scan --from-ai output/<DATA>/ai-edition.json --publish --publish-mode schedule`
   - Conteúdo Técnico & Ferramentas Úteis:
     - Preparar pauta do catálogo: `node run-content-daily.mjs --prepare`
     - Renderizar e Agendar: `node run-content-daily.mjs --publish --publish-mode schedule`
4. **Automações Standing (Cron Jobs Ativos)**:
   - **Vagas Diárias (11:00 BRT)**: `~/.gemini/config/sidecars/instagram-devremoto-br/sidecar.json` (`CRON_TZ=America/Bahia 0 11 * * *`)
   - **Vídeos Curtos Reels/HyperFrames (12:00 BRT p/ agendamento às 13:30 BRT)**: `~/.gemini/config/sidecars/devremoto-video-reels/sidecar.json` (`CRON_TZ=America/Bahia 0 12 * * *`)
   - **Conteúdo Técnico & Ferramentas (12:00 BRT p/ agendamento às 18:30 BRT)**: `~/.gemini/config/sidecars/devremoto-content-carousel/sidecar.json` (`CRON_TZ=America/Bahia 0 12 * * 1-5`)

5. **Ledger Unificado de Produções & Painel Visual (`PUBLICATIONS.md` & `dashboard.html`)**:
   - Todo pipeline executado chama automaticamente `node sync-dashboard.mjs` ao final.
   - **`PUBLICATIONS.md`**: Ledger centralizado em Markdown contendo todas as produções cronológicas, automação de origem, links locais diretos (`slides/`, `caption.txt`, `output.mp4`), gatilhos do OpenReply, ID do Postiz e notas de feedback/melhoria contínua.
   - **`dashboard.html`**: Interface visual interativa para inspecionar no navegador as miniaturas dos slides carrossel, player de vídeo 9:16 e links de cada edição.
   - **Comando Manual:** Execute a qualquer momento `npm run status` (ou `node sync-dashboard.mjs`) para atualizar o painel.

### D. Matriz Estratégica: Vídeo (HyperFrames 9:16) vs Carrossel (Playwright 4:5)

A escolha do formato depende diretamente do objetivo comportamental do usuário:

| Dimensão | Carrossel Playwright (4:5 / 1080×1350) | Vídeo HyperFrames (9:16 / 1080×1920) |
| :--- | :--- | :--- |
| **Métrica Primária** | **Salvamentos & Compartilhamentos DM** | **Alcance a Não-Seguidores (Descoberta)** |
| **Comportamento** | Leitura pausada, estudo e consulta posterior | Consumo rápido, choque visual e entretenimento |
| **Gatilho de Decisão** | Comandos de terminal, cheatsheets, listas de ferramentas, tabelas comparativas, vagas detalhadas. | Movimento rápido (digitação animada), split antes/depois, interfaces interativas (TUI) em ação, choque salarial. |
| **Exemplos de Pautas** | - "4 Comandos Git para Salvar o Dia"<br>- "Cheat Sheet Docker para Devs"<br>- "5 Ferramentas Modernas de Terminal em Rust"<br>- "Top Modelos de IA para rodar no Ollama" | - "Como o `zoxide` destrói o comando `cd` (30s de digitação rápida)"<br>- "Navegando no Git sem mouse com `lazygit`"<br>- "Quanto ganha um Dev Remoto na gringa vs Brasil" |

### E. Grade Semanal Oficial de Alta Frequência (2 Posts / Dia)

Para maximizar o crescimento com consistência sem sobrecarregar a audiência:

- **Manhã (11:00 BRT — Fixo Diário)**: **Carrossel de Vagas 100% Remotas**. Curadoria real de 8 vagas com stacks, salários e links diretos via `run-daily.mjs`.
- **Tarde/Noite (18:30 BRT — Revezamento Estratégico)**:
  - **Segunda-feira**: Carrossel Cheat-Sheet (Git ou Terminal para destravar a semana).
  - **Terça-feira**: Vídeo HyperFrames (Showcase de ferramenta com digitação e movimento).
  - **Quarta-feira**: Carrossel de IA Open-Source / Local (Ollama, vLLM, DeepSeek).
  - **Quinta-feira**: Vídeo HyperFrames (Radar Gringa ou Comparativo de Salários).
  - **Sexta-feira**: Carrossel Dicas Práticas de Código / Rust CLI Tools.
  - **Sábado**: Vídeo HyperFrames (Curiosidade Tech, Dev Setup ou Produtividade).
  - **Domingo**: Carrossel Resumo Semanal ou Melhores Vagas da Semana.

### F. Loop de Auditoria e Feedback Pós-Publicação (`/ig-audit`)
Após cada ciclo de 3 a 5 dias:
1. Extrair métricas do Postiz / Instagram Insights:
   - Taxa de Salvamento do Carrossel (meta: > 3%).
   - Retenção nos primeiros 3s do Vídeo (meta: > 45%).
   - Comentários disparados com palavra-chave (meta: > 20 DMs solicitadas).
2. Se um tema em carrossel tiver taxa de salvamento recorde, transformá-lo imediatamente em vídeo curto dinâmico no HyperFrames para amplificar o alcance.

## 4. Formatos Oficiais de Vídeo (Reels / Shorts)

Todos os vídeos verticais (1080×1920) devem seguir um destes formatos aprovados:

1. **"Superpoder de IA / David vs Golias" (Padrão Viral ElevenLabs Clone — 30s a 40s) [FORMATO HERÓICO PRIORITÁRIO]:**
   - **Hook de Choque (0-3s):** Contraste imediato entre uma ferramenta cara/assinatura abusiva e um clone gratuito de código aberto (ex: *"Os caras simplesmente clonaram a ElevenLabs inteira de graça..."*, *"Cancele sua assinatura da Adobe agora..."*).
   - **Storytelling & Quebra de Complexidade (4-7s):** Arquétipo David vs Golias (*"Um dev sozinho, escondido no canto do mundo. Roda no seu PC sem mensalidade e sem limites de caracteres"*).
   - **Retenção & Aceleração (8-14s):** Pergunta retórica de transição (*"E o que isso faz?"*).
   - **Metralhadora de 4 Superpoderes (15-25s):** 4 utilidades práticas tangíveis para qualquer pessoa com contadores visuais `[01/04]`, `[02/04]`, `[03/04]`, `[04/04]`. Proibido focar em detalhes herméticos de compilador ou sintaxe de código.
   - **Plot Twist / Prova Viva (26-32s):** O momento de surpresa que faz o espectador reassistir (*"A narração que você está ouvindo agora foi feita com essa ferramenta. E você nem percebeu."*).
   - **CTA de Fricção Zero (33-40s):** Chamada de ação direta pedindo a palavra-chave nos comentários com animação de digitação do Direct (ex: *"Comente VOZ aqui embaixo que eu te envio o link no direct agora mesmo"*).

2. **"Vaga Secreta do Dia & Choque de Dólar" (30s a 40s):**
   - *Hook (0-3s):* Destaque imediato da remuneração em moeda forte (ex: R$ 35 mil/mês) trabalhando do Brasil para o exterior.
   - *Corpo (4-25s):* As 3 competências reais sem enrolação de RH.
   - *CTA (26-35s):* Comente REMOTO para abrir os links oficiais.

3. **"Radar das Stacks: Quem está contratando mais hoje?" (Data-Driven):**
   - *Hook (0-3s):* Comparação direta entre tecnologias e dados de contratação.
   - *Corpo (4-25s):* Apresentação dos dados levantados pelo motor do CareerOps.
   - *CTA (26-35s):* Pergunta instigando o debate nos comentários.

3. **"O que reprova seu currículo na IA da Gupy":**
   - *Hook (0-3s):* Tela com status de candidatura e o motivo pelo qual 80% dos devs são eliminados antes da triagem humana.
   - *Corpo (4-25s):* Dica técnica de estruturação de texto, palavras-chave e formatação que o ATS consegue ler.
   - *CTA (26-35s):* Salve este vídeo para usar na sua próxima aplicação e confira as vagas do dia no feed.

## 5. Skills Integradas no Ecossistema

O agente deve acionar as seguintes skills especializadas conforme a necessidade do pipeline:

### Produção de Vídeo, Motion e Áudio
- **`devremoto-video-hyperframes`** ([SKILL.md](file:///home/luis/repositories/canais/.agents/skills/devremoto-video-hyperframes/SKILL.md)): Arquitetura e runbook oficial para criação e renderização de vídeos verticais 9:16 com HyperFrames, identidade OpenAI Emerald Noir, componentes de UI e checklist de QA.
- **`hyperframes`** (`~/.gemini/config/skills/hyperframes/SKILL.md`): Motor de renderização de vídeo programático via HTML/CSS/GSAP para MP4 vertical 1080×1920 determinístico.
- **`hyperframes-registry`** (`~/.gemini/config/skills/hyperframes-registry/SKILL.md`): Biblioteca de componentes de vídeo prontos instalados localmente em `videos/*/compositions/`:
  - *Gráficos & Dados:* `animated-bar-chart`, `bar-chart-race`, `chart-story`, `data-chart`, `mk-line-graph`, `decline-chart`.
  - *Código & Terminal:* `terminal-simulator`, `code-terminal-run`, `code-snippet-dark-2026`, `code-diff`, `code-morph`, `code-3d-extrude`, `code-typing`, `code-highlight`.
  - *Demonstração & UI:* `before-after-wipe` (split antes vs depois), `browser-device-stage` (mockup de browser), `ai-chat-reveal`, `chatgpt-exchange`, `dynamic-grid`.
- **`media-use`** (`~/.gemini/config/skills/media-use/SKILL.md`): Gestão de trilhas sonoras (BGM), efeitos sonoros (SFX), transições, LUTs e cortes de áudio.
- **`improve-animations`** (`~/.agents/skills/improve-animations/SKILL.md`): Aplicação de curvas de aceleração orgânicas (springs, cubic-bezier refinado) para eliminar transições mecânicas e lineares.
- **`choreograph`** (`~/.agents/skills/choreograph/SKILL.md`): Orquestração e hierarquia de movimento entre elementos (Lead, Support, Decoration) para animações em bloco fluídas.
- **`transitions-polish`** (`~/.agents/skills/transitions-polish/SKILL.md`): Escala padronizada de tokens de transição (durações, distâncias, desfoques e curvas de bounce).
- **`review-animations`** (`~/.agents/skills/review-animations/SKILL.md`): Auditoria contínua de refinamento de animações e microinterações.
- **`cartoon-3d-short`** (`~/.gemini/config/skills/animated-shorts/SKILL.md`): Produção de shorts animados em 3D e motion visual avançado.
- **`antigravity-voice`** (`~/.gemini/config/plugins/antigravity-voice/skills/antigravity-voice/SKILL.md`): Controle do motor Kokoro-82M TTS rodando localmente no Docker (`localhost:8880`) para gerar narração neural em português de forma rápida e gratuita.
- **`gemini-omni-flash-api`** (`~/.gemini/config/plugins/gemini-api/skills/gemini-omni-flash-api/SKILL.md`): Edição generativa de vídeo e transições com referências visuais via Gemini.

### Copywriting, Retenção e Anti-Slop
- **`copywriting`** (`~/.gemini/config/skills/copywriting/SKILL.md`): Construção de roteiros envolventes, ganchos de alta conversão e chamadas para ação.
- **`li-human`** (`~/.gemini/config/skills/li-human/SKILL.md`): Limpeza de impressões digitais de IA. Elimina pontuação artificial, travessões proibidos e estruturas robóticas.
- **`ad-creative`** (`~/.gemini/config/skills/ad-creative/SKILL.md`): Criação de hooks curtos de alta retenção visual e testes de variações de criativos.

### Inteligência de Dados e Distribuição
- **`career-ops`** (`~/.gemini/config/skills/career-ops/SKILL.md`): Extração contínua, categorização e histórico de portais de vagas no Brasil.
- **`postiz`** (MCP nativo): Ferramentas de agendamento e postagem automatizada de carrosséis e vídeos via API local.

## 6. Camada de Inteligência Anti-Repetição e Anti-Slop
- **Zero Clichê:** Proibido travessão, exclamações excessivas e introduções infladas como "No mercado dinâmico de tecnologia".
- **Rotação de Hooks:** Alterne diariamente entre transparência salarial, qualidade de vida sem trânsito, tendências de mercado e dicas de processo seletivo.
- **Verificação de Duplicidade:** Consulte `data/posted-jobs.json` para nunca repetir links já publicados.

## 7. Distribuição e Publicação
- Gerenciada pelo **Postiz CLI** / API apontando para o servidor local (`https://postiz.luis-carvalho.online`).
- As publicações de carrosséis e vídeos devem ser enviadas no modo `--publish-mode schedule` respeitando os horários estipulados na grade.

## 8. Automação de Comentários e Entrega de Vagas via OpenReply (Gatilho REMOTO)
- Toda postagem de carrossel ou reel com curadoria de vagas deve conter o CTA:
  > *"Comente **REMOTO** aqui nos comentários para receber a lista oficial com todos os links direto na sua DM..."*
- O **OpenReply** (MCP `openreply`) captura os comentários em tempo real via Meta Graph API:
  - Dispara a mensagem privada no Direct com o botão rastreado `Acessar Vagas` (`https://devremoto.luis-carvalho.online/vagas`).
  - Publica uma resposta pública rotativa no post (ex: *"Acabei de te mandar o link direto no inbox! Dá uma conferida lá 🚀"*), dobrando o sinal de engajamento no algoritmo do Instagram.
- Para gerenciar campanhas via Antigravity:
  - Listar campanhas: `call_mcp_tool(ServerName="openreply", ToolName="list_campaigns")`
  - Consultar métricas de conversão: `call_mcp_tool(ServerName="openreply", ToolName="get_campaign_stats", Arguments={"id": "<id>"})`
  - Monitorar comentários recebidos: `call_mcp_tool(ServerName="openreply", ToolName="list_comments", Arguments={"limit": 20})`

