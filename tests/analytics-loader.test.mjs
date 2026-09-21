import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { stripTypeScriptTypes } from 'node:module';

const source = stripTypeScriptTypes(await fs.readFile(new URL('../src/scripts/analytics-loader.ts', import.meta.url), 'utf8'))
  .replace(/^import .*;\n/, '')
  .replace("import('./product-analytics')", 'loadAnalytics()');
const tick = () => new Promise(resolve => setImmediate(resolve));

function setup() {
  const events = new Map(), requests = [], pages = [];
  let idle, imports = 0, enabled = false, now = 0, cookieMatches = true;
  const location = { origin: 'https://docs.example.com', pathname: '/' };
  const document = {
    readyState: 'complete', visibilityState: 'visible',
    querySelector: () => ({ content: 'https://analytics.example.com/w/api/phctx' }),
    addEventListener(name, callback) { events.set(name, callback); },
  };
  const analytics = {
    disable() { enabled = false; }, sync(context) { enabled = context.enabled; },
    pageview(url) { if (enabled) pages.push(url); },
  };
  vm.runInNewContext(source, {
    document, location, console: { warn() {} }, Date: { now: () => now },
    window: { requestIdleCallback(callback) { idle = callback; }, addEventListener(name, callback) { events.set(name, callback); } },
    fetchAnalyticsContext: () => new Promise((resolve, reject) => requests.push({ resolve, reject })),
    analyticsCookieMatches: () => cookieMatches,
    loadAnalytics: async () => { imports++; return { analytics }; },
  });
  return { document, location, requests, pages, start: () => idle(), fire: (name, event = {}) => events.get(name)?.(event), imports: () => imports, advance: ms => { now += ms; }, changeCookie: () => { cookieMatches = false; } };
}

test('shared-cookie changes force refresh even before the context TTL expires', async () => {
  const app = setup();
  app.start();
  app.requests[0].resolve({ enabled: true });
  await tick();
  app.changeCookie();
  app.location.pathname = '/after-logout/';
  app.fire('astro:page-load');
  assert.equal(app.requests.length, 2);
  assert.deepEqual(app.pages, ['https://docs.example.com/']);
  app.requests[1].resolve({ enabled: false });
  await tick();
  assert.equal(app.pages.length, 1, 'No pageview with the old identity');
});

test('loader waits for idle and valid context, captures each route once, and refreshes without duplicate views', async () => {
  const app = setup();
  app.fire('astro:page-load');
  assert.equal(app.requests.length, 0);
  assert.equal(app.imports(), 0);
  app.start();
  assert.equal(app.requests.length, 1);
  assert.equal(app.imports(), 0);
  app.requests[0].resolve({ enabled: true });
  await tick();
  assert.deepEqual(app.pages, ['https://docs.example.com/']);
  app.fire('astro:before-preparation');
  app.location.pathname = '/guide/';
  app.fire('astro:page-load');
  await tick();
  assert.equal(app.requests.length, 1, 'Navigation reuses cached context');
  app.fire('visibilitychange');
  assert.equal(app.requests.length, 2, 'Tab return forces a refresh');
  app.requests[1].resolve({ enabled: true });
  await tick();
  assert.deepEqual(app.pages, ['https://docs.example.com/', 'https://docs.example.com/guide/']);
});

test('context expires after 60 seconds and a failed forced refresh cannot reuse old identity', async () => {
  const app = setup();
  app.start();
  app.requests[0].resolve({ enabled: true });
  await tick();
  app.advance(59_999);
  app.location.pathname = '/cached/';
  app.fire('astro:page-load');
  await tick();
  assert.equal(app.requests.length, 1);
  app.advance(1);
  app.location.pathname = '/expired/';
  app.fire('astro:page-load');
  assert.equal(app.requests.length, 2);
  app.requests[1].resolve({ enabled: true });
  await tick();
  app.fire('pageshow', { persisted: true });
  assert.equal(app.requests.length, 3);
  app.requests[2].reject(new Error('offline'));
  await tick();
  app.location.pathname = '/retry/';
  app.fire('astro:page-load');
  assert.equal(app.requests.length, 4, 'Failed refresh cleared previously valid context');
  app.requests[3].resolve({ enabled: false });
  await tick();
  assert.deepEqual(app.pages, ['https://docs.example.com/', 'https://docs.example.com/cached/', 'https://docs.example.com/expired/']);
  app.location.pathname = '/disabled/';
  app.fire('astro:page-load');
  await tick();
  assert.equal(app.requests.length, 4, 'Disabled contexts are also cached');
  assert.equal(app.pages.length, 3);
});

test('rapid navigation shares the context request and never captures a superseded page', async () => {
  const app = setup();
  app.start();
  app.fire('astro:before-preparation');
  app.location.pathname = '/latest/';
  app.fire('astro:page-load');
  assert.equal(app.requests.length, 1);
  app.requests[0].resolve({ enabled: true });
  await tick();
  assert.deepEqual(app.pages, ['https://docs.example.com/latest/']);
});

test('disabled and failed context responses never load the analytics SDK', async () => {
  for (const fail of [false, true]) {
    const app = setup();
    app.start();
    if (fail) app.requests[0].reject(new Error('network failure'));
    else app.requests[0].resolve({ enabled: false });
    await tick();
    assert.equal(app.imports(), 0);
    assert.equal(app.pages.length, 0);
  }
});
