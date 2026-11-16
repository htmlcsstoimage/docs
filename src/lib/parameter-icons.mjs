import data from '../data/parameters.json' with { type: 'json' };
import { supportsImages, supportsRecordings } from './parameter-markdown.mjs';

// Shared by the parameter table and parameter page titles. Decorative: callers supply the accessible label.
export const imageIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>';
// Same 18×18 frame as the image icon so both read at the same visual size.
export const recordingIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m10 8.5 5 3.5-5 3.5Z"/></svg>';

// A parameter page documents every parameter whose link points at it, e.g. /parameters/viewport/ covers viewport_width and viewport_height.
// URL query parameters aren't creation parameters, so they aren't in parameters.json.
const queryParameterPages = { '/parameters/dl/': { images: true, recordings: true } };

export function parameterPageSupport(route) {
  const parameters = data.parameters.filter(parameter => parameter.link.split('#')[0] === route);
  return parameters.length ? { images: parameters.some(supportsImages), recordings: parameters.some(supportsRecordings) } : queryParameterPages[route] ?? null;
}
