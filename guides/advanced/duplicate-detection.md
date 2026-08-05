---
layout: page
title: Duplicate detection
permalink: /guides/advanced/duplicate-detection/
parent: Advanced
grand_parent: Guides
nav_order: 2
description: >-
  Reuse identical recent images without consuming additional image credits.
---
# Duplicate image detection
{: .no_toc }
{: .fs-9 }

Control how far back the API looks for an identical image before rendering a new one.
{: .fs-6 .fw-300 }

<hr>

## How deduplication works

When you create an HTML/CSS image or URL screenshot with `POST /v1/image`, the API can look for an identical image created within a configurable time window. MCP-created HTML/CSS images and URL screenshots use the same behavior.

If a matching image is found in your organization, the response returns its existing `id` and `url`. The request consumes no image credits because a new image is not created.

The rendered content and image parameters must match exactly. A different character or parameter value creates a different image. The `dedupe_duration_s` value itself is excluded from this comparison, so you can change the lookback window without changing what counts as an identical image.

{% include hint.md title="Best effort, not an idempotency guarantee" text="Deduplication is best effort and eventually consistent. A new image can take a few seconds to become available for matching, so identical requests sent during that short delay—especially concurrent requests—may create separate images and consume separate image credits. This does not shorten the configured lookback window. Do not rely on this feature when your application requires strict idempotency." %}

## Setting the lookback window

Set `dedupe_duration_s` to the number of seconds the API should look back. Set it to `0` to disable deduplication for that request.

```json
{
  "html": "<h1>Monthly report</h1>",
  "css": "h1 { color: navy; }",
  "dedupe_duration_s": 3600
}
```

The value is request-only: it is not saved on the image and does not become the default for later requests. Every request can use a different lookback window.

## Defaults and plan limits

When `dedupe_duration_s` is omitted, URL screenshots default to `0` seconds because URL content is expected to change more often. HTML/CSS requests use the default for your plan:

| Plan | HTML/CSS default | Allowed explicit values |
|:-----|:-----------------|:------------------------|
| Free | 30 days (`2592000`) | `0` or `2592000` |
| Basic | 30 days (`2592000`) | `0` or `2592000` |
| Pro | 180 days (`15552000`) | Any whole number from `0` through `15552000` |
| Scale | 365 days (`31536000`) | Any whole number from `0` through `31536000` |

These explicit-value limits apply to both HTML/CSS images and URL screenshots. For example, a Pro URL request can opt into any lookback from `0` through 180 days even though its omitted default is `0`.

## Where it applies

The configurable lookback applies to HTML/CSS images and URL screenshots created through the standard single-image POST endpoint or the MCP image-creation tools.

It does not apply to:

- Templated images, which are already identified by their template ID and values.
- Signed create-and-render URL images, which already use content-based IDs.
- Image batch requests.

See the [`dedupe_duration_s` parameter reference](/parameters/dedupe_duration_s/) for request examples.

{% include code_footer.md version=1 %}
