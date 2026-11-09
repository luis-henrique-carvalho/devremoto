# 📊 Central de Operações & Ledger de Publicações — DevRemoto

> **Documento gerado automaticamente.** Mapeia rigorosamente cada conteúdo produzido pelas automações, sua origem, arquivos gerados no disco e status no Postiz.
> Última sincronização: **09/11/2026, 17:43:22 (Horário de Brasília)**

## 1. Grade Editorial & Próximos Slots Livres (Sistema Anti-Colisão)

Para evitar colisão de posts e canibalização pelo algoritmo do Instagram, as automações consultam o **Slot Arbiter** antes de agendar:

| Tipo de Conteúdo | Horário Padrão (BRT) | Próximo Slot Vago Alocado | Invariante Anti-Canibalização |
| :--- | :--- | :--- | :--- |
| 💼 **Carrossel de Vagas** | 09:00 BRT | **2026-11-11 às 09:00 BRT** | Intervalo mín. 4h de outros posts |
| 🎬 **Vídeo Reels (HyperFrames)** | 13:30 BRT | **2026-11-11 às 13:30 BRT** | Máximo 1 vídeo/dia no canal |
| 🛠️ **Carrossel Técnico / Dicas** | 18:30 BRT | **2026-11-11 às 18:30 BRT** | Fila sequencial garantida |

### 🟡 Fila Ativa Agendada no Postiz (Aguardando Publicação)

| Data/Hora (BRT) | ID do Post | Título / Conteúdo Resumido |
| :--- | :--- | :--- |
| **09/11/2026, 18:30:00** | `cmw9ebnwu0009qj98ipohuyze` | Todo dev já viveu aquele frio na barriga de rodar um comando erra... |
| **10/11/2026, 09:00:00** | `cmw9c34cn0007qj98kq07kv85` | Magalu Cloud, LWSA, Askable e mais 5 empresas estão com vagas 100... |
| **10/11/2026, 15:00:00** | `cmw8d15vb0009qj9p9bm7rl72` | 3 ferramentas modernas em Rust que vão deixar seu terminal 10x ma... |

--- 

## 2. Histórico Consolidado de Produções Recentes

### 💼 [2026-11-09] Radar de Vagas 100% Remotas (2026-11-09)

