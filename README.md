# HTML/CSS to Image docs

The `docs-new` branch rewrites the docs with Astro, Starlight, and Tailwind,
served by the existing Cloudflare `docs` Worker. Production is still the Jekyll
site until cutover.

Pages live in `src/content/docs` as native Markdown/MDX. There is no Jekyll build,
Liquid compatibility layer, or content conversion step. Original URLs, redirects, image paths, and
heading anchors are checked against the inventory in `migration/`.

## Local development

Use Node.js 22.12 or later:

```sh
npm ci
npm run dev
```

To test Worker behavior, including images, redirects, and Markdown negotiation:

```sh
npm run build
npm run preview
```

Use the local URL printed by Wrangler. `npm run dev` serves Astro directly and
does not run the Worker middleware. HCTI credentials are optional locally; signed
Open Graph image metadata is omitted when credentials are absent.

## Validation

```sh
npm test
npm run build
npm run check:migration
node scripts/check-preview.mjs http://localhost:8787
```

Pass the actual Wrangler URL to the last command. `npm run check:migration`
requires all 148 original routes to exist or redirect to a native page. It checks
old anchors, internal links, assets, external-link attributes, and Markdown
exports, and writes `migration-report.json`. CI runs this complete-site gate.

## Fonts

IBM Plex Sans and Mono are configured through Astro's built-in Fontsource provider
in `astro.config.mjs`. Astro downloads and caches fonts during the build, then
serves fingerprinted WOFF2 files from `/_astro/fonts/` with immutable caching.
Visitors make no Google Fonts requests. The font license is in
`public/assets/fonts/OFL.txt`.

`<Font />` supplies font-face declarations and adjusted fallbacks. Only the normal
Latin Sans face is preloaded; other subsets, italics, and Mono load as needed.
Docs and OG cards share the same self-hosted Sans font. New/uncached font builds
need network access to Fontsource; rendering the deployed site does not.

## Page prefetching

`src/scripts/prefetch.ts` warms internal HTML pages on hover, focus, or pointer down
using the same fetch request as Astro's ClientRouter. Navigation waits for an
in-flight prefetch, then uses the browser cache. The Worker's page responses use
`Cache-Control: private, max-age=60` and `Vary: Accept`, so HTML and Markdown stay
separate. Content can remain cached in a browser for up to a minute after deployment.

Astro's native link-prefetch is disabled because its response was not reused by
ClientRouter in our browser tests. The helper skips external links, downloads,
Markdown links, explicit full-navigation links, and slow/data-saving connections.
DevTools' Disable cache option prevents cache reuse when testing this behavior.

## Bundle analysis

Run `npm run analyze` to build the site and generate interactive reports in
`reports/bundle-client.html` and `reports/bundle-prerender.html`, with JSON
versions alongside them. An SSR report is also generated if that environment runs.
The client report shows bundled browser JavaScript; prerender/SSR reports describe
build-time rendering code and are not browser downloads. Toggle gzip/Brotli sizes
and inspect imports to find large dependencies. Compression sizes are estimates,
not measured Cloudflare transfers.

Reports are ignored by Git and stay outside `dist`, so they are never deployed.
Normal builds do not run the analyzer. Font files, runtime-loaded Pagefind
assets, and copied public assets need separate browser network measurements.

## Page titles

`title` is the default title, including the browser/SEO title. Optional
`page_title` overrides the visible H1, breadcrumb, page actions, and Markdown
title. Optional `og_title` overrides Open Graph/Twitter title metadata and the
generated HCTI image heading. Both fall back to `title` when omitted.

```yaml
title: "HTML-to-Image, PDF & Screenshot MCP"
page_title: "Integrating the HTML/CSS to Image MCP Server"
og_title: "HTML-to-Image, PDF & Screenshot MCP"
```

## Changelog entries

Add one Markdown file in `src/content/docs/changelog`, named
`YYYY_MM_DD__entry-title.md`. For example:

