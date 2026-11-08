import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const CATALOG_PATH = path.join(DATA_DIR, 'content-catalog.json');
const HISTORY_PATH = path.join(DATA_DIR, 'content-history.json');

/**
 * Curated high-potential seed packs for DevRemoto.
 * Each pack contains 4 distinct tools with verified utility.
 */
export const BACKLOG_PIPELINES = [
  {
    id: 'rust-terminal-v2',
    format: 'carousel',
    pillar: 'tools',
    headline: '4 Substitutos Modernos de Comandos Antigos',
    kicker: 'produtividade // rust tools',
    stake: 'Os comandos clássicos do Unix têm mais de 40 anos. Estas ferramentas reescritas em Rust são 10x mais rápidas e com syntax highlighting nativo.',
    keyword: 'RUST',
    items: [
      {
        name: 'ripgrep (rg)',
        tag: 'Rust · Substituto do grep',
        desc: 'Busca texto dentro de milhares de arquivos de código em milissegundos, ignorando automaticamente o .gitignore e arquivos ocultos.',
        install: 'brew install ripgrep',
        example: '$ rg "auth_token" ./src  # Busca instantânea com cores',
      },
      {
        name: 'fd',
        tag: 'Rust · Substituto do find',
        desc: 'Encontra arquivos e diretórios de forma intuitiva sem a sintaxe complexa do find clássico, com suporte a regex por padrão.',
        install: 'brew install fd',
        example: '$ fd -e ts "controller"  # Acha todos os controllers .ts',
      },
      {
        name: 'duf',
        tag: 'Go · Substituto do df',
        desc: 'Visualizador de espaço em disco limpo, colorido e com tabelas organizadas por partição, dispositivo e pontos de montagem.',
        install: 'brew install duf',
        example: '$ duf  # Tabela visual limpa do uso de disco',
      },
      {
        name: 'dust',
        tag: 'Rust · Substituto do du',
        desc: 'Mostra visualmente quais pastas estão comendo o armazenamento do seu computador em um gráfico de barras no próprio terminal.',
        install: 'brew install dust',
        example: '$ dust  # Gráfico de barras com as maiores pastas',
      },
    ],
  },
  {
    id: 'docker-terminal-v1',
    format: 'carousel',
    pillar: 'tools',
    headline: 'Chega de Sofrer com Comandos de Docker',
    kicker: 'containers // terminal',
    stake: 'Cansado de digitar docker ps, docker logs e docker rm manualmente? Estas 4 ferramentas colocam uma interface visual completa no seu shell.',
    keyword: 'DOCKER',
    items: [
      {
        name: 'lazydocker',
        tag: 'Go · TUI para Docker',
        desc: 'Dashboard visual completo para seus containers. Veja consumo de RAM/CPU, reinicie serviços e inspecione logs com as setas do teclado.',
        install: 'brew install jesseduffield/lazydocker/lazydocker',
        example: '$ lazydocker  # Abre o painel visual no terminal',
      },
      {
        name: 'dive',
        tag: 'Go · Otimizador de Imagens',
        desc: 'Analisa cada camada da sua imagem Docker para descobrir arquivos inúteis e desperdício de espaço, reduzindo o tamanho em até 70%.',
        install: 'brew install dive',
        example: '$ dive minha-api:latest  # Análise camada por camada',
      },
      {
        name: 'ctop',
        tag: 'Go · Monitor de Containers',
        desc: 'Um comando top em tempo real exclusivo para containers Docker. Veja métricas de rede, memória e processamento instantaneamente.',
        install: 'brew install ctop',
        example: '$ ctop  # Monitor em tempo real de todos os containers',
      },
      {
        name: 'oxker',
        tag: 'Rust · TUI Minimalista',
        desc: 'Cliente Docker em Rust ultra leve e focado em velocidade para pausar, reiniciar e deletar containers sem consumo de memória.',
        install: 'brew install oxker',
        example: '$ oxker  # TUI ultrarrápida em Rust',
      },
    ],
  },
  {
    id: 'api-testing-terminal-v1',
    format: 'carousel',
    pillar: 'tools',
    headline: '4 Ferramentas para Testar APIs no Terminal',
    kicker: 'apis // produtividade',
    stake: 'Você não precisa abrir o Postman ou Insomnia toda vez que quiser testar um endpoint rápido. Estas ferramentas rodam direto do seu terminal.',
    keyword: 'APIS',
    items: [
      {
        name: 'httpie',
        tag: 'Python · Substituto do cURL',
        desc: 'Faz requisições HTTP com sintaxe natural, JSON colorido formatado automaticamente e autenticação simples sem flags confusas.',
        install: 'brew install httpie',
        example: '$ http GET api.devremoto.com.br/vagas  # JSON formatado',
      },
      {
        name: 'curlie',
        tag: 'Go · Poder do curl + beleza do httpie',
        desc: 'Combina a interface intuitiva do HTTPie com toda a velocidade, compatibilidade de flags e suporte a proxies do cURL nativo.',
        install: 'brew install curlie',
        example: '$ curlie post api.exemplo.com name="Dev"',
      },
      {
        name: 'bruno',
        tag: 'Open Source · Git-Friendly API Client',
        desc: 'Alternativa open source ao Postman que salva suas coleções em arquivos de texto direto no repositório Git, sem login ou cloud obrigatória.',
        install: 'brew install bruno',
        example: '$ bru run  # Roda suas coleções de teste via CLI',
      },
      {
        name: 'doggo',
        tag: 'Go · Substituto do dig',
        desc: 'Cliente DNS moderno com suporte a DoH, saída em tabela colorida ou JSON e resolução de domínios muito mais clara que o dig.',
        install: 'brew install mr-karan/doggo/doggo',
        example: '$ doggo devremoto.com.br  # Resolução DNS colorida',
      },
    ],
  },
  {
    id: 'database-terminal-v1',
    format: 'carousel',
    pillar: 'tools',
    headline: '4 Ferramentas de Banco de Dados no Terminal',
    kicker: 'bancos de dados // sql',
    stake: 'Abandone clientes pesados que travam sua máquina para consultas simples. Estas interfaces para terminal têm autocomplete e tabelas perfeitas.',
    keyword: 'SQL',
    items: [
      {
        name: 'harlequin',
        tag: 'Python · IDE SQL no Terminal',
        desc: 'Uma IDE completa para bancos de dados dentro do shell. Suporta Postgres, MySQL, SQLite e DuckDB com visualização de tabelas e histórico.',
        install: 'pipx install harlequin',
        example: '$ harlequin  # Abre o editor SQL interativo',
      },
      {
        name: 'pgcli',
        tag: 'Python · Postgres com Autocomplete',
        desc: 'Cliente oficial para PostgreSQL com auto-complete inteligente conforme você digita SQL e syntax highlighting nos resultados.',
        install: 'brew install pgcli',
        example: '$ pgcli -h localhost -U postgres  # Autocomplete nativo',
      },
      {
        name: 'usql',
        tag: 'Go · Cliente Universal',
        desc: 'Um único comando para conectar no PostgreSQL, MySQL, SQLite, Oracle, ClickHouse e Redis com a mesma sintaxe rápida.',
        install: 'brew install xo/xo/usql',
        example: '$ usql postgres://user:pass@localhost/db',
      },
      {
        name: 'litecli',
        tag: 'Python · SQLite com Superpoderes',
        desc: 'Auto-complete e formatação elegante para arquivos .sqlite locais sem precisar instalar extensões pesadas no VS Code.',
        install: 'brew install litecli',
        example: '$ litecli database.sqlite',
      },
    ],
  },
];

/**
 * Searches GitHub dynamically for trending tools matching a query.
 */
export function searchGithubTools(query, language = 'rust', limit = 5) {
  try {
    const raw = execSync(
      `gh search repos "${query}" --language "${language}" --sort stars --order desc --limit ${limit} --json name,owner,description,stargazersCount,url`,
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
