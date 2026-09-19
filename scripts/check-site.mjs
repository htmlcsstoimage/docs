import fs from 'node:fs/promises';
import { load } from 'cheerio';
import pages from '../src/generated/pages.json' with { type: 'json' };
import routes from '../migration/routes.json' with { type: 'json' };
import baseline from '../migration/legacy-anchors.json' with { type: 'json' };
import redirects from '../migration/redirects.json' with { type: 'json' };
import { isExternalLink } from './external-links.mjs';

const errors = [];
// Explicitly removed editorial sections; all other legacy anchors remain required.
const retiredAnchors = new Set(['/#manage-organization-resources']);
const normalize = path => path === '/' ? path : `${path.replace(/\/$/, '')}/`;
const planned = new Set(routes.map(page => page.route));
const built = new Map();
for (const page of pages) {
  const html = await fs.readFile(`dist${page.route}index.html`, 'utf8');
  const $ = load(html);
  if ($('[data-doc-markdown],[data-build-parameter-table]').length) errors.push(`${page.route}: build-only Markdown metadata leaked into HTML`);
  $('a[href]').each((_, element) => {
    const link = $(element);
    if (!isExternalLink(link.attr('href'), process.env.DOCS_ORIGIN || 'http://localhost:4321')) return;
    const rel = (link.attr('rel') || '').split(/\s+/);
    if (link.attr('target') !== '_blank' || !rel.includes('noopener') || rel.includes('noreferrer')) {
      errors.push(`${page.route}: external link must open safely and retain referral attribution: ${link.attr('href')}`);
    }
  });
  const ids = $('[id]').map((_, el) => $(el).attr('id')).get();
  if (ids.length !== new Set(ids).size) errors.push(`${page.route}: duplicate IDs`);
  built.set(page.route, { $, ids: new Set(ids) });
  // Full fidelity requires both heading anchors and manually assigned targets.
  for (const id of baseline[page.route]?.ids || []) {
    if (retiredAnchors.has(`${page.route}#${id}`)) continue;
    if (!ids.includes(id)) errors.push(`${page.route}: missing previous #${id}`);
  }
  const source = await fs.readFile(page.file, 'utf8');
  // Fenced examples may legitimately document Liquid; executable content may not.
  const prose = source.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
  if (/{%|\{:\s|class="(?:fs-|te-doc|http-method)|<style\b/.test(prose)) errors.push(`${page.file}: legacy markup remains`);
  if ($('img[src*="cloudinary"]').length) errors.push(`${page.route}: Cloudinary image remains`);
  if ($('h1').length !== 1) errors.push(`${page.route}: expected one page title`);
  if (page.og.image && $('meta[property="og:image"]').attr('content') !== page.og.image) errors.push(`${page.route}: missing signed OG image`);
  await fs.access(`dist/_og/${page.og.hash}/index.html`).catch(() => errors.push(`${page.route}: missing generated OG card`));
  await fs.access(`dist${page.markdownPath}`).catch(() => errors.push(`${page.route}: missing Markdown export`));
}
const pendingLinks = new Set();
for (const [route, { $ }] of built) {
  for (const element of $('source[srcset],img[srcset]').toArray()) {
    for (const candidate of $(element).attr('srcset').split(',')) {
      const value = candidate.trim().split(/\s+/)[0];
      if (!value.startsWith('/assets/images/g/')) continue;
      await fs.access(`dist${decodeURIComponent(value)}`).catch(() => errors.push(`${route}: missing responsive image ${value}`));
    }
  }
  for (const element of $('a[href],img[src]').toArray()) {
    const value = $(element).attr('href') || $(element).attr('src');
    if (!value || /^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const url = new URL(value, `https://docs.htmlcsstoimage.com${route}`);
    if (url.hostname !== 'docs.htmlcsstoimage.com') continue;
    let path = decodeURIComponent(url.pathname);
    const redirect = redirects[path.replace(/\/$/, '')];
    if (redirect) path = redirect;
    const target = normalize(path);
    if (built.has(target)) {
      if (url.hash && !built.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) errors.push(`${route}: broken ${value}`);
    } else if (planned.has(target)) pendingLinks.add(target);
    else await fs.access(`dist${path}`).catch(() => errors.push(`${route}: missing target ${value}`));
  }
}
const migratedRedirects = routes.filter(page => !built.has(page.route) && built.has(normalize(redirects[page.route.replace(/\/$/, '')] || '/__unresolved__')));
const resolvedRedirects = new Set(migratedRedirects.map(page => page.route));
const pending = routes.filter(page => !built.has(page.route) && !resolvedRedirects.has(page.route));
if (process.argv.includes('--complete') && pending.length) errors.push(`${pending.length} source pages still require individual migration`);
const report = { migrated: pages.length, migratedRedirects: [...resolvedRedirects], total: routes.length, pending: pending.map(page => page.source), pendingLinkTargets: [...pendingLinks], errors };
await fs.writeFile('migration-report.json', JSON.stringify(report, null, 2));
console.log(`${pages.length} native pages and ${resolvedRedirects.size} redirect routes migrated out of ${routes.length}; ${pending.length} pending. ${pendingLinks.size} link targets await migration.`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('Migrated pages: URLs, old anchors, assets, Markdown exports, and links verified.');
