---
title: Changelog
layout: page
permalink: /changelog/
description: Learn about what we're improving for the HTML/CSS to Image API.
nav_order: 20
---

# Changelog
{: .fs-9 }

Always improving. Updates to HTML/CSS to Image are posted here.
{: .fs-6 .fw-300 }

<hr>

### What we're currently working on
- WYSIWYG image editor. Making it easier for people to design images for use with the API.
- Image template API.
- Improved demo for the homepage.
- Improving the dashboard with more information about your account.

If you have feature requests, please send them to us: support@htmlcsstoimage.com.

<hr>

### Render when ready
July 28, 2020
{: .text-delta}
We have added the [`render_when_ready` parameter to image creation](guides/render-when-ready/). This gives you control over when the image is rendered.

By setting `render_when_ready` to `true`, we will wait to generate the image until your HTML calls the `ScreenshotReady()` function in JavaScript.

This is useful for images that have complex JS and you need control over when it's ready to have an image created.

<hr>

### New Zapier templates
July 22, 2020
{: .text-delta}
We have added additional Zapier templates to the integration. You can see them here: [HTML/CSS to Image Templates](https://zapier.com/apps/htmlcss-to-image/integrations#zap-template-list).

<hr>

### Introducing the US-EAST region
July 7, 2020
{: .text-delta}
We have enabled our US-EAST region. Your API requests will now be automatically routed to either US-WEST or US-EAST based on where you ae located.
This will improve latency for requests as well as reliability of the API. We will automatically fail over to the other region is one is unhealthy.

We plan to introduce an EU region in the future.

<hr>

### Brand new docs site
July 5, 2020
{: .text-delta}
We've released a new version of our documentation website. It's now simpler, faster & we've improved the organization of all the content.
Please send us any feedback.

<hr>

### URL to Image performance improvements
July 17, 2020
{: .text-delta}
We have been working on performance improvements to URL to Image. We've improved reliability when screenshotting webpages with large amounts of network requests and JavaScript.

<hr>

### URL to Image
March 27, 2020
{: .text-delta}
We've added the ability to create images from URL's. We're calling this URL to Image. [Learn more](/getting-started/url-to-image).

<hr>

### ms_delay parameter
February 12, 2020
{: .text-delta}
We have added the `ms_delay` parameter. Allowing you to specify how long you want the rendered to wait before generating the image. Useful for HTML with many assets or JavaScript that needs extra time to load.

<hr>

### Deleting images
December 12, 2020
{: .text-delta}
We have added the [Delete endpoint](/getting-started/using-the-api/#deleting-an-image). You can now delete an image and it will be completely removed from our servers. Requests to the image URL will return 410.

<hr>
