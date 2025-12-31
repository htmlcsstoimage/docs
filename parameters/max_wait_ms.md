---
layout: page
title: max_wait_ms
permalink: /parameters/max_wait_ms/
parent: Parameters
nav_order: 12
description: >-
  Set a maximum time limit before taking the screenshot
---

# Using max_wait_ms
{: .no_toc }
{: .fs-9 }

Limit how long the API waits before capturing your image
{: .fs-6 .fw-300 }

<hr>

## How it works

The `max_wait_ms` parameter sets a maximum time limit for waiting before the screenshot is taken. This is useful when pages load extra irrelevant content that you don't need to wait for.

## Value range

| Minimum | Maximum |
|:--------|:--------|
| `500` ms | `10000` ms (10 seconds) |

## max_wait_ms vs ms_delay

These two parameters serve different purposes:

| Parameter | Purpose | Behavior |
|:----------|:--------|:---------|
| `ms_delay` | Add extra wait time | Waits for the specified time **after** the page loads |
| `max_wait_ms` | Set a time limit | Stops waiting **before** the specified time, even if content is still loading |

### When to use each

- **Use `ms_delay`** when you need to wait for JavaScript to execute or animations to complete
- **Use `max_wait_ms`** when pages load too much content and you want to capture sooner

## Example usage

### Speed up slow pages

If a page loads unnecessary content that slows down your screenshot:

```json
{
  "url": "https://heavy-website.com",
  "max_wait_ms": 2000
}
```

### Combined with ms_delay

You can use both parameters together. The API will wait for `ms_delay` but not exceed `max_wait_ms`:

```json
{
  "url": "https://example.com",
  "ms_delay": 1000,
  "max_wait_ms": 3000
}
```

### Fast screenshots

For simple pages where you want quick renders:

```json
{
  "html": "<div>Simple content</div>",
  "max_wait_ms": 500
}
```

## Common use cases

### News websites

Many news sites load ads and tracking scripts that delay screenshots:

```json
{
  "url": "https://news-site.com/article",
  "max_wait_ms": 3000,
  "block_consent_banners": true
}
```

### E-commerce pages

Product pages often have heavy JavaScript. Limit wait time to get faster screenshots:

```json
{
  "url": "https://shop.example.com/product/123",
  "max_wait_ms": 4000,
  "selector": ".product-image"
}
```

### Batch processing

When generating many screenshots, use `max_wait_ms` to prevent slow pages from blocking your queue:

```json
{
  "url": "https://example.com",
  "max_wait_ms": 5000
}
```

## Best practices

1. **Start with the default** - Only use `max_wait_ms` if screenshots are taking too long
2. **Test your value** - Too short a time may result in incomplete screenshots
3. **Combine with selector** - Use `selector` to capture specific elements that load quickly
4. **Consider render_when_ready** - For precise control, use `render_when_ready` instead

{% include hint.md title="Note" text="If the page hasn't loaded essential content within max_wait_ms, the screenshot may be incomplete. Test with your specific URLs to find the right balance." %}

{% include code_footer.md version=1 %}

