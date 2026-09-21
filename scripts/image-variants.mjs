import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const widths = [384, 768, 1280, 1600];
const formats = { avif: { quality: 60, effort: 2 }, webp: { quality: 85 } };

export async function imageVariants(input, outputDir, source = '/assets/images/image.png') {
  const metadata = await sharp(input).metadata();
  // Preserve animation and unsupported originals unchanged.
  if ((metadata.pages || 1) > 1 || !metadata.width || !metadata.height) return null;
  const { width, height } = metadata.autoOrient || metadata;
  const hash = createHash('sha256').update(input).update(JSON.stringify({ widths, formats, sharp: sharp.versions.sharp, version: 1 })).digest('hex').slice(0, 20);
  const folder = decodeURIComponent(source).replace(/^\/assets\/images\//, '').replace(/\.[^.]+$/, '');
  if (folder.startsWith('/') || folder.split('/').some(part => !part || part === '..')) throw new Error(`Invalid image path: ${source}`);
  const urlFolder = folder.split('/').map(encodeURIComponent).join('/');
  const sizes = [...new Set([...widths.filter(w => w < width), Math.min(width, 1600)])];
  const sources = {};
  await fs.mkdir(`${outputDir}/${folder}`, { recursive: true });
  for (const [format, options] of Object.entries(formats)) {
    sources[format] = [];
    for (const size of sizes) {
      const filename = `${hash}.w${size}.${format}`;
      const target = `${outputDir}/${folder}/${filename}`;
      try { await fs.access(target); }
      catch { await sharp(input).autoOrient().resize({ width: size, withoutEnlargement: true }).toFormat(format, options).toFile(target); }
      sources[format].push({ src: `/assets/images/g/${urlFolder}/${filename}`, width: size });
    }
  }
  return { width, height, sources };
}
