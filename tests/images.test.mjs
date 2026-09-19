import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { imageVariants } from '../scripts/image-variants.mjs';

test('static variants have correct dimensions, formats, alpha, and reuse unchanged output', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'docs-image-test-'));
  try {
    const input = await sharp({ create: { width: 500, height: 250, channels: 4, background: '#007a4e80' } }).png().toBuffer();
    const result = await imageVariants(input, dir, '/assets/images/nested/example%20image.png');
    assert.equal(result.width, 500);
    assert.equal(result.height, 250);
    for (const [format, sources] of Object.entries(result.sources)) {
      assert.deepEqual(sources.map(source => source.width), [384, 500]);
      for (const source of sources) {
        assert.match(source.src, /^\/assets\/images\/g\/nested\/example%20image\/[a-f0-9]{20}\.w\d+\.(avif|webp)$/);
        const meta = await sharp(path.join(dir, decodeURIComponent(source.src.slice('/assets/images/g/'.length)))).metadata();
        assert.equal(meta.width, source.width);
        assert.equal(meta.height, source.width / 2);
        assert.equal(meta.format, format === 'avif' ? 'heif' : format);
        assert.equal(meta.hasAlpha, true);
      }
    }
    const file = path.join(dir, decodeURIComponent(result.sources.webp[0].src.slice('/assets/images/g/'.length)));
    const before = (await fs.stat(file)).mtimeMs;
    assert.deepEqual(await imageVariants(input, dir, '/assets/images/nested/example%20image.png'), result);
    assert.equal((await fs.stat(file)).mtimeMs, before);
    await fs.unlink(file);
    assert.deepEqual(await imageVariants(input, dir, '/assets/images/nested/example%20image.png'), result);
    assert.equal((await sharp(file).metadata()).width, 384);
    const changed = await sharp(input).negate().png().toBuffer();
    assert.notEqual((await imageVariants(changed, dir, '/assets/images/nested/example%20image.png')).sources.webp[0].src, result.sources.webp[0].src);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test('small images produce one variant at their natural width', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'docs-image-small-'));
  try {
    const input = await sharp({ create: { width: 32, height: 16, channels: 3, background: '#ffffff' } }).png().toBuffer();
    const result = await imageVariants(input, dir);
    assert.deepEqual(result.sources.webp.map(source => source.width), [32]);
    assert.deepEqual(result.sources.avif.map(source => source.width), [32]);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
