export function analyticsContextUrl(value) {
  const url = new URL(value?.trim() || 'https://htmlcsstoimage.com/w/api/phctx');
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error('POSTHOG_CTX_URL must be an HTTPS URL without credentials');
  }
  return url.href;
}

// Only inspect PostHog's public identity cookie, never authentication cookies.
// A different tab can log out or switch accounts while this context is cached.
export function analyticsCookieMatches(context, cookies) {
  if (!context.enabled) return true;
  const name = `ph_${context.persistence_name}=`;
  const matches = cookies.split(';').map(part => part.trim()).filter(part => part.startsWith(name));
  if (matches.length !== 1) return false;
  try {
    const state = JSON.parse(decodeURIComponent(matches[0].slice(name.length)));
    return state.distinct_id === (context.user_id ?? context.client_id) &&
      state.$device_id === context.client_id &&
      (state.$groups?.organization ?? null) === (context.organization_id ?? null);
  } catch { return false; }
}

export async function fetchAnalyticsContext(url, fetcher = fetch) {
  const response = await fetcher(url, {
    credentials: 'include', cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Analytics context returned ${response.status}`);
  const context = await response.json();
  if (!context || ['enabled', 'reset', 'allow_debug'].some(key => typeof context[key] !== 'boolean') ||
      ['project_token', 'api_host', 'persistence_name', 'build'].some(key => typeof context[key] !== 'string') ||
      ['client_id', 'user_id', 'organization_id', 'page_category'].some(key => context[key] != null && typeof context[key] !== 'string') ||
      (context.enabled && (!context.client_id || !context.project_token || !context.api_host || !context.persistence_name))) {
    throw new Error('Invalid analytics context');
  }
  return context;
}
