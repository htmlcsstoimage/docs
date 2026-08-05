---
layout: page
title: dedupe_duration_s
permalink: /parameters/dedupe_duration_s/
parent: Parameters
nav_order: 15
description: >-
  Set how many seconds the API should look back for an identical image before rendering a new one.
---

# Using dedupe_duration_s
{: .no_toc }
{: .fs-9 }

Reuse an identical recent image without consuming additional image credits.
{: .fs-6 .fw-300 }

<hr>

## How it works

`dedupe_duration_s` is a non-negative integer that sets the deduplication lookback window in seconds for an HTML/CSS image or URL screenshot created with `POST /v1/image`. MCP-created HTML/CSS images and URL screenshots use the same behavior.

If your organization has an image with exactly the same content and parameters within that window, the API returns the existing image's `id` and `url` instead of rendering a new image. The deduplicated request consumes no image credits.

The `dedupe_duration_s` value is not part of the identity comparison. It is also not saved on the image, so it affects only the request that includes it. You can choose a different lookback for every request.

{% include hint.md title="Best effort, not an idempotency guarantee" text="Deduplication is best effort and eventually consistent. A new image can take a few seconds to become available for matching, so identical requests sent during that short delay—especially concurrent requests—may create separate images and consume separate image credits. This does not shorten the configured lookback window. Do not rely on this feature when your application requires strict idempotency." %}

## Values and defaults

Set the value to `0` to disable deduplication for a request.

URL screenshots default to `0` when the parameter is omitted. HTML/CSS images use a plan-specific default:

| Plan | HTML/CSS default | Allowed explicit values |
|:-----|:-----------------|:------------------------|
| Free | 30 days (`2592000`) | `0` or `2592000` |
| Basic | 30 days (`2592000`) | `0` or `2592000` |
| Pro | 180 days (`15552000`) | Any whole number from `0` through `15552000` |
| Scale | 365 days (`31536000`) | Any whole number from `0` through `31536000` |

The explicit-value limits apply to both HTML/CSS images and URL screenshots.

## HTML/CSS example

```json
{
  "html": "<h1>Monthly report</h1>",
  "css": "h1 { color: navy; }",
  "dedupe_duration_s": 3600
}
```

## URL example

```json
{
  "url": "https://example.com/report",
  "dedupe_duration_s": 300
}
```

## Disable deduplication

```json
{
  "html": "<h1>Always render a new image</h1>",
  "dedupe_duration_s": 0
}
```

## Where it applies

The parameter applies to HTML/CSS images and URL screenshots created through the standard single-image POST endpoint or the MCP image-creation tools.

It does not apply to templated images, signed create-and-render URL images, or image batch requests. For more about exact matching and best-effort behavior, see the [duplicate image detection guide](/guides/advanced/duplicate-detection/).

{% include code_footer.md version=1 %}
