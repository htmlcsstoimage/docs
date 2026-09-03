---
layout: page
title: Python - HTML to Image Example
nav_title: Python
parent: Example code
permalink: /example-code/python/
description: >-
  Convert HTML to an image (png, jpg or webp) with Python + the HTML/CSS to Image
  API. Official PyPI package for Python 3.10+.
---
{% include intro.md language="Python" %}

## Official PyPI client

For typed requests, responses, and signed URL helpers, use the official [`html-css-to-image`](https://pypi.org/project/html-css-to-image/) package.

```bash
pip install html-css-to-image
```

```python
from html_css_to_image import CreateHtmlCssImageRequest, HtmlCssToImageClient

with HtmlCssToImageClient("your-api-id", "your-api-key") as client:
    result = client.create_image(
        CreateHtmlCssImageRequest(
            html="<div class='box'>Python ✅</div>",
            css=".box { border: 4px solid #03B875; padding: 20px; }",
        )
    )

if result.success:
    print(result.url)
else:
    print(result.status_code, result.error)
```

The client also supports URL screenshots, templates, batches, image deletion, render options, and signed URLs. See the [Python client repository](https://github.com/htmlcsstoimage/python-client) for complete usage and API documentation.

<hr>

## Direct HTTP example

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
