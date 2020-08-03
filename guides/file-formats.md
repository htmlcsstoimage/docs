---
layout: page
title: File formats
permalink: /guides/file-formats/
parent: Guides
nav_order: 2
description: >-
  HTML/CSS to Image supports converting html into png, jpg or webp. Learn how to specify the format of your image.
---
# File formats
{: .no_toc }
{: .fs-9 }

Convert images from HTML to jpg, png or webp.
{: .fs-6 .fw-300 }

<hr>

## File formats

The API supports `jpg`, `png` and `webp`. If no file extension is passed, you'll get back a png by default. If you need a different file format, adjust the extension on the url.

| **Format** | **Example** |
| :--- | :--- |
| jpg | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.jpg` |
| png | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.png` |
| webp | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.webp` |

## Automatic next-gen format (WebP) - enabled for all customers

It's [recommend by Google to serve your images](https://web.dev/uses-webp-images/) in next-gen formats (such as WebP).

- Improves your pagespeed
- Increases SEO

Our edge servers will detect the browser being used to download an image. If the browser supports WebP, the image will be served in WebP.

- This is enabled for all paid customers.
