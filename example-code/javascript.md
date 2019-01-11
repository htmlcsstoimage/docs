---
description: Converting HTML/CSS to an Image with Node.js.
---

# JavaScript/Node.js

Here are a bunch of examples for generating an image with JavaScript.

We recommend using an HTTP library to take care of the heavy lifting for you. Here we use [Request](https://github.com/request/request) \(but any HTTP library will work\).

If you need a plain, NodeJS only example, scroll to the bottom.

### Example - with Request client

This example uses the [Request client](https://github.com/request/request-promise). Install with `npm install request`.

{% code-tabs %}
{% code-tabs-item title="javascript\_example.js" %}
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
{% endcode-tabs-item %}
{% endcode-tabs %}

### Example with request-promise \(async/await\)

This example uses the [Request promise client](https://github.com/request/request-promise). Install with `npm install request-promise`.

{% code-tabs %}
{% code-tabs-item title="javascript\_example.js" %}
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
{% endcode-tabs-item %}
{% endcode-tabs %}

![https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f](../.gitbook/assets/javascript.jpeg)

### NodeJS example with no dependencies

{% code-tabs %}
{% code-tabs-item title="node.js" %}
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
{% endcode-tabs-item %}
{% endcode-tabs %}

### More examples

For more advanced examples, [take a look here](../#examples).

