---
layout: page
title: format
permalink: /parameters/format/
parent: Parameters
nav_order: 25
description: >-
  Choose the file extension included in the URL returned by a create image request.
---

# Using format
{: .no_toc }
{: .fs-9 }

Choose the file extension included in the image URL returned by the API.
{: .fs-6 .fw-300 }

<hr>

## How it works

Set `format` in the request body sent to `POST /v1/image`. The API appends the selected format to the image URL in its response.

The parameter only changes the URL returned by the creation request. It does not change the stored image definition or lock the image to one format. You can request the same image ID later with a different supported extension.

The parameter works with:

- HTML/CSS image requests.
- URL screenshot requests.
- Images created from saved templates.
- Image batches, as either a variation or a default option.

When `format` is omitted, the API returns its default extensionless URL, which serves the image as PNG.

Format values are case-insensitive. The examples use lowercase values as the canonical form.

## How files are handled

Raster images are rendered and stored as PNGs. The extension in the URL determines how the image is served:

- A `.png` URL serves the stored PNG.
- A `.jpg` or `.webp` URL converts the stored PNG to that format.

PDFs are handled separately. When a `.pdf` URL is requested, the API creates and saves a separate PDF render rather than converting the stored PNG.

## Values

| Value | Description |
|:------|:------------|
| `png` | Return a URL ending in `.png`. The URL serves the stored PNG image. |
| `jpg` | Return a URL ending in `.jpg`. The stored PNG is converted to JPG when requested. |
| `webp` | Return a URL ending in `.webp`. The stored PNG is converted to WebP when requested. |
| `pdf` | Return a URL ending in `.pdf`. The PDF is rendered and saved separately when requested. Use [`pdf_options`](/parameters/pdf_options/) to configure it. |

## HTML/CSS example

```json
{
  "html": "<h1>Product launch</h1>",
  "css": "h1 { color: navy; }",
  "format": "webp"
}
```

The response URL includes the requested extension:

```json
{
  "id": "image-id",
  "url": "https://hcti.io/v1/image/image-id.webp"
}
```

## URL screenshot with a PDF URL

```json
{
  "url": "https://example.com/report",
  "format": "pdf",
  "pdf_options": {
    "page_width": "210mm",
    "page_height": "297mm",
    "margins": ["20mm", "15mm", "20mm", "15mm"],
    "print_background": true
  }
}
```

The creation response includes a URL ending in `.pdf`. The PDF is rendered and saved separately when that URL is requested.

## Saved template image

```json
{
  "template_id": "template-id",
  "template_values": {
    "title": "Weekly summary"
  },
  "format": "jpg"
}
```

## Image batch

Set a default format for the batch or override it on an individual variation:

```json
{
  "default_options": {
    "html": "<h1>Default content</h1>",
    "format": "webp"
  },
  "variations": [
    {
      "html": "<h1>WebP image</h1>"
    },
    {
      "html": "<h1>PNG image</h1>",
      "format": "png"
    }
  ]
}
```

## Signed URLs

For signed create-and-render URLs, the format is a path component after the token rather than a request-body or query-string parameter:

```text
https://hcti.io/v1/image/create-and-render/:api_id/:token/webp?url=...
https://hcti.io/v1/image/:template_id/:token/pdf?title=...
```

See the [signed image URL guide](/getting-started/create-and-render/) for URL construction and HMAC details.

## Official clients

| Client | Version | Example |
|:-------|:--------|:--------|
| [.NET](/example-code/c/) | `0.12.0` | `Format = RenderImageFormat.PDF` |
| [TypeScript](/example-code/typescript/) | `0.9.0` | `format: 'pdf'` |
| [Ruby](/example-code/ruby/) | `0.3.0` | `format: "pdf"` |

For choosing a format and retrieving an existing image with a different extension, see the [file formats guide](/guides/styling/file-formats/).

{% include code_footer.md version=1 %}
