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

Table of contents
{: .text-delta }
- TOC
{:toc}

<hr>

- Use templates to simplify your image creation. 
- Define a reusable template, then pass variables to it to generate unique images.

<div class="code-example" markdown="1">
  <div class="hcti-container">
    <img
      alt="Example of an image template"
      loading="lazy"
      ix-path="/assets/images/template.png"
      sizes="400px"
      ix-params='{
        "w": 400,
        "format": "auto"
      }'>
  </div>
</div>
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

## Template Structure
A template is very similar to an Image for the API, but allows you to include {% raw %} `{{placeholders}}` {% endraw %} to be substituted at the time of image creation. 

Internally, we use [handlebars](https://handlebarsjs.com/) to parse your templates and variables. While we do not support the full functionality currently, we are always improving the API based on customer feedback. Feel free to email us at **support@htmlcsstoimage.com**.


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
| **google_fonts**   | `String` | [Google fonts](/guides/using-google-fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |

<hr>

### Example responses
```
STATUS: 200 CREATED
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
{% include hint.md title="Plan Limits" text="Plans include a limited number of different templates. See PRICING LINK for details. You can edit your existing templates though, as explained below. LINK TO BELOW" %}
<hr>

## Editing a Template

To edit a template you've already made, make an HTTP request to the API with the <b>template_id</b> listed in the CREATE response LINK TO ABOVE.

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
| **google_fonts**   | `String` | [Google fonts](/guides/using-google-fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |


<hr>

## Creating an image with a template

To generate a templated image, make an HTTP request to the API using the <b>template_id</b> listed in the CREATE response LINK TO ABOVE.

<pre class="http-method fs-4">
  <span>post</span> https://hcti.io/v1/image/<b>:template_id</b>
</pre>

{% include hint.md title="Template Versions" text="When you create an image using a template_id, it will automatically utilize the most recent version of that template. If you want to tie an image to a specific template_version you can append `/:template_version` to your POST: https://hcti.io/v1/image/:template_id/<b>:template_version</b>" %}

### Parameters

The create templated image endpoint accepts the following parameters, accepted as either `json` or `formdata`. 
- If you use `formdata`, your `template_params` need to be JSON encoded. 

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **template_params**<span class="text-red-200">*</span>           | `Object` / `String`  | These are the variables that you will substitute in your template's HTML. |


<hr>


## Listing your templates


## Listing your template versions



## Example

{% raw %}
```javascript
<div class="card">
<div class="card-logo">
  <img src="{{logo_url}}" style="width:50px">
  </div>
  <div class="container">
  <img src="{{avatar_url}}" height="80px" class="avatar">
  <div class="text">
    <h4><b>{{name}}</b></h4>  
    <p>{{title}}</p>
    </div>
  </div>
</div>
```
{% endraw %}
LINK TO FULL CODEPEN

<img
  alt="Screenshot of template example"
  ix-path="/assets/images/template_example.png"
  sizes="200px"
  ix-params='{
    "w": 200,
    "format": "auto"
  }'>


{% include code_footer.md version=2 %}
