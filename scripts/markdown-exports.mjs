import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import Turndown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export function renderMarkdown(html, title) {
  const $ = load(html);
  $('[data-pagefind-ignore]:not([data-changelog-navigation]),.copy,.frame .header,.sl-anchor-link').remove();
  const content = $('.sl-markdown-content');
  content.find('.expressive-code pre').each((_, element) => {
    const pre = $(element);
    pre.find('.ec-line, .line').append('\n');
    const language = pre.attr('data-language');
    if (language) pre.children('code').addClass(`language-${language}`);
  });
  const td = new Turndown({ codeBlockStyle: 'fenced', headingStyle: 'atx' });
  td.use(gfm);
  td.remove(['script', 'style', 'button']);
  td.addRule('link-card', {
    filter: node => node.classList?.contains('sl-link-card'),
    replacement: (_content, node) => {
      const link = node.querySelector('a');
      const description = node.querySelector('.description');
      return `\n\n${td.turndown(link.outerHTML)}${description ? ` — ${td.turndown(description.innerHTML)}` : ''}\n\n`;
    },
  });
  // The full-size link is a visual affordance; agents need the image and caption.
  td.addRule('doc-image', {
    filter: node => node.nodeName === 'FIGURE' && node.hasAttribute('data-doc-image'),
    replacement: (_content, node) => {
      const img = node.querySelector('img');
      const alt = (img.getAttribute('alt') || '').replace(/[\\[\]]/g, '\\$&');
      const src = img.getAttribute('src').replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
      const caption = node.querySelector('figcaption');
      return `\n\n![${alt}](${src})${caption ? `\n\n${td.turndown(caption.innerHTML)}` : ''}\n\n`;
    },
  });
  td.addRule('endpoint', {
    filter: node => node.hasAttribute?.('data-endpoint'),
    replacement: (_content, node) => `\n\n\`${node.querySelector('strong').textContent} ${node.getAttribute('data-endpoint-url') || node.querySelector('code').textContent}\`\n\n`,
  });
  td.addRule('table-cell', {
    filter: ['th', 'td'],
    replacement: (content, node) => {
      const first = Array.from(node.parentNode.children).indexOf(node) === 0;
      return `${first ? '| ' : ' '}${content.replace(/\|/g, '\\|').replace(/\n+/g, ' ')} |`;
    },
  });
  const published = $('time[data-changelog-date]').first().text();
  const navigation = $('[data-changelog-navigation] a').map((_, element) => {
    const link = $(element);
    const direction = link.attr('rel') === 'prev' ? 'Previous' : 'Next';
    return `${direction}: [${link.find('strong').text().replace(/[\[\]]/g, '\\$&')}](${link.attr('href')}) — ${link.find('time').text()}`;
  }).get().join('\n\n');
  return `# ${title}\n\n${published ? `${published}\n\n` : ''}${td.turndown(content.html() || '')}${navigation ? `\n\n${navigation}` : ''}\n`;
}

// Public Markdown views are generated from the native Astro output so component
// content (e.g. parameter tables) is available to readers and AI tools as prose.
export default function markdownExports() {
  return { name: 'hcti-markdown-exports', hooks: { 'astro:build:done': async ({ dir }) => {
    const root = fileURLToPath(dir);
    const pages = JSON.parse(await fs.readFile('src/generated/pages.json', 'utf8'));
    const articles = [];
    for (const page of pages) {
      const markdown = renderMarkdown(await fs.readFile(`${root}${page.route.slice(1)}index.html`, 'utf8'), page.title);
      const target = `${root}${page.markdownPath.slice(1)}`;
      await fs.mkdir(target.slice(0, target.lastIndexOf('/')), { recursive: true });
      await fs.writeFile(target, markdown);
      articles.push(`<!-- Source: ${page.route} -->\n\n${markdown}`);
    }
    const origin = process.env.DOCS_ORIGIN || 'http://localhost:4321';
    await fs.writeFile(`${root}llms.txt`, '# HTML/CSS to Image documentation\n\n> Render images, screenshots, and PDFs from HTML/CSS, URLs, or saved templates.\n\nEach page supports Accept: text/markdown and a direct .md URL.\n\n## Documentation\n\n' + pages.map(page => `- [${page.title}](${new URL(page.markdownPath, origin).href}): ${page.og.description}`).join('\n') + '\n');
    await fs.writeFile(`${root}llms-full.txt`, articles.join('\n\n---\n\n'));
  } } };
}
