---
layout: page
title: Postman
permalink: /guides/postman/
parent: Guides
nav_order: 9
description: >-
  Use the HTML/CSS to Image API with postman. Converts html to images.
---
# Postman: HTML/CSS to Image API
{: .no_toc }
{: .fs-9 }

Learn how to use the API to generate an image using Postman
{: .fs-6 .fw-300 }

<hr>
## Postman

Postman is an HTTP client that is useful for testing out API's.

Download Postman from [https://www.getpostman.com/](https://www.getpostman.com/).

## URL

For creating an image, create a new POST request to `https://hcti.io/v1/image`.

## Authorization

Go to the Authorization tab, select "Basic Auth" and enter your User ID and API Key \(available from your [Dashboard](https://htmlcsstoimage.com/dashboard)\).

<img
  alt="Using postman with the html/css to image API"
  loading="lazy"
  ix-path="/assets/images/postman1.png"
  sizes="500px"
  ix-params='{
  "w": 500,
  "format": "auto"
  }'>

## Set HTML/CSS

Go to "Body" and click "form-data". Then enter your HTML/CSS.

<img
  alt="Using postman with the html/css to image API"
  loading="lazy"
  ix-path="/assets/images/postman2.png"
  sizes="500px"
  ix-params='{
  "w": 500,
  "format": "auto"
  }'>

### Done

Press **send** and you'll get back the URL to your generated image.


<img
  alt="Using postman with the html/css to image API"
  loading="lazy"
  ix-path="/assets/images/postman3.png"
  sizes="500px"
  ix-params='{
  "w": 500,
  "format": "auto"
  }'>


