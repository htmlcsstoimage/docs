# {{ include.language }}: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp image with {{ include.language }}. Renders exactly like Google Chrome.
Want to see how it works? Give our live demo a try.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }
<hr>

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

<!-- ## Getting started -->
<!-- {: .no_toc } -->

## Authentication
The API uses [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). 

Your username is your **User ID** and your password is your **API Key**. Both of these are available from the [dashboard](https://htmlcsstoimage.com/dashboard). The code sample demonstrates how to authenticate your request.

<!-- ### How it works -->
<!--  -->
<!-- To create an image, send an **HTTP POST** request to `https://hcti.io/v1/image`. Images can be created from HTML/CSS or a URL. -->

<!-- The API will return JSON with the URL to your newly created image. -->
<!--  -->
<!-- ```javascript -->
<!-- { -->
<!--   "url": "https://hcti.io/v1/image/6e253850-736c-487a-8dc8-b6950ca94703" -->
<!-- } -->
<!-- ``` -->
<!--  -->
<!-- By default, this URL will return a **png**. See [File formats](file-formats.md) for other options. -->
<!--  -->

## How it works

The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to generate the image. You'll get back a URL to your image.

```javascript
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

<img src="/assets/images/dog-rates-example.png" width="400px" class="border" alt="This image was generated with {{ include.language }}" />

## Parameters

`POST https://hcti.io/v1/image` 

The image endpoint accepts the following parameters.

| Param        | Type          | Description |
|:-------------|:------------------|:------|
| html           | `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| css | `String` | The CSS for your image. |
| url           | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |

### Advanced parameters

For further ways to customize your image, take a a look at our advanced parameters.

| Param        | Type          | Description |
|:-------------|:------------------|:------|
| google_fonts   | `String` | Google fonts to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| selector  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| ms_delay   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.|
| viewport_width   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. |
| viewport_height   | `String` | Set the height of Chrome's viewport. This will disable automatic cropping. |

<hr>

## Plain {{ include.language }} example

This {{ include.language }} code sample sends an HTTP POST to the `https://hcti.io/v1/image` and returns the URL to your newly generated image.
