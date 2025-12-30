---
layout: page
title: full_screen
permalink: /parameters/full_screen/
parent: Parameters
nav_order: 4
description: >-
  Capture the entire height of a webpage, including content below the fold
---
# Using full_screen
{: .no_toc }
{: .fs-9 }

Capture full-length screenshots of entire webpages
{: .fs-6 .fw-300 }

<hr>

## How it works

The `full_screen` parameter captures the entire height of a webpage, including all content that would normally require scrolling to see. When set to `true`, the API scrolls through the entire page and stitches together a complete screenshot.

## When to use it

Use `full_screen` when you need to capture:
- Long blog posts or articles
- Full landing pages
- Documentation pages
- Email newsletters
- Any content that extends below the initial viewport

## Default behavior

By default, `full_screen` is `false`. The API captures only what's visible in the viewport (default size: `1366x768`). And automatically crops to the content inside the viewport.

## Example usage

### Capturing a full webpage

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://example.com/long-article" \
     --data full_screen=true
```

### In a JSON request

```json
{
  "url": "https://example.com/blog-post",
  "full_screen": true
}
```

### Combined with other parameters

For best results on long pages, combine `full_screen` with other parameters:

```json
{
  "url": "https://example.com/documentation",
  "full_screen": true,
  "device_scale": 2,
  "block_consent_banners": true
}
```

## Considerations

### File size

Full-screen captures of long pages produce larger images. Consider:
- Using `device_scale: 1` instead of `2` to reduce file size
- Using WebP format (append `.webp` to the image URL) for better compression
- The maximum image height is limited to prevent excessively large files

### Rendering time

Long pages take more time to render because the API must:
1. Load the entire page
2. Scroll through all content to trigger lazy-loaded elements
3. Stitch together the final image

For very long pages, consider using `ms_delay` to ensure all content loads properly.

### Lazy-loaded content

Many modern websites lazy-load images and content as you scroll. The `full_screen` option handles this by scrolling through the page before capturing. However, if content still appears missing, try adding `ms_delay` to give elements more time to load.

## Common use cases

### Documentation screenshots

Capture entire documentation pages for offline reference or archival:

```json
{
  "url": "https://docs.example.com/api-reference",
  "full_screen": true,
  "viewport_width": 1200,
  "viewport_height": 1200
}
```

Note: In this example, even though we set a viewport_height, the API will still generate an image larger if needed based on the URL.

### Email newsletter previews

Generate full previews of email newsletters:

```json
{
  "html": "<your-email-html>",
  "full_screen": true,
  "viewport_width": 600,
  "viewport_height": 1200
}
```

Note: In this example, even though we set a viewport_height, the API will still generate an image larger if needed based on the HTML content.

### Landing page captures

Screenshot entire landing pages for design review or competitive analysis:

```json
{
  "url": "https://example.com",
  "full_screen": true,
  "device_scale": 2,
  "block_consent_banners": true
}
```

{% include hint.md title="Performance tip" text="For very long pages, consider whether you really need the full page. Using the `selector` parameter to capture just a specific section is often faster and produces smaller files." %}

{% include code_footer.md version=1 %}

