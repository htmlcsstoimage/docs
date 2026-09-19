import { getInstanceManager, type PagefindModal } from '@pagefind/component-ui';

export function disposeSearch() {
  getInstanceManager().removeInstance('default');
}

export function initializeSearch(root: HTMLElement) {
    const instance = getInstanceManager().getInstance('default');
    const modal = root.querySelector<PagefindModal>('pagefind-modal')!;
    const start = root.querySelector<HTMLElement>('.search-start')!;
    const noResults = root.querySelector<HTMLElement>('.search-no-results')!;
    const input = () => root.querySelector<HTMLInputElement>('pagefind-input input');
    const updateEmpty = () => {
      start.hidden = Boolean(input()?.value.trim());
      noResults.hidden = true;
    };
    root.addEventListener('input', updateEmpty);
    instance.on('search', updateEmpty, root);
    instance.on('results', (result) => {
      updateEmpty();
      noResults.hidden = !instance.searchTerm.trim() || Boolean((result as { results: unknown[] }).results.length);
    }, root);
    // Quick links participate in arrow-key navigation before a query is entered.
    root.addEventListener('keydown', (event) => {
      if (start.hidden || !['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      const links = [...start.querySelectorAll<HTMLAnchorElement>('a')];
      const current = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (document.activeElement !== input() && current === -1) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const next = current + (event.key === 'ArrowDown' ? 1 : -1);
      if (next < 0) input()?.focus();
      else links[Math.min(next, links.length - 1)]?.focus();
    }, true);
    // Native links retain normal navigation and modifier-key behavior.
    root.addEventListener('click', (event) => {
      if ((event.target as Element).closest('pagefind-modal a')) modal.close();
    });
  return modal;
}
