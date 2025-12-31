---
layout: page
title: Blurry images
permalink: /guides/debugging/blurry-images/
parent: Debugging
grand_parent: Guides
nav_order: 2
description: >-
  Complete guide to understanding and fixing blurry images with pixel density, resolution, and device scaling
---

# Debugging Blurry Images
{: .no_toc }
{: .fs-9 }

The complete guide to crystal-clear, high-resolution images
{: .fs-6 .fw-300 }

<hr>

## Why Images Look Blurry

Blurry images are almost always caused by **insufficient pixel density** for the display they're viewed on. Modern screens—especially smartphones, tablets, and high-resolution monitors—pack many more pixels into the same physical space than older displays.

The HTML/CSS to Image API automatically generates **high-resolution images by default** to ensure your images look crisp on all devices. Here's everything you need to know about creating pixel-perfect images.

{% include hint.md title="Default High Resolution" text="The HCTI API defaults to 2x resolution (device_scale: 2) for HTML images to prioritize image quality. This ensures your images look sharp on both standard and high-DPI displays." %}

## Understanding Pixel Density

### The Modern Display Challenge

Today's screens vary dramatically in pixel density:

- **Standard displays**: 1 physical pixel = 1 CSS pixel (1x)
- **Retina/High-DPI displays**: 2-4 physical pixels = 1 CSS pixel (2x-4x)
- **Ultra-high resolution**: 3+ physical pixels = 1 CSS pixel (3x+)

When you create an image at standard resolution (1x) and display it on a high-density screen, the browser must **stretch** those pixels to fill the available space—resulting in a blurry, pixelated appearance.

### The 2x Rule Explained

The **2x rule** is simple: **create images at double your intended display size**.

**Example:**
- Display size needed: `400×400px`
- Image source size: `800×800px` (2x)
- Result: Sharp image on all screens

This ensures you have enough pixel data to satisfy high-density displays while still looking great on standard screens.

## Device Scale Settings

The HCTI API uses the `device_scale` parameter to control image resolution:

| Setting | Resolution | Use Case | File Size |
|---------|------------|----------|-----------|
| `1` | Standard (1x) | Legacy screens, thumbnails | Smallest |
| `2` | High (2x) | **Recommended for web** | Medium |
| `3` | Maximum (3x) | Print, premium displays | Largest |

### Default Behavior

- **HTML images**: `device_scale: 2` (high resolution by default)
- **URL screenshots**: `device_scale: 1` (standard resolution)

## Common Causes of Blurry Images

### 1. Insufficient Source Image Resolution

**Problem**: Your source images are too small for high-DPI rendering.

**Example**: Using a `200×200px` image that needs to display at `200×200px` on a 2x display.

**Solution**: Use source images at 2x your display size:
```html
<!-- Instead of this -->
<img src="logo-200x200.png" width="200" height="200">

<!-- Use this -->
<img src="logo-400x400.png" width="200" height="200">
```

### 2. Incorrect Device Scale for URLs

**Problem**: URL screenshots default to `device_scale: 1`.

**Solution**: Explicitly set `device_scale: 2` for URL images:
```json
{
  "url": "https://example.com",
  "device_scale": 2
}
```

### 3. Mixed Resolution Assets

**Problem**: Some images in your HTML are high-resolution while others are not.

**Solution**: Ensure ALL images follow the 2x rule:
```html
<!-- Good: All images are 2x their display size -->
<img src="header-800x200.png" width="400" height="100">
<img src="logo-200x200.png" width="100" height="100">
<img src="photo-1200x800.png" width="600" height="400">
```

## Step-by-Step Debugging

### Step 1: Check Your Device Scale

For HTML images, verify your API request:
```json
{
  "html": "<div>Your content</div>",
  "device_scale": 2  // Ensure this is set to 2
}
```

For URL images, always specify device scale:
```json
{
  "url": "https://your-site.com",
  "device_scale": 2  // Add this for sharp screenshots
}
```

### Step 2: Audit Your Source Images

Calculate if your images meet the 2x requirement:

