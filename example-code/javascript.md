---
description: Converting HTML/CSS to an Image with Node.js.
---

# JavaScript/Node.js

Here we will show you how to generate an image from HTML/CSS with JavaScript.

This example uses the [Request promise client](https://github.com/request/request-promise). Install with `npm install request-promise`.

### Example code

{% code-tabs %}
{% code-tabs-item title="javascript\_example.js" %}
```javascript
require('request')
const request = require('request-promise')

// Define your HTML/CSS
const data = {
  html: "<div class='box'>Ping ✅</div>",
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

### More examples

For more advanced examples, [take a look here](../#examples).

