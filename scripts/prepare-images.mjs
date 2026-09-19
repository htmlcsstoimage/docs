import fs from 'node:fs/promises';
import { imageVariants } from './image-variants.mjs';

const originals = new Set();
async function collect(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await collect(file);
    else if (/\.mdx?$/.test(file)) {
      const content = await fs.readFile(file, 'utf8');
      for (const match of content.matchAll(/<DocImage\b[^>]*\bsrc="(\/assets\/images\/[^"\n]+\.(?:png|jpe?g|webp|avif))"/gi)) originals.add(match[1]);
    }
  }
}
await collect('src/content/docs');
const manifest = {};
const pending = [...originals].sort();
await Promise.all(Array.from({ length: 2 }, async () => {
  while (pending.length) {
    const src = pending.shift();
    const variants = await imageVariants(await fs.readFile(`public${decodeURIComponent(src)}`), 'public/assets/images/g', src);
    if (variants) manifest[src] = variants;
  }
}));
// Remove only obsolete files owned by this generator; unchanged variants are cached.
const used = new Set(Object.values(manifest).flatMap(image => Object.values(image.sources).flatMap(sources => sources.map(source => `public${decodeURIComponent(source.src)}`))));
await fs.mkdir('public/assets/images/g', { recursive: true });
async function prune(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      await prune(file);
      if (!(await fs.readdir(file)).length) await fs.rmdir(file);
    } else if (/^[a-f0-9]{20}(?:\.w|-)\d+\.(avif|webp)$/.test(entry.name) && !used.has(file)) {
      await fs.unlink(file);
    }
  }
}
await prune('public/assets/images/g');
await fs.mkdir('src/data', { recursive: true });
await fs.writeFile('src/data/images.json', JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + '\n');
console.log(`Prepared ${used.size} static variants for ${Object.keys(manifest).length} documentation images. Originals preserved.`);
