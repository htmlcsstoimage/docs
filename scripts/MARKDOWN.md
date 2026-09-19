# Agent-friendly component output

The native Astro pages are the source of truth. After Astro renders them,
`markdown-exports.mjs` extracts the article and serializes it as Markdown.
This exports native components; it does not process or migrate Jekyll sources.

Every documentation component must have a readable static representation:

- Use semantic headings, paragraphs, lists and links for ordinary content.
- `DocImage` becomes `![alt text](original-image-url)`, followed by its caption.
  Responsive variants, styling and the full-size link wrapper are omitted.
- `ParameterTable` uses a semantic table with a header row. It becomes a GFM
  pipe table, preserving parameter links, types, descriptions and inline code.
  Pipes in cell content are escaped to avoid creating extra columns.
- `Endpoint` exports its method and URL together as inline code.
- Starlight `LinkCard` exports a linked title followed by its description.
- Code examples retain their fences and newlines. Navigation, copy buttons,
  heading-link icons and scripts are excluded.
- For an interactive component, include useful static instructions/content;
  do not make browser interaction the only way to access its meaning.

Components needing special serialization should use an explicit `data-*`
marker and a rule in `renderMarkdown`, with a test in `tests/markdown.test.mjs`.
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
representations and HEAD requests for every native page. The complete migration
gate is `npm run check:migration`; all original routes must exist or redirect.
The same exports also produce `llms.txt` and `llms-full.txt` during each build.
