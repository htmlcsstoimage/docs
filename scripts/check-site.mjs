import fs from 'node:fs/promises';
import { load } from 'cheerio';
import pages from '../src/generated/pages.json' with { type: 'json' };
import legacyUrls from '../tests/fixtures/legacy-urls.json' with { type: 'json' };
import redirects from '../src/data/redirects.json' with { type: 'json' };
import { isExternalLink } from './external-links.mjs';

const errors = [];
const normalize = path => path === '/' ? path : `${path.replace(/\/$/, '')}/`;
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
  for (const id of legacyUrls[page.route] || []) {
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
    } else await fs.access(`dist${path}`).catch(() => errors.push(`${route}: missing target ${value}`));
  }
}
// Published URLs must remain available, including through a permanent redirect.
for (const route of Object.keys(legacyUrls)) {
  const target = normalize(redirects[route.replace(/\/$/, '')] || route);
  if (!built.has(target)) errors.push(`${route}: missing published page or redirect target ${target}`);
}
for (const [route, target] of Object.entries(redirects)) {
  if (!built.has(normalize(target))) {
    await fs.access(`dist${target}`).catch(() => errors.push(`${route}: missing redirect target ${target}`));
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`${pages.length} pages verified: published URLs and anchors, redirects, assets, Markdown exports, metadata, and links.`);
