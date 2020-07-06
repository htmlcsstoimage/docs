---
title: HTML/CSS to Image API
layout: home
nav_order: 1
---

# HTML/CSS to Image API
{: .fs-9 }

Your search for pixel perfect image generation ends here.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }
<hr>

The API for generating high quality images from HTML/CSS. No yak shaving required.

- converts HTML to `png`, `jpg` or `webp`
- screenshot any `url`
- no janky fonts, or blurry images

<hr>

## Converting HTML to a png
This image was created using just HTML/CSS and the HCTI API.

<div class="code-example" markdown="1">
  <div class="hcti-container">
    <img
      alt="Image generated with HTML/CSS to Image."
      loading="lazy"
      ix-path="/assets/images/dog-rates-example.png"
      sizes="400px"
      ix-params='{
        "w": 400,
        "format": "auto"
      }'>
  </div>
</div>
```html
<div class="p-4 text-center mt-4" style="width: 500px">
  <span class="tweet-text mb-4">
    This is Little Bear. He tolerates baths because he knows how phenomenal his
    floof will appear afterwards. 13/10
  </span>
  <div class="mt-2 p-4">
    <img src="https://pbs.twimg.com/profile_images/1267972589722296320/XBr04M6J_400x400.jpg" class="rounded-circle shadow border mt-4" width="100px">
  </div>
  <h4 class="mt-2">
    WeRateDogs
  </h4>
  <span class="text-muted">@dog_rates</span>
</div>

<!-- Include external CSS, JavaScript or Fonts! -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap" rel="stylesheet">
```


[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

<hr>

## Quick start example code

To get started quickly, take a look at our example code.

- [PHP](/example-code/php)
- [JavaScript](/example-code/javascript)
- [Ruby](/example-code/ruby)
- [Python](/example-code/python)
- [GoLang](/example-code/go)
- [C#](/example-code/c)
- [Curl](/example-code/curl)
- [VB.NET](/example-code/vb.net)

Prefer #NoCode? We also integrate with **[Zapier](getting-started/zapier-integration)** and **[Integromat](getting-started/integromat-integration)**.

{% include hint.md title="Works with any language" text="Your favorite language not here? Don't worry, we work with any language or framework. See the [curl](example-code/curl.md) example for how to make a request. [Email us](mailto:support@htmlcsstoimage.com) if you need help getting started. We'd love to add more example code here." %}

## Image Examples

Your imagination is the only limit. We render HTML/CSS just like Google Chrome. Here are a few examples of ways people have used the API to automate their image generation.

### Social Images: Dev.to

[Dev.to](https://dev.to) uses the API to autogenerate thousands of custom images for Twitter and Facebook.

<img
  alt="Social card generated from HTML."
  loading="lazy"
  ix-path="/assets/images/image%20%2823%29.png"
  sizes="400px"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>


To see how they do it, [take a look at their code](https://github.com/thepracticaldev/dev.to/blob/master/app/controllers/social_previews_controller.rb) \(it's open source!\).

### Product Hunt Makers Social Cards

<img
  alt="Product Hunt social card generated from HTML."
  loading="lazy"
  ix-path="/assets/images/f356dffe-d99f-487e-bb16-74dc076c0657.jpeg"
  sizes="400px"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>


Product Hunt uses HTML/CSS to Image to dynamically generate social cards for Maker Goals.

Source code for this example on [CodePen](https://codepen.io/ayrtonbe/pen/ZmWBMw).

### Remote Stories Social Cards

<img
  alt="Remote stories social card"
  ix-path="/assets/images/7e2da2be-7328-4746-ae69-418b295360ae.jpeg"
  loading="lazy"
  sizes="400px"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

Source code for this example on [CodePen](https://codepen.io/ayrtonbe/pen/pQLyKN).

### Highlighted Text Shots

Generate images from your users comments. Add the ability to highlight and share.

<img
  alt="User comment text shot"
  ix-path="/assets/images/textshot2.png"
  sizes="400px"
  loading="lazy"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

Source code for this example on [CodePen](https://codepen.io/mscccc/pen/yRzBWP).

### Auto Generated Job Listing

Generate images from job listings for sharing in emails, ads or social media.

<img
  alt="HTML to image for a job ad"
  ix-path="/assets/images/jobad.jpeg"
  sizes="400px"
  loading="lazy"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

Source code for this example on [CodePen](https://codepen.io/mscccc/pen/xyXKrj).

### Full Webpage Screenshots

Pass a URL or entire webpage to the API to generate a full page screenshot. Here we passed [stripe.com](https://stripe.com)'s to the API.

<img
  alt="Convert a url to an image"
  ix-path="/assets/images/stripe.png"
  sizes="400px"
  loading="lazy"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

### Resize on the Fly

Once an image is generated, use query params to adjust to any size you need with the **width** and **height** params. When only one param is passed, the API will maintain the aspect ratio of the original image.

**?width=400**

<img
  alt="Adjust width"
  ix-path="/assets/images/w400.jpeg"
  sizes="400px"
  loading="lazy"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

**?width=400&height=400**

<img
  alt="Adjust width and height"
  loading="lazy"
  ix-path="/assets/images/w400h400.jpeg"
  loading="lazy"
  sizes="400px"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

**?height=300**

<img
  alt="Adjust height only"
  loading="lazy"
  ix-path="/assets/images/h300.jpeg"
  sizes="400px"
  loading="lazy"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

<hr>

## Get an API key

To use this API, you'll first need an API key. You may retrieve one by [signing up here](https://htmlcsstoimage.com).

<a href="https://htmlcsstoimage.com" target="_blank">Free API Key</a>{: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 }
[API Docs](/api-endpoints){: .btn .fs-5 .mb-4 .mb-md-0 }