- **Automação de Origem:** `instagram-devremoto-br (11:00 BRT)`
- **Formato:** Carrossel de Vagas Diárias
- **Gatilho de Direct (OpenReply):** `REMOTO`
- **Status no Postiz:** **Agendado no Postiz** (10/11/2026, 09:00:00)
- **Post ID Postiz:** `cmw9c34cn0007qj98kq07kv85`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/output/2026-11-09`](file:///home/luis/repositories/canais/devremoto/output/2026-11-09)

#### 📁 Arquivos Gerados:
- **Slides PNG (1080×1350):** 7 slides gerados em [`slides/`](file:///home/luis/repositories/canais/devremoto/output/2026-11-09/slides)
- **Texto da Legenda:** [caption.txt](file:///home/luis/repositories/canais/devremoto/output/2026-11-09/caption.txt)
- **Página de Links Bio:** [links.html](file:///home/luis/repositories/canais/devremoto/output/2026-11-09/links.html)

**Resumo da Legenda:**
> Magalu Cloud, LWSA, Askable e mais 5 empresas estão com vagas 100% remotas abertas hoje para trabalhar de qualquer estado do Brasil.  Todas passaram pelo nosso filtro anti-híbrido: nada de vaga anunciada como remota que pede 2 ou 3 dias presenciais no escritório.  Destaques do ra...

**Vagas Selecionadas:**
- Magalu Cloud: Desenvolvedor(a) Sênior · PostgreSQL (A combinar)
- LWSA: Desenvolvedor(a) Pleno · Golang (A combinar)
- Askable: AI Engineer Pleno (A combinar)
- BIP Brasil: Desenvolvedor(a) de IA & RPA Júnior (A combinar)
- *(+ 4 outras vagas na edição)*

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🛠️ [2026-11-09] 4 Comandos Git Que Salvam Vidas

- **Automação de Origem:** `devremoto-content-carousel (12:00 BRT)`
- **Formato:** Carrossel Técnico & Ferramentas
- **Gatilho de Direct (OpenReply):** `GIT`
- **Status no Postiz:** **Agendado no Postiz** (09/11/2026, 18:30:00)
- **Post ID Postiz:** `cmw9ebnwu0009qj98ipohuyze`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/output/2026-11-09-content`](file:///home/luis/repositories/canais/devremoto/output/2026-11-09-content)

#### 📁 Arquivos Gerados:
- **Slides PNG (1080×1350):** 7 slides gerados em [`slides/`](file:///home/luis/repositories/canais/devremoto/output/2026-11-09-content/slides)
- **Texto da Legenda:** [caption.txt](file:///home/luis/repositories/canais/devremoto/output/2026-11-09-content/caption.txt)

**Resumo da Legenda:**
> Todo dev já viveu aquele frio na barriga de rodar um comando errado e achar que apagou horas de trabalho.  A boa notícia é que o Git foi desenhado para ser quase impossível de perder dados de verdade. O problema é que a maioria dos tutoriais só ensina o fluxo feliz de add, commit...

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🎬 [2026-11-09] Pare de Enviar seu Código pra Nuvem: Conheça o Ollama

- **Automação de Origem:** `devremoto-video-reels (12:00 BRT)`
- **Formato:** Vídeo Vertical 9:16 (Reels/TikTok)
- **Gatilho de Direct (OpenReply):** `REPO`
- **Status no Postiz:** **Agendado no Postiz** (09/11/2026, 13:30:00)
- **Post ID Postiz:** `cmw9elg15000aqj98t549topa`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/videos/ollama-local-ai`](file:///home/luis/repositories/canais/devremoto/videos/ollama-local-ai)

#### 📁 Arquivos Gerados:
- **Vídeo MP4 Renderizado:** [output_final.mp4](file:///home/luis/repositories/canais/devremoto/videos/ollama-local-ai/output.mp4)
- **Áudio Neural Kokoro:** [audio.mp3](file:///home/luis/repositories/canais/devremoto/videos/ollama-local-ai/audio.mp3)
- **Timestamps Fonéticos:** [audio.transcript.json](file:///home/luis/repositories/canais/devremoto/videos/ollama-local-ai/audio.transcript.json)
- **Composição HTML/GSAP:** [index.html](file:///home/luis/repositories/canais/devremoto/videos/ollama-local-ai/index.html)
- **Link no Postiz CDN:** [Ver Vídeo no Postiz](https://postiz.luis-carvalho.online/uploads/2026/11/09/8cc1dff149058bc048b45f77e9aac101d.mp4)

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🎬 [2026-11-09] Crawl4AI (Vídeo HyperFrames)

- **Automação de Origem:** `devremoto-video-reels (12:00 BRT)`
- **Formato:** Vídeo Vertical 9:16 (Reels/TikTok)
- **Gatilho de Direct (OpenReply):** `REPO`
- **Status no Postiz:** **Agendado no Postiz** (09/11/2026, 12:00:00)
- **Post ID Postiz:** `cmw8l1z5u0003qj98b71jtwbn`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/videos/trending-repo`](file:///home/luis/repositories/canais/devremoto/videos/trending-repo)

#### 📁 Arquivos Gerados:
- **Vídeo MP4 Renderizado:** [output_final.mp4](file:///home/luis/repositories/canais/devremoto/videos/trending-repo/output.mp4)
- **Áudio Neural Kokoro:** [audio.mp3](file:///home/luis/repositories/canais/devremoto/videos/trending-repo/audio.mp3)
- **Timestamps Fonéticos:** [audio.transcript.json](file:///home/luis/repositories/canais/devremoto/videos/trending-repo/audio.transcript.json)
- **Composição HTML/GSAP:** [index.html](file:///home/luis/repositories/canais/devremoto/videos/trending-repo/index.html)

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 💼 [2026-11-08] Radar de Vagas 100% Remotas (2026-11-08)

- **Automação de Origem:** `instagram-devremoto-br (11:00 BRT)`
- **Formato:** Carrossel de Vagas Diárias
- **Gatilho de Direct (OpenReply):** `REMOTO`
- **Status no Postiz:** **Agendado no Postiz** (09/11/2026, 09:00:00)
- **Post ID Postiz:** `cmw7wmfc00000qj9p6gqs8cta`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/output/2026-11-08`](file:///home/luis/repositories/canais/devremoto/output/2026-11-08)

#### 📁 Arquivos Gerados:
- **Slides PNG (1080×1350):** 7 slides gerados em [`slides/`](file:///home/luis/repositories/canais/devremoto/output/2026-11-08/slides)
- **Texto da Legenda:** [caption.txt](file:///home/luis/repositories/canais/devremoto/output/2026-11-08/caption.txt)
- **Página de Links Bio:** [links.html](file:///home/luis/repositories/canais/devremoto/output/2026-11-08/links.html)

**Resumo da Legenda:**
> Solutis, Stefanini, Customer.io e mais 5 empresas estão com vagas 100% remotas abertas hoje para trabalhar de qualquer estado do Brasil.  Todas passaram pelo nosso filtro anti-híbrido: nada de vaga anunciada como remota que pede 2 ou 3 dias presenciais no escritório.  Destaques d...

**Vagas Selecionadas:**
- Solutis: Arquiteto(a) de Dados Sênior (A combinar)
- Wicomm: Desenvolvedor Front-end Jr (A combinar)
- MKdigital: Dev Back-End Jr (Python & Agentic AI) (A combinar)
- Customer.io: Senior Software Engineer (Backend) (A combinar)
- *(+ 4 outras vagas na edição)*

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🎬 [2026-11-09] browser-use-v1 (Vídeo HyperFrames)

- **Automação de Origem:** `devremoto-video-reels (Render Local / Teste)`
- **Formato:** Vídeo Vertical 9:16 (Reels/TikTok)
- **Gatilho de Direct (OpenReply):** `TESTE`
- **Status no Postiz:** **Renderizado (Pronto)** (Não agendado (Teste Local))
- **Post ID Postiz:** `N/A (Local)`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/videos/browser-use-v1`](file:///home/luis/repositories/canais/devremoto/videos/browser-use-v1)

#### 📁 Arquivos Gerados:
- **Vídeo MP4 Renderizado:** [output_final.mp4](file:///home/luis/repositories/canais/devremoto/videos/browser-use-v1/output.mp4)
- **Áudio Neural Kokoro:** [audio.mp3](file:///home/luis/repositories/canais/devremoto/videos/browser-use-v1/audio.mp3)
- **Timestamps Fonéticos:** [audio.transcript.json](file:///home/luis/repositories/canais/devremoto/videos/browser-use-v1/audio.transcript.json)
- **Composição HTML/GSAP:** [index.html](file:///home/luis/repositories/canais/devremoto/videos/browser-use-v1/index.html)

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🎬 [2026-11-09] dev-agent-skills (Vídeo HyperFrames)

- **Automação de Origem:** `devremoto-video-reels (Render Local / Teste)`
- **Formato:** Vídeo Vertical 9:16 (Reels/TikTok)
- **Gatilho de Direct (OpenReply):** `TESTE`
- **Status no Postiz:** **Renderizado (Pronto)** (Não agendado (Teste Local))
- **Post ID Postiz:** `N/A (Local)`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/videos/dev-agent-skills`](file:///home/luis/repositories/canais/devremoto/videos/dev-agent-skills)

#### 📁 Arquivos Gerados:
- **Vídeo MP4 Renderizado:** [output_final.mp4](file:///home/luis/repositories/canais/devremoto/videos/dev-agent-skills/output.mp4)
- **Áudio Neural Kokoro:** [audio.mp3](file:///home/luis/repositories/canais/devremoto/videos/dev-agent-skills/audio.mp3)
- **Timestamps Fonéticos:** [audio.transcript.json](file:///home/luis/repositories/canais/devremoto/videos/dev-agent-skills/audio.transcript.json)
- **Composição HTML/GSAP:** [index.html](file:///home/luis/repositories/canais/devremoto/videos/dev-agent-skills/index.html)

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🎬 [2026-11-09] OpenReply: Automação de Directs & Instagram

- **Automação de Origem:** `devremoto-video-reels (Render Local / Teste)`
- **Formato:** Vídeo Vertical 9:16 (Reels/TikTok)
- **Gatilho de Direct (OpenReply):** `REPLY`
- **Status no Postiz:** **Renderizado (Pronto)** (Não agendado (Teste Local))
- **Post ID Postiz:** `N/A (Local)`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1`](file:///home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1)

#### 📁 Arquivos Gerados:
- **Vídeo MP4 Renderizado:** [output_final.mp4](file:///home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1/output.mp4)
- **Áudio Neural Kokoro:** [audio.mp3](file:///home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1/audio.mp3)
- **Timestamps Fonéticos:** [audio.transcript.json](file:///home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1/audio.transcript.json)
- **Composição HTML/GSAP:** [index.html](file:///home/luis/repositories/canais/devremoto/videos/openreply-manychat-v1/index.html)

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 🛠️ [2026-11-08] 4 Comandos Git para Salvar o Dia

- **Automação de Origem:** `devremoto-content-carousel (12:00 BRT)`
- **Formato:** Carrossel Técnico & Ferramentas
- **Gatilho de Direct (OpenReply):** `GIT`
- **Status no Postiz:** **Agendado no Postiz** (08/11/2026, 18:30:00)
- **Post ID Postiz:** `cmw872e370005qj9paluqn1qt`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/output/2026-11-08-content`](file:///home/luis/repositories/canais/devremoto/output/2026-11-08-content)

#### 📁 Arquivos Gerados:
- **Slides PNG (1080×1350):** 7 slides gerados em [`slides/`](file:///home/luis/repositories/canais/devremoto/output/2026-11-08-content/slides)
- **Texto da Legenda:** [caption.txt](file:///home/luis/repositories/canais/devremoto/output/2026-11-08-content/caption.txt)

**Resumo da Legenda:**
> 4 ferramentas que transformam seu terminal.  Se você ainda usa apenas os comandos padrão do Unix criados nos anos 1980, seu workflow está lento. Ferramentas modernas escritas em Rust e Go adicionam syntax highlighting, navegação inteligente por histórico e painéis visuais interat...

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

### 💼 [2026-11-07] Radar de Vagas 100% Remotas (2026-11-07)

- **Automação de Origem:** `instagram-devremoto-br (11:00 BRT)`
- **Formato:** Carrossel de Vagas Diárias
- **Gatilho de Direct (OpenReply):** `REMOTO`
- **Status no Postiz:** **Agendado no Postiz** (08/11/2026, 09:00:00)
- **Post ID Postiz:** `cmw6nrfcb0005qjy48jl8m7zg`
- **Pasta de Saída:** [`/home/luis/repositories/canais/devremoto/output/2026-11-07`](file:///home/luis/repositories/canais/devremoto/output/2026-11-07)

#### 📁 Arquivos Gerados:
- **Slides PNG (1080×1350):** 7 slides gerados em [`slides/`](file:///home/luis/repositories/canais/devremoto/output/2026-11-07/slides)
- **Texto da Legenda:** [caption.txt](file:///home/luis/repositories/canais/devremoto/output/2026-11-07/caption.txt)
- **Página de Links Bio:** [links.html](file:///home/luis/repositories/canais/devremoto/output/2026-11-07/links.html)

**Resumo da Legenda:**
> Solutis, Wicomm, Giro.Tech, Loldesign e mais 4 empresas estão com vagas 100% remotas abertas hoje para trabalhar de qualquer estado do Brasil.  Todas passaram pelo nosso filtro anti-híbrido: nada de vaga anunciada como remota que pede 3 dias presenciais no escritório.  Destaques ...

**Vagas Selecionadas:**
- Solutis: Arquiteto(a) de Dados Sênior (A combinar)
- Wicomm: Desenvolvedor Front-end Jr (A combinar)
- Giro.Tech: Desenvolvedor Backend Pleno (A combinar)
- Loldesign: Desenvolvedor(a) Java Full Stack Pleno (A combinar)
- *(+ 4 outras vagas na edição)*

> 💡 **Anotações de Feedback / Melhoria Contínua:**
> - *Engajamento:* (preencher após auditoria no Postiz/Insights)
> - *Qualidade visual / copy:* Aprovado dentro dos padrões Anti-Slop.

---

