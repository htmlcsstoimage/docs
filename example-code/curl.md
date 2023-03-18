---
layout: page
title: Curl
parent: Example code
permalink: /example-code/curl/
description: >-
  Convert HTML to an image (png, jpg or webp) with Curl + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
# Curl
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp images from your terminal with cURL.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

## Generate an image with cURL

Run this command in your terminal to generate an image using the API.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

```ruby
# Replace UserID and APIKey with your credentials from the dashboard https://htmlcsstoimage.com/dashboard
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey'\
     -d html="<div class='ping'>Pong ✅</div>" \
     -d css=".ping { padding: 20px; font-family: 'sans-serif'; }"
```

## Response

The API will return a json payload with the URL to your new image.

```javascript
{ "url":"https://hcti.io/v1/image/1eecf460-e2e5-4db1-9db6-cf862c34a744" }
```

## Advanced example
Here we use additional parameters. Note that each line ends with a `\`.

```ruby
# Replace UserID and APIKey with your credentials from the dashboard https://htmlcsstoimage.com/dashboard
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey'\
     -d html="<div class='ping'>Pong ✅</div>" \
     -d css=".ping { padding: 20px; font-family: 'sans-serif'; }" \
     -d ms_delay=1000 \
     -d selector=".ping"
```


{% include code_footer.md version=3 %}
