---
description: >-
  Introduction and examples for the HTML/CSS to Image API. Convert html to an
  image  (jpg, png, webp). Renders images exactly like Google Chrome.
---

# HTML/CSS to Image API

## Quick start

Rendering your first image takes 5 minutes. Pick your language.

{% page-ref page="example-code/ruby.md" %}

{% page-ref page="example-code/php.md" %}

{% page-ref page="getting-started/zapier-integration.md" %}

{% page-ref page="example-code/javascript.md" %}

{% page-ref page="example-code/c.md" %}

{% page-ref page="example-code/vb.net.md" %}

{% page-ref page="example-code/go.md" %}

{% page-ref page="example-code/curl.md" %}

{% page-ref page="example-code/python.md" %}

Your language not here? We work with any language or framework. See the [curl](example-code/curl.md) example for how to make a request. [Email us](mailto:support@htmlcsstoimage.com) if you need help getting started. We'd love to add more example code here.

## Examples

The API can be used to programmatically render images from any HTML/CSS. Autogenerate images from your applications backend.

### Social Sharing Cards

Generate social cards for your content on the fly. Fill in your `og:image` tags automatically, resulting in more sharing and clicks across Twitter and Facebook. Here's an example.

![URL: https://hcti.io/v1/image/dbd3b3f1-a266-42bb-808c-c565bb752af4?width=600](.gitbook/assets/dbd3b3f1-a266-42bb-808c-c565bb752af4-1.jpeg)

Source code for this example on [CodePen](https://codepen.io/mscccc/pen/eLRLQq).

### Product Hunt Makers Social Cards

![https://www.producthunt.com/@syswarren/goals/16979](.gitbook/assets/f356dffe-d99f-487e-bb16-74dc076c0657.jpeg)

Product Hunt uses HTML/CSS to Image to dynamically generate social cards for Maker Goals.

Source code for this example on [CodePen](https://codepen.io/ayrtonbe/pen/ZmWBMw).

### Remote Stories Social Cards

![https://hcti.io/v1/image/7e2da2be-7328-4746-ae69-418b295360ae](.gitbook/assets/7e2da2be-7328-4746-ae69-418b295360ae.jpeg)

Source code for this example on [CodePen](https://codepen.io/ayrtonbe/pen/pQLyKN).

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

When rendering an entire page, be sure to include all of the markup. Including the `<html>` tags. All external assets \(css, javascript, images\) must be loaded using a full URL. **Relative paths will not work**.
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

{% page-ref page="getting-started/creating-an-image.md" %}

