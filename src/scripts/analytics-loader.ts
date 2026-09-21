import { fetchAnalyticsContext, analyticsCookieMatches } from '../lib/analytics-context.mjs';

let analytics: typeof import('./product-analytics').analytics | undefined;
let started = false;
let revision = 0;
let request: ReturnType<typeof fetchAnalyticsContext> | undefined;
let cached: { url: string; context: Awaited<ReturnType<typeof fetchAnalyticsContext>>; expires: number } | undefined;
const contextTtl = 60_000;
let pendingPage: string | undefined;
let lastPage: string | undefined;
let warned = false;

async function refresh(force = false) {
  const current = ++revision;
  analytics?.disable();
  const url = document.querySelector<HTMLMetaElement>('meta[name="posthog-context-url"]')?.content;
  if (!url) return;
  try {
    if (force || cached?.url !== url || Date.now() >= cached.expires ||
        !analyticsCookieMatches(cached.context, document.cookie)) cached = undefined;
    // Share concurrent navigation/focus requests, including first-visit cookie creation.
    // Discard stale identity before fetching so failures cannot reuse it.
    if (!cached) {
      request ??= fetchAnalyticsContext(url).then(context => {
        cached = { url, context, expires: Date.now() + contextTtl };
        return context;
      }).finally(() => { request = undefined; });
    }
    const context = cached ? cached.context : await request!;
    if (current !== revision) return;
    if (!context.enabled) { pendingPage = undefined; return; }
    const module = await import('./product-analytics');
    if (current !== revision) return;
    analytics = module.analytics;
    analytics.sync(context);
    if (pendingPage && pendingPage === location.origin + location.pathname) {
      analytics.pageview(pendingPage);
      pendingPage = undefined;
    }
  } catch {
    if (current !== revision) return;
    analytics?.disable();
    pendingPage = undefined;
    if (!warned) { console.warn('Docs analytics could not initialize; browsing is unaffected.'); warned = true; }
  }
}

function pageLoaded() {
  const page = location.origin + location.pathname;
  if (page !== lastPage) {
    lastPage = page;
    pendingPage = page;
  }
  if (started) void refresh();
}

document.addEventListener('astro:page-load', pageLoaded);
document.addEventListener('astro:before-preparation', () => {
  ++revision;
  analytics?.disable();
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { ++revision; analytics?.disable(); }
  else if (started) void refresh(true);
});
window.addEventListener('pageshow', event => { if (event.persisted && started) void refresh(true); });
pageLoaded();
const start = () => {
  started = true;
  if (document.visibilityState === 'visible') void refresh();
};
const schedule = () => {
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 2000 });
  else setTimeout(start, 0);
};
if (document.readyState === 'complete') schedule();
else window.addEventListener('load', schedule, { once: true });
