import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { cardHash, digest, signedImageUrl } from './og.mjs';

try { process.loadEnvFile(); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const apiId = process.env.HCTI_API_ID, apiKey = process.env.HCTI_API_KEY;
if (Boolean(apiId) !== Boolean(apiKey)) throw new Error('Set both HCTI_API_ID and HCTI_API_KEY.');
if (!apiId && process.env.REQUIRE_OG_SIGNING === 'true') throw new Error('Deployment requires V2_HCTI_API_ID and V2_HCTI_API_KEY Actions secrets.');
const origin = process.env.DOCS_ORIGIN || 'http://localhost:4321';
if (process.env.REQUIRE_OG_SIGNING === 'true' && !origin.startsWith('https://')) throw new Error('Deployment requires an HTTPS DOCS_ORIGIN.');
const designFingerprint = digest(await fs.readFile('src/pages/[...og].astro'));
const pages = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.mdx?$/.test(file)) continue;
    const { data } = matter(await fs.readFile(file, 'utf8'));
    if (typeof data.slug !== 'string') throw new Error(`Explicit slug required: ${file}`);
    const route = data.slug ? `/${data.slug}/` : '/';
    const og = { title: data.og_title ?? data.title, description: data.description || 'Generate images from HTML and CSS.', section: data.section || 'Developer documentation' };
    const hash = cardHash(og, designFingerprint);
    pages.push({ file, route, title: data.page_title ?? data.title, markdownPath: route === '/' ? '/index.md' : `${route.slice(0, -1)}.md`, og: { ...og, hash, image: apiId ? signedImageUrl(new URL(`/_og/${hash}/`, origin).href, apiId, apiKey) : null } });
  }
}
await walk('src/content/docs');
if (new Set(pages.map(page => page.route)).size !== pages.length) throw new Error('Duplicate page slugs');
await fs.mkdir('src/generated', { recursive: true });
await fs.writeFile('src/generated/pages.json', JSON.stringify(pages));
console.log(`Prepared ${pages.length} OG cards${apiId ? ' with signed HCTI URLs' : ' (unsigned for local development)'}. No image API requests made.`);
