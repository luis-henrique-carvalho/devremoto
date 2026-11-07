import fs from 'node:fs';
import path from 'node:path';

const RECOGNIZED_BRAND_PATTERNS = [
  /\bnubank\b/i, /\bifood\b/i, /\bstone\b/i, /\bquintoandar\b/i, /\bwellhub\b/i, /\bgympass\b/i,
  /\bbotic[áa]rio\b/i, /\bcaju\b/i, /\bvtex\b/i, /\bebanx\b/i, /\bci&t\b/i, /\bciandt\b/i,
  /\bneon\b/i, /\bwildlife\b/i, /\bclara\b/i, /\bbrex\b/i, /\bdlocal\b/i, /\bmercado\s+livre\b/i,
  /\bmeli\b/i, /\bita[úu]\b/i, /\btotvs\b/i, /\blocaweb\b/i, /\bmagalu\b/i, /\bbanco\s+inter\b/i,
  /\bpicpay\b/i, /\bcreditas\b/i, /\bv\.?tal\b/i, /\bfcamara\b/i, /\bzup\b/i, /\bgft\b/i,
  /\bglobo\b/i, /\brd\s+station\b/i, /\bjusbrasil\b/i, /\bgrupo\s+olx\b/i, /\bolx\b/i, /\bsolutis\b/i,
];

const FOREIGN_ONLY_RE = /\b(united states|usa only|us only|mexico|méxico|colombia|argentina|chile|peru|uruguay|canada|uk|london|berlin|germany|spain|madrid|poland|india|singapore|australia|dublin|toronto)\b/i;
const BRAZIL_ELIGIBLE_RE = /\b(brasil|brazil|remoto|100%\s*remoto|home\s*office|todo\s*o\s*brasil|latam|latin\s*america|south\s*america)\b/i;
const NON_REMOTE_RE = /(?:^|[\s/_|-]|or)(h[íi]brid[oa]|presencial|presenciais|on-?site|plant[ãa]o)(?:$|[\s/_|-])/i;

