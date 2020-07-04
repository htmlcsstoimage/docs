---
layout: default
title: JavaScript
parent: Example code
permalink: /example-code/javascript/
description: >-
  Convert HTML to an image (png, jpg or webp) with JavaScript + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="JavaScript" %}

This example uses the [Request client](https://github.com/request/request-promise). Install with `npm install request`.

```javascript
const request = require('request')

// Define your HTML/CSS
const data = {
  html: "<div class='box'>JavaScript ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
  google_fonts: "Roboto"
}

// Create an image by sending a POST to the API.
// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
request.post({ url: 'https://hcti.io/v1/image', form: data})
  .auth(API_ID, API_KEY)
  .on('data', function(data) {
    console.log(JSON.parse(data))
  })

// {"url": "https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
```

To see all of the available parameters, see: [Creating an image](/api-endpoints/#creating-an-image).

{% include hint.md title="Can I use this in a browser?" text="We recommend only using the API server-side. This is important because it keeps your API key secret. If you expose them in the browser, they can be used by anyone." %}

<hr>

## JavaScript Example - async/await

If your code supports async/await, we recommend using the following.

This example uses the [Request promise client](https://github.com/request/request-promise). Install with `npm install request-promise`.

```javascript
require('request')
const request = require('request-promise')

// Define your HTML/CSS
const data = {
  html: "<div class='box'>JavaScript ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
  google_fonts: "Roboto"
}

// Create an image by sending a POST to the API.
// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
const image = await request
  .post({ url: 'https://hcti.io/v1/image', form: data})
  .auth(API_ID, API_KEY)

const { url } = JSON.parse(image)

// {"url": "https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
```

<hr>

## Plain JavaScript \(Node.js\) example

If you prefer not to install an HTTP library for making the request. This example shows you how to use the API without any dependencies.

```javascript
const https = require('https')

const data = JSON.stringify({
  html: "<div class='box'>JavaScript ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
  google_fonts: "Roboto"
})

// Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
const apiId = "your-api-id"
const apiKey = "your-api-key"

const options = {
  hostname: 'hcti.io',
  port: 443,
  path: '/v1/image',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + new Buffer(apiId + ':' + apiKey).toString('base64')
  }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    const image = JSON.parse(d)
    console.log(image["url"])
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
```
{% include code_footer.md version=1 %}
