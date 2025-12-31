---
layout: page
title: URL to Image
permalink: /getting-started/url-to-image/
description: >-
  Take a screenshot of any URL using the API. Screenshot generated in a real
  instance of Google Chrome.
parent: Getting started
nav_order: 4
---
# URL to Image
{: .no_toc }
{: .fs-9 }

The high resolution screenshot API you've been searching for.
{: .fs-6 .fw-300 }

[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }

<hr>

## Creating an image from a URL

With the API, you can automate taking a screenshot of any website.

Pass the `url` param to the `hcti.io/v1/image` endpoint, and we'll generate a screenshot for you. Here's an example using cURL.

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' 
             --data-urlencode url="https://google.com"
```

Don't write code? Don't worry, you can also do this with our [Zapier integration](https://docs.htmlcsstoimage.com/integrations/zapier/).

{% cloudinary /assets/images/google.jpg sizes="600px" alt="Screenshot of google.com" %}

## Additional parameters

To customize your image further, you can take advantage of the following optional parameters.

{% include additional_parameters.md %}

<hr>

## Screenshot examples

A full screenshot of `stripe.com`. With device scale set to 2, for a super high resolution image.

{% cloudinary /assets/images/stripe.png sizes="600px" alt="Screenshot of stripe.com auto generated with the API" %}

<hr>

## Screenshot part of a page with Selector

You can set a `selector` to target a specific part of the page. 

For example, on Stripe's homepage, there is an element with the CSS selector `section#complete-toolkit.container-lg`.

When passing that to the API, we crop to that element only.

{% cloudinary /assets/images/url-selector-example.png sizes="600px" alt="Use a CSS selector to crop an image" %}

<hr>

## CSS Selectors

To learn about CSS Selectors, we recommend [this article](https://www.w3schools.com/cssref/css_selectors.asp). There are also Chrome extensions that detect them for you, we like using: [Selector Gadget](https://chrome.google.com/webstore/detail/selectorgadget/mhjhnkcfbdhnjickkkdbjoemdmbfginb?hl=en).

<hr>

## Blocking cookie consent banners

Many websites display cookie consent popups that can interfere with your screenshots. Use the `block_consent_banners` parameter to automatically hide these:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://example.com" \
     --data block_consent_banners=true
```

This automatically detects and blocks common consent frameworks like OneTrust, Cookiebot, and others. For more advanced cases, see our [complete guide to blocking cookie banners](/guides/advanced/blocking-cookie-banners/).

<hr>

## Pages requiring login or sign-in

Our API does not support pages that require login. The URL must be publicly accessible for us to generate an image of it.
Supporting login is a common request, but we have chosen not to support it due to the risk of storing and transmitting credentials.

Some sites have the option of creating an "embed" of a page. This is the best option if it's available to you. You can then use the embed's HTML to generate a screenshot without login.

<hr>
## Need help getting started?

We'd be happy to walk you through getting started. Send us an email: **support@htmlcsstoimage.com**. We're experts at generating images and will help you get going using the API.
