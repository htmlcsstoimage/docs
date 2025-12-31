---
layout: default
title: Getting started
permalink: /getting-started/
nav_order: 2
expanded: true
has_children: true
---
# Getting started
{: .no_toc }
{: .fs-9 }

Start here to learn how to use the HTML/CSS to Image API.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }

<hr>

## Quick start in 3 steps

### 1. Get your API credentials

Sign up at [htmlcsstoimage.com](https://htmlcsstoimage.com) and grab your **User ID** and **API Key** from the [dashboard](https://htmlcsstoimage.com/dashboard).

### 2. Make your first request

Choose your approach:

**Generate from HTML/CSS:**
```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  -d html="<div style='padding:20px;background:#4f46e5;color:white;'>Hello World</div>"
```

**Screenshot a URL:**
```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://google.com"
```

### 3. Use your image

The API returns a URL to your generated image. Use it anywhere - in emails, social media, websites, or download it for other uses.

```json
{
  "url": "https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d",
  "id": "be4c5118-fe19-462b-a49e-48cf72697a9d"
}
```

<hr>

## Choose your path

| I want to... | Start here |
|:-------------|:-----------|
| Generate images from HTML/CSS | [Using the API](/getting-started/using-the-api/) |
| Take screenshots of websites | [URL to Image](/getting-started/url-to-image/) |
| Control image dimensions | [Setting Height and Width](/getting-started/setting-height-and-width/) |
| Create reusable templates | [Templates](/getting-started/templates/) |
| Generate images in one request | [Create and Render](/getting-started/create-and-render/) |

<hr>

## Example code

Get started quickly with code samples in your language:

- [PHP](/example-code/php)
- [JavaScript](/example-code/javascript)
- [Ruby](/example-code/ruby)
- [Python](/example-code/python)
- [Go](/example-code/go)
- [C#](/example-code/c)
- [cURL](/example-code/curl)
- [VB.NET](/example-code/vb.net)
- [Google Apps Script](/example-code/google-apps-script)

<hr>

## No-code options

Don't want to write code? We've got you covered:

- **[Zapier](/integrations/zapier/)** - Connect with 5,000+ apps
- **[Make](/integrations/make/)** - Build powerful automation workflows
- **[MCP Server](/integrations/mcp/)** - Generate images from AI assistants like Cursor, Claude, and more

<hr>

## Need help?

We're happy to help you get started. Email us at **support@htmlcsstoimage.com** - we're experts at debugging HTML rendering issues and love helping developers succeed.