1. **Intended display size**: How big will the image appear? (e.g., 300px wide)
2. **Required source size**: Multiply by device scale (300px × 2 = 600px wide)
3. **Actual source size**: Check your image file dimensions

**Quick audit checklist:**
- [ ] All images are 2x their CSS display size
- [ ] External images from CDNs have high-res versions
- [ ] Icons and logos have sufficient resolution
- [ ] Background images are appropriately sized

### Step 3: Test on Different Displays

View your generated image on:
- Standard resolution monitor
- High-DPI laptop screen (MacBook, high-end Windows laptops)
- Mobile device (iPhone, Android phone)
- Tablet (iPad, Android tablet)

The image should look equally sharp on all devices.

## Real-World Examples

### Example 1: Social Media Card

**Bad approach:**
```html
<div style="width: 1200px; height: 630px;">
  <img src="avatar-150x150.jpg" width="150" height="150">
  <!-- Image will be blurry on high-DPI displays -->
</div>
```

**Good approach:**
```html
<div style="width: 1200px; height: 630px;">
  <img src="avatar-300x300.jpg" width="150" height="150">
  <!-- Image will be sharp on all displays -->
</div>
```

### Example 2: Company Logo

**Bad approach:**
```css
.logo {
  width: 200px;
  height: 60px;
  background-image: url('logo-200x60.png');
}
```

**Good approach:**
```css
.logo {
  width: 200px;
  height: 60px;
  background-image: url('logo-400x120.png');
  background-size: 200px 60px; /* Scale down to intended size */
}
```

## Advanced Techniques

### Responsive Images with srcset

For external images, use responsive image techniques:
```html
<img src="photo-600x400.jpg" 
     srcset="photo-600x400.jpg 1x, photo-1200x800.jpg 2x"
     width="600" height="400">
```

### CSS Media Queries for High-DPI

Target high-resolution displays specifically:
```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
       only screen and (min-resolution: 192dpi) {
  .hero-image {
    background-image: url('hero-2x.jpg');
  }
}
```

### Vector Graphics for Perfect Scaling

Use SVG for logos and icons that scale perfectly at any resolution:
```html
<img src="logo.svg" width="200" height="60">
<!-- SVG automatically scales to any device -->
```

## Performance Considerations

### File Size Impact

Higher resolution means larger files:
- `device_scale: 1` → Base file size
- `device_scale: 2` → ~4x larger files
- `device_scale: 3` → ~9x larger files

### Optimization Strategies

1. **Use appropriate compression**: Balance quality vs. file size
2. **Choose the right format**: 
   - PNG for graphics with transparency
   - JPG for photographs
   - WebP for modern browsers (when supported)
3. **Consider bandwidth**: Higher resolution may impact load times

{% include hint.md title="Performance Tip" text="Use device_scale: 2 as the sweet spot for web usage. It provides excellent quality on all displays while keeping file sizes reasonable." %}

## Troubleshooting Checklist

When your image still looks blurry:

- [ ] **Device scale is set to 2** (for HTML) or explicitly specified (for URLs)
- [ ] **All source images are 2x their display size**
- [ ] **External CDN images have high-resolution versions available**
- [ ] **CSS background images use appropriately sized sources**
- [ ] **Vector graphics (SVG) are used where possible**
- [ ] **The generated image is being displayed at the correct size**

## Browser Testing

Test your images across different scenarios:

```html
<!-- Test HTML - put this in your browser -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Image Quality Test</h1>
    
    <!-- Your generated image -->
    <img src="your-generated-image.png" width="400" height="300">
    
    <!-- View at different sizes -->
    <img src="your-generated-image.png" width="200" height="150">
    <img src="your-generated-image.png" width="800" height="600">
</body>
</html>
```

## Need Help?

Still experiencing blurry images? We're here to help debug your specific case.

**Email us**: [support@htmlcsstoimage.com](mailto:support@htmlcsstoimage.com)

Include:
- Your API request (HTML/CSS or URL)
- Expected vs. actual results
- What devices/screens you're testing on
- Any specific requirements for your use case

We love solving tricky rendering problems and helping you achieve pixel-perfect results.

{% include code_footer.md version=2 %}

