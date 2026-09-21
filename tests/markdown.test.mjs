import test from 'node:test';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import { load } from 'cheerio';
import { renderMarkdown } from '../scripts/markdown-exports.mjs';

test('changelog publication dates remain separate from article text', () => {
  const markdown = renderMarkdown('<header><time data-changelog-date datetime="2026-09-15">September 15, 2026</time></header><div class="sl-markdown-content"><p>New Go client.</p></div>', 'Go client');
  assert.equal(markdown, '# Go client\n\nSeptember 15, 2026\n\nNew Go client.\n');
});

test('changelog Markdown includes neighboring entries even though search ignores navigation', () => {
  const markdown = renderMarkdown('<div class="sl-markdown-content"><p>Release notes.</p></div><nav data-changelog-navigation data-pagefind-ignore><a href="/changelog/older/" rel="prev"><span>← Previous</span><strong>Older update</strong><time>Sep 14, 2026</time></a><a href="/changelog/newer/" rel="next"><span>Next →</span><strong>Newer update</strong><time>Sep 16, 2026</time></a></nav>', 'Update');
  assert.match(markdown, /Previous: \[Older update\]\(\/changelog\/older\/\) — Sep 14, 2026/);
  assert.match(markdown, /Next: \[Newer update\]\(\/changelog\/newer\/\) — Sep 16, 2026/);
});

test('link cards separate the linked title from the description', () => {
  const markdown = renderMarkdown('<div class="sl-markdown-content"><div class="sl-link-card"><span class="stack"><a href="/guides/og-images/astro/"><span class="title">Astro</span></a><span class="description">Static and <strong>server-rendered</strong> routes.</span></span><svg aria-hidden="true"></svg></div></div>', 'Guides');
  assert.equal(markdown, '# Guides\n\n[Astro](/guides/og-images/astro/) — Static and **server-rendered** routes.\n');
});

test('images retain alt text, original URL and caption without visual wrappers', () => {
  const markdown = renderMarkdown(`<nav>Navigation</nav><div class="sl-markdown-content"><figure data-doc-image><picture><source type="image/avif" srcset="/assets/images/g/hash-384.avif 384w" /><source type="image/webp" srcset="/assets/images/g/hash-384.webp 384w" /><img src="/assets/images/a.png" alt="API keys" /></picture><figcaption>Create a <strong>restricted</strong> key.</figcaption></figure></div>`, 'Keys');
  assert.equal(markdown, '# Keys\n\n![API keys](/assets/images/a.png)\n\nCreate a **restricted** key.\n');
});

test('parameter tables round-trip as ordinary GFM with links, inline code and pipe values', () => {
  const markdown = renderMarkdown(`<div class="sl-markdown-content"><table><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><a href="/parameters/google_fonts/"><strong>google_fonts</strong></a></td><td><code>String</code></td><td>Load <code>Roboto|Open Sans</code>.<br>Optional.</td></tr></tbody></table></div>`, 'Parameters');
  assert.match(markdown, /\| Name \| Type \| Description \|/);
  const $ = load(marked.parse(markdown));
  assert.equal($('tbody td').length, 3);
  assert.equal($('td a').attr('href'), '/parameters/google_fonts/');
  assert.equal($('td code').last().text(), 'Roboto|Open Sans');
  assert.match($('td').last().text(), /Optional/);
});

test('headings, code examples and endpoints retain meaning without UI controls', () => {
  const markdown = renderMarkdown(`<div class="sl-markdown-content"><h2>Example<a class="sl-anchor-link" href="#example">#</a></h2><div data-endpoint><strong>POST</strong><code>https://hcti.io/v1/image</code></div><div class="expressive-code"><pre><code class="language-js"><span class="line">const a = 1;</span><span class="line">console.log(a);</span></code></pre><button>Copy</button></div></div>`, 'API');
  assert.match(markdown, /## Example\n/);
  assert.match(markdown, /`POST https:\/\/hcti.io\/v1\/image`/);
  assert.match(markdown, /```js\nconst a = 1;\nconsole.log\(a\);\n```/);
  assert.doesNotMatch(markdown, /Copy|\[\]\(/);
});

test('Expressive Code output retains its language, line breaks and indentation', () => {
  const markdown = renderMarkdown('<div class="sl-markdown-content"><div class="expressive-code"><pre data-language="html"><code><div class="ec-line"><div class="code">&lt;div&gt;</div></div><div class="ec-line"><div class="code"><span class="indent">  </span>&lt;h2&gt;Hello&lt;/h2&gt;</div></div><div class="ec-line"><div class="code">&lt;/div&gt;</div></div></code></pre></div></div>', 'Sizing');
  assert.match(markdown, /```html\n<div>\n  <h2>Hello<\/h2>\n<\/div>\n```/);
});

test('component Markdown uses build props and strips all metadata from served HTML', async () => {
  const { parameterMarkdown, selectParameters } = await import('../src/lib/parameter-markdown.mjs');
  const { stripBuildMetadata } = await import('../scripts/markdown-exports.mjs');
  const props = { context: 'og_config', namePrefix: 'hcti:', nameHeading: 'Parameter' };
  const expected = parameterMarkdown(selectParameters(props), props);
  const dom = load('<div class="sl-markdown-content"><table><tr><td>Visual-only table text</td></tr></table></div>');
  dom('table').attr('data-build-parameter-table', JSON.stringify(props));
  const markdown = renderMarkdown(dom.html(), 'Parameters');
  assert.equal(markdown, `# Parameters\n\n${expected}\n`);
  assert.doesNotMatch(markdown, /Visual-only/);
  assert.ok(markdown.includes('`hcti:viewport_width`'));
  assert.ok(!markdown.includes('viewport\\_width'));
  const cleaned = stripBuildMetadata(dom.html());
  assert.doesNotMatch(cleaned, /data-build-|data-doc-markdown/);
  assert.match(cleaned, /<td>Visual-only table text<\/td>/);
});
