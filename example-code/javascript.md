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

To see all of the available parameters, see: [Creating an image](/getting-started/using-the-api/#creating-an-image).

{% include hint.md title="Can I use this in a browser?" text="We recommend only using the API server-side. This is important because it keeps your API key secret. If you expose them in the browser, they can be used by anyone." %}

<hr>

## JavaScript example - async/await

If your code supports async/await, we recommend using the following.

This example uses the [axios package](https://www.npmjs.com/package/axios). Install with `npm install axios`.

```javascript
const axios = require('axios');

async function createImage() {
  const payload = { html: "<div>Test</div>",
  css: "div { background-color: blue; }" };

  let headers = { auth: {
    username: 'user-id',
    password: 'api-key'
  },
  headers: {
    'Content-Type': 'application/json'
  }
  }
  try {
    const response = await axios.post('https://hcti.io/v1/image', JSON.stringify(payload), headers);
    console.log(response.data.url);
  } catch (error) {
    console.error(error);
  }
}

createImage();
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

## Client side JavaScript example with Fetch API
- Use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make an HTTP POST request to the API
- Supported by modern browsers
- Recommended for internal applications only to keep your API key safe

```javascript
const json = {
  html: "<div class='test'>Hello, world!</div>",
  css: ".test { background-color: green; }"
};

const username = "user-id";
const password = "api-key";

const options = {
  method: 'POST',
  body: JSON.stringify(json),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(username + ":" + password)
  }
}

fetch('https://hcti.io/v1/image', options)
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then(data => {
    // Image URL is available here
    console.log(data.url)
  })
  .catch(err => console.error(err));
```

{% include code_footer.md version=1 %}
