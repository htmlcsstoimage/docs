import type { TransitionBeforePreparationEvent } from 'astro:transitions/client';

// Match ClientRouter's ordinary fetch, including its default Accept header.
// The Worker allows 60 seconds of private browser caching with Vary: Accept.
const requests = new Map<string, { started: number; done: Promise<void> }>();
const lifetime = 60_000;
let timer: ReturnType<typeof setTimeout> | undefined;

function candidate(target: EventTarget | null): string | undefined {
  const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>('a[href]') : null;
  if (!anchor || anchor.hasAttribute('download') || anchor.hasAttribute('data-astro-reload')
    || anchor.dataset.astroPrefetch === 'false' || (anchor.target && anchor.target !== '_self')) return;
  const url = new URL(anchor.href);
  // Docs use trailing-slash routes. Don't prefetch files, external links, or OG render pages.
  if (url.origin !== location.origin || !url.pathname.endsWith('/') || url.pathname.startsWith('/_og/')
    || (url.pathname === location.pathname && url.search === location.search)) return;
  url.hash = '';
  return url.href;
}

function prefetch(href: string) {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!navigator.onLine || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) return;
  const now = Date.now();
  for (const [key, entry] of requests) if (now - entry.started >= lifetime) requests.delete(key);
  if (requests.has(href)) return;
  if (requests.size >= 40) requests.delete(requests.keys().next().value!);
  const entry = {
    started: now,
    done: fetch(href, { priority: 'low', signal: AbortSignal.timeout(5_000) })
      .then(async (response) => {
        await response.arrayBuffer(); // Finish caching before navigation reuses it.
        if (!response.ok) requests.delete(href);
      })
      .catch(() => { requests.delete(href); }),
  };
  requests.set(href, entry);
}

function cancelHover() { clearTimeout(timer); }
function schedule(event: Event) {
  cancelHover();
  const href = candidate(event.target);
  if (href) timer = setTimeout(() => prefetch(href), 80);
}
document.addEventListener('pointerover', schedule, { passive: true });
document.addEventListener('focusin', schedule);
document.addEventListener('pointerout', cancelHover, { passive: true });
document.addEventListener('focusout', cancelHover);
document.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;
  cancelHover();
  const href = candidate(event.target);
  if (href) prefetch(href);
}, { passive: true });
document.addEventListener('astro:before-preparation', (event) => {
  cancelHover();
  const navigation = event as TransitionBeforePreparationEvent;
  if (navigation.formData) return;
  const url = new URL(navigation.to);
  url.hash = '';
  const pending = requests.get(url.href);
  if (!pending || Date.now() - pending.started >= lifetime) return;
  const loader = navigation.loader;
  navigation.loader = async () => {
    await pending.done;
    if (!navigation.signal.aborted) await loader();
  };
});
