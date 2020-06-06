---
description: Example code for converting HTML/CSS to an image with Google App Script
---

# Google Apps Script

With [Google Apps Script](https://developers.google.com/apps-script), you can build add-ons for Google. It is based on JavaScript, but includes built in functions that you'll need to use to work with the HTML/CSS to Image API.

Our documented JavaScript examples won't work with GAS. You can make use of the built in UrlFetchApp to generate images with the API.

### Example code

This shows you how to authenticate with the API and pass parameters in a POST request. This is passing html/css parameters to the API. You can adapt this sample to pass any parameters or work with any of our endpoints.

```javascript
var formData = {
  'html': 'Test',
  'css': 'test',
};

var options = {
  'method' : 'post',
  'payload' : formData
};
// Replace username with your User ID and password with your API Key
options.headers = {"Authorization": "Basic " + Utilities.base64Encode(username + ":" + password)};
UrlFetchApp.fetch("https://hcti.io/v1/image", options);
```

{% page-ref page="../getting-started/url-to-image.md" %}

{% page-ref page="javascript.md" %}