const STACK_RULES = [
  { label: 'Node.js', re: /\bnode(\.?js)?\b/i },
  { label: 'TypeScript', re: /\btypescript|\bts\b/i },
  { label: 'React', re: /\breact(\.?js)?\b(?!\s*-?\s*native)/i },
  { label: 'React Native', re: /\breact\s*-?\s*native\b/i },
  { label: 'Next.js', re: /\bnext(\.?js)?\b/i },
  { label: 'Angular', re: /\bangular\b/i },
  { label: 'Vue.js', re: /\bvue(\.?js)?\b/i },
  { label: 'Java', re: /\bjava\b(?!\s*script)/i },
  { label: 'Spring', re: /\bspring\b/i },
  { label: 'C# / .NET', re: /(\bc#|dotnet|\.net\b)/i },
  { label: 'Python', re: /\bpython|django|fastapi\b/i },
  { label: 'PHP', re: /\bphp|laravel\b/i },
  { label: 'Golang', re: /\bgolang|\bgo\s+developer|\bdev\s+go\b/i },
  { label: 'Ruby', re: /\bruby|rails\b/i },
  { label: 'Flutter', re: /\bflutter|dart\b/i },
  { label: 'Kotlin', re: /\bkotlin|android\b/i },
  { label: 'Swift / iOS', re: /\bswift|\bios\b/i },
  { label: 'Kafka', re: /\bkafka\b/i },
  { label: 'AWS', re: /\baws\b/i },
  { label: 'GCP / Cloud', re: /\bgcp|azure|cloud\b/i },
  { label: 'QA / Testes', re: /\bqa\b|testes|automação de testes|qualidade|sdet/i },
  { label: 'Dados', re: /\bdados|data\s+engineer|data\s+scientist|analytics|\bbi\b|etl|spark/i },
  { label: 'DevOps', re: /\bdevops|\bsre\b|kubernetes|docker|terraform|platform/i },
  { label: 'IA / GenAI', re: /\b(ia|ai|llm|machine learning|ml|genai)\b/i },
  { label: 'Segurança', re: /\b(iam|segurança|security|appsec|cyber)\b/i },
];

export function cleanCompanyName(rawCompany, url = '') {
  let name = String(rawCompany || '').trim();
  if (/sanguelaranja|fcamara/i.test(name) || /fcamara\.gupy\.io/i.test(url)) return 'FCamara';
  if (/recrutamento para área de tecnologia/i.test(name) && /werecruiter/i.test(url)) return 'WeRecruiter';
  name = name
    .replace(/\\([[\]])/g, '$1')
    .replace(/\s*[|/—–-]\s*(o futuro passa por aqui|tecnologia e inovação|oficial).*$/i, '')
    .replace(/\s+(soluções digitais|tecnologia e criação|participações|consultoria em ti)\b.*$/i, '')
    .replace(/\s+\b(ltda\.?|s\.?a\.?|eireli|me)\b\.?$/i, '')
    .replace(/\s+#\S+/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .trim();
  if (name === name.toUpperCase() && name.length > 4) {
    name = name.toLowerCase().replace(/(?:^|\s)\S/g, (ch) => ch.toUpperCase());
  }
  return name || 'Tech Brasil';
}

export function companyHandle(companyName) {
  const slug = companyName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, '-e-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `@${slug || 'tech-br'}`;
}

export function cleanRoleTitle(rawTitle) {
  let t = String(rawTitle || '').trim();
  t = t
    .replace(/\\([[\]])/g, '$1')
    .replace(/^\[[^\]]+\]\s*/, '')
    .replace(/^\d{5,}\s*[-–]\s*/, '')
    .replace(/\s*[-–]\s*RHA\d+.*$/i, '')
    .replace(/\s*\/\s*100%\s*remoto.*$/i, '')
    .replace(/\s*\((?:tech|squad|tribo|diretoria|bu\b|unidade)[^)]*\)?/gi, '')
    .replace(/\s*\(\d{3,}\)\s*$/, '')
    .replace(/\s*[—–]\s*/g, ' · ')
    .replace(/\s+/g, ' ')
    .trim();
  if (t === t.toUpperCase() && t.length > 6) {
    t = t.toLowerCase().replace(/(?:^|\s|[/-])\S/g, (ch) => ch.toUpperCase());
    t = t
      .replace(/\bSr\b/g, 'Sênior')
      .replace(/\bPl\b/g, 'Pleno')
      .replace(/\bJr\b/g, 'Júnior')
      .replace(/\bIi\b/g, 'II')
      .replace(/\bIii\b/g, 'III')
      .replace(/\bAws\b/g, 'AWS')
      .replace(/\bQa\b/g, 'QA')
      .replace(/\bIam\b/g, 'IAM')
      .replace(/\bVtex\b/g, 'VTEX')
      .replace(/\bSotware\b/gi, 'Software');
  }
  return t.length > 64 ? `${t.slice(0, 61).trim()}...` : t;
}

export function detectSeniority(title) {
  const t = String(title || '');
  if (/\b(est[áa]gio|estagi[áa]ri[oa]|intern|trainee)\b/i.test(t)) return 'Estágio';
  if (/\b(j[úu]nior|\bjr\.?\b|\bi\b(?!\s*[vxl])|entry)\b/i.test(t) && !/especialista\s+i\b/i.test(t)) return 'Júnior';
  if (/\b(especialista|staff|principal|architect|arquitet[oa]|tech\s*lead|lead)\b/i.test(t)) return 'Especialista';
  if (/\b(s[êe]nior|\bsr\.?\b|\biii\b)\b/i.test(t)) return 'Sênior';
  if (/\b(pleno|\bpl\.?\b|\bii\b|mid)\b/i.test(t)) return 'Pleno';
  return 'Pleno / Sênior';
}

export function extractStacks(title, url = '') {
  const found = [];
  for (const rule of STACK_RULES) {
    if (rule.re.test(title)) found.push(rule.label);
    if (found.length >= 3) break;
  }
  if (!found.length) {
    if (/fullstack|full\s*-?\s*stack/i.test(title)) found.push('Full Stack', 'Web APIs');
    else if (/back\s*-?\s*end/i.test(title)) found.push('Back-End', 'APIs');
    else if (/front\s*-?\s*end/i.test(title)) found.push('Front-End', 'Web UI');
    else if (/mobile/i.test(title)) found.push('Mobile', 'Apps');
    else found.push('Engenharia', 'Software');
  }
  const source = detectPortalSource(url);
  if (source && found.length < 3) found.push(source);
  return found.slice(0, 3);
}

export function detectPortalSource(url = '') {
  if (/gupy\.io/i.test(url)) return 'Gupy';
  if (/greenhouse\.io/i.test(url)) return 'Greenhouse';
  if (/ashbyhq\.com/i.test(url)) return 'Ashby';
  if (/lever\.co/i.test(url)) return 'Lever';
  if (/remotar\.com\.br/i.test(url)) return 'Remotar';
  if (/programathor\.com\.br/i.test(url)) return 'ProgramaThor';
  if (/github\.com/i.test(url)) return 'GitHub BR';
  if (/linkedin\.com/i.test(url)) return 'LinkedIn';
  if (/inhire\.app/i.test(url)) return 'InHire';
  if (/solides\.com/i.test(url)) return 'Sólides';
  if (/getonbrd\.com/i.test(url)) return 'Get on Board';
  return 'Portal Direto';
}

const CATEGORY_SHORT_LABELS = {
  'Dados, Cloud & IA': 'Dados / IA',
  'QA, Testes & DevOps': 'DevOps / SRE',
  'Mobile & Apps': 'Mobile',
  'Java, .NET & Enterprise': 'Java / .NET',
  'Front-End & Interfaces': 'Front-End',
  'Full Stack & Produto': 'Full Stack',
  'Back-End & Engenharia': 'Back-End',
};

export function detectCategory(title, stacks) {
  const combined = `${title} ${stacks.join(' ')}`;
  if (/\b(dados|data|kafka|analytics|bi|ia|ai|ml|machine learning|spark|cientista)\b/i.test(combined)) return 'Dados, Cloud & IA';
  if (/\b(qa|testes|qualidade|devops|sre|platform|segurança|security|iam)\b/i.test(combined)) return 'QA, Testes & DevOps';
  if (/\b(mobile|flutter|react native|ios|android|kotlin|swift|swiftui)\b/i.test(combined)) return 'Mobile & Apps';
  if (/(\bjava\b|c#|\.net|\bdotnet\b|\bphp\b|\bspring\b|\boracle\b)/i.test(combined)) return 'Java, .NET & Enterprise';
  if (/\b(front\s*-?\s*end|angular|vue|ui|ux)\b/i.test(combined)) return 'Front-End & Interfaces';
  if (/\b(fullstack|full\s*-?\s*stack)\b/i.test(combined)) return 'Full Stack & Produto';
  return 'Back-End & Engenharia';
}

export function isEligibleBrazilRemote(job) {
  const hay = `${job.title || ''} ${job.location || ''} ${job.url || ''}`;
  if (NON_REMOTE_RE.test(hay)) return false;
  if (FOREIGN_ONLY_RE.test(job.location || '') && !/\b(brazil|brasil)\b/i.test(job.location || '')) return false;
  if (!BRAZIL_ELIGIBLE_RE.test(job.location || '') && !/gupy\.io|remotar|programathor|inhire\.app|github\.com\/(backend-br|frontendbr)/i.test(job.url || '')) {
    return false;
  }
  return true;
}

export function parsePipelineJobs(pipelinePath) {
  if (!fs.existsSync(pipelinePath)) return [];
  const lines = fs.readFileSync(pipelinePath, 'utf8').split(/\r?\n/);
  const jobs = [];
  for (const line of lines) {
    const m = line.match(/^- \[[ xX]\]\s+(\S+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)(?:\|\s*posted:\s*(\S+))?/);
    if (!m) continue;
    jobs.push({
      url: m[1].trim(),
      rawCompany: m[2].trim(),
      rawTitle: m[3].trim(),
      location: m[4].trim(),
      postedAt: (m[5] || '').trim(),
    });
  }
  return jobs;
}

export function curateDailyEdition(rawJobs, postedUrls = new Set(), targetCount = 8, hookHistoryIndex = 0) {
  const seenKeys = new Set();
  const candidates = [];

  for (const raw of rawJobs) {
    if (!raw.url || postedUrls.has(raw.url)) continue;
    if (!isEligibleBrazilRemote(raw)) continue;

    const company = cleanCompanyName(raw.rawCompany, raw.url);
    const title = cleanRoleTitle(raw.rawTitle);
    const dedupKey = `${company.toLowerCase()}::${title.toLowerCase()}`;
    if (seenKeys.has(dedupKey)) continue;
    seenKeys.add(dedupKey);

    const seniority = detectSeniority(title);
    const stacks = extractStacks(title, raw.url);
    const category = detectCategory(title, stacks);
    const isRecognized = RECOGNIZED_BRAND_PATTERNS.some((re) => re.test(company));
    const isEntryOrMid = seniority === 'Estágio' || seniority === 'Júnior' || seniority === 'Pleno';

    let score = 10;
    if (isRecognized) score += 25;
    if (isEntryOrMid) score += 12;
    if (raw.postedAt) {
      const ageDays = Math.max(0, (Date.now() - Date.parse(raw.postedAt)) / 86_400_000);
      if (Number.isFinite(ageDays)) score += Math.max(0, 14 - ageDays);
    }

    candidates.push({
      url: raw.url,
      company,
      handle: companyHandle(company),
      title,
      seniority,
      stacks,
      category,
      source: detectPortalSource(raw.url),
      postedAt: raw.postedAt || new Date().toISOString().slice(0, 10),
      isRecognized,
      score,
    });
  }

  candidates.sort((a, b) => b.score - a.score);

  // Pick diverse set: max 2 per company, encourage category variety
  const selected = [];
  const companyCounts = new Map();
  const categoryCounts = new Map();

  for (const pass of [1, 2]) {
    for (const item of candidates) {
      if (selected.length >= targetCount) break;
      if (selected.includes(item)) continue;
      const compCount = companyCounts.get(item.company) || 0;
      const catCount = categoryCounts.get(item.category) || 0;
      if (compCount >= (pass === 1 ? 1 : 2)) continue;
      if (pass === 1 && catCount >= 2) continue;

      selected.push(item);
      companyCounts.set(item.company, compCount + 1);
      categoryCounts.set(item.category, catCount + 1);
    }
  }

  // Ensure even number >= 4 so pairs look clean on slides
  const finalJobs = selected.length >= 2 && selected.length % 2 !== 0
    ? selected.slice(0, selected.length - 1)
    : selected;

  // Group into pairs of 2 for interior slides
  const slidesPairs = [];
  for (let i = 0; i < finalJobs.length; i += 2) {
    const pair = finalJobs.slice(i, i + 2);
    const cats = [...new Set(pair.map((j) => j.category))];
    const heading = cats.length === 1
      ? cats[0]
      : `${CATEGORY_SHORT_LABELS[cats[0]] || cats[0]} · ${CATEGORY_SHORT_LABELS[cats[1]] || cats[1]}`;
    slidesPairs.push({
      eyebrow: `// trilha_0${slidesPairs.length + 1} · vagas verificadas`,
      heading,
      jobs: pair,
    });
  }

  const hook = buildRotatingHook(finalJobs, hookHistoryIndex);
  const PORTAL_OR_GENERIC_PILLS = new Set([
    'Gupy', 'Greenhouse', 'Ashby', 'Lever', 'Remotar', 'ProgramaThor', 'GitHub BR',
    'LinkedIn', 'InHire', 'Sólides', 'Get on Board', 'Portal Direto', 'Engenharia', 'Software',
    'Back-End', 'Front-End', 'APIs', 'Web UI', 'Web APIs', 'Apps',
  ]);
  const uniqueStacks = [...new Set(finalJobs.flatMap((j) => j.stacks).filter((s) => !PORTAL_OR_GENERIC_PILLS.has(s)))].slice(0, 4);
  if (uniqueStacks.length < 3) {
    for (const fallback of ['Node.js', 'React', '.NET', 'AWS']) {
      if (!uniqueStacks.includes(fallback) && uniqueStacks.length < 4) uniqueStacks.push(fallback);
    }
  }

  const levelsPresent = [...new Set(finalJobs.map((j) => j.seniority))];
  const senioritySummary = levelsPresent.includes('Estágio') || levelsPresent.includes('Júnior')
    ? 'Júnior → Especialista'
    : 'Pleno → Especialista';

  return {
    generatedAt: new Date().toISOString(),
    dateLabel: formatPtDateShort(new Date()),
    count: finalJobs.length,
    hook,
    uniqueStacks,
    senioritySummary,
    jobs: finalJobs,
    slidesPairs,
  };
}

function formatPtDateShort(date) {
  const parts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: 'short',
  }).formatToParts(date);
  const day = parts.find((p) => p.type === 'day')?.value || '01';
  const mon = (parts.find((p) => p.type === 'month')?.value || 'jan').replace('.', '').toLowerCase();
  return `${day}.${mon}`;
}

export function buildRotatingHook(jobs, rotationIndex = 0) {
  const n = jobs.length;
  const distinctCompanies = [...new Set(jobs.map((j) => j.company))];
  const topTwo = distinctCompanies.slice(0, 2);
  const restCount = Math.max(1, distinctCompanies.length - 2);
  const jrPlenoCount = jobs.filter((j) => ['Estágio', 'Júnior', 'Pleno'].includes(j.seniority)).length;

  const variants = [
    {
      angle: 'brand-anchor',
      headline: topTwo.length >= 2
        ? `${topTwo[0]}, ${topTwo[1]} e +${restCount} techs contratando de casa hoje.`
        : `${n} vagas tech 100% remotas abertas hoje no Brasil.`,
      lead: 'Curadoria diária sem híbrido disfarçado. Oportunidades verificadas abertas para trabalhar de qualquer estado.',
    },
    {
      angle: 'anti-hibrido',
      headline: `${n} empresas contratando 100% remoto hoje no Brasil.`,
      lead: 'Zero híbrido 3x na semana. Todas as oportunidades abaixo aceitam devs trabalhando de casa em qualquer cidade.',
    },
    {
      angle: 'multi-stack',
      headline: `Radar Dev de hoje: ${n} vagas 100% home office abertas agora.`,
      lead: 'De Back-End e Dados a Front-End e Mobile: selecionamos vagas reais sem exigência presencial.',
    },
    {
      angle: jrPlenoCount >= 3 ? 'jr-pleno-spotlight' : 'speed-apply',
      headline: jrPlenoCount >= 3
        ? `O remoto não acabou: ${n} vagas abertas hoje (incluindo Júnior e Pleno).`
        : `Saíram nas últimas horas: ${n} vagas tech 100% remotas no Brasil.`,
      lead: 'Aplicar cedo aumenta suas chances de triagem. Confira os destaques verificados de hoje.',
    },
  ];

  return variants[Math.abs(rotationIndex) % variants.length];
}

export function buildInstagramCaption(edition, brandKit) {
  const companies = [...new Set(edition.jobs.map((j) => j.company))];
  const leadCompanies = companies.slice(0, 4).join(', ');
  const moreCount = Math.max(0, companies.length - 4);
  const companyIntro = moreCount > 0
    ? `${leadCompanies} e mais ${moreCount} empresas estão com vagas 100% remotas abertas hoje para trabalhar de qualquer estado do Brasil.`
    : `${leadCompanies} estão com vagas 100% remotas abertas hoje para trabalhar de qualquer estado do Brasil.`;

  const bulletLines = edition.jobs.map(
    (j) => `- ${j.company}: ${j.title} (${j.seniority})`
  ).join('\n');

  // Strict zero em-dash, zero AI-slop Portuguese caption
  return [
    companyIntro,
    '',
    'Todas passaram pelo nosso filtro anti-híbrido: nada de vaga anunciada como remota que pede 3 dias presenciais no escritório.',
    '',
    `Destaques do radar de hoje (${edition.dateLabel}):`,
    bulletLines,
    '',
    'Como pegar os links diretos para aplicar:',
    `1. Comente ${brandKit.ctaKeyword} aqui embaixo para receber a lista clicável na DM (ou acesse agora pelo ${brandKit.bioLinkLabel}).`,
    '2. Está vendo pelo celular? Salve este carrossel na bandeirinha para abrir os links com calma pelo computador.',
    '',
    'Qual stack e senioridade você quer ver mais no radar de amanhã (ex: Java Pleno, Python, C#, QA Júnior, Dados, Mobile)? Comenta aqui embaixo que priorizamos na próxima varredura.',
    '',
    '#vagasremotas #trabalhoremoto #homeofficebrasil #vagastech #desenvolvedor #programacao #engenhariadesoftware #carreiratech'
  ].join('\n');
}

export function buildBioLinksHtml(edition, brandKit) {
  const cards = edition.jobs.map((j) => `
    <a class="link-card" href="${escapeHtml(j.url)}" target="_blank" rel="noopener noreferrer">
      <div class="row-top">
        <span class="comp">${escapeHtml(j.handle)}</span>
        <span class="rem">remote: true</span>
      </div>
      <div class="title">${escapeHtml(j.title)}</div>
      <div class="pills">
        <span class="pill level">${escapeHtml(j.seniority)}</span>
        ${j.stacks.map((s) => `<span class="pill">${escapeHtml(s)}</span>`).join('')}
      </div>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(brandKit.brandName)} · Links das Vagas (${escapeHtml(edition.dateLabel)})</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${brandKit.typography.googleFontsUrl}" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0D0D0F;
    background-image: radial-gradient(circle at 80% 0%, rgba(16, 163, 127, 0.25), transparent 50%);
    color: #F9FAFB;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding: 32px 18px 64px;
  }
  .wrap { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
  .head { margin-bottom: 12px; }
  .brand { display: inline-flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 16px; background: #17171B; border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 999px; margin-bottom: 16px; }
  .orb { width: 12px; height: 12px; border-radius: 999px; background: linear-gradient(135deg, #10A37F, #34D399); box-shadow: 0 0 10px rgba(16,163,127,0.6); }
  h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; }
  .sub { color: #A1A1AA; font-size: 15px; margin-top: 8px; line-height: 1.45; }
  .link-card { display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: inherit; background: rgba(28,29,34,0.92); border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 20px; transition: border-color 0.15s ease, transform 0.15s ease; }
  .link-card:hover { border-color: rgba(52,211,153,0.5); transform: translateY(-2px); }
  .row-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
  .comp { color: #34D399; font-weight: 700; }
  .rem { background: rgba(16,163,127,0.16); color: #34D399; border: 1px solid rgba(52,211,153,0.3); padding: 3px 10px; border-radius: 999px; font-size: 12px; }
  .title { font-size: 18px; font-weight: 700; line-height: 1.25; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill { font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 4px 10px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #E4E4E7; }
  .pill.level { background: rgba(56,189,248,0.14); color: #38BDF8; border-color: rgba(56,189,248,0.28); }
</style>
</head>
<body>
  <div class="wrap">
    <div class="head">
      <div class="brand"><span class="orb"></span>${escapeHtml(brandKit.brandName)} · ${escapeHtml(brandKit.handle)}</div>
      <h1>Vagas 100% Remotas · Edição ${escapeHtml(edition.dateLabel)}</h1>
      <p class="sub">Toque em qualquer vaga abaixo para abrir a página oficial de candidatura.</p>
    </div>
    ${cards}
  </div>
</body>
</html>`;
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
