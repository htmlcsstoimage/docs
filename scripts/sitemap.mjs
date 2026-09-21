import fs from 'node:fs/promises';
import { load } from 'cheerio';
import sitemap from '@astrojs/sitemap';

// Keep Astro's route discovery and serialization, but publish one sitemap
// directly until the integration actually needs to split it into chunks.
export default function docsSitemap(options) {
  const integration = sitemap(options);
  const generate = integration.hooks['astro:build:done'];
  integration.hooks['astro:build:done'] = async (context) => {
    await generate(context);
    const indexPath = new URL('sitemap-index.xml', context.dir);
    const index = load(await fs.readFile(indexPath, 'utf8'), { xml: true });
    const locations = index('sitemap > loc').toArray();
    const output = new URL('sitemap.xml', context.dir);
    if (locations.length === 1 && new URL(index(locations[0]).text()).pathname === '/sitemap-0.xml') {
      await fs.rename(new URL('sitemap-0.xml', context.dir), output);
      await fs.unlink(indexPath);
    } else {
      // /sitemap.xml can become an index later without changing robots.txt.
      await fs.rename(indexPath, output);
    }
  };
  return integration;
}
