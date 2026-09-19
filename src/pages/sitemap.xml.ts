import pages from '../generated/pages.json';
export function GET() {
  const origin = process.env.DOCS_ORIGIN || 'http://localhost:4321';
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${new URL(page.route, origin).href}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
