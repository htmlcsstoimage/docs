---
layout: page
title: Blocking cookie banners
permalink: /guides/blocking-cookie-banners/
parent: Guides
nav_order: 10
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

The easiest way to hide cookie banners in your screenshots is by injecting CSS into your image to hide them.

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
