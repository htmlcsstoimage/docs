---
layout: page
title: Google Apps Script
parent: Example code
permalink: /example-code/google-apps-script/
description: >-
  Convert HTML to an image (png, jpg or webp) with Google Apps Script + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
# Google Apps Script: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp images with Google Apps Script.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

## Generate an image with Google Apps Script
With [Google Apps Script](https://developers.google.com/apps-script), you can build add-ons for Google. It is based on JavaScript, but includes built in functions that you'll need to use to work with the HTML/CSS to Image API.

Our documented JavaScript examples won't work with GAS. You can make use of the built in UrlFetchApp to generate images with the API.

## Example code

This shows you how to authenticate with the API and pass parameters in a POST request. This is passing html/css parameters to the API. You can adapt this sample to pass any parameters or work with any of our endpoints.

```javascript
function createImage(html, css) {
  let formData = {
    'html': html,
    'css': css,
  }
  // Additional parameters such as ms_delay should be included in formData

  let options = {
    'method' : 'post',
    'payload' : formData
  }

  // Replace username with your User ID and password with your API Key
  options.headers = {"Authorization": "Basic " + Utilities.base64Encode(username + ":" + password)}
  JSON.parse(UrlFetchApp.fetch("https://hcti.io/v1/image", options)).url
}

function testCreateImage() {
  let imageUrl = createImage("<div>Hello, world</div>", "div { color: red; }")
  console.log(imageUrl)
}
```

You can use the Google App Script debugger to test your function by running the `testCreateImage` function.

**Using from HTML**

To call your Google App Script function from an HTML file, see the following example.

```javascript
function onSuccess(imageUrl) {
  // This code will run when the function executes successfully.
  console.log(imageUrl)
}

function onFailure(error) {
  // This code will run if there is an error.
  alert(error.message)
}

var html = "<div>Hello, world</div>"
var css = "div { color: red; }"
google.script.run.withSuccessHandler(onSuccess).withFailureHandler(onFailure).createImage(html, css);
```

{% include code_footer.md version=2 %}
