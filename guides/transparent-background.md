---
layout: page
title: Transparent background
permalink: /guides/transparent-background/
parent: Guides
nav_order: 8
description: >-
  Learn how to render an image with a transparent background. HTML/CSS to Image API.
---
# Transparent background
{: .no_toc }
{: .fs-9 }

Learn how to create images with transparent backgrounds.
{: .fs-6 .fw-300 }

<hr>

## How it works

To render an image with a transparent background, include the following in your CSS when generating your image.

```css
body { 
  background-color: transparent;
}
```

## Example

This image has `background-color: transparent;` set on the `body`.

<div class="code-example" markdown="1">
<div class="hcti-container" style="background-color: unset;">
  <img
    alt="HTML/CSS to Image with a transparent background."
    loading="lazy"
    ix-path="/assets/images/cat.png"
    sizes="400px"
    ix-params='{
      "w": 400,
      "h": 350,
      "format": "png"
    }'>
</div>
</div>

[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

<hr>


{% include hint.md title="Works with PNG's only" text="Transparency is only supported by the **PNG** file format. By default, all images are rendered as PNG's. If you render the image as a JPG or Webp, the background will be white." %}


{% include code_footer.md version=3 %}

