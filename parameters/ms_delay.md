---
layout: page
title: ms_delay
permalink: /parameters/ms_delay/
parent: Parameters
nav_order: 2
description: >-
  The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.
---
# Using ms_delay
{: .no_toc }
{: .fs-9 }

Learn how to adjust the delay time in your image rendering
{: .fs-6 .fw-300 }

<hr>

## How it works

The `ms_delay` parameter can be used to increase the time that the API waits for the page
to render before generating the screenshot.

This is useful for pages that load a lot of assets such as JavaScript, or in general are slow to load.

By default the API will wait `500` milliseconds for each external asset to load before triggering
the screenshot. If assets are taking longer than `500` milliseconds, the API will stop waiting for them.

If you are having issues with white or blank images, we recommend adjusting this parameter first to see if it helps.
Start with a fairly low value, such as `1500`.

## Image credits and billing

The maximum value for `ms_delay` is 20 seconds (20,000ms). Usage above `5000` will use an additional image render credit for every 5000ms above.
For example, using `ms_delay` of 10000ms on an image will count as 2 images towards your monthly quota. 15000ms will use 3 image credits.
