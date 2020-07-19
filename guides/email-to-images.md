---
layout: page
title: Convert email to images
permalink: /guides/convert-emails-images/
parent: Guides
nav_order: 1
description: >-
  Convert HTML emails into images (png, jpg) with HTML/CSS to Image
---
# Convert HTML emails to images
{: .no_toc }
{: .fs-9 }

Generate images of full webpages and emails with HTML/CSS to Image. Renders exactly like Google Chrome.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Generating images from emails
The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to convert your html into an image.

This works great for both HTML emails and full webpages.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

<div class="code-example" markdown="1">
  <div class="hcti-container">
    <img
      alt="Convert an email to an image."
      ix-path="/assets/images/email.png"
      sizes="400px"
      ix-params='{
        "w": 400,
        "format": "auto"
      }'>
  </div>
</div>

[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

<hr>

## Include full `<html>`

To render a full email or webpage with the API, pass the full HTML markup. Starting and ending with the `<html>` tags.

- The API will enter full page mode and render the entire page as displayed by Google Chrome.

- When rendering a full page, be sure to include full paths to all outside assets so that the API is able to download them. Relative paths will not work.

{% include code_footer.md version=2 %}
