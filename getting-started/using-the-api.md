---
layout: page
title: Using the API
permalink: /getting-started/using-the-api/
parent: Getting started
nav_order: 1
---
# Using the HTML/CSS to Image API
{: .no_toc }
{: .fs-9 }

Generate images from HTML and CSS.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }

<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

<hr>

## Authentication
The API uses [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). 

- Your username is your **User ID** and your password is your **API Key**. Both of these are available from the [dashboard](https://htmlcsstoimage.com/dashboard). The code samples demonstrate how to authenticate your request.
- Treat your API Key like a password. If exposed, it could be used to create images using your account.

## Creating an image

To generate an image, make an HTTP request to the API.

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io<b>/v1/image</b>
</pre>

### Parameters

The create image endpoint accepts the following parameters. Accepted as either `json` or `formdata`.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **html**<span class="text-red-200">*</span>           | `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. |
| **url**<span class="text-red-200">*</span>          | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |

{% include hint.md title="Required params" text="For creating an image, either `url` or `html` are required. `css` is optional." %}

<hr>

### Additional parameters

Optional parameters for greater control over your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/guides/using-google-fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |

<hr>

### Example responses
```
STATUS: 201 CREATED
```

```javascript
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

```
STATUS: 400 BAD REQUEST
```

```javascript
{
  "error": "Bad Request",
  "statusCode": 400,
  "message": "HTML is Required"
}
```

```
STATUS: 429 TOO MANY REQUESTS
```

```javascript
{
    "error": "Plan limit exceeded",
    "statusCode": 429,
    "message": "You've used 3055 of your 3000 renders. Upgrade via the Dashboard: https://htmlcsstoimage.com/dashboard"
}
```

<hr>

## Getting an image

After creating an image, you can use the returned URL to either download your image, or use it directly in your website.

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/image/:image_id</b>
</pre>

This URL is permanent for as long as your account is active. It's automatically cached and optimized by Cloudflare's global content delivery network. You can use it directly on your webpages and not worry about hurting your page speed score.

* **Lossless optimization:** each image is optimized with no change in image quality.
* **Global cache:** the image is cached near your users to reduce latency.

### File formats

The API supports `jpg`, `png` and `webp`. If no file extension is passed, you'll get back a png by default. If you need a different file format, adjust the extension on the url.

| **Format** | **Example** |
| :--- | :--- |
| png | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.png` |
| jpg | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.jpg` |
| webp | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.webp` |

{% include hint.md title="PNG by default" text="The API returns `png` by default. If no extension is on the URL, a png will be generated." %}

### Query parameters

Query parameters can be added to the URL to adjust your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **height** | `Integer` | The height of the image. Maximum `5000`. |
| **width**  | `Integer`  | The width of the image. Maximum `5000`. |
| **dl**     | `Integer` | Set `dl=1` and the image will be served as a downloadable attachment. |

<hr>

## Deleting an image

<pre class="http-method fs-4">
  <span>delete</span> https://hcti.io<b>/v1/image/:image_id</b>
</pre>

To delete an image using the API, you can send a **DELETE** request to your image URL. This will remove your image from our servers and clear the caching for the image in our CDN. 

Because our CDN servers are distributed throughout the world, it may take a few minutes for this to take effect.

### Example response
```
STATUS: 202 ACCEPTED
```

{% include code_footer.md version=1 %}
