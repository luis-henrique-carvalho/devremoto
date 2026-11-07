# `@devremoto.br` — Pipeline Automatizado de Carrosséis (Vagas BR 100% Remotas)

Motor diário isolado do CareerOps pessoal do Luis que:
1. Varre vagas **100% remotas no Brasil** para **todas as stacks e senioridades** (Estágio → Especialista; Node, Java, .NET, Python, PHP, Go, Front-End, Mobile, QA, Dados, DevOps, IA) em `data/pipeline.md` e `data/scan-history.tsv`.
2. Seleciona as melhores vagas inéditas com diversidade de empresas e categorias, aplicando filtro anti-híbrido/anti-presencial.
3. Renderiza um carrossel **7 slides (1080×1350, 4:5)** no Brand Kit oficial **OpenAI Emerald Noir (`dev.remoto`)**, com bloco TypeScript real (`radar-br-remoto.ts`), barra de prompt estilo ChatGPT com gatilhos rotativos de engajamento, tabela Cheat-Sheet para salvar e CTA quádruplo (`Comente REMOTO`).
4. Gera legenda SEO humanizada (`caption.txt`), página mobile clicável de Link na Bio (`links.html` / `output/latest-links.html`) e integra direto com o **Postiz CLI** (`draft` ou `schedule`).

## Comandos Rápidos

```bash
# 1. Rodar varredura CareerOps isolada + curar + renderizar os 7 slides de hoje
node /home/luis/vagas/instagram-br/run-daily.mjs --scan

# 2. Apenas curar e renderizar usando o pipeline já atualizado pelo scheduler do CareerOps
node /home/luis/vagas/instagram-br/run-daily.mjs --skip-scan

# 3. Renderizar e enviar direto para o Postiz como rascunho (draft) ou agendado (schedule)
node /home/luis/vagas/instagram-br/run-daily.mjs --skip-scan --publish --publish-mode draft
node /home/luis/vagas/instagram-br/run-daily.mjs --skip-scan --publish --publish-mode schedule
```

## Configuração do Postiz

1. Copie `.env.example` para `.env`:
   ```bash
   cp /home/luis/vagas/instagram-br/.env.example /home/luis/vagas/instagram-br/.env
   ```
2. **Atenção à diferença de chaves:**
   - `POSTIZ_API_KEY`: Chave de autenticação da API pública (hexadecimal de 64 caracteres gerada em *Settings → Public API* na interface web do Postiz). **Não confunda com o ID da integração social.**
   - `POSTIZ_INSTAGRAM_ID`: Identificador da integração da rede social conectada (formato CUID, ex: `cmw6m87yh0001qjy4vy20eyss`), obtido automaticamente via `postiz integrations:list` ou especificado manualmente.
3. Conecte a conta do Instagram `@devremoto.br` no painel do Postiz (`https://postiz.luis-carvalho.online`).
4. Para publicar uma edição já gerada manualmente:
   ```bash
   bash /home/luis/vagas/instagram-br/output/YYYY-MM-DD/publish-postiz.sh
   ```
