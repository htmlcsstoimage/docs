---
description: >-
  Convert HTML to an image (png, jpg or webp) with Python + the HTML/CSS to
  Image API. Renders exactly like Google Chrome.
---

# Python

Here you'll learn how to convert html to an image using Python.

![Generate an image with Python](../.gitbook/assets/python.jpg)

Try it out yourself with the ****[**live demo**](https://htmlcsstoimage.com/#demo).

### Simple Python example

To create an image, you need to send a POST request to the  `v1/image` endpoint. 

The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to generate the image.

#### Parameters

{% tabs %}
{% tab title="html" %}
**Data type:** String \(required\)

This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage.

**External JS and CSS are supported.** 

You can include script tags and &lt;link&gt; tags to CSS. Be sure that any assets you include are available via a full publicly accessible URL so that we can download them before rendering.
{% endtab %}

{% tab title="css" %}
**Data type:** String \(optional\)

The CSS for your image.
{% endtab %}

{% tab title="google\_fonts" %}
**Data type:** String \(optional\)

Google Fonts to be loaded before rendering the image. To see all of the fonts available, visit: [https://fonts.google.com/](https://fonts.google.com/)

**Single font**

Pass the font name as the parameter.

`Roboto`

**Multiple fonts**

Separate multiple fonts with a `|`.

`Roboto|Roboto Condensed|Open Sans`

\*\*\*\*
{% endtab %}
{% endtabs %}

{% hint style="info" %}
To see a full list of available parameters, take a look at [**Creating an image**](../getting-started/creating-an-image.md).
{% endhint %}

### Example code

This script will send HTML/CSS to the API and get back a URL to your new image. You'll need an API key to use this example.

This example uses the requests library. To install, run: `pip3 install requests`

{% code title="hcti.py" %}
```python
# pip3 install requests
import requests

HCTI_API_ENDPOINT = "https://hcti.io/v1/image"
HCTI_API_USER_ID = 'your-user-id'
HCTI_API_KEY = 'your-api-key'

data = { 'html': "<div class='box'>Hello, world!</div>",
         'css': ".box { color: white; background-color: #0f79b9; padding: 10px; font-family: Roboto }",
         'google_fonts': "Roboto" }

image = requests.post(url = HCTI_API_ENDPOINT, data = data, auth=(HCTI_API_USER_ID, HCTI_API_KEY))

print("Your image URL is: %s"%image.json()['url'])
# https://hcti.io/v1/image/7ed741b8-f012-431e-8282-7eedb9910b32
```
{% endcode %}

### More examples

This page showed really simple image examples. The API can render anything that Google Chrome can. For more advanced examples, [take a look here](../getting-started/creating-an-image.md).

### Need help?

Email us **support@htmlcsstoimage.com**

Share with us what you're building. We're experts at generating images and love to help.

