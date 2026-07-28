---
layout: page
title: Viewport Params
permalink: /parameters/viewport/
parent: Parameters
nav_order: 16
description: >-
  Control the browser viewport's dimensions, orientation, mobile behavior, and touch support.
---

# Viewport parameters
{: .no_toc }
{: .fs-9 }

Control the size and device characteristics Chrome uses to render your image.
{: .fs-6 .fw-300 }

<hr>

## How it works

The viewport is the visible area of the browser page. By default, Chrome renders pages in a `1920x1080` viewport. Use the viewport parameters to render responsive layouts at a specific size or emulate mobile, landscape, and touch behavior.

## Parameters

| Parameter | Type | Description |
|:----------|:-----|:------------|
| `viewport_width` | `Integer` | Set the viewport width in CSS pixels. Must be used with `viewport_height`. The maximum width is `6000`. |
| `viewport_height` | `Integer` | Set the viewport height in CSS pixels. Must be used with `viewport_width`. |
| `viewport_mobile` | `Boolean` | Set to `true` to emulate a mobile viewport and apply the page's mobile viewport behavior. |
| `viewport_landscape` | `Boolean` | Set to `true` to render the viewport in landscape orientation. |
| `viewport_touch` | `Boolean` | Set to `true` to enable touch support in the viewport. |

The three Boolean parameters are optional and default to `false`. They can be used together, but they do not set the viewport dimensions. Use `viewport_width` and `viewport_height` to choose the exact layout size.

## Setting viewport width and height
{: #viewport-width-and-height }

Both dimensions must be included when setting the viewport:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://example.com" \
     --data viewport_width=1200 \
     --data viewport_height=630
```

```json
{
  "url": "https://example.com",
  "viewport_width": 1200,
  "viewport_height": 630
}
```

Setting explicit dimensions disables automatic cropping and returns the area rendered inside the viewport. For HTML snippets that should be tightly cropped to their content, set the dimensions in CSS instead.

## Emulating a mobile viewport
{: #viewport-mobile }

Combine a mobile-sized viewport with mobile emulation:

```json
{
  "url": "https://example.com",
  "viewport_width": 390,
  "viewport_height": 844,
  "viewport_mobile": true
}
```

`viewport_mobile` enables Chrome's mobile viewport behavior, including support for a page's `<meta name="viewport">` settings.

## Using landscape orientation
{: #viewport-landscape }

`viewport_landscape` works independently of `viewport_mobile`. It can be used with mobile, tablet, or desktop-sized viewports.

For example, render a tablet-sized viewport in landscape orientation with touch support:

```json
{
  "url": "https://example.com",
  "viewport_width": 1180,
  "viewport_height": 820,
  "viewport_landscape": true,
  "viewport_touch": true
}
```

Add `viewport_mobile: true` only when you also want Chrome's mobile viewport behavior.

## Enabling touch support
{: #viewport-touch }

Set `viewport_touch` to `true` to enable touch-capability detection for pages that adapt their controls or interactions for touch devices:

```json
{
  "url": "https://example.com",
  "viewport_width": 390,
  "viewport_height": 844,
  "viewport_mobile": true,
  "viewport_touch": true
}
```

## Interactions with other parameters

The viewport is Chrome's virtual screen, measured in CSS pixels. It controls the page layout but does not necessarily determine the final image dimensions.

- [`device_scale`](/parameters/device_scale/) changes the output resolution without changing the CSS viewport size. A `1000x1000` viewport with `device_scale: 1.5` produces a `1500x1500` image.
- [`full_screen`](/parameters/full_screen/) can produce an image taller than `viewport_height` by capturing content below the initial viewport.
- [`selector`](/parameters/selector/) crops the final image to a specific element rendered inside the configured viewport.
- [Automatic cropping](/guides/debugging/cropping-issues/) controls the bounds of the final image after the page has been rendered.
- The `width` and `height` query parameters can [resize the generated image on the fly](/getting-started/setting-height-and-width/#resize-on-the-fly-with-query-params) without changing the viewport or rerendering the page.

{% include hint.md title="Responsive layouts" text="Choose viewport dimensions that match the breakpoint you want to capture. The width determines which CSS media queries and responsive styles are applied." %}

{% include code_footer.md version=2 %}
