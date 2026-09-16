---
layout: page
title: Postman
permalink: /guides/workflows/postman/
parent: Workflows
grand_parent: Guides
nav_order: 1
description: >-
  Try the official HTML/CSS to Image Postman collection. Generate images, capture screenshots, render templates, and create PDFs with ready-to-run examples.
---
# Postman: HTML/CSS to Image API
{: .no_toc }
{: .fs-9 }

Generate your first image with the official Postman collection.
{: .fs-6 .fw-300 }

<hr>
[Open in Postman](https://www.postman.com/htmlcsstoimage/html-css-to-image/collection/zgfamed/html-css-to-image-api){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 }

The collection includes examples for HTML/CSS images, website screenshots, and PDFs, plus a parameter reference for image and template requests. You can [browse the collection documentation](https://www.postman.com/htmlcsstoimage/documentation/58291182-32423286-3b79-48f7-95e0-f9aa3ec375b4) before forking it.

## Create your first image

1. Open the collection and fork it into your own Postman workspace.
2. Create an environment with `api_id` and `api_key` from your [HCTI dashboard](https://htmlcsstoimage.com/dashboard/api-keys). Keep credential values private, and select that environment before sending requests.
3. Open **Use cases → Getting started with a simple request**. Change the `url` field under **Body → form-data** to the webpage you want to capture, or use the supplied example.
4. Click **Send**. The API returns JSON containing the generated image's `url` and `id`.
5. Open **View or download the latest image** and click **Send** to retrieve the file. Successful creation requests save `image_url` automatically for this step.

Image creation requires the [`images:create` permission](/getting-started/using-the-api/permissions/) and uses your account's image credits. The collection uses HTTP Basic authentication: `api_id` is the username and `api_key` is the password. See [API keys and authentication](/getting-started/using-the-api/api-keys/) for details.

## Explore examples and parameters

- **Use cases** includes HTML to image, full-page and mobile screenshots, cookie-banner blocking, element cropping, and PDF generation.
- **Full API reference** lists the supported parameters for the included image and template operations. Open **Body → form-data**, check optional rows to include them, and edit their values. Each parameter has a description and documentation link. Unchecked rows are omitted; example values are suggestions, not API defaults.

To render a template, set `template_id` to a template in your account and match `template_values` to its variables. You can also run **Create a template** first, which saves the new template ID. Template creation requires [`templates:create_update`](/getting-started/using-the-api/permissions/).

Run the examples individually. Saved response examples are illustrative and contain placeholder image IDs; send a request with your credentials to generate your own image URL.

## Make a request manually

You can also create a **POST** request to `https://hcti.io/v1/image`. Select **Basic Auth** in the **Authorization** tab and enter your API ID and API key. Under **Body → form-data**, add `html` and optional `css`, or add `url` to capture a webpage. Postman sets the form's Content-Type header automatically.

See [Using the API](/getting-started/using-the-api/) for endpoints and response formats, or [MCP setup](/integrations/mcp/) to connect to HCTI's hosted MCP server.
