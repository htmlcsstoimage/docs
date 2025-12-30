---
title: HTML/CSS to Image API
layout: default
nav_order: 1
---

# HTML/CSS to Image API
{: .fs-9 }

Your search for pixel perfect image generation ends here.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }
<hr>

The API for generating high quality images from HTML/CSS.

- Converts HTML to `png`, `jpg` or `webp`
- Screenshot any URL
- No janky fonts or blurry images

<hr>

## Two ways to generate images

### From HTML/CSS

Create images programmatically using HTML and CSS. Perfect for social cards, certificates, dynamic graphics, and more.

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  -d html="<div style='padding:20px;background:#4f46e5;color:white;font-size:24px;'>Hello World</div>"
```

[Learn more about HTML to Image →](/getting-started/using-the-api/)

### From any URL

Take screenshots of any public webpage. Great for archiving, previews, and automated captures.

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://google.com"
```

[Learn more about URL to Image →](/getting-started/url-to-image/)

<hr>

## Quick start

Choose your path to get started:

| I want to... | Go here |
|:-------------|:--------|
| **Read the API docs** | [Using the API](/getting-started/using-the-api/) |
| **See example code** | [PHP](/example-code/php), [JavaScript](/example-code/javascript), [Ruby](/example-code/ruby), [Python](/example-code/python), [Go](/example-code/go), [cURL](/example-code/curl) |
| **Use with AI assistants** | [MCP Server](/integrations/mcp/) for Cursor, Claude, Windsurf, and more |
| **No-code options** | [Zapier](/integrations/zapier/) or [Make](/integrations/make/) |
| **See use cases** | [Use Cases & Examples](/use-cases/) |

{% include hint.md title="Works with any language" text="Don't see your language? The API works with anything that can make HTTP requests. See the [cURL example](/example-code/curl/) and adapt it to your stack." %}

<hr>

## Trusted by developers worldwide

Companies like Dev.to, Product Hunt, and thousands of developers use HTML/CSS to Image to generate millions of images every month.

{% cloudinary /assets/images/image%20%2823%29.png alt="Dev.to social card generated from HTML" %}

Dev.to uses the API to autogenerate thousands of custom social images for Twitter and Facebook.

[See more use cases →](/use-cases/)

<hr>

## Get an API key

To use this API, you'll need an API key. Get started for free:

[Get an API Key](https://htmlcsstoimage.com){: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 .mr-2 }
