---
description: Introduction and examples for the HTML/CSS to Image API.
---

# HTML/CSS to Image API

## Converting HTML/CSS into images

No dependencies to manage. Super [simple HTTP API](getting-started/creating-an-image.md). We've figured out the complexities and details of rendering images from HTML for you.

Your code is run in an isolated instance of Google Chrome. Allowing us to replicate the exact, high quality image you're looking for.

Built in support for [Google Fonts](advanced-examples/using-google-fonts.md), emoji rendering, CSS3 and HTML5.

## Examples

The API can be used to programmatically render images from any HTML/CSS. Autogenerate images from your applications backend.

### Social Sharing Cards

Generate social cards for your content on the fly. Fill in your `og:image` tags automatically, resulting in more sharing and clicks across Twitter and Facebook. Here's an example.

![URL: https://hcti.io/v1/image/dbd3b3f1-a266-42bb-808c-c565bb752af4?width=600](.gitbook/assets/dbd3b3f1-a266-42bb-808c-c565bb752af4-1.jpeg)

Source code for this example on [CodePen](https://codepen.io/mscccc/pen/eLRLQq).

### Product Hunt Makers Social Cards

![https://www.producthunt.com/@syswarren/goals/16979](.gitbook/assets/f356dffe-d99f-487e-bb16-74dc076c0657.jpeg)

  
Product Hunt uses HTML/CSS to Image to dynamically generate social cards for Maker Goals. Try tweeting this link: [https://www.producthunt.com/@syswarren/goals/16979](https://www.producthunt.com/@syswarren/goals/16979) to see how it looks.

![Twitter card preview](.gitbook/assets/image-2018-11-21-at-10.54.37-am.png)

### Highlighted Text Shots

Generate images from your users comments. Add the ability to highlight and share.

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c](.gitbook/assets/textshot2.png)

  
Source code for this example on [CodePen](https://codepen.io/mscccc/pen/yRzBWP).

### Auto Generated Job Listing

Generate images from job listings for sharing in emails, ads or social media.

![URL: https://hcti.io/v1/image/3bf60f9f-579f-4a88-8534-a1a936ffd15e?width=600](.gitbook/assets/jobad.jpeg)

Source code for this example on [CodePen](https://codepen.io/mscccc/pen/xyXKrj).

### Full Webpage Screenshots

Pass an entire webpage to the API to generate a full page screenshot. Here we passed [stripe.com](https://stripe.com)'s homepage HTML to the API.

![URL: https://hcti.io/v1/image/2ac52eb8-0c20-4ac6-b0e3-06fb5f421f4a](.gitbook/assets/stripe.png)

{% hint style="info" %}
### Full page screenshots

When rendering an entire page, be sure to include all of the markup. Including the `<html>` tags. All external assets \(css, javascript, images\) must be loaded using a full URL. Relative ****paths will not work.
{% endhint %}

### Resize on the Fly

Once an image is generated, use our API to adjust the image to any size you need with the **width** and **height** params. When only one param is passed, the API will maintain the aspect ratio of the original image.

**?width=400**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?width=400](.gitbook/assets/w400.jpeg)

**?width=400&height=400**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?width=400&amp;height=400](.gitbook/assets/w400h400.jpeg)

**?height=300**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?height=300](.gitbook/assets/h300.jpeg)

## Get an API key

To use this API, you'll first need an API key. You may retrieve one by [signing up here](https://htmlcsstoimage.com).

## Start creating images from HTML/CSS

Now that you have an API key, get started [creating your first image](getting-started/creating-an-image.md).

## Features

**Superior rendering**

Renders your `<markup>` just like Google Chrome would. Supports CSS3. Get just the look you want.

**Global CDN**

Don't worry about bandwidth. We render once and cache forever. Images served from Cloudflare's global content delivery network.

**Simple HTTP API**

No dependencies to install. Simple [authentication](getting-started/authentication.md). Works with any language, any framework.

**Retina friendly**

Render high resolution `@2X` images. Clean, crisp, ready for any screen resolution.

**Advanced options**

Configurable. Set custom height/width. Built in emoji support. [Set your format](getting-started/file-formats.md): PNG, JPEG or WebP.

**Google Font Support**

Need custom fonts? Use the `google_fonts` parameter to load any font from [Google Fonts](advanced-examples/using-google-fonts.md).

