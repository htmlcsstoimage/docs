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
| **css** | `String` | The CSS for your image. When using with `url` it will be injected into the page. |
| **url**<span class="text-red-200">*</span>          | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |

{% include hint.md title="Required params" text="For creating an image, either `url` or `html` are required. `css` is optional." %}

<hr>

### Additional parameters

Optional parameters for greater control over your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/guides/using-google-fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A [CSS selector](/guides/selector/) for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/guides/render-when-ready/). |
| **full_screen**   | `Boolean` | When set to true, the API will generate an image of the entire height of the page. |
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

All data and copies of the image are deleted. This cannot be undone.

### Example response
```
STATUS: 202 ACCEPTED
```

## Checking account usage

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/usage</b>
</pre>

To check your account usage, you can make a request to the `usage` endpoint. It will return the total images created for your account rolled up into different time periods.

We recommend using this endpoint for tracking your usage in tools such as Datadog.

### Example response
```
STATUS: 200 OK
```

```javascript
{
  "data": {
    "hour": {
      "2021-11-14T14:00:00Z": 54,
      "2021-11-14T15:00:00Z": 56,
      "2021-11-14T16:00:00Z": 56,
      "2021-11-14T17:00:00Z": 57,
      "2021-11-14T18:00:00Z": 59,
      "2021-11-14T19:00:00Z": 55,
      "2021-11-14T20:00:00Z": 58,
      "2021-11-14T21:00:00Z": 54,
      "2021-11-14T22:00:00Z": 57,
      "2021-11-14T23:00:00Z": 57,
      "2021-11-15T00:00:00Z": 60,
      "2021-11-15T01:00:00Z": 56,
      "2021-11-15T02:00:00Z": 56,
      "2021-11-15T03:00:00Z": 55,
      "2021-11-15T04:00:00Z": 57,
      "2021-11-15T05:00:00Z": 55,
      "2021-11-15T06:00:00Z": 55,
      "2021-11-15T07:00:00Z": 56,
      "2021-11-15T08:00:00Z": 55,
      "2021-11-15T09:00:00Z": 60,
      "2021-11-15T10:00:00Z": 62,
      "2021-11-15T11:00:00Z": 60,
      "2021-11-15T12:00:00Z": 62,
      "2021-11-15T13:00:00Z": 62,
      "2021-11-15T14:00:00Z": 62,
      "2021-11-15T15:00:00Z": 61,
      "2021-11-15T16:00:00Z": 61,
      "2021-11-15T17:00:00Z": 60,
      "2021-11-15T18:00:00Z": 61,
      "2021-11-15T19:00:00Z": 64,
      "2021-11-15T20:00:00Z": 61,
      "2021-11-15T21:00:00Z": 61,
      "2021-11-15T22:00:00Z": 62,
      "2021-11-15T23:00:00Z": 63,
      "2021-11-16T00:00:00Z": 62,
      "2021-11-16T01:00:00Z": 62,
      "2021-11-16T02:00:00Z": 60,
      "2021-11-16T03:00:00Z": 60,
      "2021-11-16T04:00:00Z": 62,
      "2021-11-16T05:00:00Z": 53,
      "2021-11-16T06:00:00Z": 60,
      "2021-11-16T07:00:00Z": 60,
      "2021-11-16T08:00:00Z": 60,
      "2021-11-16T09:00:00Z": 60,
      "2021-11-16T10:00:00Z": 60,
      "2021-11-16T11:00:00Z": 60,
      "2021-11-16T12:00:00Z": 68,
      "2021-11-16T13:00:00Z": 62,
      "2021-11-16T14:00:00Z": 61,
      "2021-11-16T15:00:00Z": 60,
      "2021-11-16T16:00:00Z": 60,
      "2021-11-16T17:00:00Z": 65,
      "2021-11-16T18:00:00Z": 63,
      "2021-11-16T19:00:00Z": 60,
      "2021-11-16T20:00:00Z": 60,
      "2021-11-16T21:00:00Z": 60,
      "2021-11-16T22:00:00Z": 62,
      "2021-11-16T23:00:00Z": 61,
      "2021-11-17T00:00:00Z": 60,
      "2021-11-17T01:00:00Z": 60,
      "2021-11-17T02:00:00Z": 65,
      "2021-11-17T03:00:00Z": 63,
      "2021-11-17T04:00:00Z": 62,
      "2021-11-17T05:00:00Z": 63,
      "2021-11-17T06:00:00Z": 63,
      "2021-11-17T07:00:00Z": 64,
      "2021-11-17T08:00:00Z": 63,
      "2021-11-17T09:00:00Z": 64,
      "2021-11-17T10:00:00Z": 60,
      "2021-11-17T11:00:00Z": 61,
      "2021-11-17T12:00:00Z": 61,
      "2021-11-17T13:00:00Z": 29
    },
    "day": {
      "2021-09-19T00:00:00Z": 1569,
      "2021-09-20T00:00:00Z": 1722,
      "2021-09-21T00:00:00Z": 1604,
      "2021-09-22T00:00:00Z": 1560,
      "2021-09-23T00:00:00Z": 1571,
      "2021-09-24T00:00:00Z": 1627,
      "2021-09-25T00:00:00Z": 1660,
      "2021-09-26T00:00:00Z": 1527,
      "2021-09-27T00:00:00Z": 1588,
      "2021-09-28T00:00:00Z": 1549,
      "2021-09-29T00:00:00Z": 1523,
      "2021-09-30T00:00:00Z": 1662,
      "2021-10-01T00:00:00Z": 1556,
      "2021-10-02T00:00:00Z": 1585,
      "2021-10-03T00:00:00Z": 1539,
      "2021-10-04T00:00:00Z": 1556,
      "2021-10-05T00:00:00Z": 1487,
      "2021-10-06T00:00:00Z": 1580,
      "2021-10-07T00:00:00Z": 1498,
      "2021-10-08T00:00:00Z": 1485,
      "2021-10-09T00:00:00Z": 1474,
      "2021-10-10T00:00:00Z": 1487,
      "2021-10-11T00:00:00Z": 1513,
      "2021-10-12T00:00:00Z": 1477,
      "2021-10-13T00:00:00Z": 1464,
      "2021-10-14T00:00:00Z": 1458,
      "2021-10-15T00:00:00Z": 1452,
      "2021-10-16T00:00:00Z": 1477,
      "2021-10-17T00:00:00Z": 1471,
      "2021-10-18T00:00:00Z": 1482,
      "2021-10-19T00:00:00Z": 1499,
      "2021-10-20T00:00:00Z": 1504,
      "2021-10-21T00:00:00Z": 1530,
      "2021-10-22T00:00:00Z": 1502,
      "2021-10-23T00:00:00Z": 1501,
      "2021-10-24T00:00:00Z": 1486,
      "2021-10-25T00:00:00Z": 1475,
      "2021-10-26T00:00:00Z": 1469,
      "2021-10-27T00:00:00Z": 1460,
      "2021-10-28T00:00:00Z": 1451,
      "2021-10-29T00:00:00Z": 1443,
      "2021-10-30T00:00:00Z": 1447,
      "2021-10-31T00:00:00Z": 1443,
      "2021-11-01T00:00:00Z": 1455,
      "2021-11-02T00:00:00Z": 1473,
      "2021-11-03T00:00:00Z": 1482,
      "2021-11-04T00:00:00Z": 1463,
      "2021-11-05T00:00:00Z": 1472,
      "2021-11-06T00:00:00Z": 1452,
      "2021-11-07T00:00:00Z": 1469,
      "2021-11-08T00:00:00Z": 1478,
      "2021-11-09T00:00:00Z": 1494,
      "2021-11-10T00:00:00Z": 1469,
      "2021-11-11T00:00:00Z": 1471,
      "2021-11-12T00:00:00Z": 1465,
      "2021-11-13T00:00:00Z": 1462,
      "2021-11-14T00:00:00Z": 1336,
      "2021-11-15T00:00:00Z": 1427,
      "2021-11-16T00:00:00Z": 1461,
      "2021-11-17T00:00:00Z": 838
    },
    "month": {
      "2020-12-01T00:00:00Z": 44847,
      "2021-01-01T00:00:00Z": 44973,
      "2021-02-01T00:00:00Z": 43263,
      "2021-03-01T00:00:00Z": 59095,
      "2021-04-01T00:00:00Z": 56422,
      "2021-05-01T00:00:00Z": 50747,
      "2021-06-01T00:00:00Z": 46309,
      "2021-07-01T00:00:00Z": 46777,
      "2021-08-01T00:00:00Z": 48160,
      "2021-09-01T00:00:00Z": 47341,
      "2021-10-01T00:00:00Z": 46251,
      "2021-11-01T00:00:00Z": 24167
    }
  },
  "per_billing_period": [
    {
      "total_images": 439,
      "start": "2018-11-02T22:57:29.015Z",
      "end": "2018-12-02T22:57:29.015Z"
    },
    {
      "total_images": 3744,
      "start": "2018-12-02T22:57:29.015Z",
      "end": "2019-01-01T22:57:29.015Z"
    },
    {
      "total_images": 595,
      "start": "2019-01-01T22:57:29.015Z",
      "end": "2019-01-31T22:57:29.015Z"
    },
    {
      "total_images": 123570,
      "start": "2019-01-31T22:57:29.015Z",
      "end": "2019-03-02T22:57:29.015Z"
    },
    {
      "total_images": 55398,
      "start": "2019-03-02T22:57:29.015Z",
      "end": "2019-04-01T22:57:29.015Z"
    },
    {
      "total_images": 40935,
      "start": "2019-04-01T22:57:29.015Z",
      "end": "2019-05-01T22:57:29.015Z"
    }
  ]
}
```

{% include code_footer.md version=1 %}
