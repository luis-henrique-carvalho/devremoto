# Pesquisa & Arquitetura de Esteira de Conteúdo — DevRemoto
**Data da Pesquisa:** 08 de Novembro de 2026  
**Objetivo:** Diversificar a grade de publicações do `@devremoto.br` para além de listas de vagas, criando esteiras automatizadas de alta retenção baseadas em repositórios em alta, ferramentas de IA open-source, top skills e conceitos de computação.

---

## 1. Por Que Diversificar o Conteúdo?

O canal `devremoto` já possui uma esteira consolidada de vagas matinais às 11:00 BRT. No entanto, contas que publicam **exclusivamente listas de vagas** sofrem com dois gargalos:
1. **Fadiga de Formato:** O seguidor que já conseguiu emprego ou que não está buscando ativamente para de interagir com o perfil.
2. **Teto de Compartilhamento:** Vagas são compartilhadas apenas pontualmente com amigos que precisam. Em contraste, **ferramentas novas, tutoriais de arquitetura e descobertas do GitHub são compartilhadas amplamente em grupos de devs, Slack e WhatsApp**.

Ao intercalar a curadoria de vagas com **descoberta de tecnologia e educação técnica**, o `@devremoto.br` se posiciona como um hub de inteligência e autoridade para desenvolvedores.

---

## 2. Fontes Primárias e Ferramental de Descoberta

Para garantir dados 100% reais (evitando alucinações ou indicação de projetos abandonados), a esteira utiliza fontes primárias automatizáveis:

### A. GitHub Search CLI nativo (`gh search repos`)
A máquina local possui o `gh version 2.67.0` configurado com extração direta em JSON. Ele permite filtrar projetos por volume de estrelas, velocidade de crescimento e tópicos especializados:

```bash
# Repositórios de IA e Agentes criados recentemente com alta tração
gh search repos "topic:ai stars:>500 pushed:>2026-11-01" --sort stars --limit 10 --json fullName,description,stargazersCount,url

# Repositórios utilitários para desenvolvedores em alta
gh search repos "topic:developer-tools stars:>300 created:>2026-09-01" --sort stars --limit 10 --json fullName,description,stargazersCount,url
```

### B. Mecanismo Anti-Repetição (`data/featured-repos.json`)
Para evitar republicar a mesma ferramenta ou repositório, o agente mantém um registro permanente:
```json
{
  "featured": [
    {
      "repo": "ollama/ollama",
      "featured_date": "2026-11-10",
      "category": "local-ai",
      "stars_at_feature": 115000
    }
  ]
}
```
Antes de sugerir qualquer pauta, o script faz o cruzamento contra esse arquivo.

---

## 3. Os 4 Novos Formatos de Conteúdo de Alta Retenção

### Formato 1: Radar Open-Source da Semana (Top 5 Repositories)
* **Objetivo:** Descobrir ferramentas open-source que facilitam a vida do desenvolvedor antes que virem notícia de massa.
* **Exemplos Reais Levantados:**
  - `astral-sh/uv`: O gerenciador de pacotes Python escrito em Rust que é 10 a 100x mais rápido que o pip.
  - `biomejs/biome`: Linter e formatter em Rust que substitui Prettier e ESLint com execução instantânea.
  - `firecrawl/firecrawl`: API open-source que transforma qualquer página da web em Markdown estruturado para LLMs.
* **Estrutura do Carrossel (7 slides)**:
  - *Slide 1 (Capa)*: `5 Repositórios GitHub para Conhecer` (preview de código e estrelas).
  - *Slides 2 a 5*: 1 repositório por slide (o que faz, comando de instalação `brew`/`npm`/`cargo`, estrelas e caso de uso).
  - *Slide 6 (Recap / Slide do Print)*: Tabela com os 5 nomes, linguagens e comandos rápidos de instalação.
  - *Slide 7 (CTA)*: *"Comente REPOS para receber os 5 links no seu direct."*

---

### Formato 2: Deep Dive de 1 Repositório que está Bombando (Spotlight)
* **Objetivo:** Mostrar na prática como funciona uma biblioteca ou ferramenta específica em vez de apenas dar uma lista.
* **Estrutura do Carrossel (7 slides)**:
  - *Slide 1 (Capa)*: `Essa Ferramenta de Rust Muda Tudo` (ou o nome específico do repo).
  - *Slide 2 (O Problema)*: O perrengue que todo dev passa com a solução legada (ex: demora no build, consumo de RAM).
  - *Slide 3 (A Solução)*: Como a ferramenta resolve o problema por baixo dos panos.
  - *Slide 4 (Código / Terminal)*: Mockup do comando executando em tempo real.
  - *Slide 5 (Benchmark)*: Gráfico comparativo de performance (ex: 2.1s vs 48s).
  - *Slide 6 (Veredito / Recap)*: Quando vale a pena adotar no seu time e quando é hype.
  - *Slide 7 (CTA)*: *"Você já testou essa no seu projeto? Deixe sua opinião nos comentários."*

