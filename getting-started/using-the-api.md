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

{% include hint.md title="Using Cursor or Claude Code?" text="Generate images without writing code using our [MCP Server integration](/integrations/mcp/)." %}

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
| **html**† | `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. When using with `url` it will be injected into the page. |
| **url**† | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |

{% include hint.md title="Required params" text="† Either `url` OR `html` is required, but not both. `css` is optional." %}

<hr>

### Additional parameters

Optional parameters for greater control over your image.

{% include additional_parameters.md %}

<hr>

### Example responses
```
STATUS: 200 OK
```

```javascript
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d",
  "id": "be4c5118-fe19-462b-a49e-48cf72697a9d"
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

The API supports `jpg`, `png`, `webp`, and `pdf`. If no file extension is passed, you'll get back a png by default. If you need a different file format, adjust the extension on the url.

| **Format** | **Example** |
| :--- | :--- |
| png | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.png` |
| jpg | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.jpg` |
| webp | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.webp` |
| pdf | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e.pdf` |

{% include hint.md title="PNG by default" text="The API returns `png` by default. If no extension is on the URL, a png will be generated." %}

### Query parameters

Query parameters can be added to the URL to adjust your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **height** | `Integer` | The height of the image. Maximum `5000`. |
| **width**  | `Integer`  | The width of the image. Maximum `5000`. |
| **dpi**  | `Integer`  | Sets the DPI metadata tag on the image. Minimum `30`, maximum `600`. |
| **dl**     | `Integer` | Set `dl=1` and the image will be served as a downloadable attachment. |

### Cropping parameters

Advanced cropping options for precise control over the rendered image region.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **aspect_ratio** | `String` | Crop to a specific aspect ratio. Format: `width_height` (e.g., `16_9`, `1_1`). |
| **x_origin** | `String` | Origin point for x-axis cropping. Accepts pixels (`100px`), percentage (`50%`), or negative values for positioning from the right edge. |
| **y_origin** | `String` | Origin point for y-axis cropping. Accepts pixels (`100px`), percentage (`50%`), or negative values for positioning from the bottom edge. |
| **x_1** | `String` | Starting x coordinate for crop region. Use with `x_2` or `crop_width`. |
| **x_2** | `String` | Ending x coordinate for crop region. Must be used with `x_1`. |
| **y_1** | `String` | Starting y coordinate for crop region. Use with `y_2` or `crop_height`. |
| **y_2** | `String` | Ending y coordinate for crop region. Must be used with `y_1`. |
| **crop_width** | `String` | Width of the crop region. Use with `x_1` or alone with `aspect_ratio`. |
| **crop_height** | `String` | Height of the crop region. Use with `y_1` or alone with `aspect_ratio`. |

#### Cropping examples

Here's a base image (600x400 pixels) and how different cropping parameters affect it:

**Original image:**

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1" alt="Original 600x400 image" style="max-width: 100%;" />

**Crop to 1:1 square from center** (`aspect_ratio=1_1&crop_height=100%`):

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1?aspect_ratio=1_1&crop_height=100%25" alt="1:1 aspect ratio crop" style="max-width: 300px;" />

```
?aspect_ratio=1_1&crop_height=100%
```

**Crop left third** (`x_1=0&crop_width=33%`):

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1?x_1=0&crop_width=33%25" alt="Left third crop" style="max-width: 200px;" />

```
?x_1=0&crop_width=33%
```

**Crop center section** (`x_1=33%&x_2=66%`):

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1?x_1=33%&x_2=66%25" alt="Center third crop" style="max-width: 200px;" />

```
?x_1=33%&x_2=66%
```

**Crop right third** (`x_1=-33%&crop_width=33%`):

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1?x_1=-33%&crop_width=33%25" alt="Right third crop" style="max-width: 200px;" />

```
?x_1=-33%&crop_width=33%
```

**Crop to 16:9 aspect ratio** (`aspect_ratio=16_9&crop_width=100%`):

<img src="https://hcti.io/v1/image/019b7577-ecda-7fb7-9179-26c4609288e1?aspect_ratio=16_9&crop_width=100%25" alt="16:9 aspect ratio crop" style="max-width: 100%;" />

```
?aspect_ratio=16_9&crop_width=100%
```

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

## Batch image creation

Create up to 25 images in a single API request. This is more efficient than making multiple individual requests.

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io<b>/v1/image/batch</b>
</pre>

### Parameters

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **default_options** | `Object` | Default parameters applied to all images in the batch. Accepts all standard image creation parameters. |
| **variations** | `Array` | Array of image objects. Each can override `default_options`. Maximum 25 items. |

### Example request

