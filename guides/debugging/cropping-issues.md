---
layout: page
title: Cropping issues
permalink: /guides/debugging/cropping-issues/
parent: Debugging
grand_parent: Guides
nav_order: 1
description: >-
  Fix images that aren't cropping correctly. Learn why full HTML pages don't auto-crop and how to use HTML snippets instead.
---

# Debugging Cropping Issues
{: .no_toc }
{: .fs-9 }

Why your image isn't cropping to the size you expect
{: .fs-6 .fw-300 }

<hr>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## How Auto-Cropping Works

The HTML/CSS to Image API has a powerful **auto-cropping** feature that automatically sizes your image to match your HTML content. When you send an HTML snippet, the API crops the resulting image to the dimensions of the **outermost HTML element**.

However, this only works for **HTML snippets**—not full HTML pages.

{% include hint.md title="Key Concept" text="Auto-cropping works by detecting the outermost element in your HTML and cropping to its dimensions. If you send a full HTML page with <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags, the API renders the entire viewport instead." %}

---

## The Most Common Mistake

The most frequent cropping issue we see: **sending a full HTML page when you meant to send an HTML snippet**.

### What Happens with a Full HTML Page

When you include `<!DOCTYPE html>`, `<html>`, `<head>`, or `<body>` tags, the API treats your content as a **full webpage** and renders it inside the default viewport (1366x768 pixels).

**Example of what NOT to do:**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background: #f5f5f5; }
  </style>
</head>
<body>
  <div style="height: 200px; width: 400px; background: white; border: 2px solid #e74c3c;">
    <h2>My Card</h2>
    <p>This should be 400x200</p>
  </div>
</body>
</html>
```

**Result:** Instead of a 400x200 image, you get a 1366x768 image with your content in the corner:

<img src="https://hcti.io/v1/image/019b75eb-127e-7ce2-98bd-978ca7690c92" alt="Full HTML page renders the entire viewport, not cropped to element size" style="max-width: 500px; border: 1px solid #ddd; border-radius: 4px;" />

Notice how the image includes the entire viewport with a gray background, not just your 400x200 card.

---

## The Solution: Use HTML Snippets

Remove the `<!DOCTYPE>`, `<html>`, `<head>`, and `<body>` tags. Send only the HTML elements you want in your image.

**The correct approach:**

```html
<div style="height: 200px; width: 400px; background: white; border: 2px solid #27ae60; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: system-ui, sans-serif;">
  <div style="text-align: center;">
    <h2 style="margin: 0; color: #333;">My Card</h2>
    <p style="margin: 8px 0 0 0; color: #666;">Correctly sized 400x200</p>
  </div>
</div>
```

**Result:** The image is automatically cropped to exactly 400x200 (or 800x400 at 2x resolution):

<img src="https://hcti.io/v1/image/019b75eb-1d1e-748d-8b7d-59497e1753e9" alt="HTML snippet correctly auto-crops to element dimensions" style="max-width: 400px; border-radius: 4px;" />

---

## Setting Dimensions on the Outermost Element

For auto-cropping to work correctly, set explicit `width` and `height` on your **outermost** HTML element:

```html
<div style="width: 600px; height: 400px; background: white;">
  <!-- Your content here -->
</div>
```

The API will crop the image to match these dimensions (doubled for retina displays by default).

### Using CSS Classes

You can also use a `<style>` tag within your snippet:

```html
<style>
  .card {
    width: 500px;
    height: 300px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    padding: 24px;
    color: white;
    font-family: system-ui, sans-serif;
  }
</style>
<div class="card">
  <h1>Welcome</h1>
  <p>Your styled content here</p>
</div>
```

---

## Adding Margins Around Your Image

Need some breathing room around your content? Add `margin` to the outermost element. The auto-cropper respects margins and includes them in the final image.

### Without Margin

```html
<div style="height: 150px; width: 300px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px;">
  <h2>No Margin</h2>
  <p>Cropped tightly to edges</p>
</div>
```

<img src="https://hcti.io/v1/image/019b75eb-2b15-7ce1-bb9b-dc3f248566bf" alt="Image without margin - cropped tightly to edges" style="max-width: 300px; border-radius: 4px;" />

### With Margin

```html
<div style="height: 150px; width: 300px; margin: 20px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px;">
  <h2>With Margin</h2>
  <p>20px space around</p>
</div>
```

<img src="https://hcti.io/v1/image/019b75eb-34e0-72b4-a785-c6079bcaaf3e" alt="Image with 20px margin around the element" style="max-width: 340px; border-radius: 4px;" />

Notice the transparent space around the card when using `margin: 20px`. This is useful for adding padding around social cards, thumbnails, or any image that needs visual breathing room.

---

## When You Need Full HTML Pages

Sometimes you do need to send a full HTML page—for example, when including external libraries, complex CSS, or JavaScript. In these cases, use the `viewport_width` and `viewport_height` parameters to control the image size:

```json
{
  "html": "<!DOCTYPE html><html>...</html>",
  "viewport_width": 400,
  "viewport_height": 200
}
```

Or use the `selector` parameter to crop to a specific element within the page:

```json
{
  "html": "<!DOCTYPE html><html>...<div id='card'>...</div>...</html>",
  "selector": "#card"
}
```

Learn more about the [selector parameter](/parameters/selector/).

---

## Quick Troubleshooting Checklist

If your image isn't cropping correctly, work through these steps:

1. **Remove full page tags** — Delete `<!DOCTYPE>`, `<html>`, `<head>`, and `<body>` tags
2. **Set explicit dimensions** — Add `width` and `height` to your outermost element
3. **Check for wrapper elements** — Ensure no invisible wrapper is affecting dimensions
4. **Use viewport params for full pages** — If you must use a full page, set `viewport_width` and `viewport_height`
5. **Try the selector param** — Use `selector` to crop to a specific element

---

## Summary

| Scenario | Solution |
|:---------|:---------|
| Image is full viewport size (1366x768) | Remove `<html>`, `<body>` tags—use HTML snippet |
| Image size doesn't match your CSS | Set `width` and `height` on outermost element |
| Need space around the image | Add `margin` to the outermost element |
| Must use full HTML page | Use `viewport_width`/`viewport_height` or `selector` param |

{% include code_footer.md version=2 %}