---

### Formato 3: Ferramentas e Skills de IA Open-Source
* **Objetivo:** O nicho de IA aplicada à engenharia de software é o de maior crescimento no Instagram/LinkedIn.
* **Tópicos Validados:**
  - **Local LLMs**: Como rodar modelos frontier (DeepSeek, Llama, Qwen) 100% offline no notebook via Ollama ou vLLM.
  - **Agent Skills & MCP (Model Context Protocol)**: Como agentes de código (Cursor, Claude Code, Antigravity) conectam ferramentas reais usando servidores MCP.
  - **Superpowers & Metodologias de Agentes**: Test-Driven Development (TDD) e planejamento sistemático para agentes de código.
* **Estrutura do Carrossel**:
  - Foco em arquitetura prática, com diagramas de blocos no padrão Emerald Noir e comandos prontos para copiar.

---

### Formato 4: "Como Funciona por Baixo dos Panos" (Arquitetura e Conceitos Tech)
* **Objetivo:** Formato com maior taxa de salvamentos da história da programação no Instagram. Desmistifica tecnologias que todo mundo usa mas quase ninguém sabe como o SO ou o runtime executam.
* **Pautas de Alto Impacto:**
  1. **Como o Docker Funciona por Baixo dos Panos**: Não é uma máquina virtual! Como o Linux usa `namespaces` (isolamento de processos/rede) e `cgroups` (limites de RAM/CPU).
  2. **Git Internals**: Como o Git armazena tudo em apenas 4 objetos (`blobs`, `trees`, `commits` e `annotated tags`) e uma árvore Merkle criptografada com SHA-1/SHA-256.
  3. **WebSockets vs SSE (Server-Sent Events)**: Quando usar comunicação bidirecional completa vs streaming HTTP unidirecional para feeds e LLMs.
  4. **O Que Acontece Quando Você Digita `google.com` no Navegador**: DNS recursivo, TLS Handshake 1.3, TCP Slow Start, render tree do DOM/CSSOM.
  5. **B-Tree Indexes no Postgres**: Por que `SELECT * WHERE id = 500` demora 1ms enquanto sem índice demora 5 segundos (varredura linear vs busca logarítmica).

---

## 4. Arquitetura da Automação no Antigravity

Para executar essa esteira no piloto automático, o fluxo segue 5 passos orquestrados:

```
[Cron Diário 17:00 BRT]
       │
       ▼
1. Fetch & Filtro (`src/fetch-trending.mjs`)
   ↳ Varre `gh search` e Trendshift por repositórios > 500 estrelas
   ↳ Cruza com `data/featured-repos.json` (elimina duplicatas)
       │
       ▼
2. Roteirização Semântica com IA
   ↳ Aplica regras do `/ig-carousel` (capa de 6 palavras, 7 slides)
   ↳ Formata em `output/<DATA>-content/content-edition.json`
       │
       ▼
3. Renderização Playwright (`src/render-content-carousel.mjs`)
   ↳ Gera 7 slides PNG 1080×1350 na paleta OpenAI Emerald Noir
   ↳ Layouts dinâmicos: Terminal, Code Diff, Benchmark e Diagrama
       │
       ▼
4. Auditoria Visual com IA (`read_file`)
   ↳ Verifica integridade do texto, contraste e ausência de travessão (—)
       │
       ▼
5. Agendamento Postiz
   ↳ Upload e agendamento para as 18:30 BRT na conta `@devremoto.br`
```

---

## 5. Próximos Passos Recomendados

1. Criar `devremoto/data/featured-repos.json` com os primeiros repositórios já mapeados.
2. Criar `devremoto/src/fetch-trending.mjs` usando a CLI `gh search` nativa.
3. Criar `devremoto/src/render-content-carousel.mjs` adaptado para layouts de repositórios, código e diagramas conceituais.
4. Renderizar o primeiro carrossel de teste ("*Como o Docker funciona por baixo dos panos*" ou "*5 Ferramentas de IA Open-Source no GitHub*").
