import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  cleanCompanyName,
  companyHandle,
  cleanRoleTitle,
  detectSeniority,
  extractStacks,
  isEligibleBrazilRemote,
  curateDailyEdition,
  buildInstagramCaption,
  buildBioLinksHtml,
} from '../src/curate-and-copy.mjs';
import { buildSlideMarkupList } from '../src/render-carousel.mjs';
import { buildPostizCreateArgs, publishCarouselToPostiz } from '../src/publish-postiz.mjs';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandKit = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'brand-kit.json'), 'utf8'));

test('isEligibleBrazilRemote accepts 100% remote Brazil/LatAm roles and rejects hybrid, onsite, or foreign-only', () => {
  assert.equal(isEligibleBrazilRemote({
    title: 'Pessoa Desenvolvedora Java Pleno',
    location: 'Remoto - Brasil',
    url: 'https://grupoboticario.gupy.io/jobs/123',
  }), true);

  assert.equal(isEligibleBrazilRemote({
    title: 'Desenvolvedor Back-End Híbrido',
    location: 'Remoto',
    url: 'https://empresa.gupy.io/jobs/456',
  }), false);

  assert.equal(isEligibleBrazilRemote({
    title: 'Software Engineer',
    location: 'São Paulo - Presencial',
    url: 'https://job-boards.greenhouse.io/stone/jobs/1',
  }), false);

  assert.equal(isEligibleBrazilRemote({
    title: 'Senior Python Engineer',
    location: 'United States Only (Remote)',
    url: 'https://job-boards.greenhouse.io/brex/jobs/2',
  }), false);

  // Blocks sneaky URL-slug hybrid jobs disguised as "(Remoto)" in aggregators
  assert.equal(isEligibleBrazilRemote({
    title: 'Especialista de Segurança da Informação',
    location: 'Brasília, DF (Remoto)',
    url: 'https://interop.inhire.app/vagas/2e9/especialista-or-hibrido-orbrasiliadf',
  }), false);
});

test('company, role, seniority, and multi-stack classifiers clean noisy portal titles accurately', () => {
  assert.equal(cleanCompanyName('FCamara #SangueLaranja | O futuro passa por aqui', 'https://fcamara.gupy.io/jobs/1'), 'FCamara');
  assert.equal(cleanCompanyName('LOLDESIGN Soluções Digitais LTDA'), 'Loldesign');
  assert.equal(companyHandle('Grupo Boticário'), '@grupo-boticario');
  assert.equal(cleanRoleTitle('98421 - DESENVOLVEDOR SOTWARE SR - RHA9921 (10492)'), 'Desenvolvedor Software Sênior');
  assert.equal(cleanRoleTitle('\\[Plataformas Corporativas\\] Sênior Analytics Engineer'), 'Sênior Analytics Engineer');

  assert.equal(detectSeniority('Pessoa Desenvolvedora Júnior Python'), 'Júnior');
  assert.equal(detectSeniority('Estágio em Desenvolvimento Web'), 'Estágio');
  assert.equal(detectSeniority('Desenvolvedor C# .NET Pleno'), 'Pleno');
  assert.equal(detectSeniority('Engenheira de Dados Sênior'), 'Sênior');
  assert.equal(detectSeniority('Especialista Arquitetura Java'), 'Especialista');

  assert.deepEqual(extractStacks('Desenvolvedor Java Spring AWS', 'https://stone.gupy.io/jobs/9'), ['Java', 'Spring', 'AWS']);
  assert.deepEqual(extractStacks('Analista de QA e Automação de Testes', 'https://remotar.com.br/job/1'), ['QA / Testes', 'Remotar']);
});

