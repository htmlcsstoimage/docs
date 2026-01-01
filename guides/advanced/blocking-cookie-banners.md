---
layout: page
title: Blocking cookie banners
permalink: /guides/advanced/blocking-cookie-banners/
parent: Advanced
grand_parent: Guides
nav_order: 1
description: >-
  Learn how to hide cookie banners when taking screenshots
---
# Blocking cookie banners
{: .no_toc }
{: .fs-9 }

Learn how to block cookie banners with taking screenshots
{: .fs-6 .fw-300 }

<hr>

## How it works

The easiest way to hide cookie banners in your screenshots is by using the `block_consent_banners` parameter.

When set to `true`, the API will automatically detect and block common cookie consent banners and popups on websites. This is the recommended approach for most use cases.

## Automatic Cookie Banner Blocking

Simply add `block_consent_banners: true` to your API request:

```json
{
  "url": "https://example.com",
  "block_consent_banners": true
}
```

This automatically handles the most common cookie consent frameworks including:
- OneTrust
- Cookiebot
- Quantcast Choice
- TrustArc
- Osano
- And many others

{% include hint.md title="Recommended Method" text="Using block_consent_banners is the easiest and most reliable way to hide cookie popups. It's maintained and updated regularly to handle new consent frameworks." %}

## Manual CSS Injection (Advanced)

For custom cookie banners not covered by the automatic blocking, you can still use CSS injection.

Any CSS passed via the `css` param when generating a URL image will get injected into the page.

The hard part can be figuring out what CSS to use to block the cookie banner. To do this, we recommend visiting the site in Chrome.
Use the developer tools inspector to find the ID or CSS class of the cookie banner (the css selector).

Then use this information to override the visibility of the cookie banner.

Here is an example that hides some common cookie banner.s

```css
#onetrust-consent-sdk {
 display: none !important;
}

.qc-cmp2-container {
   display: none !important;
}
```

To learn about CSS Selectors, we recommend [this article](https://www.w3schools.com/cssref/css_selectors.asp).


{% include code_footer.md version=1 %}


