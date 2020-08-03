---
layout: page
title: Duplicate image detection
permalink: /guides/duplicate-image-detection/
parent: Guides
nav_order: 8
description: >-
  Protecting your image quota from duplicate images. HTML/CSS to Image API.
---
# Duplicate image detection
{: .no_toc }
{: .fs-9 }

Learn how we protect your image quota from endless loops and bugs.
{: .fs-6 .fw-300 }

<hr>

## What happens if I create the same image multiple times?

The API will automatically detect if an API key is creating the same image repeatedly within a short time period. When this happens, a new image will not be created and you will get back the URL to the existing image.

- This protects you from accidentally using up your image quota due to a bug in a script or abuse from a user/robot.

- We use the entire payload sent to the API to determine duplicates. If there a single character difference between images, it will not be considered a duplicate.

{% include hint.md title="FYI" text="This feature should not be relied on for stopping the creation of duplicate images. Duplicate detection happens on our Edge CDN. This means it is geographically dependent. If you create identical images from servers in two different locations, we won't be able to detect that they are the same." %}

## URL Images

Duplicate image detection is not enabled for images created from a URL. It only works for images generated with the `html` parameter.


{% include code_footer.md version=1 %}
