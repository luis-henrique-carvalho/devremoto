# DevRemoto — Diretrizes do Agente Antigravity

Bem-vindo ao ecossistema do **DevRemoto** (`@devremoto.br` / `devremoto.com.br`).

## 1. Missão do Projeto
O DevRemoto é um canal de mídia e curadoria de vagas de tecnologia **100% remotas no Brasil e LatAm para brasileiros**.
Nosso objetivo é conectar desenvolvedores a vagas legítimas sem pegadinhas de "híbrido disfarçado", oferecendo valor real, dicas técnicas de preparação e design premium.

## 2. Identidade Visual (Brand Kit: OpenAI Emerald Noir)
- **Fundo:** Canvas escuro suave (`#0B0F0E` / `--bg-canvas`)
- **Acento:** Verde Esmeralda (`#10A37F` / `--accent-emerald`)
- **Texto:** Branco neve e cinza suave (`#F3F4F6` e `#9CA3AF`)
- **Tipografia:** JetBrains Mono para código e chips; Inter para títulos e chamadas.
- **Dimensões:**
  - Carrossel: 1080×1350 (4:5)
  - Vídeos: 1080×1920 (9:16)

## 3. Grade Editorial
1. **Lote 1 (08:30 BRT):** Front-End, Mobile e UI/UX (React, Next.js, Flutter, React Native, iOS, Android).
2. **Lote 2 (12:30 BRT):** Back-End, DevOps e Cloud (Node, TS, Python, Java, Go, .NET, AWS, Kubernetes).
3. **Lote 3 (18:30 BRT):** Dados, Inteligência Artificial, QA e vagas Júnior/Estágio.
4. **Vaga Destaque (15:00 BRT):** Vídeo vertical de 45s com breakdown de requisitos e 3 dicas de ouro para a entrevista.
5. **Radar Semanal (Domingo 19:30 BRT):** Compilado das 10 melhores vagas da semana.

## 4. Camada de Inteligência Anti-Repetição
- **Zero Clichê:** Proibido travessão (`—`), exclamações excessivas e frases genéricas como "No mercado dinâmico de hoje".
- **Rotação de Hooks:** Alterne diariamente entre apelos de transparência salarial, fuga de trânsito/presencial, tech stacks em alta e dicas de processo seletivo.
- **Verificação de Duplicidade:** Consulte `data/posted-jobs.json` para nunca repetir links já publicados.

## 5. Distribuição e Publicação
- Gerenciada pelo **Postiz CLI** / API apontando para o servidor local (`https://postiz.luis-carvalho.online`).
- As publicações devem ser enviadas no modo `--publish-mode schedule` com os horários estipulados.
