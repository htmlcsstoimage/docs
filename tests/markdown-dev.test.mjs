import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import markdownExports from '../scripts/markdown-exports.mjs';

test('development Markdown URLs render live articles, handle HEAD, and preserve missing routes', async t => {
  let middleware;
  let content = '<p>First draft.</p><div data-endpoint><strong>POST</strong><code>/v1/webhooks</code></div>';
  const server = createServer((request, response) => {
    middleware(request, response, error => {
      if (error) {
        response.writeHead(500).end(error.message);
      } else if (['/', '/guides/webhooks/'].includes(request.url)) {
        response.setHeader('Content-Type', 'text/html');
        response.end(`<h1>Webhooks</h1><nav>Navigation</nav><div class="sl-markdown-content">${content}</div>`);
      } else {
        response.writeHead(404).end('Not found');
      }
    });
  });
  markdownExports().hooks['astro:server:setup']({ server: {
    httpServer: server,
    config: { server: {} },
    middlewares: { use: handler => { middleware = handler; } },
  } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const response = await fetch(`${origin}/guides/webhooks.md`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/plain; charset=utf-8');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(await response.text(), '# Webhooks\n\nFirst draft.\n\n`POST /v1/webhooks`\n');

  content = '<p>Updated draft.</p>';
  assert.equal(await (await fetch(`${origin}/guides/webhooks.md`)).text(), '# Webhooks\n\nUpdated draft.\n');
  assert.equal(await (await fetch(`${origin}/guides/webhooks.md`, { headers: { Host: 'example.invalid' } })).text(), '# Webhooks\n\nUpdated draft.\n');
  assert.equal(await (await fetch(`${origin}/index.md`)).text(), '# Webhooks\n\nUpdated draft.\n');
  const head = await fetch(`${origin}/guides/webhooks.md`, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.match(head.headers.get('content-type'), /text\/plain/);
  assert.equal(await head.text(), '');
  assert.equal((await fetch(`${origin}/missing.md`)).status, 404);
  assert.equal((await fetch(`${origin}//example.invalid/webhooks.md`)).status, 404);
  assert.equal((await fetch(`${origin}/guides/webhooks.md`, { method: 'POST' })).status, 404);
  assert.equal((await fetch(`${origin}/guides/webhooks/`)).headers.get('content-type'), 'text/html');
});
