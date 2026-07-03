# {{ include.language }}: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate Images and PDFs with {{ include.language }}. Renders exactly like Google Chrome.
{: .code-title }
Render PNG, JPG, or WebP images + PDFs with {{ include.language }} from HTML/CSS or reusable dynamic templates.
{: .code-subtitle}


[Live demo](https://htmlcsstoimage.com/#demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Generating images with {{include.language}}
1. The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to **convert your HTML into an image**.
2. Use {{include.language}} to send the API your HTML/CSS. 
3. You'll get back JSON with the URL to your generated image.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

**Example API response:**
```json
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d",
  "id": "be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

{% cloudinary /assets/images/dog-rates-example.png sizes="500px" alt="Image generated with {{ include.language }}. Convert HTML to an image using {{ include.language }}." %}

## Authentication with {{ include.language }}
The API uses [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). 

Your username is your **User ID** and your password is your **API Key**. Both of these are available from the [dashboard](https://htmlcsstoimage.com/dashboard). The {{ include.language }} code sample demonstrates how to authenticate your request.

You can sign up for a free API key to get started.

<a href="https://htmlcsstoimage.com" target="_blank">Free API Key for {{ include.language }}</a>{: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 }

<hr>

## {{ include.language }} example code

This {{ include.language }} code example sends an HTTP POST to the `https://hcti.io/v1/image` API to convert your HTML/CSS to an image.
