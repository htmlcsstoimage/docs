---
layout: page
title: Transparent background
permalink: /guides/transparent-background/
parent: Guides
nav_order: 1
description: >-
  Learn how to create images with transparent backgrounds using the HTML/CSS to Image API.
---

# Transparent Backgrounds
{: .no_toc }
{: .fs-9 }

Create images with transparent backgrounds for logos, overlays, and more
{: .fs-6 .fw-300 }

<hr>

## Implementation

To render an image with a transparent background, set the background color to transparent in your CSS:

```css
body { 
  background-color: transparent;
}
```

{% include hint.md title="PNG Format Required" text="Transparency is only supported in PNG format. JPG and WebP images will render with a white background." %}

## Examples

### Basic Example

This image demonstrates a transparent background:

<div class="code-example" markdown="1">
<div class="hcti-container" style="background-color: unset;">
  {% cloudinary /assets/images/cat.png sizes="400px" alt="Example of transparent background" %}
</div>
</div>

[Try it yourself](https://htmlcsstoimage.com/examples/png-transparent-background){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

### Code Example

```html
<div class="logo-container">
  <img src="logo.png" alt="Company Logo">
</div>
```

```css
body {
  background-color: transparent;
}
.logo-container {
  padding: 20px;
  /* Any background styling here will be included in the image */
}
```

## Common Use Cases

1. **Logos**: Create logo variations with transparent backgrounds
2. **Overlays**: Generate images that layer well with other content
3. **Icons**: Design icons that work on any background
4. **Watermarks**: Create watermarks that blend seamlessly

## Best Practices

### Do's
- Always use PNG format for transparent backgrounds
- Test your image on different colored backgrounds
- Consider adding a subtle shadow for better visibility
- Use the `device_scale` parameter for higher quality

### Don'ts
- Don't use JPG format when transparency is needed
- Don't assume white is transparent
- Don't forget to set `background-color: transparent`

## URL-based Screenshots

When capturing screenshots from URLs, add the CSS via the API parameters:

```json
{
  "url": "https://example.com",
  "css": "body { background-color: transparent; }"
}
```

## Troubleshooting

### Common Issues

1. **White Background Appears**
   - Ensure you're using PNG format
   - Verify CSS is being applied
   - Check you are passing CSS using the `css` parameter

2. **Partial Transparency**
   - Look for background colors in child elements
   - Check for overlapping elements
   - Verify CSS inheritance

### Example Fix

```css
/* Before */
body { background: none; }  /* This will not work */

/* After */
body { background-color: transparent; }  /* This will work */
```

{% include hint.md title="Performance Tip" text="PNG files with transparency may be larger than JPGs. Consider using compression if file size is a concern." %}

## Browser Compatibility

Transparent PNGs are supported in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera
- Mobile browsers

{% include code_footer.md version=3 %}

