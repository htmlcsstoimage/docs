---
layout: page
title: Screenshots
permalink: /use-cases/screenshots/
parent: Use Cases
nav_order: 2
description: >-
  Capture screenshots of any webpage programmatically with the HTML/CSS to Image API.
---
# Webpage Screenshots
{: .no_toc }
{: .fs-9 }

Capture any public webpage as a high-quality image.
{: .fs-4 .fw-300 }

<hr>

## Overview

The HTML/CSS to Image API can capture screenshots of any publicly accessible URL. Pass a URL to the API, and get back a pixel-perfect screenshot rendered in a real instance of Google Chrome.

## Basic usage

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://stripe.com"
```

{% cloudinary /assets/images/stripe.png alt="Screenshot of stripe.com auto generated with the API" %}

## Common use cases

### Website archival

Capture and preserve webpage snapshots for compliance, legal, or historical purposes.

### Link previews

Generate preview images for links shared in your application, similar to how Slack or Twitter shows link previews.

### Competitive monitoring

Automatically capture competitor websites to track design changes over time.

### Documentation

Generate up-to-date screenshots for product documentation and tutorials.

### Testing and QA

Capture screenshots during automated testing to verify UI changes.

## Capture specific elements

Use the `selector` parameter to capture just a portion of a page:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://stripe.com" \
  --data-urlencode selector="section#complete-toolkit"
```

{% cloudinary /assets/images/url-selector-example.png alt="Use a CSS selector to crop an image" %}

## Full-page screenshots

Capture the entire scrollable length of a page:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com/long-page" \
  --data full_screen=true
```

[Learn more about full_screen](/parameters/full_screen/)

## Hide cookie banners

Many websites display consent popups. Use `block_consent_banners` to hide them:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com" \
  --data block_consent_banners=true
```

[Learn more about blocking cookie banners](/guides/blocking-cookie-banners/)

## High-resolution screenshots

Set `device_scale` to 2 for retina-quality images:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com" \
  --data device_scale=2
```

## Control the viewport

Set a specific viewport size for your screenshots:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com" \
  --data viewport_width=1920 \
  --data viewport_height=1080
```

## Wait for JavaScript

If the page needs time to fully render (e.g., charts, animations), add a delay:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com" \
  --data ms_delay=1000
```

## Inject custom CSS

Modify the appearance of the page before capturing:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  --data-urlencode url="https://example.com" \
  --data-urlencode css=".banner { display: none; } body { background: white; }"
```

## Social media screenshots

We have dedicated guides for capturing content from popular platforms:

- [Twitter/X Screenshots](/guides/twitter-screenshot/)
- [Facebook Screenshots](/guides/facebook-screenshot/)
- [Instagram Embeds](/guides/instagram-embed/)
- [LinkedIn Screenshots](/guides/linkedin-screenshot/)

## Limitations

- The URL must be publicly accessible (no login-required pages)
- Private or authenticated content cannot be captured
- Some sites may block automated access

{% include code_footer.md version=1 %}

