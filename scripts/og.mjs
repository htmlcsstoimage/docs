import { createHash } from 'node:crypto';
import { HtmlCssToImageClient, CreateUrlImageRequest } from '@html-css-to-image/client';

export const dimensions = { width: 1200, height: 630 };
export const digest = value => createHash('sha256').update(value).digest('hex');
export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}
export function cardHash(data, designFingerprint) {
  return digest(stableJson({ data, designFingerprint, version: 1 })).slice(0, 24);
}
export function signedImageUrl(pageUrl, apiId, apiKey) {
  const client = new HtmlCssToImageClient(apiId, apiKey);
  return client.generateCreateAndRenderUrl(new CreateUrlImageRequest({
    url: pageUrl, format: 'png', viewport_width: dimensions.width,
    viewport_height: dimensions.height, device_scale: 1, selector: '#og-card',
  }));
}
