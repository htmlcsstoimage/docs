// Keep identity and capture settings aligned with AWSApi's product_analytics.ts.
export function createProductAnalytics(posthog) {
  let enabled = false;
  let project;
  let clientId;
  let lastReset;

  function sync(context) {
    enabled = false;
    if (!context?.enabled || !context.client_id) return;
    const nextProject = JSON.stringify([context.project_token, context.api_host, context.persistence_name]);
    if (project && project !== nextProject) return;
    clientId = context.client_id;
    enabled = true;
    if (!project) {
      posthog.init(context.project_token, {
        api_host: context.api_host,
        defaults: '2026-05-30',
        ...(context.allow_debug ? {} : { debug: false }),
        bootstrap: { distinctID: context.user_id ?? clientId, isIdentifiedID: !!context.user_id },
        get_device_id: () => clientId,
        persistence: 'cookie', persistence_name: context.persistence_name,
        cross_subdomain_cookie: true, person_profiles: 'identified_only',
        // Finish our own writes before another tab can change the shared identity.
        persistence_save_debounce_ms: 0,
        autocapture: false, rageclick: false, capture_pageview: false, capture_pageleave: false,
        capture_heatmaps: false, capture_dead_clicks: false, capture_exceptions: false,
        disable_session_recording: true, disable_surveys: true, disable_product_tours: true,
        disable_conversations: true, disable_web_experiments: true,
        disable_external_dependency_loading: true, advanced_disable_flags: true,
        advanced_disable_toolbar_metrics: true,
        before_send: event => enabled ? scrubEvent(event) : null,
      });
      project = nextProject;
    }
    const user = posthog.get_property('$user_id');
    const distinct = posthog.get_distinct_id();
    if (context.reset && lastReset !== clientId) {
      posthog.reset(true);
      lastReset = clientId;
    } else if (context.user_id
      ? (user && user !== context.user_id) || (distinct.startsWith('user:') && distinct !== context.user_id)
      : user || distinct !== clientId) {
      posthog.reset(true);
    }
    if (posthog.get_property('build') !== context.build) posthog.register({ build: context.build });
    if (context.user_id && (posthog.get_distinct_id() !== context.user_id || posthog.get_property('$user_id') !== context.user_id)) {
      posthog.identify(context.user_id);
    }
    const org = posthog.getGroups().organization;
    if (context.organization_id && org !== context.organization_id) posthog.group('organization', context.organization_id);
    else if (!context.organization_id && org) posthog.resetGroups();
  }

  return {
    sync,
    disable() { enabled = false; },
    pageview(url) {
      if (!enabled || !project) return;
      const page = new URL(url);
      posthog.capture('$pageview', {
        $current_url: `${page.origin}${page.pathname}`, $pathname: page.pathname, page_category: 'docs',
      });
    },
  };
}

export function scrubEvent(event) {
  for (const properties of [event.properties, event.$set, event.$set_once, event.properties?.$set, event.properties?.$set_once]) {
    if (!properties || typeof properties !== 'object') continue;
    for (const key of ['$current_url', '$referrer', '$initial_current_url', '$initial_referrer']) {
      if (typeof properties[key] === 'string') properties[key] = properties[key].split(/[?#]/, 1)[0];
    }
  }
  return event;
}
