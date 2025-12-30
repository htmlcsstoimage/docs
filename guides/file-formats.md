---
layout: page
title: File formats
permalink: /guides/file-formats/
parent: Guides
nav_order: 2
description: >-
  Learn about supported image formats (PNG, JPG, WebP) and how to optimize your image delivery.
---

# Image File Formats
{: .no_toc }
{: .fs-9 }

Choose the right format for your use case
{: .fs-6 .fw-300 }

<hr>

## Supported Formats

The API supports three image formats:
- PNG (default)
- JPG
- WebP

To specify a format, add the appropriate file extension to your image URL:

| Format | Example URL | Best For |
|:-------|:------------|:---------|
| PNG | `https://hcti.io/v1/image/abc123.png` | Screenshots, images with transparency |
| JPG | `https://hcti.io/v1/image/abc123.jpg` | Photos, complex images with no transparency |
| WebP | `https://hcti.io/v1/image/abc123.webp` | Modern web applications, optimal compression |

{% include hint.md title="Default Format" text="If no extension is specified, the API will return a PNG image." %}

## Format Characteristics

### PNG
- Lossless compression
- Supports transparency
- Larger file size
- Best for:
  - Screenshots
  - Images with text
  - Graphics with sharp edges
  - Content requiring transparency

### JPG
- Lossy compression
- No transparency support
- Smaller file size
- Best for:
  - Photographs
  - Complex images
  - When transparency isn't needed
  - When smaller file size is priority

### WebP
- Modern format
- Supports transparency
- Superior compression
- Best for:
  - Web applications
  - Progressive loading
  - Optimal performance
  - Modern browsers

## Automatic WebP Optimization

All paid accounts receive automatic WebP optimization:

1. Our edge servers detect the user's browser capabilities
2. If WebP is supported, images are automatically served in WebP format
3. Fallback formats are served for non-supporting browsers

Benefits:
- Improved page load times
- Better SEO scores
- Reduced bandwidth usage
- No code changes required

{% include hint.md title="Performance Tip" text="WebP typically provides 25-35% smaller file sizes compared to PNG/JPG while maintaining visual quality." %}

## Best Practices

### Format Selection
1. **Default to PNG** for:
   - Screenshots
   - Text-heavy images
   - When quality is critical
   
2. **Use JPG** for:
   - Photos
   - Complex images
   - When file size is priority
   
3. **Enable WebP** for:
   - Modern web applications
   - Performance optimization
   - Progressive enhancement

## Browser Support

| Format | Chrome | Firefox | Safari | Edge | IE11 |
|:-------|:-------|:--------|:-------|:-----|:-----|
| PNG | ✅ | ✅ | ✅ | ✅ | ✅ |
| JPG | ✅ | ✅ | ✅ | ✅ | ✅ |
| WebP | ✅ | ✅ | ✅ | ✅ | ❌ |

{% include code_footer.md version=1 %}
