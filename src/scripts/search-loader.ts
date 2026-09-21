import type { PagefindModal } from '@pagefind/component-ui';

type SearchUI = typeof import('./search-ui');
let ui: SearchUI | undefined;
let uiPromise: Promise<SearchUI> | undefined;
const initialized = new WeakSet<HTMLElement>();
let toggleSearch: (() => void) | undefined;

function loadUI() {
  return uiPromise ??= import('./search-ui').then(module => ui = module).catch(error => {
    uiPromise = undefined;
    throw error;
  });
}

function initializePage() {
  const root = document.querySelector<HTMLElement>('.docs-search');
  if (!root || initialized.has(root)) return;
  initialized.add(root);
  const trigger = root.querySelector<HTMLButtonElement>('[data-search-trigger]')!;
  const pending = root.querySelector<HTMLDialogElement>('[data-search-loading]')!;
  const field = pending.querySelector<HTMLInputElement>('input')!;
  const status = pending.querySelector<HTMLElement>('[data-search-status]')!;
  const retry = pending.querySelector<HTMLButtonElement>('[data-search-retry]')!;
  const template = root.querySelector<HTMLTemplateElement>('[data-search-template]')!;
  const shortcut = root.querySelector<HTMLElement>('[data-search-shortcut]')!;
  shortcut.textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';
  let modal: PagefindModal | undefined;
  let mounting: Promise<PagefindModal | undefined> | undefined;
  let switching = false;
  const mount = () => mounting ??= loadUI().then(module => {
    if (!root.isConnected) return;
    root.append(template.content.cloneNode(true));
    modal = module.initializeSearch(root);
    modal.dialogEl?.addEventListener('close', () => {
      trigger.setAttribute('aria-expanded', 'false');
      if (root.isConnected) trigger.focus();
    });
    trigger.setAttribute('aria-controls', modal.dialogEl!.id);
    return modal;
  }).catch(error => {
    mounting = undefined;
    throw error;
  });
  const warm = () => { mount().catch(() => {}); };
  const open = async () => {
    trigger.setAttribute('aria-expanded', 'true');
    if (modal) { modal.open(); return; }
    status.textContent = 'Loading search…';
    retry.hidden = true;
    if (!pending.open) pending.showModal();
    field.focus();
    try {
      const ready = await mount();
      // Escape, backdrop clicks, and navigation cancel the pending open.
      if (!ready || !root.isConnected || !pending.open) return;
      const query = field.value;
      switching = true;
      pending.close();
      ready.open();
      const input = ready.querySelector<HTMLInputElement>('input');
      if (input && query) {
        input.value = query;
        input.dispatchEvent(new Event('input', { bubbles:true }));
      }
    } catch {
      if (!pending.open) return;
      status.textContent = 'Search could not load. Check your connection and try again.';
      retry.hidden = false;
    }
  };
  toggleSearch = () => {
    if (pending.open) pending.close();
    else if (modal?.isOpen) modal.close();
    else void open();
  };
  trigger.addEventListener('pointerenter', warm, { once:true });
  trigger.addEventListener('focus', warm, { once:true });
  trigger.addEventListener('click', () => void open());
  retry.addEventListener('click', () => void open());
  pending.querySelector('[data-search-cancel]')!.addEventListener('click', () => pending.close());
  pending.addEventListener('click', event => { if (event.target === pending) pending.close(); });
  pending.addEventListener('close', () => {
    if (switching) { switching = false; return; }
    trigger.setAttribute('aria-expanded', 'false');
    // Avoid focus-triggered loading after a cancelled or failed request.
    trigger.removeEventListener('focus', warm);
    if (root.isConnected) trigger.focus();
  });
}

export function initializeLazySearch() {
  initializePage();
  document.addEventListener('astro:page-load', initializePage);
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      toggleSearch?.();
    }
  });
  document.addEventListener('astro:before-swap', () => {
    toggleSearch = undefined;
    document.querySelector<HTMLDialogElement>('[data-search-loading][open]')?.close();
    ui?.disposeSearch();
  });
}
