import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { externalLinksHtml, isExternalLink } from '../scripts/external-links.mjs';

test('external HTTP links open in a new tab, retaining existing rel values', () => {
  const $ = load(externalLinksHtml('<header><a href="https://htmlcsstoimage.com">Home</a></header><main><a href="//fonts.google.com" rel="nofollow opener noreferrer">Fonts</a><pre><code>&lt;a href="https://example.com"&gt;</code></pre></main>', 'https://docs.test'));
  for (const link of $('a').toArray()) {
    assert.equal($(link).attr('target'), '_blank');
    assert.match($(link).attr('rel'), /noopener/);
    assert.doesNotMatch($(link).attr('rel'), /noreferrer/);
  }
  assert.equal($('main a').attr('rel'), 'nofollow noopener');
  assert.equal($('code').text(), '<a href="https://example.com">');
});

test('internal, fragment, email and other non-HTTP links are left alone', () => {
  for (const href of ['/parameters/', '#how-it-works', '../selector/', 'https://docs.test/parameters/', 'https://docs.htmlcsstoimage.com/parameters/', 'mailto:support@htmlcsstoimage.com', 'tel:+12345']) {
    assert.equal(isExternalLink(href, 'https://docs.test'), false, href);
    const $ = load(externalLinksHtml(`<a href="${href}">Link</a>`, 'https://docs.test'));
    assert.equal($('a').attr('target'), undefined, href);
  }
});
