import assert from 'node:assert/strict';
import test from 'node:test';
import { analyticsContextUrl, fetchAnalyticsContext, analyticsCookieMatches } from '../src/lib/analytics-context.mjs';
import { createProductAnalytics, scrubEvent } from '../src/lib/product-analytics.mjs';

const context = {
  enabled: true, reset: false, allow_debug: false,
  project_token: 'test-project', api_host: 'https://analytics.example.com',
  persistence_name: 'test-state', build: 'test-build',
  client_id: 'client:one', user_id: null, organization_id: null, page_category: 'docs',
};

function setup() {
  const calls = [];
  let config, distinct, props = {}, groups = {};
  const sdk = {
    init(token, options) { config = options; distinct = options.bootstrap.distinctID; calls.push(['init', token]); },
    get_property(key) { return props[key]; }, get_distinct_id() { return distinct; },
    reset() { distinct = config.get_device_id(); props = {}; groups = {}; calls.push(['reset']); },
    register(values) { Object.assign(props, values); },
    identify(id) { distinct = id; props.$user_id = id; calls.push(['identify', id]); },
    getGroups() { return groups; }, group(key, id) { groups[key] = id; }, resetGroups() { groups = {}; },
    capture(event, properties) { calls.push(['capture', event, config.before_send({ properties })]); },
  };
  return { analytics: createProductAnalytics(sdk), sdk, calls, config: () => config };
}

test('analytics context URL defaults to production and accepts the staging override', () => {
  for (const empty of [undefined, null, '', ' ']) assert.equal(analyticsContextUrl(empty), 'https://htmlcsstoimage.com/w/api/phctx');
  assert.equal(analyticsContextUrl('https://analytics.example.com/w/api/phctx'), 'https://analytics.example.com/w/api/phctx');
  assert.throws(() => analyticsContextUrl('http://example.com'));
  assert.throws(() => analyticsContextUrl('https://user:pass@example.com'));
});

test('context fetch includes cookies, bypasses caching, and rejects errors or incomplete identities', async () => {
  assert.deepEqual(await fetchAnalyticsContext('https://example.com/context', async (url, options) => {
    assert.equal(options.credentials, 'include');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers.Accept, 'application/json');
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json(context);
  }), context);
  await assert.rejects(fetchAnalyticsContext('https://example.com', async () => new Response('', { status: 503 })));
  await assert.rejects(fetchAnalyticsContext('https://example.com', async () => Response.json({ ...context, client_id: null })));
});

test('anonymous login keeps the device identity; logout and account switches reset identity and groups', () => {
  const { analytics, sdk, calls } = setup();
  analytics.sync(context);
  analytics.sync({ ...context, user_id: 'user:one', organization_id: 'org:one' });
  assert.equal(sdk.get_distinct_id(), 'user:one');
  assert.equal(calls.filter(c => c[0] === 'reset').length, 0);
  assert.equal(sdk.getGroups().organization, 'org:one');
  analytics.sync({ ...context, client_id: 'client:two', user_id: 'user:two', organization_id: 'org:two' });
  assert.equal(calls.filter(c => c[0] === 'reset').length, 1);
  assert.equal(sdk.get_distinct_id(), 'user:two');
  analytics.sync({ ...context, client_id: 'client:three', reset: true });
  assert.equal(sdk.get_distinct_id(), 'client:three');
  assert.deepEqual(sdk.getGroups(), {});
  analytics.sync({ ...context, client_id: 'client:three', reset: true });
  assert.equal(calls.filter(c => c[0] === 'reset').length, 2);
});

test('disabled contexts, refreshes, and project changes suppress captures; SDK settings match the app', () => {
  const { analytics, calls, config } = setup();
  analytics.sync({ ...context, enabled: false });
  assert.equal(calls.length, 0);
  analytics.sync(context);
  assert.equal(config().cross_subdomain_cookie, true);
  assert.equal(config().autocapture, false);
  assert.equal(config().capture_pageview, false);
  assert.equal(config().disable_session_recording, true);
  analytics.pageview('https://docs.example.com/guide/?secret=private#fragment');
  assert.deepEqual(calls.at(-1)[2].properties, { $current_url: 'https://docs.example.com/guide/', $pathname: '/guide/', page_category: 'docs' });
  const count = calls.length;
  analytics.disable();
  assert.equal(config().before_send({ properties: {} }), null);
  analytics.pageview('https://docs.example.com/');
  analytics.sync({ ...context, project_token: 'other-project' });
  analytics.pageview('https://docs.example.com/');
  assert.equal(calls.length, count);
});

test('URL queries and fragments are scrubbed from events and person properties', () => {
  const event = { properties: { $referrer: 'https://example.com/?secret=1', $set_once: { $initial_current_url: 'https://example.com/#secret' } }, $set: { $current_url: 'https://example.com/?secret=1' } };
  scrubEvent(event);
  assert.equal(event.properties.$referrer, 'https://example.com/');
  assert.equal(event.properties.$set_once.$initial_current_url, 'https://example.com/');
  assert.equal(event.$set.$current_url, 'https://example.com/');
});

test('shared cookie deletion, account/device changes, and org changes invalidate cached identity', () => {
  const loggedIn = { ...context, user_id: 'user:one', organization_id: 'org:one' };
  const state = { distinct_id: 'user:one', $device_id: 'client:one', $groups: { organization: 'org:one' } };
  const cookie = value => `ph_${context.persistence_name}=${encodeURIComponent(JSON.stringify(value))}`;
  assert.equal(analyticsCookieMatches(loggedIn, cookie(state)), true);
  assert.equal(analyticsCookieMatches(loggedIn, cookie({ ...state, $sesid: ['new-session'] })), true);
  for (const value of ['', 'ph_test-state=invalid', cookie({ ...state, distinct_id: 'user:two' }),
    cookie({ ...state, $device_id: 'client:two' }), cookie({ ...state, $groups: {} }),
    `${cookie(state)}; ${cookie(state)}`]) {
    assert.equal(analyticsCookieMatches(loggedIn, value), false);
  }
});
