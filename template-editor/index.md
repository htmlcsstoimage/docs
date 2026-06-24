---
layout: default
title: Template Editor
permalink: /template-editor/
nav_order: 4
has_children: true
has_toc: false
description: >-
  Design reusable image templates with blocks, canvas settings, variables, and layout panels.
---
# Template Editor
{: .no_toc }
{: .fs-9 }

Design saved image templates in the dashboard, then render them through the API.
{: .fs-4 .fw-300 }

[Open Dashboard](https://htmlcsstoimage.com/dashboard){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Browse Presets](https://htmlcsstoimage.com/templates){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Templates API](/getting-started/templates/){: .btn .fs-5 .mb-4 .mb-md-0 }

<hr>

The Template Editor is for building image templates visually. Add blocks, style them, connect template variables, then render the saved template through the API.

Use the editor when you want a reusable layout but do not want to write the whole design by hand in HTML and CSS. For a fast example, start from the [template presets](https://htmlcsstoimage.com/templates) or open the [template playground](https://htmlcsstoimage.com/templates/playground).

Open it from the dashboard by creating or editing a template. The canvas is the image area, the left sidebar adds blocks, and the right sidebar changes depending on whether you are editing a block, the canvas, or variables.

<figure class="te-doc-figure te-doc-figure--wide">
  <img src="/assets/images/template-editor/te-quote-preset-editor.png" alt="Template editor with the quote preset open on the canvas">
</figure>

## What you can build

- Reusable social images, product graphics, certificates, reports, cards, and other image layouts
- Variable-driven text, image URLs, colors, numbers, and other render-time values
- Layouts made from text, images, shapes, HTML, and panel blocks
- Templates that can be adjusted visually and rendered through the API

## Editor areas

| Area | What it controls |
|:-----|:-----------------|
| Canvas | Image size, canvas background, image settings, and the visible template area |
| Left sidebar | Blocks you can add to the template |
| Right sidebar | Properties for the selected canvas, block, panel child, or variable |
| Variables tab | Preview values and variable behavior before rendering |
| Preview and export | Check the generated output while you work |

## Guides

| Guide | Description |
|:------|:------------|
| [Quick Start](/template-editor/quick-start/) | Build, preview, save, and render a template |
| [Canvas](/template-editor/canvas/) | Set image size, canvas styling, and image settings |
| [Variables](/template-editor/variables/) | Connect render-time values to template fields |
| [Blocks](/template-editor/blocks/) | Choose text, media, shape, HTML, and panel blocks |
| [Advanced](/template-editor/advanced/) | Layout behavior, panels, sizing, positioning, and Extra CSS |

<hr>

## How it fits with the API

Templates made in the editor are saved templates. After saving, use the template id and pass `template_values` when generating images.

The editor manages the design structure for you. In the API, you work with the saved template, its variables, and the rendered image.

You do not need to work with the editor's internal structure directly.
