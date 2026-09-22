import redirects from './data/redirects.json' with { type: 'json' };
import pages from './generated/pages.json' with { type: 'json' };

const markdownRoutes = new Map(pages.map(page => [page.route, page.markdownPath]));
const markdownPaths = new Set(markdownRoutes.values());
export function prefersMarkdown(accept) {
  const ranges = accept.toLowerCase().split(',').map(value => {
    const [type, ...parameters] = value.trim().split(';');
    const qParam = parameters.find(parameter => parameter.trim().startsWith('q='));
    const q = qParam === undefined ? 1 : Number(qParam.trim().slice(2));
    return { type: type.trim(), q: Number.isFinite(q) && q >= 0 && q <= 1 ? q : 0 };
  });
  // Wildcard-only clients (including browsers and curl) keep receiving HTML.
  const markdown = ranges.find(range => range.type === 'text/markdown');
  if (!markdown || markdown.q === 0) return false;
  const html = ranges.find(range => range.type === 'text/html')
    || ranges.find(range => range.type === 'text/*')
    || ranges.find(range => range.type === '*/*');
  return markdown.q >= (html?.q || 0);
}

const productionHost = 'docs.htmlcsstoimage.com';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isPreview = url.hostname !== productionHost;
    const canonicalPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    const markdownPath = markdownRoutes.get(canonicalPath);
    let servedMarkdown = markdownPaths.has(url.pathname);
    let response;
    const redirect = redirects[url.pathname.replace(/\/$/, '')];
    if (redirect) response = Response.redirect(new URL(redirect, url.origin).href, 301);
    else if (!['GET', 'HEAD'].includes(request.method)) response = new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    else {
      if (markdownPath && prefersMarkdown(request.headers.get('Accept') || '')) {
        const markdownUrl = new URL(url); markdownUrl.pathname = markdownPath;
        const headers = new Headers(request.headers);
        headers.set('Accept', 'text/markdown');
        response = await env.ASSETS.fetch(new Request(markdownUrl, { method: request.method, headers }));
        servedMarkdown = true;
      } else response = await env.ASSETS.fetch(request);
    }
    const headers = new Headers(response.headers);
    if (markdownPath) {
      // Let hover-prefetched HTML be reused by ClientRouter's fetch. Keep
      // variants private to the browser and separated by Vary: Accept.
      if (response.status === 200 || response.status === 304) {
        headers.set('Cache-Control', 'private, max-age=60');
      }
      const vary = new Set((headers.get('Vary') || '').split(',').map(value => value.trim()).filter(Boolean));
      if (![...vary].some(value => value.toLowerCase() === 'accept' || value === '*')) vary.add('Accept');
      headers.set('Vary', [...vary].join(', '));
      headers.append('Link', `<${markdownPath}>; rel="alternate"; type="text/markdown"`);
    }
    if (servedMarkdown && (response.ok || response.status === 304)) {
      headers.set('Content-Type', 'text/markdown; charset=utf-8');
      if (markdownPath) headers.set('Content-Location', markdownPath);
    }
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (isPreview || url.pathname.startsWith('/_og/') || url.pathname.startsWith('/comparer/')) headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(request.method === 'HEAD' ? null : response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
