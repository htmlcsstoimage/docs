---
layout: page
title: Debugging blurry images
permalink: /guides/debugging-blurry-images/
parent: Guides
nav_order: 10
description: >-
  How to fix getting a blurry image on HTML/CSS to Image API
---
# Debugging blury images
{: .no_toc }
{: .fs-9 }

Troubleshooting guide
{: .fs-6 .fw-300 }
<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

<hr>

## Why is my image blurry?
If your rendered image looks low quality, the problem can often be solved with a few quick changes.

## Solution: `device_scale`

For URL images, by default we set the `device_scale` to 1. Try setting it to 2 and seeing if it improves the image quality.
Device scale indicates the pixel density of the browser when generating the image. A setting of 2 is similar to a high resolution screen, 
such as an Apple retina screen.

## Solution: verify resolution of your images

If an image within your HTML looks blurry, it is possible that it has been sized incorrectly.
Check the size of the original included image. If it is 400x400. Then the maximum size it can be rendered as at a 2 `device_scale` is
200x200.



{% include code_footer.md version=1 %}
