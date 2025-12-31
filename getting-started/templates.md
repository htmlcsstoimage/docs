---
layout: page
title: Image Templates
permalink: /getting-started/templates/
description: >-
  Create a re-usable templates for your HTML & CSS to make image generation easy.
parent: Getting started
nav_order: 5
---
# Image Templates
{: .no_toc }
{: .fs-9 }

Create re-usable templates to make image generation easy.
{: .fs-6 .fw-300 }

[Get an API Key](https://htmlcsstoimage.com){: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 }

<hr>

## What are Templates?

A template allows you to define HTML that includes **variables** to be substituted at the time of image creation. 

### Handlebars variables
Templates support [handlebars](https://handlebarsjs.com/) variables. This allows you to place {% raw %} `{{title_text}}` {% endraw %} in your HTML.
Then have that replaced with any value you'd like while creating your image.

### Common usecases
- Define a reusable template, then pass variables to it to generate unique images.
- Create images using signed urls in a `GET` request (no need to POST and store the URL).
- Useful for social sharing images. Such as `og:image` or `twitter:image`.

### Example
This image was generated with a template.
```javascript
{ 
  "text": "With templates, you can use variables to replace parts of your image.",
  "avatar_url": "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Eating&skinColor=Brown",
  "name": "Freddy",
  "username": "@freddy",
}
```
<div class="code-example" markdown="1">
  <div class="hcti-container">
    {% cloudinary /assets/images/template.png alt="Example of an image template use for converting html to an image" %}
  </div>
</div>
HTML:
{: .text-delta }
```html
{% raw %}
<div class="p-4 text-center mt-4" style="width: 500px">
  <span class="tweet-text mb-4">
    {{text}}
  </span>
  <div class="mt-2 p-4">
    <img src="{{avatar_url}}" class="rounded-circle shadow border mt-4" width="100px">
  </div>
  <h4 class="mt-2">
    {{name}}
  </h4>
  <span class="text-muted">{{username}}</span>
</div>
{% endraw %}
```

## Creating a Template

To generate a template, make an HTTP request to the API.

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io<b>/v1/template</b>
</pre>

### Parameters

The create template endpoint accepts the following parameters. Accepted as either `json` or `formdata`.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **html**<span class="text-red-200">*</span>| `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. |
|**name**| `String` | A short name to identify your template `max length 64`|
|**description**| `String` | Description to elaborate on the use of your template `max length 1024` |

{% include hint.md title="Required params" text="For creating a template, `html` is required while `css` is optional.
<br/> `name` and `description` are optional, but may be useful to help you differentiate your templates in the future." %}

### Additional parameters

Optional parameters for greater control over your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/parameters/google_fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **max_wait_ms**   | `Integer` | Sets a maximum time limit (500-10000ms) for waiting before taking the screenshot. |
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `0.1`, Maximum: `3`. |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/parameters/render_when_ready/). |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **color_scheme**   | `String` | Set Chrome to render in `light` or `dark` mode. [Learn more](/parameters/color_scheme/). |
| **timezone**   | `String` | Render your image with Chrome set to a specified timezone. Use IANA timezone identifiers. [Learn more](/parameters/timezone/). |
| **disable_twemoji**   | `Boolean` | Set to `true` to use native emoji fonts instead of Twemoji. |

<hr>

### Example responses
```
STATUS: 201 CREATED
```

```javascript
{
    "template_id": "t-b0354248-e7f6-4cca-81c6-2b4a70a16388",
    "template_version": 1594409399761
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
    "message": "The tryit plan is limited to 1 template"
}
```
{% include hint.md title="Plan Limits" text="Free plans can create 1 template. Paid plans can create 1,000. You can edit your existing templates an unlimited number of times." %}
<hr>

## Editing a Template

To edit a template you've already made, make an HTTP request to the API with the <b>template_id</b> listed in the CREATE response.

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io<b>/v1/template/:template_id</b>
</pre>

### Parameters

The edit template endpoint accepts the following parameters. Accepted as either `json` or `formdata`.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **html**<span class="text-red-200">*</span>| `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. |
|**name**| `String` | A short name to identify your template `max length 64`|
|**description**| `String` | Description to elaborate on the use of your template `max length 1024` |

{% include hint.md title="Required params" text="For creating a template, `html` is required while `css` is optional.
<br/> `name` and `description` are optional, but may be useful to help you differentiate your templates in the future." %}

### Additional parameters

Optional parameters for greater control over your image.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/parameters/google_fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **max_wait_ms**   | `Integer` | Sets a maximum time limit (500-10000ms) for waiting before taking the screenshot. |
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `0.1`, Maximum: `3`. |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/parameters/render_when_ready/). |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **color_scheme**   | `String` | Set Chrome to render in `light` or `dark` mode. [Learn more](/parameters/color_scheme/). |
| **timezone**   | `String` | Render your image with Chrome set to a specified timezone. Use IANA timezone identifiers. [Learn more](/parameters/timezone/). |
| **disable_twemoji**   | `Boolean` | Set to `true` to use native emoji fonts instead of Twemoji. |

<hr>

## Creating an image with a template

To generate a templated image, make an HTTP request to the API using the <b>template_id</b> listed in the [CREATE response](#example-responses).

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io/v1/image/<b>:template_id</b>
</pre>

{% include hint.md title="Template Versions" text="When you create an image using a `template_id`, it will automatically utilize the most recent version of that template. If you want to create an image from a specific template_version you can append `/:template_version` to your POST: `hcti.io/v1/image/:template_id/:template_version`" %}

### Parameters

The create templated image endpoint accepts the following parameters, accepted as either `json` or `formdata`. 
- If you use `formdata`, your `template_values` need to be JSON encoded. 

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **template_values**<span class="text-red-200">*</span>           | `JSON`  | These are the variables that will be substituted in your template's HTML. |

<hr>


## Listing your templates

To list all of your templates, send a get to `v1/template`. Authentication is required.

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/template</b>
</pre>

### Example responses
```
STATUS: 200 OK
```

```javascript
{
  "data": [
    {
      "css": null,
      "created_at": "2020-07-19T17:16:43.987+00:00",
      "description": null,
      "device_scale": 2.0,
      "google_fonts": null,
      "html": "<blockquote class=\"twitter-tweet\" style=\"width: 400px;\" data-dnt=\"true\">\n<p lang=\"en\" dir=\"ltr\"></p>\n\n<a href=\"{{tweet_link}}\"></a>\n\n</blockquote> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>",
      "id": "t-5ff7b966-d32c-4143-bda3-57a440e97a80",
      "max_wait_ms": null,
      "ms_delay": 1500,
      "name": null,
      "render_when_ready": null,
      "render_count": 142,
      "color_scheme": null,
      "timezone": null,
      "updated_at": "2020-07-19T17:16:43.987+00:00",
      "version": 1595179003987,
      "viewport_height": null,
      "viewport_width": null
    }
  ],
  "pagination": {
    "next_page_start": null
  }
}
```

### Response fields

| Field | Type | Description |
|:------|:-----|:------------|
| **render_count** | `Integer` | Number of times this template has been used to generate images. |
| **color_scheme** | `String` | Light or dark mode setting, if configured. |
| **timezone** | `String` | Timezone setting, if configured. |

## Listing your template versions

To list all versions of a template, send a get to `v1/template/:template_id`. Authentication is required.

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/template/:template_id</b>
</pre>


### Example responses
```
STATUS: 200 OK
```

```javascript
{
  "data": [
    {
      "css": null,
      "created_at": "2020-07-19T17:16:43.987+00:00",
      "description": null,
      "device_scale": 2.0,
      "google_fonts": null,
      "html": "<blockquote class=\"twitter-tweet\" style=\"width: 400px;\" data-dnt=\"true\">\n<p lang=\"en\" dir=\"ltr\"></p>\n\n<a href=\"{{tweet_link}}\"></a>\n\n</blockquote> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>",
      "id": "t-5ff7b966-d32c-4143-bda3-57a440e97a80",
      "max_wait_ms": null,
      "ms_delay": 1500,
      "name": null,
      "render_when_ready": null,
      "render_count": 142,
      "color_scheme": null,
      "timezone": null,
      "updated_at": "2020-07-19T17:16:43.987+00:00",
      "version": 1595179003987,
      "viewport_height": null,
      "viewport_width": null
    }
  ],
  "pagination": {
    "next_page_start": null
  }
}
```

{% include code_footer.md version=2 %}
