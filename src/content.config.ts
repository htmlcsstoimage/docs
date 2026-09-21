import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = { docs: defineCollection({
  loader: docsLoader(),
  schema: docsSchema({ extend: z.object({
    page_title: z.string().trim().min(1).optional(),
    og_title: z.string().trim().min(1).optional(),
    changelog: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
        const parsed = new Date(`${value}T00:00:00Z`);
        return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
      }, 'Use a valid YYYY-MM-DD date'),
      anchor: z.string().regex(/^[a-z0-9_-]+$/),
    }).optional(),
  }) }),
}), i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }) };
