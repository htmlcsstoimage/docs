---
layout: page
title: identify_as_hcti
permalink: /parameters/identify_as_hcti/
parent: Parameters
nav_order: 60
description: >-
  Identify the top-level URL screenshot request as coming from HTML/CSS to Image.
---

# Using identify_as_hcti
{: .no_toc }
{: .fs-9 }

Identify a URL screenshot request as coming from HTML/CSS to Image.
{: .fs-6 .fw-300 }

<hr>

## How it works

Set `identify_as_hcti` to `true` to add this header to the top-level page request:

```http
X-HCTI-SCREENSHOT: 1
```

The parameter is available for URL screenshots and defaults to `false`. The header is not added to page subrequests.

Use it when your application wants to:

- Detect screenshot requests at the origin.
- Select screenshot-specific content or styling.
- Label requests in application logs.

{% include hint.md title="Not an authentication mechanism" text="The header name and value are public and predictable. Do not use identify_as_hcti by itself to authorize access or bypass security controls. Use a private value with the headers parameter when the origin must authenticate the render." %}

## JSON example

```json
{
  "url": "https://example.com/report",
  "identify_as_hcti": true
}
```

## Form example

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'UserID:APIKey' \
  --data-urlencode 'url=https://example.com/report' \
  --data 'identify_as_hcti=true'
```

For a private header name or value, use the [`headers` parameter](/parameters/headers/).

{% include code_footer.md version=2 %}
