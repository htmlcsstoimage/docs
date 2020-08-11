# {{ include.language }}: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp images with {{ include.language }}. Renders exactly like Google Chrome.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

## Generating images with {{include.language}}
- The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to **convert your html into an image**.
- Use {{include.language}} to send the API your HTML/CSS. 
- You'll get back the URL to your generated image.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

**Example API response:**
```javascript
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

<img
  alt="Image generated with {{ include.language }}."
  ix-path="/assets/images/dog-rates-example.png"
  sizes="400px"
  ix-params='{
    "w": 400,
    "format": "auto"
  }'>

## Authentication with {{ include.language }}
The API uses [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). 

Your username is your **User ID** and your password is your **API Key**. Both of these are available from the [dashboard](https://htmlcsstoimage.com/dashboard). The {{ include.language }} code sample demonstrates how to authenticate your request.

You can signup for a free API key to get started.

<a href="https://htmlcsstoimage.com" target="_blank">Free API Key for {{ include.language }}</a>{: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 }

<hr>

## {{ include.language }} example code

This {{ include.language }} code example sends an HTTP POST to the `https://hcti.io/v1/image` API. Converting your HTML/CSS to an image with {{ include.language }}.
