---
layout: page
title: HTTP Proxies
permalink: /guides/advanced/proxies/
parent: Advanced
grand_parent: Guides
nav_order: 5
description: >-
  Route image renders through your own HTTP proxy. Restrict access to internal content, control egress IPs, or get past bot detection.
---
# HTTP Proxies
{: .no_toc }
{: .fs-9 }

Route outbound traffic from your renders through an HTTP proxy you control.
{: .fs-6 .fw-300 }

<hr>

## Why use a proxy?

When you configure a proxy, **all outbound HTTP requests made while rendering your image** are routed through it. This is useful when you want to:

- **Restrict access to internal content** by allowlisting our proxy's IP address on your origin (instead of opening it to the public internet).
- **Control the egress IP** so requests appear to come from a known location.
- **Get past bot detection** that rate-limits or blocks our shared infrastructure IPs.

{% include hint.md title="Plan availability" text="Proxies are available on the **10,000 images/month plan or higher**. If you'd like to try this out on a different plan, email **support@htmlcsstoimage.com**." %}

<hr>

## Recommended proxy providers

You can use any HTTPS proxy that's reachable from the public internet. If you don't already have one, these providers work well for screenshot and rendering use cases:

| Provider | Best for | Notes |
|:---------|:---------|:------|
| [Bright Data](https://brightdata.com/) | Bot detection, geo-targeting | Large residential and datacenter pools. Use their **Web Unlocker** or **Residential** zones for sites with strict bot detection. |
| [ZenRows](https://www.zenrows.com/) | Simple anti-bot bypass | Single proxy endpoint that handles rotation, headers, and CAPTCHAs for you. Good first choice if you want something turn-key. |
| [Oxylabs](https://oxylabs.io/) | Enterprise scraping | Residential, datacenter, and ISP proxies with strong geo-targeting. |
| [Smartproxy](https://smartproxy.com/) | Lower-cost residential | Pay-as-you-go residential pools that are easy to set up. |

You can also point `proxy_id` at any internal proxy you run yourself (Squid, HAProxy, an internal corporate proxy, etc.) — anything that speaks HTTPS proxy.

### Example: Bright Data

Bright Data gives you a host, port, username, and password per zone. In the dashboard:

- **Url**: `https://brd.superproxy.io`
- **Port**: `33335` (or whatever your zone shows)
- **Authentication**: enabled, with the zone's username (e.g. `brd-customer-hl_xxxxxxxx-zone-residential`) and password.

### Example: ZenRows

ZenRows exposes a single proxy endpoint and uses your API key as the password.

- **Url**: `https://superproxy.zenrows.com`
- **Port**: `1338`
- **Authentication**: enabled, with your ZenRows username and API key as the password.

{% include hint.md title="Use bypass hosts to save credits" text="Most paid proxies bill per request or per GB. Add hosts that don't need proxying — like Google Fonts, your own CDN, or analytics — to **Bypass Hosts** so they go out direct and don't burn through your proxy quota." %}

<hr>

## Creating a proxy

Proxies are managed in the dashboard at [https://htmlcsstoimage.com/dashboard/proxies](https://htmlcsstoimage.com/dashboard/proxies).

Click **Add New Proxy** and fill out the form:

{% cloudinary /assets/images/proxies-dashboard.png alt="Create a new HTTP proxy in the HTML/CSS to Image dashboard" %}

| Field | Description |
|:------|:------------|
| **Name** | An internal label to help you identify this proxy. Not sent anywhere. |
| **Url** | The full **HTTPS** URL of your proxy server. Do not include a port here. |
| **Port** | The network port your proxy listens on. |
| **Authentication** | Optional. Enable this if your proxy requires a username and password. |
| **Bypass Hosts** | Optional. One hostname per line. Requests to these hosts **will not** go through the proxy and will go out direct. Useful for skipping the proxy for things like Google Fonts or your own CDN. |
| **Enabled** | Allows new renders to use this proxy. You can disable a proxy at any time without affecting images that have already been generated. |

After saving, the dashboard will show the proxy's `id`. You'll pass this `id` on each request to use the proxy.

<hr>

## Using a proxy when generating an image

To route a render through one of your proxies, pass its `proxy_id` on the create image request.

### JSON request

```json
{
  "url": "https://example.com",
  "proxy_id": "your-proxy-id"
}
```

### cURL

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'user-id:api-key' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://internal.example.com",
        "proxy_id": "your-proxy-id"
      }'
```

### HTML/CSS with a proxy

`proxy_id` works for HTML/CSS renders too. Any external assets the page loads (images, fonts, scripts) will go through the proxy unless their host is in **Bypass Hosts**.

```json
{
  "html": "<img src='https://internal.example.com/logo.png' />",
  "proxy_id": "your-proxy-id"
}
```

<hr>

## How it works

- Only **outbound traffic from the render** is proxied. Once an image is generated, it's served from our CDN like any other image — viewing the image URL does not go through your proxy.
- **Disabling a proxy is safe.** Existing images keep working. Only new renders that try to use that `proxy_id` will be rejected.
- **Bypass Hosts skip the proxy.** Listed hostnames go out direct, which is helpful for high-volume third-party assets that don't need to be routed through your infrastructure.
- The proxy must be reachable over the public internet from our render servers.

{% include hint.md title="HTTPS only" text="The proxy URL must use `https://`. We do not support plain `http://` proxies." %}

<hr>

## Troubleshooting

- **Renders fail or time out** — Confirm the proxy is reachable from the public internet, the port is correct, and any IP allowlist on the proxy includes our render IPs.
- **Authentication errors** — Double-check the username and password in the dashboard. If your proxy requires auth, the **Enable authentication** checkbox must be checked.
- **Some assets aren't loading** — If those hosts are listed in **Bypass Hosts** they will skip the proxy. Remove them from the list if you want them proxied.
- **`proxy_id` rejected** — The proxy may be disabled. Re-enable it in the dashboard, or pass a different `proxy_id`.

{% include code_footer.md version=1 %}