test('curateDailyEdition enforces diversity, excludes posted URLs, and builds 7 OpenAI Emerald Noir slides', () => {
  const sampleRawJobs = [
    { url: 'https://gupy.io/1', rawCompany: 'Grupo Boticário', rawTitle: 'Pessoa Desenvolvedora Fullstack Node/React III', location: '100% Remoto', postedAt: '2026-11-07' },
    { url: 'https://gupy.io/2', rawCompany: 'Caju', rawTitle: 'Pessoa Desenvolvedora Back-End Python Pleno', location: 'Remoto - Brasil', postedAt: '2026-11-07' },
    { url: 'https://greenhouse.io/3', rawCompany: 'iFood', rawTitle: 'Desenvolvedor Júnior Java Spring', location: 'Brazil - Remote', postedAt: '2026-11-06' },
    { url: 'https://lever.co/4', rawCompany: 'CI&T', rawTitle: 'Desenvolvedor C# .NET Pleno', location: 'Remote - Brazil', postedAt: '2026-11-06' },
    { url: 'https://ashbyhq.com/5', rawCompany: 'Nubank', rawTitle: 'Engenheiro de Dados Spark AWS', location: 'Brazil (Remote)', postedAt: '2026-11-06' },
    { url: 'https://greenhouse.io/6', rawCompany: 'VTEX', rawTitle: 'Pessoa Desenvolvedora Mobile Flutter Júnior', location: 'Brasil - Remoto', postedAt: '2026-11-05' },
    { url: 'https://greenhouse.io/7', rawCompany: 'QuintoAndar', rawTitle: 'Analista de QA Automação de Testes Pleno', location: '100% Home Office', postedAt: '2026-11-05' },
    { url: 'https://greenhouse.io/8', rawCompany: 'Stone', rawTitle: 'Desenvolvedora Front-End Angular Sênior', location: 'Todo o Brasil - Remoto', postedAt: '2026-11-05' },
    { url: 'https://already-posted.io/9', rawCompany: 'Neon', rawTitle: 'Dev Go Sênior', location: 'Remoto', postedAt: '2026-11-07' },
  ];

  const posted = new Set(['https://already-posted.io/9']);
  const edition = curateDailyEdition(sampleRawJobs, posted, 8, 0);

  assert.equal(edition.count, 8);
  assert.equal(edition.jobs.some((j) => j.url === 'https://already-posted.io/9'), false);
  assert.equal(edition.slidesPairs.length, 4);

  const caption = buildInstagramCaption(edition, brandKit);
  assert.equal(caption.includes('—'), false, 'Caption must never contain AI-slop em-dashes');
  assert.match(caption, /REMOTO/);

  const bioHtml = buildBioLinksHtml(edition, brandKit);
  assert.match(bioHtml, /https:\/\/gupy\.io\/1/);

  const slides = buildSlideMarkupList(edition, brandKit);
  assert.equal(slides.length, 7);
  assert.equal(slides[0].fileName, 'slide-01-cover.png');
  assert.match(slides[0].innerHtml, /radar-br-remoto\.ts/);
  assert.equal(slides[5].fileName, 'slide-06-recap.png');
  assert.match(slides[5].innerHtml, /Salvar ↑/);
  assert.equal(slides[6].fileName, 'slide-07-cta.png');
  assert.match(slides[6].innerHtml, /REMOTO/);
});

test('publishCarouselToPostiz handles unauthenticated state cleanly and uploads slides before posts:create when authenticated', () => {
  const unauth = publishCarouselToPostiz({
    slidePaths: ['/tmp/s1.png'],
    caption: 'Teste',
    spawnFn: () => ({ status: 1, stdout: '❌ Not authenticated', stderr: '' }),
  });
  assert.equal(unauth.published, false);
  assert.equal(unauth.reason, 'not_authenticated');

  const calls = [];
  const ok = publishCarouselToPostiz({
    slidePaths: ['/tmp/slide-01.png', '/tmp/slide-02.png'],
    caption: 'Legenda teste',
    scheduleIso: '2026-11-08T12:00:00.000Z',
    mode: 'draft',
    spawnFn: (_bin, args) => {
      calls.push(args);
      if (args[0] === 'auth:status') return { status: 0, stdout: 'Authenticated', stderr: '' };
      if (args[0] === 'integrations:list') {
        return { status: 0, stdout: JSON.stringify([{ id: 'ig-devremoto-123', identifier: 'instagram-standalone', name: '@devremoto.br' }]), stderr: '' };
      }
      if (args[0] === 'upload') {
        return { status: 0, stdout: JSON.stringify({ path: `https://cdn.postiz.local/${path.basename(args[1])}` }), stderr: '' };
      }
      if (args[0] === 'posts:create') {
        return { status: 0, stdout: JSON.stringify({ id: 'post-999' }), stderr: '' };
      }
      return { status: 1, stdout: '', stderr: 'unexpected' };
    },
  });

  assert.equal(ok.published, true);
  assert.equal(ok.integrationId, 'ig-devremoto-123');
  assert.deepEqual(ok.uploadedUrls, [
    'https://cdn.postiz.local/slide-01.png',
    'https://cdn.postiz.local/slide-02.png',
  ]);
  const createCall = calls.find((c) => c[0] === 'posts:create');
  assert.ok(createCall);
  assert.deepEqual(
    createCall,
    buildPostizCreateArgs({
      caption: 'Legenda teste',
      scheduleIso: '2026-11-08T12:00:00.000Z',
      mode: 'draft',
      uploadedUrls: ['https://cdn.postiz.local/slide-01.png', 'https://cdn.postiz.local/slide-02.png'],
      integrationId: 'ig-devremoto-123',
    }),
  );
});
