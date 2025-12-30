---
layout: default
title: Example code
permalink: /example-code/
nav_order: 4
has_children: true
---
# Example code
{: .no_toc }
{: .fs-9 }

To get started quickly, take a look at our example code for generating images.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }

{% include hint.md title="Using an AI coding assistant?" text="Skip writing code entirely. Connect our [MCP Server](/integrations/mcp/) to generate images directly from Cursor or Claude Code." %}

<hr>

## Works with any programming language

The HTML/CSS to Image API is a simple REST API. **If your language can make an HTTP request, it can generate images.** 

We provide example code for popular languages, but the API works the same way everywhere:

1. Send a `POST` request to `https://hcti.io/v1/image`
2. Include your HTML/CSS in the request body
3. Authenticate with HTTP Basic Auth
4. Receive a JSON response with your image URL

---

## The API request

Here's what a request to the API looks like:

| Property | Description |
|:---------|:------------|
| **Endpoint** | `https://hcti.io/v1/image` |
| **Method** | `POST` |
| **Content-Type** | `application/json` |
| **Authentication** | HTTP Basic Auth (User ID + API Key) |

### Request body (JSON)

```json
{
  "html": "<div class='box'>Hello, world!</div>",
  "css": ".box { padding: 20px; background: #03B875; color: white; }"
}
```

### Response

```json
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

The returned URL is your generated image. Append `.png`, `.jpg`, or `.webp` to the URL to get different formats.

---

## Quick reference with cURL

The simplest way to test the API:

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'your-user-id:your-api-key' \
  -H 'Content-Type: application/json' \
  -d '{"html": "<h1>Hello!</h1>"}'
```

---

## Available parameters

| Parameter | Required | Description |
|:----------|:---------|:------------|
| `html` | Yes* | The HTML to render |
| `css` | No | CSS styles for your HTML |
| `url` | Yes* | URL of a webpage to screenshot |
| `google_fonts` | No | Google Fonts to load (comma separated) |
| `ms_delay` | No | Milliseconds to wait before capture |
| `device_scale` | No | Device scale factor (1-3) for retina images |
| `full_screen` | No | Capture the full scrollable page |
| `selector` | No | CSS selector to screenshot a specific element |

*Either `html` or `url` is required.

For full parameter documentation, see [Parameters](/parameters/).

---

## Choose your language

Select your programming language below to see a complete working example:
