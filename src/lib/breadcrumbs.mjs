import navigation from '../navigation.mjs';

export function breadcrumbs(route, title, isChangelog = false) {
  if (route === '/') return [];
  const candidates = [];
  function findPaths(items, parents = []) {
    for (const item of items) {
      if (item.link === route) candidates.push(parents);
      if (item.items) {
        const overview = item.items.find(child => child.label === 'Overview' && child.link);
        findPaths(item.items, overview?.link ? [...parents, { label: item.label, link: overview.link }] : parents);
      }
    }
  }
  findPaths(navigation);
  const score = path => path.filter(crumb => route.startsWith(crumb.link)).length;
  const parents = isChangelog ? [{ label: 'Changelog', link: '/changelog/' }]
    : (candidates.sort((a, b) => score(b) - score(a))[0] || []);
  return [{ label: 'Docs', link: '/' }, ...parents.filter(crumb => crumb.link !== route && crumb.link !== '/'), { label: title, link: route }];
}
