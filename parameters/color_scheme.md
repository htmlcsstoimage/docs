---
layout: page
title: color_scheme
permalink: /parameters/color_scheme/
parent: Parameters
nav_order: 10
description: >-
  Set Chrome to render in light or dark mode for screenshots
---

# Using color_scheme
{: .no_toc }
{: .fs-9 }

Control light/dark mode rendering for your screenshots
{: .fs-6 .fw-300 }

<hr>

## How it works

The `color_scheme` parameter sets Chrome to render the page as if the user has explicitly chosen light or dark mode. This affects websites that use the CSS `prefers-color-scheme` media query.

## Values

| Value | Description |
|:------|:------------|
| `light` | Render as if the user prefers light mode |
| `dark` | Render as if the user prefers dark mode |

## When to use it

Use `color_scheme` when:
- Taking screenshots of websites that support dark mode
- Testing how your designs look in both color schemes
- Generating consistent screenshots regardless of system settings
- Creating dark mode variants of images

## Example usage

### Screenshot in dark mode

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://github.com" \
     --data color_scheme=dark
```

### JSON request

```json
{
  "url": "https://twitter.com",
  "color_scheme": "dark"
}
```

### HTML with dark mode styles

```json
{
  "html": "<div class='card'>Hello World</div>",
  "css": ".card { padding: 20px; } @media (prefers-color-scheme: dark) { .card { background: #1a1a1a; color: white; } }",
  "color_scheme": "dark"
}
```

## Common use cases

### Social media screenshots

Many social platforms support dark mode. Use `color_scheme: "dark"` for consistent dark-themed screenshots:

```json
{
  "url": "https://twitter.com/username/status/123",
  "color_scheme": "dark",
  "device_scale": 2
}
```

### Documentation screenshots

Generate both light and dark versions of documentation pages:

```json
{
  "url": "https://docs.example.com",
  "color_scheme": "light"
}
```

### Design testing

Test how your HTML renders in both modes:

```json
{
  "html": "<div class='theme-aware'>Content</div>",
  "css": "@media (prefers-color-scheme: dark) { .theme-aware { background: #000; color: #fff; } } @media (prefers-color-scheme: light) { .theme-aware { background: #fff; color: #000; } }",
  "color_scheme": "dark"
}
```

## Technical details

The `color_scheme` parameter emulates the CSS media feature `prefers-color-scheme`. When set:

- Chrome's rendering engine treats the page as if the user has that color scheme preference
- CSS rules inside `@media (prefers-color-scheme: dark)` or `@media (prefers-color-scheme: light)` will apply accordingly
- JavaScript that checks `window.matchMedia('(prefers-color-scheme: dark)')` will receive the appropriate value

{% include hint.md title="Note" text="If a website doesn't support prefers-color-scheme, this parameter will have no effect on the output." %}

{% include code_footer.md version=2 %}

