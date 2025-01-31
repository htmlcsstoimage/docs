---
layout: page
title: render_when_ready
permalink: /parameters/render_when_ready/
parent: Parameters
nav_order: 8
description: >-
  Control when your image is generated by using the render_when_ready parameter.
---
# Render when ready
{: .no_toc }
{: .fs-9 }

Control exactly when your image gets rendered.
{: .fs-6 .fw-300 }

<hr>

The `render_when_ready` parameter allows you total control over when the API generates the image for you.

Set the parameter to `true` and the API will wait to generate the screenshot until it sees an element on the page with the ID `HCTIReadyNow`.


to call the JavaScript function `ScreenShotReady()` before it generates the image.

## JavaScript Helper

For images generated with HTML/CSS (this does not work for [URL to Image](/getting-started/url-to-image), we have added a helper function `ScreenshotReady()`.

Once `ScreenshotReady()` is called, an element with `HCTIReadyNow` will be added to the page. This will trigger the API to generate the image.


```html
<div>Hello, world.</div>

<script>
  setTimeout(function(){ ScreenshotReady() }, 2000);
</script>
```

This will call `ScreenshotReady()` after 2 seconds. Delaying the API from generating the image.

## Using with URL to Image

When using [URL to Image](/getting-started/url-to-image), you can trigger the rendering of the image by placing an element on the page with the ID `HCTIReadyNow`.

The JavaScript helper is not available for URL to Image, since we do not have full control over the page.

## When to use this

This parameter is most useful for images with complex JavaScript and you need the image generated at a specific time.

For most images, this will not be needed and the API will automatically take the image once all of the HTML is done loading.

Alternatively, the [`ms_delay`](/getting-started/using-the-api/#additional-parameters) parameter could be useful to you. It allows you to set a specific amount of time before the image is generated.

{% include code_footer.md version=1 %}
