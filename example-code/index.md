---
layout: default
title: Example code
permalink: /example-code/
nav_order: 10
has_children: true
has_toc: false
description: >-
  HTML to Image and PDF code examples for Python, PHP, JavaScript, TypeScript, Ruby, Go, C#/.NET, Java, Rust, Kotlin, Elixir, and more. Copy-paste ready API integration code.
---
# Example code
{: .no_toc }
{: .fs-9 }

Use these examples to render HTML/CSS, webpage screenshots, PDFs, and reusable templates from your application.
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/#demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }

{% include hint.md title="Using an AI coding assistant?" text="Skip writing code entirely. Connect our [MCP Server](/integrations/mcp/) to generate images directly from Cursor or Claude Code." %}

<hr>

## Works with any programming language

The HTML/CSS to Image API is a simple REST API. **If your language can make an HTTP request, it can generate images and PDFs.**

We provide example code for popular languages, but the API works the same way everywhere:

1. Send a `POST` request to `https://hcti.io/v1/image`
2. Include your HTML/CSS, a URL, or template values in the request
3. Authenticate with HTTP Basic Auth
4. Receive a JSON response with a generated image URL
5. Use the returned URL as PNG, JPG, WebP, or PDF

---

## Start with a client library

If you are using TypeScript, JavaScript, or .NET, start with the official clients. They include helpers for authentication, JSON requests, templates, and signed image URLs.

| Language | Recommended starting point |
|:---------|:---------------------------|
| TypeScript / JavaScript | [Official npm client](/example-code/typescript/#official-npm-client) |
| C# / .NET | [Official NuGet package](/example-code/c/) |

The other examples stay close to each language's standard HTTP and JSON tools, adding a popular client library only when the language does not include one.

---

## Common API requests

### Create an image

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
  "css": ".box { padding: 20px; background: #03B875; color: white; }",
  "google_fonts": "Roboto",
  "device_scale": 2
}
```

### Response

```json
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d",
  "id": "be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

The returned URL is your generated image. Append `.png`, `.jpg`, `.webp`, or `.pdf` to get a specific format.

### Render a reusable template

Use a template when the design stays the same and only the data changes.

```bash
curl -X POST https://hcti.io/v1/image/t-your-template-id \
  -u "$HCTI_USER_ID:$HCTI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "template_values": {
      "title": "Quarterly report",
      "stats": {
        "revenue": "$48k",
        "growth": "12%"
      }
    }
  }'
```

Objects inside `template_values` should be encoded as JSON. If you use form data instead of JSON, send `template_values` as a JSON-encoded string.

---

## Quick reference with cURL

The simplest way to test a direct HTML/CSS render:

```bash
curl -X POST https://hcti.io/v1/image \
  -u "$HCTI_USER_ID:$HCTI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"html": "<h1>Hello!</h1>"}'
```

---

## Available parameters

The examples send JSON. The API also accepts form data; when using form data, nested objects such as `pdf_options` should be JSON encoded.

### Create image body parameters

| Name | Type | Description |
|:-----|:-----|:------------|
| **html**† | `String` | HTML to render. Send a snippet or a full HTML document. |
| **css** | `String` | CSS for your HTML. When used with `url`, the CSS is injected into the page. |
| **url**† | `String` | Fully qualified public URL to screenshot. When passed, it overrides `html`. |

{% include hint.md title="Required params" text="† Either `html` OR `url` is required, but not both. `css` is optional." %}

### Rendering options

{% include additional_parameters.md %}

When rendering templated images, send a `POST` request to `https://hcti.io/v1/image/:template_id` with `template_values` as JSON:

```json
{
  "template_values": {
    "title": "Quarterly report",
    "subtitle": "Q4 summary"
  }
}
```

For the full list of request, template, and generated image URL parameters, see [Using the API](/getting-started/using-the-api/) and [Image Templates](/getting-started/templates/).

---

## Choose your language

Select your programming language to see a complete working example:

| Language | Example |
|:---------|:--------|
| cURL | [Terminal example](/example-code/curl/) |
| JavaScript | [JavaScript example](/example-code/javascript/) |
| TypeScript | [TypeScript example](/example-code/typescript/) |
| Python | [Python example](/example-code/python/) |
| PHP | [PHP example](/example-code/php/) |
| Ruby | [Ruby example](/example-code/ruby/) |
| Go | [Go example](/example-code/go/) |
| C# / .NET | [C# / .NET example](/example-code/c/) |
| VB.NET | [VB.NET example](/example-code/vb.net/) |
| Java | [Java example](/example-code/java/) |
| Kotlin | [Kotlin example](/example-code/kotlin/) |
| Rust | [Rust example](/example-code/rust/) |
| Elixir | [Elixir example](/example-code/elixir/) |
| Google Apps Script | [Google Apps Script example](/example-code/google-apps-script/) |
