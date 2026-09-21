# Agent-friendly component output

The native Astro pages are the source of truth. After Astro renders them,
`markdown-exports.mjs` extracts the article and serializes it as Markdown.
Components provide their Markdown representation during the build.

Every documentation component must have a readable static representation:

- Use semantic headings, paragraphs, lists and links for ordinary content.
- `DocImage` becomes `![alt text](original-image-url)`, followed by its caption.
  Responsive variants, styling and the full-size link wrapper are omitted.
- `ParameterTable` generates its own GFM Markdown from the same filtered data
  used for its HTML table, preserving parameter links, types, descriptions and inline code.
  Pipes in cell content are escaped to avoid creating extra columns.
- `Endpoint` exports its method and URL together as inline code.
- Starlight `LinkCard` exports a linked title followed by its description.
- Code examples retain their fences and newlines. Navigation, copy buttons,
  heading-link icons and scripts are excluded.
- For an interactive component, include useful static instructions/content;
  do not make browser interaction the only way to access its meaning.

Component Markdown serializers run only in the build exporter. `ParameterTable`
uses `src/lib/parameter-markdown.mjs` to select and serialize the same data as
its HTML view. During production builds, the table carries a small
`data-build-parameter-table` props marker. The exporter uses it to generate
Markdown, then strips it from the final HTML. Development HTML omits it too.
Never embed Markdown payloads in HTML attributes or ship build markers to clients.

Test component exports in `tests/markdown.test.mjs`.
Keep the content in the component rather than maintaining a second Markdown copy.
Inspect the built `.md` file when migrating each page.

The Worker serves the same export for either request:

```sh
curl -H 'Accept: text/markdown' http://localhost:4321/parameters/
curl http://localhost:4321/parameters.md
```

The root page's direct export is `/index.md`. Negotiation requires an explicit
`text/markdown` preference and respects quality weights; wildcard-only requests
and ordinary browser requests get HTML. An explicit Markdown preference wins
equal quality weights. Page responses advertise `Vary: Accept` and a Markdown
alternate link. Negotiated Markdown uses `Content-Type: text/markdown` and
`Content-Location` pointing to its direct export. Existing redirects run first.
Static Assets receives a distinct `.md` path, keeping its HTML and Markdown
cache entries separate. No HTML-to-Markdown work happens at request time.

Run `npm test`, `npm run build`, then `node scripts/check-preview.mjs
http://localhost:4321` against `npm run preview`. The preview check covers both
representations and HEAD requests for every native page. Run `npm run check` to validate built pages, links, assets, and published URL compatibility.
The same exports also produce `llms.txt` and `llms-full.txt` during each build.
