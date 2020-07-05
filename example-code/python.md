---
layout: page
title: Python
parent: Example code
permalink: /example-code/python/
description: >-
  Convert HTML to an image (png, jpg or webp) with Python + the HTML/CSS to Image
  API. Renders images exactly like Google Chrome.
---
{% include intro.md language="Python" %}

```python
# pip3 install requests
import requests

HCTI_API_ENDPOINT = "https://hcti.io/v1/image"
# Retrieve these from https://htmlcsstoimage.com/dashboard
HCTI_API_USER_ID = 'your-user-id'
HCTI_API_KEY = 'your-api-key'

data = { 'html': "<div class='box'>Hello, world!</div>",
         'css': ".box { color: white; background-color: #0f79b9; padding: 10px; font-family: Roboto }",
         'google_fonts': "Roboto" }

image = requests.post(url = HCTI_API_ENDPOINT, data = data, auth=(HCTI_API_USER_ID, HCTI_API_KEY))

print("Your image URL is: %s"%image.json()['url'])
# https://hcti.io/v1/image/7ed741b8-f012-431e-8282-7eedb9910b32
```

{% include code_footer.md version=1 %}
