import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { prefersMarkdown } from '../src/worker.mjs';
import redirects from '../migration/redirects.json' with { type: 'json' };
const ctx = { waitUntil() {} };

test('Markdown negotiation respects explicit types, quality weights and HTML defaults', () => {
  for (const accept of ['text/markdown', 'text/markdown, text/html', 'text/html;q=0.5,text/markdown;q=0.9', 'TEXT/MARKDOWN; charset=utf-8', 'text/markdown;q=0.5,text/html;q=0,*/*;q=1']) assert.equal(prefersMarkdown(accept), true, accept);
  for (const accept of ['', '*/*', 'text/*', 'text/html,application/xhtml+xml,*/*;q=0.8', 'text/markdown;q=0', 'text/html,text/markdown;q=0.5', 'text/markdown;q=bogus']) assert.equal(prefersMarkdown(accept), false, accept);
});

test('same page URL serves Markdown or HTML, including HEAD and conditional requests', async () => {
  const calls = [];
  const env = { ASSETS: { fetch: async request => {
    calls.push(request);
    return new Response(request.headers.has('If-None-Match') ? null : new URL(request.url).pathname, {
      status: request.headers.has('If-None-Match') ? 304 : 200,
      headers: { 'Content-Type': 'text/html', Vary: 'Accept-Encoding', ETag: '"markdown-v1"' },
    });
  } } };
  for (const path of ['/parameters/', '/parameters']) {
    const response = await worker.fetch(new Request(`https://docs.test${path}?ref=agent`, { headers: { Accept: 'text/markdown' } }), env, ctx);
    assert.equal(await response.text(), '/parameters.md');
    assert.equal(response.headers.get('content-type'), 'text/markdown; charset=utf-8');
    assert.equal(response.headers.get('content-location'), '/parameters.md');
    assert.equal(response.headers.get('vary'), 'Accept-Encoding, Accept');
    assert.equal(new URL(calls.at(-1).url).search, '?ref=agent');
  }
  const html = await worker.fetch(new Request('https://docs.test/parameters/'), env, ctx);
  assert.equal(await html.text(), '/parameters/');
  assert.equal(html.headers.get('vary'), 'Accept-Encoding, Accept');
  const head = await worker.fetch(new Request('https://docs.test/parameters/', { method: 'HEAD', headers: { Accept: 'text/markdown' } }), env, ctx);
  assert.equal(calls.at(-1).method, 'HEAD');
  assert.equal(await head.text(), '');
  const conditional = await worker.fetch(new Request('https://docs.test/parameters/', { headers: { Accept: 'text/markdown', 'If-None-Match': '"markdown-v1"' } }), env, ctx);
  assert.equal(conditional.status, 304);
  assert.equal(calls.at(-1).headers.get('if-none-match'), '"markdown-v1"');
  assert.equal(conditional.headers.get('vary'), 'Accept-Encoding, Accept');
});

test('direct Markdown gets its media type, while assets and missing routes are not rewritten', async () => {
  const env = { ASSETS: { fetch: async request => new Response(new URL(request.url).pathname) } };
  const direct = await worker.fetch(new Request('https://docs.test/parameters.md'), env, ctx);
  assert.equal(direct.headers.get('content-type'), 'text/markdown; charset=utf-8');
  for (const path of ['/missing/', '/assets/images/a.png', '/_og/hash/']) {
    const response = await worker.fetch(new Request(`https://docs.test${path}`, { headers: { Accept: 'text/markdown' } }), env, ctx);
    assert.equal(await response.text(), path);
  }
});

test('every legacy redirect preserves the preview host, with or without trailing slash', async () => {
  for (const [path, target] of Object.entries(redirects)) {
    for (const suffix of ['', '/']) {
      const response = await worker.fetch(new Request(`https://docs-new-docs.mike.workers.dev${path}${suffix}`), {}, ctx);
      assert.equal(response.status, 301);
      assert.equal(response.headers.get('location'), `https://docs-new-docs.mike.workers.dev${target}`);
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
    }
  }
});
test('production pages remain indexable, preview pages and OG cards are noindex', async () => {
  const env = { ASSETS: { fetch: async () => new Response('page') } };
  for (const [url, noindex] of [['https://docs.htmlcsstoimage.com/parameters/', false], ['https://docs.htmlcsstoimage.com/_og/hash/', true], ['https://docs-new-docs.mike.workers.dev/', true]]) {
    const response = await worker.fetch(new Request(url), env, ctx);
    assert.equal(response.headers.has('x-robots-tag'), noindex);
  }
});
test('image assets pass through unchanged, including old query URLs and HEAD', async () => {
  const calls = [];
  const env = { ASSETS: { fetch: async request => {
    calls.push(request);
    return new Response('static image', { headers: { 'Content-Type': 'image/webp', ETag: 'image-v1' } });
  } } };
  for (const path of ['/assets/images/a.png?w=768', '/assets/images/g/hash-768.webp']) {
    const request = new Request(`https://docs.test${path}`);
    const response = await worker.fetch(request, env);
    assert.equal(calls.at(-1).url, request.url);
    assert.equal(await response.text(), 'static image');
    assert.equal(response.headers.get('etag'), 'image-v1');
    assert.equal(await (await worker.fetch(new Request(request, { method: 'HEAD' }), env)).text(), '');
  }
});
test('missing assets preserve 404 and write requests are rejected', async () => {
  const env = { ASSETS: { fetch: async () => new Response('missing', { status: 404 }) } };
  assert.equal((await worker.fetch(new Request('https://docs.test/missing'), env, ctx)).status, 404);
  assert.equal((await worker.fetch(new Request('https://docs.test/', { method: 'POST' }), env, ctx)).status, 405);
});
