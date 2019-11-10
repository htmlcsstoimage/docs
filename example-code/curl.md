---
description: Converting HTML/CSS to an Image from the command line with cURL.
---

# cURL

Here you can generate an image using cURL. Run this command in your terminal.

### Example code

{% tabs %}
{% tab title="curl\_example" %}
```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' -d html="<div class='ping'>Pong ✅</div>" -d css=".ping { padding: 20px; font-family: 'sans-serif'; }"
```
{% endtab %}
{% endtabs %}

### Response

The API will return a json payload with the URL to your new image.

{% tabs %}
{% tab title="response.json" %}
```javascript
{ "url":"https://hcti.io/v1/image/1eecf460-e2e5-4db1-9db6-cf862c34a744" }
```
{% endtab %}
{% endtabs %}

### More examples

For more advanced examples, [take a look here](../#examples).

