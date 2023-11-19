---
layout: default
title: Parameters
permalink: /parameters/
nav_order: 4
expanded: false
has_children: true
---
# Parameters Reference
{: .no_toc }
{: .fs-9 }

Detailed information on all the available parameters for the API.
{: .fs-4 .fw-300 }

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
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time. [Learn more](/parameters/ms_delay/). |
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. [Learn more](/parameters/device_scale/). |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/guides/render-when-ready/). |
| **full_screen**   | `Boolean` | When set to true, the API will generate an image of the entire height of the page. |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |

<hr>

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }
