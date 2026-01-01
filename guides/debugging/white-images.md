---
layout: page
title: White or blank images
permalink: /guides/debugging/white-images/
parent: Debugging
grand_parent: Guides
nav_order: 3
description: >-
  How to fix getting a white or blank image on HTML/CSS to Image API
---
# Debugging white or blank images
{: .no_toc }
{: .fs-9 }

Troubleshooting guide
{: .fs-6 .fw-300 }
<hr>

<img src='{% hcti_image_url {"template_id":"t-9f6526a7-aa2c-4fbb-8723-06eff1c60e89", "title": "{{page.title}}" }%}' width="400px" alt="debugging white or blank images with HTML/CSS to Image" />

## Why is my image white or blank?
When rendering your image, the API makes its best guess at when your HTML or webpage is ready to be turned into an image.

We do this by waiting for the pages `load` event to fire. We then monitor for additional network traffic (such as external CSS or images) to complete before
generating the image. This works well for most cases, but occasionally can cause problems for content that may be slow to load. 

## Solution: `ms_delay`

The `ms_delay` parameter gives you more control over when the API generates the image. By setting this, the API will delay the rendering of the image by
the number of milliseconds you set. We recommend starting with `500` and increasing from there.

## Solution: `render_when_ready`

The `render_when_ready` param gives you exact control over when the API generates the image. When this is set to true, the API will wait to render the image
until a JavaScript function is called, or a special element is added to the page. [Learn more about render_when_ready](/parameters/render_when_ready/).


{% include code_footer.md version=2 %}


