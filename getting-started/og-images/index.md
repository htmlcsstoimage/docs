---
layout: page
title: Open Graph Images
permalink: /getting-started/og-images/
parent: Getting started
nav_order: 3
description: >-
  Automatically generate Open Graph images and social cards for every page on a website, CMS, store, or static site with one URL pattern.
---
# Automatic Open Graph images for every page
{: .no_toc }
{: .fs-9 }

Give every page on your site an up-to-date social card with one stable image URL pattern.
{: .fs-6 .fw-300 }

[Create an OG Image Config](https://htmlcsstoimage.com/dashboard/og-configs/new){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Preview a page](https://htmlcsstoimage.com/tools/social-card-previewer){: .btn .fs-5 .mb-4 .mb-md-0 }

<hr>

## What is an Open Graph image?

When someone shares a URL in a social app, the app reads metadata from the page's HTML to build a link preview. The image in that preview is commonly called an **Open Graph image**, **OG image**, or **social card**.

Add image metadata inside the page's `<head>`:

```html
<meta property="og:image" content="https://example.com/social-card.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://example.com/social-card.png">
```

A useful social card makes a shared link easier to recognize and gives you room for the page title, brand, product, author, or other context. The image URL must be absolute and publicly accessible so social crawlers can fetch it.

## How dynamic OG images work

An OG Image Config connects one website origin to one HCTI image URL pattern:

| Page being shared | Image URL in the page metadata |
|:------------------|:-------------------------------|
| `https://example.com/` | `https://hcti.io/v1/og/DOMAIN_ID/` |
| `https://example.com/blog/hello` | `https://hcti.io/v1/og/DOMAIN_ID/blog/hello` |
| `https://example.com/products/red-shirt` | `https://hcti.io/v1/og/DOMAIN_ID/products/red-shirt` |

When a crawler requests the HCTI URL, HTML/CSS to Image:

1. Matches the path after your domain ID to the same path on your configured website.
2. Reads the page's title, description, Open Graph tags, and optional HCTI metadata.
3. Takes a screenshot of the page or renders one of your HCTI templates.
4. Returns the best image for the requesting social platform and reuses cached work when possible.

You do not need to expose an API key, generate an HMAC signature, or create an image before publishing the page. This makes OG Image Configs a good fit for static sites, CMSs, stores, and site builders where you can edit page metadata but do not want an image-generation backend.

If your application needs to pass arbitrary values at request time, use the [social-card API and template workflow](/use-cases/social-cards/) or [Signed Image URLs](/getting-started/create-and-render/) instead.

## Create an OG Image Config

Open [OG Image Configs in the dashboard](https://htmlcsstoimage.com/dashboard/og-configs/new), then complete the following sections.

### 1. Name the config and enter your website origin

Give the config a recognizable name. The optional description is for internal notes, and the **Enabled** switch lets you stop image generation without deleting the setup.

The **Website origin URL** is the site HCTI will visit. Use an exact, public HTTPS origin that you own or administer:

```text
https://example.com
```

- Include the scheme and hostname.
- Do not include a page path, query string, fragment, or wildcard.
- Create another config when a second hostname needs different behavior. For example, `www.example.com` and `shop.example.com` are separate origins.
- Make sure HCTI can access the pages. If the site requires authentication, configure the optional request headers and trusted redirect origins in the dashboard.

The path comes from the public HCTI image URL. A request for `/v1/og/DOMAIN_ID/articles/hello` captures `https://example.com/articles/hello`.

Query strings are intentionally ignored. They do not select another source page or create another image. Use unique paths for unique pages and use [`hcti:content_version`](#refresh-an-image-when-page-content-changes) when a page at the same path needs a new image identity.

### 2. Choose how often HCTI refreshes page metadata

The **Refresh interval** controls when HCTI checks the source page again for updated metadata. The default is 24 hours; the minimum available interval depends on your plan.

During the interval, requests reuse the last metadata check. Once it expires, HCTI can return the current image while refreshing the page in the background. Cache headers from your source page, such as `Cache-Control: max-age`, can extend the next check time.

See [OG Image caching and refreshes](/guides/debugging/og-image-caching/) for the full refresh lifecycle, manual refresh behavior, and social-platform caches.

### 3. Choose what to render

#### Page Screenshot

Use **Page Screenshot** to capture the source page itself. You can capture the viewport or target one element with a CSS selector. This works well when the page already contains a social-card component or when the page itself is the desired preview.

Set screenshot defaults in the dashboard, then override them for an individual page with `hcti:` metadata. Page metadata takes precedence over the configured default:

```html
<meta property="hcti:selector" content="#social-card">
<meta property="hcti:viewport_width" content="1200">
<meta property="hcti:viewport_height" content="630">
<meta property="hcti:ms_delay" content="250">
```

Common page-level controls include:

| Metadata | Purpose |
|:---------|:--------|
| [`hcti:selector`](/parameters/selector/) | Capture one CSS selector instead of the page viewport |
| [`hcti:css`](/parameters/) | Inject CSS before taking the screenshot |
| [`hcti:ms_delay`](/parameters/ms_delay/), [`hcti:max_wait_ms`](/parameters/max_wait_ms/) | Give the page more time to become ready |
| [`hcti:render_when_ready`](/parameters/render_when_ready/) | Wait for the page to signal that it is ready to render |
| [`hcti:transparent_background`](/parameters/transparent_background/) | Preserve a transparent page background |
| [`hcti:content_version`](/guides/debugging/og-image-caching/#force-a-new-content-identity) | Change the image identity when content at the same path changes |

{% include og_config_parameter_support.md %}

You can use either the `property` or `name` attribute for `hcti:` meta tags.

Keep **Parse meta tags for each path** enabled for page-level controls.

#### Template Values

Use **Template Values** when every image should follow a reusable design. Select an HCTI template and either use its latest version or pin a specific version.

Values can come from explicit page metadata:

```html
<meta property="html:tv:headline" content="A practical guide to social cards">
<meta property="html:tv:author" content="Sam Rivera">
<meta property="html:tv:accent" content="#635bff">
```

The text after `html:tv:` is the template variable name. JSON values are also supported for variables that expect an object or array.

You can also map existing metadata to template variables in the dashboard. Built-in sources include the page title, description, `og:title`, `og:description`, `og:url`, `og:site_name`, `twitter:title`, `twitter:description`, and custom meta tags. An explicit `html:tv:` value on the page takes precedence over a mapping to the same template variable.

For example, map the page's title metadata to a `headline` template variable and its description metadata to `summary`. Most CMSs can then use their existing SEO fields without adding new tags.

### 4. Choose image size optimization

Different apps prefer different aspect ratios. The optimization setting decides whether HCTI returns one universal image or adapts the image for the crawler requesting it.

| Dashboard option | How it works | Best when |
|:-----------------|:-------------|:----------|
| **Use one image everywhere** | Uses your configured viewport, or defaults to `1200 × 630`. Every crawler receives the same image. | Exact dimensions matter more than per-platform fit. |
| **Adapt one image** | Renders once, then fits that image inside each platform's preferred bounds without stretching it. The result may not fill every edge. | You want broad platform support with one render. This is the default. |
| **Create each size separately** | Renders again at the requesting platform's viewport. Responsive HTML or a responsive template can rearrange for each aspect ratio. | Your design can adapt to square, portrait, and landscape layouts. |

HCTI currently recognizes these platform targets:

| Size | Platforms |
|:-----|:----------|
| `1200 × 630` | Facebook, WhatsApp, Slack, TikTok, Snapchat, Telegram, Reddit, Threads, Google Chat, Discord, and the generic fallback |
| `1200 × 627` | LinkedIn and Bluesky |
| `1200 × 600` | Twitter |
| `1200 × 628` | Messenger and Apple Messages |
| `1080 × 1080` | Instagram |
| `1000 × 1500` | Pinterest |
| `1200 × 675` | Mastodon |

Most platforms use Open Graph metadata. Twitter prefers `twitter:image` and falls back to `og:image`; Slack and Snapchat can also fall back between Open Graph and Twitter metadata. For reliable coverage, point both tags at the same HCTI URL:

```html
<meta property="og:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/hello">
<meta property="og:image:secure_url" content="https://hcti.io/v1/og/DOMAIN_ID/articles/hello">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/hello">
```

Some Meta products share crawler behavior. When Instagram cannot be identified separately, HCTI uses the Facebook-compatible `1200 × 630` fallback.

### 5. Add the generated domain ID to your pages

After saving the config, the dashboard gives you a **domain ID**. Replace `DOMAIN_ID` in your metadata and append the current page path:

```html
<meta property="og:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/my-post">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/my-post">
```

The metadata must be present in the server-rendered HTML `<head>`. Do not rely on browser JavaScript to insert it unless your platform explicitly renders that metadata for crawlers.

Avoid multiple `og:image` or `twitter:image` tags unless you intentionally want fallback images. If a theme or SEO plugin already creates these tags, replace its image value or use its supported filter instead of adding a competing tag.

### Refresh an image when page content changes

For normal edits, let the refresh interval recheck the page. When your publishing system already has a numeric version or update timestamp, include it in the page metadata:

```html
<meta property="hcti:content_version" content="1735689600">
```

Incrementing this integer gives the render a new content identity without changing the public HCTI URL. Query parameters on the HCTI URL do not perform cache busting.

## Platform and CMS setup guides

Each guide shows where to put the tags and how to use that platform's page variables:

{% include og_image_platform_grid.html %}

## Verify the result

1. Publish a page, then use **View Source** to confirm that the final `<head>` contains one intended `og:image` and `twitter:image` URL.
2. Open the HCTI image URL directly and confirm that it returns an image.
3. Use the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer) to inspect the page metadata and platform-specific shapes.
4. If an old card remains, follow [OG Image caching and refreshes](/guides/debugging/og-image-caching/).

For general metadata syntax, see [The Open Graph protocol](https://ogp.me/) and [MDN's `<meta>` reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta).
