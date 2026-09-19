// Keep Pagefind's relevance order within each group, with release history last.
// Filtering in the index avoids fetching every result's data just to sort it.
export * from '../pagefind/pagefind.js';
import { createInstance as createIndex } from '../pagefind/pagefind.js';

export function createInstance(instanceOptions) {
  const index = createIndex(instanceOptions);
  return { ...index, search: (term, options = {}) => searchGroups(index, term, options) };
}

async function searchGroups(index, term, options) {
  const [docs, changelog] = await Promise.all(
    ['docs', 'changelog'].map(kind => index.search(term, {
      ...options,
      filters: { ...options.filters, kind },
    })),
  );
  return { ...docs, results: [...docs.results, ...changelog.results] };
}
