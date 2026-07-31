---
layout: page
title: transparent_background
permalink: /parameters/transparent_background/
parent: Parameters
nav_order: 160
description: >-
  Render HTML/CSS images and URL screenshots with a transparent background.
---

# Using transparent_background
{: .no_toc }
{: .fs-9 }

Render transparent PNGs without adding special background CSS
{: .fs-6 .fw-300 }

<hr>

## How it works

Set `transparent_background` to `true` on a create image request to omit the page background from the rendered image. The parameter works with both HTML/CSS images and URL screenshots.

When the parameter is omitted, the existing CSS-based transparent background method continues to work. Set it explicitly to `false` when you want an opaque background even if the request CSS sets the body background to transparent.

{% include hint.md title="PNG Format Required" text="Transparency is only supported in PNG format. JPG and WebP images will render with a white background." %}

## Values

| Value | Description |
|:------|:------------|
| `true` | Render the image with a transparent background |
| `false` | Render the image with an opaque background |
| omitted | Use the existing CSS-based background behavior |

## HTML/CSS example

```json
{
  "html": "<div class='logo'>Your logo</div>",
  "css": ".logo { padding: 24px; }",
  "transparent_background": true
}
```

## URL screenshot example

```json
{
  "url": "https://example.com",
  "transparent_background": true
}
```

## cURL example

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode html="<div class='logo'>Your logo</div>" \
     --data transparent_background=true
```

The parameter can also be saved on a template and used as a default or variation option in an image batch.

For more examples and the existing CSS method, see the [transparent background guide](/guides/styling/transparent-background/).

{% include code_footer.md version=1 %}
