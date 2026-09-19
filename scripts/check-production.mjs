import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { load } from 'cheerio';
import pages from '../src/generated/pages.json' with { type:'json' };
const origin = 'https://docs.htmlcsstoimage.com';
for (const page of pages) {
  const $ = load(await fs.readFile(`dist${page.route}index.html`, 'utf8'));
  assert.equal($('link[rel="canonical"]').attr('href'), new URL(page.route, origin).href, page.route);
  assert.doesNotMatch($('meta[name="robots"]').attr('content') || '', /noindex/i, page.route);
  const image = new URL($('meta[property="og:image"]').attr('content'));
  assert.equal(image.origin, 'https://hcti.io', page.route);
  assert.equal(image.searchParams.get('url'), `${origin}/_og/${page.og.hash}/`, page.route);
}
const robots = await fs.readFile('dist/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const sitemap = load(await fs.readFile('dist/sitemap.xml', 'utf8'), { xml:true });
assert.equal(sitemap('urlset').length, 1, 'Expected a single sitemap for the current site');
const entries = new Map();
for (const entry of sitemap('url').toArray()) {
  const loc = new URL(sitemap(entry).find('loc').text());
  assert.equal(loc.origin, origin);
  assert.ok(!loc.pathname.startsWith('/_og/'));
  assert.ok(!entries.has(loc.pathname), `Duplicate sitemap URL: ${loc.pathname}`);
  entries.set(loc.pathname, Number(sitemap(entry).find('priority').text()));
}
for (const page of pages) assert.equal(entries.get(page.route), /^\/changelog\/[^/]+\/$/.test(page.route) ? 0.2 : 0.8, page.route);
await assert.rejects(fs.access('dist/sitemap-index.xml'));
await assert.rejects(fs.access('dist/sitemap-0.xml'));
console.log(`Production metadata, signed OG sources, robots.txt, and sitemap priorities verified for ${pages.length} pages.`);
