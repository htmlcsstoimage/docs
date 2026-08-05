---
layout: page
title: Email to images
permalink: /guides/workflows/email-to-images/
parent: Workflows
grand_parent: Guides
nav_order: 3
description: >-
  Convert HTML emails to PNG, JPG, or PDF with HTML/CSS to Image using Zapier, AI assistants via MCP, or PHP, Ruby, and JavaScript.
---
# Convert HTML emails to images
{: .no_toc }
{: .fs-9 }

Generate images or PDFs of full webpages and emails with HTML/CSS to Image. Renders exactly like Google Chrome.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/#demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Generating images and PDFs from emails
You can use the API to convert emails into PNGs, JPGs, or PDFs.

Making it easy to automatically share them in Slack, Instagram or Facebook.

**How to do it:**
1. You can use our [Zapier](/integrations/zapier) or [Make](/integrations/make) integrations to convert email to images without code.
2. Or, use the [API](/getting-started/using-the-api#creating-an-image) directly.
3. You'll want to create an image from HTML and pass the full HTML of the email to the API.
4. The API will then send back a URL to your image of the email.

To download the rendered email as a PDF, append `.pdf` to the returned image URL. See [PDF options](/parameters/pdf_options/) to customize page size, margins, scaling, and backgrounds.

For more details on how the API works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

<div class="code-example" markdown="1">
  <div class="hcti-container">
    {% cloudinary /assets/images/email.png alt="Convert an email to an image." %}
  </div>
</div>

[Try it yourself](https://htmlcsstoimage.com/#demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

<hr>

## Include full `<html>`

To render a full email or webpage with the API, pass the full HTML markup. Starting and ending with the `<html>` tags.

- The API will enter full page mode and render the entire page as displayed by Google Chrome.
- When rendering a full page, be sure to include full paths to all outside assets so that the API is able to download them. Relative paths will not work.

{% include code_footer.md version=2 %}
