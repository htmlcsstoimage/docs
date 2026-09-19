import test from 'node:test';
import assert from 'node:assert/strict';
import { structuredData, serializeStructuredData } from '../src/lib/structured-data.mjs';
import { breadcrumbs } from '../src/lib/breadcrumbs.mjs';
const base = { origin: 'https://docs.htmlcsstoimage.com', route: '/parameters/viewport/', title: 'Viewport', description: 'Control viewport dimensions.' };

test('structured breadcrumbs match visible navigation and all local graph references resolve', () => {
  const data = structuredData(base);
  const graph = data['@graph'];
  const ids = new Set(graph.map(node => node['@id']));
  const crumbs = graph.find(node => node['@type'] === 'BreadcrumbList');
  assert.deepEqual(crumbs.itemListElement.map(node => node.name), breadcrumbs(base.route, base.title).map(node => node.label));
  for (const node of graph) {
    for (const key of ['publisher', 'isPartOf', 'breadcrumb', 'mainEntityOfPage']) {
      if (node[key]) assert.ok(ids.has(node[key]['@id']));
    }
  }
  assert.equal(graph.at(-1)['@type'], 'TechArticle');
  assert.equal('dateModified' in graph.at(-1), false);
  assert.equal('datePublished' in graph.at(-1), false);
});

test('changelog entries carry their real dates; collection pages do not become articles', () => {
  const graph = structuredData({ ...base, route: '/changelog/2026-09-15-update/', datePublished: '2026-09-15' })['@graph'];
  assert.equal(graph.at(-1)['@type'], 'BlogPosting');
  assert.equal(graph.at(-1).datePublished, '2026-09-15');
  assert.equal(graph.find(n => n['@type'] === 'BreadcrumbList').itemListElement[1].name, 'Changelog');
  const home = structuredData({ ...base, route: '/', overview: true })['@graph'];
  assert.equal(home.length, 3);
  assert.equal(home.at(-1)['@type'], 'CollectionPage');
});

test('JSON-LD safely preserves titles containing script delimiters', () => {
  const data = structuredData({ ...base, title: '</script><script>alert(1)</script>' });
  const serialized = serializeStructuredData(data);
  assert.ok(!serialized.includes('</script>'));
  assert.deepEqual(JSON.parse(serialized), data);
});
