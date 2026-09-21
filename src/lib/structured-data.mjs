import { breadcrumbs } from './breadcrumbs.mjs';

export function structuredData({ origin, route, title, description, image, datePublished, overview = false }) {
  const url = new URL(route, origin).href;
  const home = new URL('/', origin).href;
  const publisher = {
    '@type': 'Organization', '@id': 'https://htmlcsstoimage.com/#organization',
    name: 'HTML/CSS to Image API', alternateName: 'HCTI', url: 'https://htmlcsstoimage.com/',
    description: 'Capture website screenshots, render HTML/CSS, or create templated graphics. Use MCP with AI, no-code automation, or the REST API. No browsers needed.',
    logo: { '@type': 'ImageObject', url: 'https://htmlcsstoimage.com/images/logo_with_black_bg.png', width: 1024, height: 1024 },
    sameAs: ['https://twitter.com/htmlcsstoimage', 'https://github.com/htmlcsstoimage', 'https://www.linkedin.com/company/html-css-to-image/'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@htmlcsstoimage.com' },
  };
  const website = {
    '@type': 'WebSite', '@id': `${home}#website`, url: home,
    name: 'HTML/CSS to Image API Docs', inLanguage: 'en', publisher: { '@id': publisher['@id'] },
  };
  const crumbs = breadcrumbs(route, title, Boolean(datePublished));
  const breadcrumb = crumbs.length ? {
    '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem', position: index + 1, name: crumb.label, item: new URL(crumb.link, origin).href,
    })),
  } : undefined;
  const page = {
    '@type': overview ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url,
    name: title, description, inLanguage: 'en', isPartOf: { '@id': website['@id'] },
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } } : {}),
  };
  const article = overview ? undefined : {
    '@type': datePublished ? 'BlogPosting' : 'TechArticle', '@id': `${url}#article`, url,
    headline: title, description, inLanguage: 'en', mainEntityOfPage: { '@id': page['@id'] },
    publisher: { '@id': publisher['@id'] },
    ...(image ? { image } : {}), ...(datePublished ? { datePublished } : {}),
  };
  return { '@context': 'https://schema.org', '@graph': [publisher, website, page, breadcrumb, article].filter(Boolean) };
}

// JSON-LD is embedded in a script element, so content must not close that element.
export const serializeStructuredData = data => JSON.stringify(data).replace(/</g, '\\u003c');
