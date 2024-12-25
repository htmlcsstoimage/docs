---
layout: page
title: ms_delay
permalink: /parameters/ms_delay/
parent: Parameters
nav_order: 2
description: >-
  Control the delay before screenshot capture when needed for dynamic content
---

# Using ms_delay
{: .no_toc }
{: .fs-9 }

Adjust rendering delay to capture dynamic content
{: .fs-6 .fw-300 }

Table of contents
{: .text-delta }
1. TOC
{:toc}

<hr>

## When to use ms_delay

{% include hint.md title="Important" text="Most users don't need ms_delay. Only use this parameter if you notice missing content in your screenshots." %}

The `ms_delay` parameter should only be used when:
1. Your screenshots are missing expected content
2. Dynamic content isn't appearing in the final image
3. Custom fonts or images aren't loading properly

## How it works

When content is missing from your screenshots, the `ms_delay` parameter lets you add a delay before capture. This can help with:
- JavaScript that needs time to execute
- Assets (images, fonts) still loading
- Animations not completing
- Dynamic content not appearing

## Default behavior

By default, the API intelligently handles most loading scenarios:
- Waits for the page to fully load
- Detects when assets finish loading
- Automatically manages common JavaScript frameworks

Only add `ms_delay` if you notice issues with the default behavior.

## Image credits and billing

### Credit usage
The `ms_delay` parameter can affect how many image credits are consumed per request:

| Delay Range (ms) | Credits Used | Example Usage |
|:----------------|:-------------|:--------------|
| 0-5000 | 1 credit | Standard usage, suitable for most cases |
| 5001-10000 | 2 credits | Complex pages with many assets |
| 10001-15000 | 3 credits | Heavy JavaScript applications |
| 15001-20000 | 4 credits | Maximum delay scenarios |

### Important notes
- Maximum allowed value is 20,000ms (20 seconds)
- Values are rounded up to the nearest credit tier
- Credits are calculated before the request is processed

{% include hint.md title="Cost optimization" text="To minimize credit usage, try optimizing your page load time before increasing ms_delay. Consider using render_when_ready for precise timing control." %}

### Examples

```javascript
// Standard usage (1 credit)
{
  "html": "<div>Your content</div>",
  "ms_delay": 3000
}

// 2 credits used
{
  "html": "<div>Your content</div>",
  "ms_delay": 8000
}

// 4 credits used (maximum)
{
  "html": "<div>Your content</div>",
  "ms_delay": 20000
}
```

### Alternatives to high ms_delay values

Instead of using high `ms_delay` values, consider:
1. Using the `render_when_ready` parameter
2. Optimizing your page load time
3. Preloading assets
4. Reducing JavaScript execution time

This can help reduce both credit usage and overall processing time.