```javascript
{
  "default_options": {
    "css": "body { font-family: sans-serif; }",
    "device_scale": 2
  },
  "variations": [
    { "html": "<div>Image 1</div>" },
    { "html": "<div>Image 2</div>" },
    { "html": "<div>Image 3</div>", "device_scale": 1 }
  ]
}
```

### Example response

```
STATUS: 200 OK
```

```javascript
{
  "images": [
    { "url": "https://hcti.io/v1/image/abc123", "id": "abc123" },
    { "url": "https://hcti.io/v1/image/def456", "id": "def456" },
    { "url": "https://hcti.io/v1/image/ghi789", "id": "ghi789" }
  ]
}
```

### Batch deletion

Delete multiple images at once by sending their IDs.

<pre class="http-method fs-4">
  <span>delete</span> https://hcti.io<b>/v1/image/batch</b>
</pre>

```javascript
{
  "ids": ["abc123", "def456", "ghi789"]
}
```

```
STATUS: 202 ACCEPTED
```

<hr>

## Listing images

Retrieve a list of all images created by your account with pagination support.

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/images</b>
</pre>

### Query parameters

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **count** | `Integer` | Number of images to return. Default `50`, maximum `50`. |
| **page_token** | `String` | Token for pagination. Use `next_page_token` from the previous response. |

### Example response

```
STATUS: 200 OK
```

```javascript
{
  "images": [
    {
      "id": "be4c5118-fe19-462b-a49e-48cf72697a9d",
      "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d",
      "created_at": "2024-03-15T10:30:00Z"
    },
    {
      "id": "a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e",
      "url": "https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e",
      "created_at": "2024-03-14T08:15:00Z"
    }
  ],
  "next_page_token": "eyJsYXN0X2lkIjoiYTNhYjJhYjItOTA2ZS00YjVjLWE4OGQtNDFhMWMzZjM3NzllIn0=",
  "has_next_page": true
}
```

