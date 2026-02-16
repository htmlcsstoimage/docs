---
layout: page
title: FAQ
permalink: /faq/
nav_order: 10
description: Frequently asked questions about the HTML/CSS to Image API - file formats, pricing, rate limits, and more.
---
# Frequently Asked Questions
{: .no_toc }
{: .fs-9 }

Not finding your answer here? Please email us: <a href="mailto:support@htmlcsstoimage.com">support@htmlcsstoimage.com</a>. We enjoy helping people debug their HTML.
{: .fs-4 .fw-300 }

<hr>

## Getting Started

### What file formats are supported?

PNG (default), JPG, WebP, and PDF. Simply change the file extension on your image URL: `.png`, `.jpg`, `.webp`, or `.pdf`. If no extension is specified, you'll get a PNG.

### What are the maximum image dimensions?

There's no strict maximum size. The `viewport_width` limit is 6000 pixels. For height, there's no set limit—`full_screen` screenshots can reach ~10,000 pixels tall.

Keep in mind images render at 2x by default, so the actual output resolution is double the viewport size. Smaller images will render faster and perform better.

### How fast is the API?

Simple images render in as little as 300ms. Most images complete in 1-3 seconds. Complex pages with many external resources or JavaScript may take longer. Use `ms_delay` to control timing, or `max_wait_ms` to set a maximum wait time.

### Why is my image twice as large as expected?

By default we render images at `@2X` resolution for high-DPI screens like iPhones and Retina displays. This ensures your images look crisp on modern devices.

To get `@1X` resolution, set `device_scale: 1` when creating your image. [Learn more about device_scale](/parameters/device_scale/).

<hr>

## Technical

### Can I use external CSS stylesheets?

