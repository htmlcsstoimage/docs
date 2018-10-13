---
description: Converting HTML/CSS to an Image with Node.js.
---

# JavaScript/Node.js

Here we will show you how to generate an image from HTML/CSS with JavaScript.

This example uses the [Request client](https://github.com/request/request). Install with `npm install request`.

### Example code

{% code-tabs %}
{% code-tabs-item title="javascript\_example.js" %}
```javascript
var request = require('request');

// Retrieve your user_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
var auth = { user: "user_id", pass: "api_key" };
var html = "<div class='ping'>Pong ✅</div>";
var css = ".ping { padding: 20px; font-family: 'sans-serif'; }";
var data = { html: html, css: css };

request.post({ url: 'https://hcti.io/v1/image', form: data, auth: auth }, function(err, httpResponse, body) {
  console.log(body);
});

// {"url": "https://hcti.io/v1/image/bde7d5bf-f7bb-49d9-b931-74e5512b8738"}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### More examples

For more advanced examples, [take a look here](../#examples).