<hr>

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
      "2024-03-14T14:00:00Z": 54,
      "2024-03-14T15:00:00Z": 56,
      "2024-03-14T16:00:00Z": 56,
      "2024-03-14T17:00:00Z": 57,
      "2024-03-14T18:00:00Z": 59,
      "2024-03-14T19:00:00Z": 55,
      "2024-03-14T20:00:00Z": 58,
      "2024-03-14T21:00:00Z": 54,
      "2024-03-14T22:00:00Z": 57,
      "2024-03-14T23:00:00Z": 57,
      "2024-03-15T00:00:00Z": 60,
      "2024-03-15T01:00:00Z": 56,
      "2024-03-15T02:00:00Z": 56,
      "2024-03-15T03:00:00Z": 55,
      "2024-03-15T04:00:00Z": 57,
      "2024-03-15T05:00:00Z": 55,
      "2024-03-15T06:00:00Z": 55,
      "2024-03-15T07:00:00Z": 56,
      "2024-03-15T08:00:00Z": 55,
      "2024-03-15T09:00:00Z": 60,
      "2024-03-15T10:00:00Z": 62,
      "2024-03-15T11:00:00Z": 60,
      "2024-03-15T12:00:00Z": 62,
      "2024-03-15T13:00:00Z": 62,
      "2024-03-15T14:00:00Z": 62,
      "2024-03-15T15:00:00Z": 61,
      "2024-03-15T16:00:00Z": 61,
      "2024-03-15T17:00:00Z": 60,
      "2024-03-15T18:00:00Z": 61,
      "2024-03-15T19:00:00Z": 64,
      "2024-03-15T20:00:00Z": 61,
      "2024-03-15T21:00:00Z": 61,
      "2024-03-15T22:00:00Z": 62,
      "2024-03-15T23:00:00Z": 63,
      "2024-03-16T00:00:00Z": 62,
      "2024-03-16T01:00:00Z": 62,
      "2024-03-16T02:00:00Z": 60,
      "2024-03-16T03:00:00Z": 60,
      "2024-03-16T04:00:00Z": 62,
      "2024-03-16T05:00:00Z": 53,
      "2024-03-16T06:00:00Z": 60,
      "2024-03-16T07:00:00Z": 60,
      "2024-03-16T08:00:00Z": 60,
      "2024-03-16T09:00:00Z": 60,
      "2024-03-16T10:00:00Z": 60,
      "2024-03-16T11:00:00Z": 60,
      "2024-03-16T12:00:00Z": 68,
      "2024-03-16T13:00:00Z": 62,
      "2024-03-16T14:00:00Z": 61,
      "2024-03-16T15:00:00Z": 60,
      "2024-03-16T16:00:00Z": 60,
      "2024-03-16T17:00:00Z": 65,
      "2024-03-16T18:00:00Z": 63,
      "2024-03-16T19:00:00Z": 60,
      "2024-03-16T20:00:00Z": 60,
      "2024-03-16T21:00:00Z": 60,
      "2024-03-16T22:00:00Z": 62,
      "2024-03-16T23:00:00Z": 61,
      "2024-03-17T00:00:00Z": 60,
      "2024-03-17T01:00:00Z": 60,
      "2024-03-17T02:00:00Z": 65,
      "2024-03-17T03:00:00Z": 63,
      "2024-03-17T04:00:00Z": 62,
      "2024-03-17T05:00:00Z": 63,
      "2024-03-17T06:00:00Z": 63,
      "2024-03-17T07:00:00Z": 64,
      "2024-03-17T08:00:00Z": 63,
      "2024-03-17T09:00:00Z": 64,
      "2024-03-17T10:00:00Z": 60,
      "2024-03-17T11:00:00Z": 61,
      "2024-03-17T12:00:00Z": 61,
      "2024-03-17T13:00:00Z": 29
    },
    "day": {
      "2024-01-19T00:00:00Z": 1569,
      "2024-01-20T00:00:00Z": 1722,
      "2024-01-21T00:00:00Z": 1604,
      "2024-01-22T00:00:00Z": 1560,
      "2024-01-23T00:00:00Z": 1571,
      "2024-01-24T00:00:00Z": 1627,
      "2024-01-25T00:00:00Z": 1660,
      "2024-01-26T00:00:00Z": 1527,
      "2024-01-27T00:00:00Z": 1588,
      "2024-01-28T00:00:00Z": 1549,
      "2024-01-29T00:00:00Z": 1523,
      "2024-01-30T00:00:00Z": 1662,
      "2024-01-31T00:00:00Z": 1556,
      "2024-02-01T00:00:00Z": 1585,
      "2024-02-02T00:00:00Z": 1539,
      "2024-02-03T00:00:00Z": 1556,
      "2024-02-04T00:00:00Z": 1487,
      "2024-02-05T00:00:00Z": 1580,
      "2024-02-06T00:00:00Z": 1498,
      "2024-02-07T00:00:00Z": 1485,
      "2024-02-08T00:00:00Z": 1474,
      "2024-02-09T00:00:00Z": 1487,
      "2024-02-10T00:00:00Z": 1513,
      "2024-02-11T00:00:00Z": 1477,
      "2024-02-12T00:00:00Z": 1464,
      "2024-02-13T00:00:00Z": 1458,
      "2024-02-14T00:00:00Z": 1452,
      "2024-02-15T00:00:00Z": 1477,
      "2024-02-16T00:00:00Z": 1471,
      "2024-02-17T00:00:00Z": 1482,
      "2024-02-18T00:00:00Z": 1499,
      "2024-02-19T00:00:00Z": 1504,
      "2024-02-20T00:00:00Z": 1530,
      "2024-02-21T00:00:00Z": 1502,
      "2024-02-22T00:00:00Z": 1501,
      "2024-02-23T00:00:00Z": 1486,
      "2024-02-24T00:00:00Z": 1475,
      "2024-02-25T00:00:00Z": 1469,
      "2024-02-26T00:00:00Z": 1460,
      "2024-02-27T00:00:00Z": 1451,
      "2024-02-28T00:00:00Z": 1443,
      "2024-02-29T00:00:00Z": 1447,
      "2024-03-01T00:00:00Z": 1443,
      "2024-03-02T00:00:00Z": 1455,
      "2024-03-03T00:00:00Z": 1473,
      "2024-03-04T00:00:00Z": 1482,
      "2024-03-05T00:00:00Z": 1463,
      "2024-03-06T00:00:00Z": 1472,
      "2024-03-07T00:00:00Z": 1452,
      "2024-03-08T00:00:00Z": 1469,
      "2024-03-09T00:00:00Z": 1478,
      "2024-03-10T00:00:00Z": 1494,
      "2024-03-11T00:00:00Z": 1469,
      "2024-03-12T00:00:00Z": 1471,
      "2024-03-13T00:00:00Z": 1465,
      "2024-03-14T00:00:00Z": 1462,
      "2024-03-15T00:00:00Z": 1336,
      "2024-03-16T00:00:00Z": 1427,
      "2024-03-17T00:00:00Z": 838
    },
    "month": {
      "2023-10-01T00:00:00Z": 44847,
      "2023-11-01T00:00:00Z": 44973,
      "2023-12-01T00:00:00Z": 43263,
      "2024-01-01T00:00:00Z": 59095,
      "2024-02-01T00:00:00Z": 56422,
      "2024-03-01T00:00:00Z": 50747
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
