---
layout: page
title: Zapier integration
permalink: /integrations/zapier/
parent: Integrations
nav_order: 1
description: >-
  Convert HTML/CSS to an image (jpg, png or webp) with Zapier. Renders images
  exactly like Google Chrome.
---
# Zapier: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate images on Zapier with HTML/CSS to Image. Renders exactly like Google Chrome.
{: .fs-4 .fw-300 }

[Zapier integration](https://zapier.com/apps/htmlcss-to-image/integrations){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

Connect HTML/CSS to Image with thousands of integrations on Zapier.

<a href="https://zapier.com/apps/htmlcss-to-image/integrations" target="_blank">
{% cloudinary /assets/images/zapier.png alt="Connect html css to image with Zapier" %}
</a>

## Available Actions

Our Zapier integration includes two actions.

- Create images from HTML/CSS
- Create images from a URL

## Authentication

When connecting the integration to your account, you can retrieve your **User ID** and **API Key** from the dashboard.


[Get your free API Key](https://htmlcsstoimage.com/dashboard){: .btn .fs-5 .mb-4 .mb-md-0 .btn-blue target="_blank" }

## Create images from HTML/CSS

The Zapier integration makes it simple to create an image with the API. When creating an image you will see these options:

HTML is the only required value. The rest are optional.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **html**<span class="text-red-200">*</span>   | `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. |
| **google_fonts**   | `String` | [Google fonts](/guides/using-google-fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |

{% include hint.md title="Variables in your HTML" text="When creating your HTML, the power of Zapier is using values from previous steps. You can integrate in values from Twitter, Airtable, Wordpress or any other of the Zapier integrations. Make your images unique and customized for the situation." %}

## Create images from a URL
With this Zapier integration, you can generate a screenshot of any website.

The only required value is `URL` the rest are optional.


| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **url**<span class="text-red-200">*</span>          | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |
| **device_scale**   | `Double` | This adjusts the pixel ratio for the screenshot. Minimum: `1`, Maximum: `3`. |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **selector**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |

## Troubleshooting

If you have trouble with the Zapier integration, please send us an email: support@htmlcsstoimage.com and we'll help you out.

### Designing images with HTML/CSS
Creating your image design can be the most challenging part. We suggest mocking up your image using [Codepen](https://pen.new). It allows you to see your HTML/CSS and edit it live. 

### 429 error
If you receive this error, it means you have exceeded your plan limit for creating images this month. Take a look at your [Dashboard](https://htmlcsstoimage.com/dashboard) to check your usage and upgrade your plan.

### Blank images
When taking a screenshot of a URL, if you see a blank image, this often means that the screenshot was taken before the page was able to render anything. This can sometimes happen with complex pages that use a lot of JavaScript. To fix it, try adjusting the `ms_delay` value to slow down taking the screenshot.


{% include code_footer.md version=1 %}
