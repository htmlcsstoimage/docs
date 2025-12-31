---
layout: page
title: Postman
permalink: /guides/workflows/postman/
parent: Workflows
grand_parent: Guides
nav_order: 1
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

{% cloudinary /assets/images/postman1.png sizes="500px" alt="Generating images with postman and the html/css to image API" %}

## Set HTML/CSS

Go to "Body" and click "form-data". Then enter your HTML/CSS.

{% cloudinary /assets/images/postman2.png sizes="500px" alt="Creating an image with postman and the html/css to image API" %}

### Done

Press **send** and you'll get back the URL to your generated image.

{% cloudinary /assets/images/postman3.png sizes="500px" alt="Using postman with the html/css to image API" %}