Yes, embed the `<link>` tag in your HTML and it will be loaded before rendering. Multiple CSS files are supported. Large files may slow down initial render time. See this [CodePen for an example](https://codepen.io/mscccc/pen/eLRLQq).

### Can I use external JavaScript?

Yes, external JavaScript works. Embed the `<script>` tag in your HTML and it will be loaded and executed.

If you need to wait for JavaScript to finish executing, use `ms_delay` to add a delay, or use `render_when_ready: true` and call `ScreenshotReady()` from your code when ready. [Learn more about render_when_ready](/parameters/render_when_ready/).

### How do I wait for JavaScript to execute?

Two options:

1. **`ms_delay`** - Add a fixed delay (in milliseconds) before capturing. Start with `500` and adjust as needed.
2. **`render_when_ready`** - Set to `true` and call `ScreenshotReady()` from your JavaScript when everything is loaded. This gives you precise control.

[Learn more about render_when_ready](/parameters/render_when_ready/).

### Can I load external images?

Yes, include the full URL to your external image. The API will load it before creating the image.

```html
<img src="https://example.com/yourimage.png" />
```

For best results, use HTTPS URLs. Some servers may block requests from our renderer.

### Can I use custom fonts?

Yes! You have several options:

1. **Google Fonts** - Use the `google_fonts` parameter: `"google_fonts": "Roboto|Open Sans"`
2. **Self-hosted fonts** - Embed fonts using `@font-face` in a `<style>` tag
3. **Font CDNs** - Link to fonts from services like Adobe Fonts or fonts.com

[Learn more about fonts](/guides/styling/external-css-fonts/).

### Can I use my own Font Awesome Pro icons?

Yes, include the `<link>` tag to the Font Awesome CDN in your HTML. You may need to whitelist `hcti.io` in your Font Awesome kit settings to allow our servers to load your icons.

### How do I get a transparent background?

Use PNG format and pass the transparent background via the **`css` parameter** (not in a `<style>` tag in your HTML):

```json
{ "css": "body { background-color: transparent; }" }
```
Transparency only works when set through the `css` parameter. [Learn more](/guides/styling/transparent-background/).

### How do I render an entire webpage?

We recommend passing the `url` parameter to screenshot a public webpage. [Learn how here](/getting-started/url-to-image/).

Alternatively, pass full HTML markup (starting with `<html>` and ending with `</html>`) and the API will render the entire page as displayed by Google Chrome.

### Can I take full-page screenshots?

Yes, set `full_screen: true` to capture the entire scrollable height of a page, not just the viewport. [Learn more](/parameters/full_screen/).

### Do you have a list of IP addresses I can allowlist?

No. Our rendering servers scale dynamically on AWS, so we are unable provide a static IP allowlist.

If you're taking screenshots of protected URLs, we recommend adding a custom query parameter to the URL (for example `?hcti=1`). Then create a firewall rule (such as in Cloudflare) that allows requests when that query parameter is present.

### How do I block cookie consent banners?

Set `block_consent_banners: true` when taking URL screenshots. This uses a browser extension to automatically dismiss most cookie popups. [Learn more](/guides/advanced/blocking-cookie-banners/).

### Do you support Chinese, Japanese and Korean characters?

Yes. We have [Noto CJK](https://www.google.com/get/noto/help/cjk/) installed in our renderer. If you find any language or character set that doesn't render correctly, email us and we'll add support for it.

### What version of Google Chrome does HCTI use?

We keep HCTI up-to-date with the latest stable version of Chrome, typically within a few weeks of major releases. We run a full test suite to ensure images render as expected before upgrading.

<hr>

## Features

### Can I generate PDFs?

Yes! Change the file extension to `.pdf` on any image URL. You can also customize PDF output with `pdf_options` for page size, margins, and scaling. [Learn more about PDF options](/parameters/pdf_options/).

### How do I generate social media images (OG images)?

Create a 1200x630px template with your branding, then generate unique images for each page by passing dynamic content. Many companies like Dev.to use this for automated social cards.

[See our social cards guide](/use-cases/social-cards/).

### Can I create reusable templates?

Yes! Templates let you define HTML with variables (using Handlebars syntax) that get substituted at render time. Perfect for generating thousands of similar images with different content.

[Learn more about templates](/getting-started/templates/).

<hr>

## Integrations

### Can I use the API with AI coding assistants?

Yes! We have an MCP server that works with Cursor, Claude Desktop, Windsurf, Zed, Cline, and other AI assistants. Generate images by describing what you want in natural language - no code required.

[Learn more about MCP integration](/integrations/mcp/).

### Do you have Zapier or Make integrations?

Yes! Both are available for no-code automation. Connect image generation to thousands of other apps without writing code.

- [Zapier integration](/integrations/zapier/)
- [Make integration](/integrations/make/)

<hr>

## Account & Billing

### Is there a rate limit?

No per-second or per-minute rate limits. You can make requests as fast as you need. The only limit is your monthly image quota based on your plan.

### What happens if I exceed my plan limit?

The API returns a `429 Too Many Requests` error with a message showing your usage. You can upgrade your plan anytime from the [Dashboard](https://htmlcsstoimage.com/dashboard), and it takes effect immediately.

### Do you offer a free trial?

Yes! Sign up at [htmlcsstoimage.com](https://htmlcsstoimage.com) to get free images to test the API. No credit card required to get started.

### How do I upgrade my account?

You can change your plan anytime by visiting the [Dashboard](https://htmlcsstoimage.com/dashboard). Upgrades take effect immediately.

### I need to generate a large amount of images one time, which plan should I use?

If an existing monthly plan doesn't fit your needs, email us at **support@htmlcsstoimage.com** with the number of images you need. We can send you a one-time invoice and credit your account.

### Can you provide an SLA?

Absolutely. All of our enterprise plans include an SLA. Contact us at **support@htmlcsstoimage.com** and we can build a custom plan for your specific needs.

### How long will my image URL work?

Forever. As long as your HCTI account is active, we keep a copy of your generated image stored and accessible from your image URL.

### How much bandwidth can I use?

Unlimited. All images served by [hcti.io](https://hcti.io) are cached by Cloudflare's global CDN. Bandwidth is included in your subscription.

### Can I set my images filename?

The filename is a randomly generated [UUID](https://en.m.wikipedia.org/wiki/Universally_unique_identifier). We don't currently support custom filenames.

This design keeps your content secure (URLs are hard to guess) and helps us scale the infrastructure for millions of images. If you need a specific filename, you can download the image and rename it.

### Can I use the API for a hackathon?

Definitely! If you're a student building something cool, email us and we'd be happy to add free images to your account.

<hr>

## I have other questions, who do I ask?

Email us! **support@htmlcsstoimage.com**. We'd love to hear from you. We're experts at debugging rendering issues - send us your toughest problems.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What file formats are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PNG (default), JPG, WebP, and PDF. Simply change the file extension on your image URL. If no extension is specified, you'll get a PNG."
      }
    },
    {
      "@type": "Question",
      "name": "What are the maximum image dimensions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There's no strict maximum size. The viewport_width limit is 6000 pixels. For height, there's no set limit—full_screen screenshots can reach ~10,000 pixels tall. Images render at 2x by default, so actual output resolution is double the viewport size."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is the API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple images render in as little as 300ms. Most images complete in 1-3 seconds. Complex pages with many external resources or JavaScript may take longer."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my image twice as large as expected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By default we render images at @2X resolution for high-DPI screens. To get @1X resolution, set device_scale: 1 when creating your image."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use external CSS stylesheets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, embed the link tag in your HTML and it will be loaded before rendering. Multiple CSS files are supported."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use external JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, embed the script tag in your HTML and it will be loaded and executed. Use ms_delay or render_when_ready if you need to wait for JavaScript to finish."
      }
    },
    {
      "@type": "Question",
      "name": "How do I wait for JavaScript to execute?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use ms_delay to add a fixed delay in milliseconds, or use render_when_ready: true and call ScreenshotReady() from your JavaScript when ready."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use custom fonts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Use the google_fonts parameter for Google Fonts, embed fonts using @font-face, or link to font CDNs like Adobe Fonts."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a transparent background?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use PNG format and pass the transparent background via the css parameter, not in a style tag in your HTML. Set css to 'body { background-color: transparent; }'. This is a common mistake—transparency only works when set through the css parameter."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take full-page screenshots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, set full_screen: true to capture the entire scrollable height of a page, not just the viewport."
      }
    },
    {
      "@type": "Question",
      "name": "Do you have a list of IP addresses I can allowlist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our rendering servers scale dynamically on AWS, so we don't provide a static IP allowlist. If you're taking screenshots of protected URLs, add a custom query parameter to the URL (for example ?hcti=1) and create a firewall rule (such as in Cloudflare) that allows requests when that query parameter is present."
      }
    },
    {
      "@type": "Question",
      "name": "How do I block cookie consent banners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set block_consent_banners: true when taking URL screenshots. This automatically dismisses most cookie popups."
      }
    },
    {
      "@type": "Question",
      "name": "Can I generate PDFs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Change the file extension to .pdf on any image URL. You can customize PDF output with pdf_options for page size, margins, and scaling."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the API with AI coding assistants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We have an MCP server that works with Cursor, Claude Desktop, Windsurf, Zed, and other AI assistants. Generate images by describing what you want in natural language."
      }
    },
    {
      "@type": "Question",
      "name": "Do you have Zapier or Make integrations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Both are available for no-code automation. Connect image generation to thousands of other apps without writing code."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a rate limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No per-second or per-minute rate limits. You can make requests as fast as you need. The only limit is your monthly image quota based on your plan."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I exceed my plan limit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The API returns a 429 Too Many Requests error. You can upgrade your plan anytime from the Dashboard, and it takes effect immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer a free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Sign up at htmlcsstoimage.com to get free images to test the API. No credit card required to get started."
      }
    },
    {
      "@type": "Question",
      "name": "Can you provide an SLA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. All of our enterprise plans include an SLA. Contact us at support@htmlcsstoimage.com and we can build a custom plan for your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "How long will my image URL work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Forever. As long as your HCTI account is active, we keep a copy of your generated image stored and accessible from your image URL."
      }
    },
    {
      "@type": "Question",
      "name": "How much bandwidth can I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlimited. All images served by hcti.io are cached by Cloudflare's global CDN. Bandwidth is included in your subscription."
      }
    },
    {
      "@type": "Question",
      "name": "Do you support Chinese, Japanese and Korean characters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We have Noto CJK installed in our renderer. If you find any language or character set that doesn't render correctly, email us and we'll add support for it."
      }
    },
    {
      "@type": "Question",
      "name": "What version of Google Chrome does HCTI use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We keep HCTI up-to-date with the latest stable version of Chrome, typically within a few weeks of major releases."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the API for a hackathon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Definitely! If you're a student building something cool, email us and we'd be happy to add free images to your account."
      }
    }
  ]
}
</script>