```yaml
---
title: "Official Go client"
slug: changelog/2026-09-15-official-go-client
description: "Typed Go requests, responses, and signed URL helpers."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-09-15'
  anchor: official-go-client
sidebar:
  hidden: true
---
```

Write the full release notes below the YAML. `description` supplies the archive
and homepage summary. Dates sort newest first; the homepage shows five entries.
The archive groups updates by year. Keep each `slug` and `changelog.anchor`
stable so individual page URLs and existing archive links continue working.
Every entry receives the same Markdown export and OG metadata as other docs.
Entry pages include breadcrumbs and chronological Previous/Next links; the
oldest and newest entries show only the neighbor that exists.

## Components and Markdown

Components must render useful static content for both readers and agents.
The build exports rendered articles as Markdown. Request an ordinary page URL
with `Accept: text/markdown`, or use its `.md` URL. Images include alt text and
captions; parameter tables become GFM tables. See [the component authoring
contract](scripts/MARKDOWN.md).

`llms.txt` indexes every native page's Markdown URL. `llms-full.txt` contains the
same exported articles in one file; both are refreshed during each build.

Documentation images use build-time Sharp optimization and `starlight-image-zoom`
for enlargement. `npm run build` and `npm run dev` prepare AVIF/WebP variants at
384, 768, 1280, and 1600 pixels (never upscaling small originals). `DocImage`
selects these static files with `<picture>`/`srcset`; no Cloudflare Images binding
or runtime transformation is needed. Originals in `public/assets/images` retain
their URLs for Markdown and full-resolution zoom. Commit generated variants in
`public/assets/images/g` and their manifest in `src/data/images.json` alongside source
image changes. Builds reuse these files by source-content/settings hash, including
on fresh checkouts and CI; only missing or changed variants are encoded. File
modification dates are not used, so Git checkout does not trigger re-encoding.
Variants are grouped by the original path without its extension, for example
`public/assets/images/g/template-editor/te-quote-preset-editor/<hash>.w768.avif`.
Missing variants are recreated; obsolete variants and empty source folders are
removed automatically when preparing images.
Run `npm run prepare:images` after adding or replacing images during development.
Do not introduce Cloudinary tags or legacy style classes.

The build applies `target="_blank" rel="noopener"` to external HTTP(S)
links across complete rendered pages, including components, navigation and footer.
Internal docs links and email links retain their normal behavior. `npm run check`
enforces this policy. Use the built Worker preview to check it; Astro's development
server does not run post-build integrations.

## Preview deployment

GitHub Actions builds `docs-new` and uploads a version of the existing Worker
with the `docs-new` preview alias:

https://docs-new-docs.mike.workers.dev

Required Actions secrets are `CF_API_TOKEN`, `V2_HCTI_API_ID`, and
`V2_HCTI_API_KEY`. The latter two are mapped to `HCTI_API_ID` and `HCTI_API_KEY`
for build-time signing with the HCTI npm package. Signing creates stable URLs;
it does not request image generation during the build.

The workflow uses `wrangler versions upload`, which does not deploy that version
to production. The production job runs only on `main` (never pull requests), after validation.
Static assets (`/_astro/`, `/_og/`, `/assets/`, `/pagefind/`, `/search/`, and `/favicon.ico`) bypass
the Worker. Pages still run through it for Markdown negotiation and redirects.
`public/_headers` preserves security headers and marks workers.dev asset responses noindex.
Preview responses are marked noindex. Merging into `main` triggers a fresh production
build with the production origin, indexable metadata, and signed HCTI URLs, then
deploys the existing `docs` Worker. The production metadata gate runs before deployment.

The build publishes a single `/sitemap.xml`, advertised by `/robots.txt`.
If the sitemap eventually needs multiple chunks, that same URL becomes the index.
`/sitemap-index.xml` redirects to `/sitemap.xml` for compatibility. Individual
changelog entries have priority 0.2; other documentation pages have priority 0.8.

## Help

For account help, email support@htmlcsstoimage.com. For documentation fixes,
open an issue or pull request in this repository.
