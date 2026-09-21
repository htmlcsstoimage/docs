import posthog from 'posthog-js/dist/module.slim.no-external';
import { createProductAnalytics } from '../lib/product-analytics.mjs';

export const analytics = createProductAnalytics(posthog);
