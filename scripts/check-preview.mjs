import assert from 'node:assert/strict';
import redirects from '../src/data/redirects.json' with { type: 'json' };
import pages from '../src/generated/pages.json' with { type: 'json' };
import images from '../src/data/images.json' with { type: 'json' };
const origin = process.argv[2];
if (!origin || new URL(origin).hostname === 'docs.htmlcsstoimage.com') throw new Error('Pass a preview origin, not production.');
// Wrangler can present the configured production route as the request host locally.
// Hosted preview checks must always enforce noindex.
const local = ['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname);
for (const route of [...pages.map(page => page.route), '/llms.txt', '/getting-started/using-the-api.md']) {
  const response = await fetch(new URL(route, origin));
  if (response.status !== 200) {
    const excerpt = (await response.text()).replace(/\s+/g, ' ').slice(0, 500);
    throw new Error(`Preview request failed: ${response.url}\nExpected HTTP 200, received ${response.status}.\nContent-Type: ${response.headers.get('content-type')}\nX-Robots-Tag: ${response.headers.get('x-robots-tag')}\nResponse: ${excerpt}\nConfirm the preview URL printed by Wrangler and that Preview URLs are enabled for the Worker before diagnosing this as a missing page.`);
  }
  if (!local) assert.match(response.headers.get('x-robots-tag') || '', /noindex/, route);
}
for (const page of pages) {
  const url = new URL(page.route, origin);
  const html = await fetch(url);
  assert.match(html.headers.get('content-type') || '', /text\/html/, page.route);
  assert.match(html.headers.get('vary') || '', /Accept/i, page.route);
  const markdown = await fetch(url, { headers: { Accept: 'text/markdown' } });
  assert.equal(markdown.status, 200, page.route);
  assert.match(markdown.headers.get('content-type') || '', /text\/markdown/, page.route);
  assert.match(markdown.headers.get('vary') || '', /Accept/i, page.route);
  const body = await markdown.text();
  assert.ok(body.startsWith(`# ${page.title}\n`), page.route);
  assert.equal(body, await (await fetch(new URL(page.markdownPath, origin))).text(), page.route);
  const head = await fetch(url, { method: 'HEAD', headers: { Accept: 'text/markdown' } });
  assert.equal(head.status, 200, page.route);
  assert.match(head.headers.get('content-type') || '', /text\/markdown/, page.route);
  assert.equal(await head.text(), '', page.route);
}
for (const [route, target] of Object.entries(redirects)) {
  for (const suffix of ['', '/']) {
    const response = await fetch(new URL(route + suffix, origin), { redirect: 'manual' });
    assert.equal(response.status, 301, route);
    assert.equal(response.headers.get('location'), new URL(target, origin).href, route);
  }
}
assert.equal((await fetch(new URL('/this-page-must-not-exist/', origin))).status, 404);
// Exercise each asset bypass route as well as the Worker-backed pages above.
const home = await (await fetch(new URL('/', origin))).text();
const bundle = home.match(/(?:src|href)="(\/_astro\/[^" ]+\.js)"/);
assert.ok(bundle, 'Expected a bundled script on the homepage');
for (const path of [bundle[1], '/pagefind/pagefind.js', '/search/pagefind.js', '/favicon.ico', Object.keys(images)[0]]) {
  const response = await fetch(new URL(path, origin), { method: 'HEAD' });
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path);
  if (!local) assert.match(response.headers.get('x-robots-tag') || '', /noindex/, path);
}
const og = await fetch(new URL(`/_og/${pages[0].og.hash}/`, origin));
assert.equal(og.status, 200);
assert.match(og.headers.get('content-type') || '', /text\/html/);
assert.match(og.headers.get('x-robots-tag') || '', /noindex/);
for (const [original, image] of Object.entries(images)) {
  assert.equal((await fetch(new URL(original, origin), { method: 'HEAD' })).status, 200, original);
  for (const [format, variants] of Object.entries(image.sources)) {
    // One size per format checks static serving without repeatedly downloading images.
    const response = await fetch(new URL(variants[0].src, origin), { method: 'HEAD' });
    assert.equal(response.status, 200, variants[0].src);
    assert.match(response.headers.get('content-type') || '', new RegExp(`image/${format}`));
  }
}
console.log('Original images and static AVIF/WebP variants verified.');
console.log(`Preview pages, Markdown negotiation and direct exports, HEAD, all legacy redirects, and 404 verified.${local ? ' Hosted noindex checks skipped locally.' : ' Preview noindex headers verified.'}`);
