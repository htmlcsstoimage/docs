---
layout: page
title: Quick Start
permalink: /template-editor/quick-start/
parent: Template Editor
nav_order: 1
description: >-
  Build, preview, and render your first reusable image template.
---
# Template Editor Quick Start
{: .no_toc }
{: .fs-9 }

Build a saved image template, test it with variables, and render it through the API.
{: .fs-4 .fw-300 }

<hr>

Start in the dashboard by creating a new template or opening an existing one. The editor opens with the canvas in the middle, the block sidebar on the left, and the editing sidebar on the right.

If you want a starting point, browse the [template presets](https://htmlcsstoimage.com/templates) or try the [template playground](/templates/playground) before building your own template.

<figure class="te-doc-figure te-doc-figure--wide">
  <img src="/assets/images/template-editor/te-empty-editor.png" alt="Blank template editor with the block sidebar, empty canvas, and properties sidebar">
</figure>

## Choose a starting point

| Starting point | Use it when |
|:---------------|:------------|
| Blank template | You already know the size and layout you want |
| [Template presets](https://htmlcsstoimage.com/templates) | You want to start from an existing design |
| [Template playground](/templates/playground) | You want to test a template flow in the browser |

## Basic workflow

1. Create a new template from the dashboard.
2. Set the canvas size and image settings for the final image.
3. Add blocks for rich text, simple text, images, shapes, HTML, or layout panels.
4. Select each block to edit its properties in the right sidebar.
5. Style the blocks with backgrounds, borders, shadows, sizing, and typography.
6. Connect fields to template variables when a value should change between renders.
7. Use the Variables tab to preview with realistic data.
8. Save the template and render it with the API.

## Preview with variables

Variables let one saved template render different output each time. Use them for names, titles, image URLs, colors, numbers, or any other value that should come from your render request.

Fields that support variables show the hard-hat control. Use the Variables tab to review the keys in the template, set preview values, and check how the design behaves before rendering it through the API.

## Rendering the saved template

After saving, render the template by using its template id and passing `template_values` for the variable fields.

```json
{
  "template_values": {
    "title": "Quarterly Report",
    "subtitle": "June 2026"
  }
}
```

See [Image Templates](/getting-started/templates/) for the full API reference.

The editor saves the design structure for you. In API requests, you work with the template id, image settings, and `template_values`.

## Next steps

| Topic | Go here |
|:------|:--------|
| Start from an existing design | [Template presets](https://htmlcsstoimage.com/templates) |
| Try a template in the browser | [Template playground](/templates/playground) |
| Set the image size | [Canvas](/template-editor/canvas/) |
| Pick the right block type | [Blocks](/template-editor/blocks/) |
| Add template variables | [Variables](/template-editor/variables/) |
| Build more complex layouts | [Advanced Panels](/template-editor/advanced/panels/) |
