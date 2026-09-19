import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

export function isExternalLink(href, origin) {
  try {
    const url = new URL(href, origin);
    return ['http:', 'https:'].includes(url.protocol)
      && url.origin !== new URL(origin).origin
      && url.hostname !== 'docs.htmlcsstoimage.com';
  } catch { return false; }
}

export function externalLinksHtml(html, origin) {
  const $ = load(html);
  $('a[href]').each((_, element) => {
    const link = $(element);
    if (!isExternalLink(link.attr('href'), origin)) return;
    const rel = new Set((link.attr('rel') || '').toLowerCase().split(/\s+/).filter(Boolean));
    rel.delete('opener');
    rel.add('noopener');
    rel.delete('noreferrer');
    link.attr('target', '_blank').attr('rel', [...rel].join(' '));
  });
  return $.html();
}

// Process complete rendered documents so Astro components and Markdown obey the
// same policy. This does not alter code examples or the Markdown representation.
export default function externalLinks() {
  let origin;
  return { name: 'hcti-external-links', hooks: {
    'astro:config:done': ({ config }) => { origin = config.site; },
    'astro:build:done': async ({ dir }) => {
      async function visit(directory) {
        for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
          const file = path.join(directory, entry.name);
          if (entry.isDirectory()) await visit(file);
          else if (entry.name.endsWith('.html')) {
            await fs.writeFile(file, externalLinksHtml(await fs.readFile(file, 'utf8'), origin));
          }
        }
      }
      await visit(fileURLToPath(dir));
    },
  } };
}
