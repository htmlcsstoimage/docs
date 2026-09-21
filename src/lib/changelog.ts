import { getCollection } from 'astro:content';

export async function getChangelogEntries() {
  return (await getCollection('docs', entry => Boolean(entry.data.changelog)))
    .sort((a, b) => b.data.changelog!.date.localeCompare(a.data.changelog!.date) || a.id.localeCompare(b.id));
}

export function changelogDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}
