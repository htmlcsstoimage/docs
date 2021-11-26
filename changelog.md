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
- PDF support
- WYSIWYG image editor. Making it easier for people to design images for use with the API.
- Image template API.

If you have feature requests, please send them to us: support@htmlcsstoimage.com.

<hr>
### Dashboard improvements
November 21, 2021
{: .text-delta}

We have added a `usage` endpoint to the API. This exposes the amount of images your account has created in hourly, daily and monthly rollups. [Learn more](/getting-started/using-the-api#checking-account-usage).


### Dashboard improvements
October 29, 2021
{: .text-delta}

We released several improvements to the dashboard and invoices based on your feedback.

<hr>
### Large image performance improvements
July 23, 2021
{: .text-delta}

We made a handful of performance improvements for large image rendering speed.


<hr>
### Zapier integration updated
June 12, 2021
{: .text-delta}

Released a new version of the Zapier integration. Making security + performance improvements.

<hr>
### Chrome version updated
May 15, 2021
{: .text-delta}

We updated the image renderer to use the newest build of Chrome. This means all of the latest features in Chrome will also render the same through the API.

<hr>
### Hebrew character set updated
April 24, 2021
{: .text-delta}

We released an update to our default fonts to fix a bug where hebrew characters were not rendering properly.

<hr>
### Image console on the dashboard
March 31, 2021
{: .text-delta}

We've made a bunch of improvements to the Dashboard. You can now create images in your own account using the Image Console tab.

You can also create images using URL's from the console. Click the Options tab to see the new url field.

<hr>
### Improvements to transparency rendering
February 16, 2021
{: .text-delta}

<a href="/guides/transparent-background/">Background transparency</a> now also works for images generated from URLs. To do it, pass the following code in your CSS param.

```
body {
  background-color: transparent;
}
```

Note: this will only work for PNG's. Jpeg's do not support transparency.

<hr>
### Demo and example pages now include an options tab
February 4, 2021
{: .text-delta}

We updated the live demo to be even more configurable. Now you can adjust all the options on an image when testing.

We have also been releasing more examples which can be played with inside of the live demo. Give them a try here: <a href="https://htmlcsstoimage.com/examples">HTML/CSS to Image Examples</a>.

<hr>
### Integromat integration updated
January 16, 2021
{: .text-delta}

We released new params to the Integromat integration.

- CSS injection available for URLs.
- `selector` for specifying a CSS selector.

<hr>
### New params added to Zapier
January 6, 2021
{: .text-delta}

A new version (1.0.10) of our Zapier plugin has been released. It includes some great new parameters for better control over your images.

- viewport_height
- viewport_width
- ms_delay

We also improved the error messages for when you run into a problem.

<hr>

### Inject custom CSS into a webpage
December 22, 2020
{: .text-delta}

When using [URL to Image](/getting-started/url-to-image), you can now inject CSS into the page. This is useful for cases where you want to customize your screenshot of the page. Allowing you to do things like hide specific elements on the page
(such as annoying popups or cookie banners). To get started with it, pass along the css param when using URL to image. This is now available on Zapier and soon will also be working for Integromat.

### Zapier integration updated to 1.0.7
December 20, 2020
{: .text-delta}

We've released a new version of the Zapier integration. It now gives you even more configuration options when creating images. For URL images, you'll now see a CSS field. This allows you to inject CSS into the webpage.
Making it easy to customize how the page looks.

We have also added the `selector` field to the normal Create image action. This allows you to target a specific CSS selector in your HTML and we'll crop the image to that element.

### Improvements to image deletion
December 13, 2020
{: .text-delta}

We've improved image deletion. Previously, images might take several minutes to be uncached and deleted everywhere. Now they are removed almost instantly. For more information, learn how to 
[delete an image](/getting-started/using-the-api/#deleting-an-image).


<hr>
### Full screen parameter added to Integromat
November 13, 2020
{: .text-delta}

Integromat now has the full_screen parameter available. When set to true the entire height of the page will be included in the image.


<hr>
### Additional font rendering improvements
November 1, 2020
{: .text-delta}

We released another improvement to default font rendering. Fixing character widths when "Helvetica Neue" is specified as the default font family.

<hr>
### Ruby client update
October 2, 2020
{: .text-delta}

We released a patch update to the [HTML/CSS to Image Ruby Client](https://github.com/htmlcsstoimage/ruby-client). It fixes an issue with 
`addressable` not being loaded.

<hr>
### Font rendering improvements
September 30, 2020
{: .text-delta}

We have released a large update to the fonts available to the API. Previously, we were missing some character sets and some images would show an
empty square instead of the correct character. Our goal is to be able to perfectly render text from any language.

If you notice any more missing characters, please send us the image URL so that we can investigate it.

<hr>
### Various performance improvements released
September 10, 2020
{: .text-delta}

We've been working on further improving the performance of the API. Initial image renders are now ~30% faster. We have also improved caching of images.
When cached, you can expect an average of 30-50ms when downloading an image.

<hr>
### Zapier plugin released from beta!
August 31, 2020
{: .text-delta}
The HTML/CSS to Image Zapier integration has graduated from beta. Zapier wrote up a [nice blog post about the integration](https://zapier.com/blog/updates/2370/new-integration-htmlcss-image).
It's become very popular quickly and we've seen many inventive ways people are improving their businesses through automated image generation.

- [HTML/CSS to Image Zapier integration](https://docs.htmlcsstoimage.com/integrations/zapier)

<hr>
### New Live Editor
August 16, 2020
{: .text-delta}
We've rebuilt the live demo. Now you can preview your HTML/CSS as you edit it. Then click the *image* button to see it converted into an image.
This makes it much easier to prototype your images inside a browser.

- [HTML/CSS to Image Demo](https://htmlcsstoimage.com/demo)

<hr>
### Ruby Client released
August 7, 2020
{: .text-delta}
We have released the first version of our new ruby client. This allows for easier integration with the API using Ruby.

- [HTML/CSS to Image Ruby Client](https://github.com/htmlcsstoimage/ruby-client)


### Integromat updates
August 3, 2020
{: .text-delta}
We've added additional parameters to the Integromat integration. You can now use `selector`, `ms_delay` and `device_scale`.

- [HTML/CSS to Image Integromat Integration](/integrations/integromat/)

### Template API
July 27, 2020
{: .text-delta}
The Template API is now available. With templates, you can create re-usable HTML that contains variables.
These variables can be replaced when creating an image, making for even simpler image generation.

- [HTML/CSS to Image Template API](/getting-started/templates/)

<hr>

### Render when ready
July 26, 2020
{: .text-delta}
We have added the [`render_when_ready` parameter to image creation](/guides/render-when-ready/). This gives you control over when the image is rendered.

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
December 12, 2019
{: .text-delta}
We have added the [Delete endpoint](/getting-started/using-the-api/#deleting-an-image). You can now delete an image and it will be completely removed from our servers. Requests to the image URL will return 410.

<hr>

### Integromat integration
November 29, 2019
{: .text-delta}
Our [Integromat integration](/integrations/integromat) is now available. You can use the integration to connect HTML/CSS to Image with the thousands of integrations available on Integromat.

<hr>
