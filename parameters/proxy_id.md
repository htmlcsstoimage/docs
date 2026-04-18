---
layout: page
title: proxy_id
permalink: /parameters/proxy_id/
parent: Parameters
nav_order: 12
description: >-
  Route a render's outbound traffic through one of your dashboard-configured HTTP proxies.
---

# Using proxy_id
{: .no_toc }
{: .fs-9 }

Route an image render through your own HTTP proxy.
{: .fs-6 .fw-300 }

<hr>

## How it works

The `proxy_id` parameter tells the API to route **all outbound traffic for this render** through one of the proxies you've configured in the dashboard at [https://htmlcsstoimage.com/dashboard/proxies](https://htmlcsstoimage.com/dashboard/proxies).

This is commonly used to:

- Allowlist a single egress IP on a private origin.
- Get past bot detection on the target site.
- Make requests appear from a specific region.

For setup instructions, supported fields, and bypass-host behavior, see the full [HTTP Proxies guide](/guides/advanced/proxies/).

## Value

| Type | Description |
|:-----|:------------|
| `String` | The `id` of a proxy you've created in the dashboard. |

## Example usage

### JSON request

```json
{
  "url": "https://internal.example.com",
  "proxy_id": "your-proxy-id"
}
```

### cURL

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'UserID:APIKey' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://internal.example.com",
        "proxy_id": "your-proxy-id"
      }'
```

### HTML/CSS render

```json
{
  "html": "<img src='https://internal.example.com/logo.png' />",
  "proxy_id": "your-proxy-id"
}
```

{% include hint.md title="Plan availability" text="Proxies are available on the **10,000 images/month plan or higher**." %}

{% include hint.md title="Disabling a proxy" text="You can disable a proxy in the dashboard at any time. Existing images keep working — only new renders that pass that `proxy_id` will be rejected." %}

{% include code_footer.md version=1 %}
