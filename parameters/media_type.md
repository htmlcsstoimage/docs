---
layout: page
title: media_type
permalink: /parameters/media_type/
parent: Parameters
nav_order: 6
description: >-
  Render a page using its screen or print CSS media styles.
---

# Using media_type
{: .no_toc }
{: .fs-9 }

Choose whether Chrome applies screen or print media styles when rendering.
{: .fs-6 .fw-300 }

<hr>

## How it works

The `media_type` parameter controls the CSS media type Chrome emulates. It affects `@media` rules, linked stylesheets with a `media` attribute, and JavaScript checks such as `window.matchMedia()`.

## Values

| Value | Description |
|:------|:------------|
| `screen` | Apply styles intended for screens. This is the default when `media_type` is omitted. |
| `print` | Apply print-specific styles, including rules inside `@media print`. |

## Render with print styles

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://example.com" \
     --data media_type=print
```

```json
{
  "url": "https://example.com",
  "media_type": "print"
}
```

## Example with different screen and print styles

```json
{
  "html": "<article><h1>Quarterly report</h1><nav>Navigation</nav><p>Report content</p></article>",
  "css": "article { padding: 32px; } @media screen { article { background: #eef6ff; } } @media print { nav { display: none; } article { background: white; color: black; } }",
  "media_type": "print"
}
```

In this example, the navigation is hidden and the print color scheme is applied before the image is captured.

## Common use cases

Use `media_type: "print"` to:

- Preview a webpage's print stylesheet
- Hide navigation, controls, or other screen-only elements
- Render layouts that use print-specific typography or page-break rules
- Test how a page responds to `window.matchMedia("print")`

{% include hint.md title="Output format" text="media_type controls CSS rendering only. It does not change the output format to PDF. Request the generated image URL with a .pdf extension when you need a PDF." %}

{% include code_footer.md version=2 %}
