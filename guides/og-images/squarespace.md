---
layout: page
title: Generate Automatic Open Graph Images for your Squarespace Site
nav_title: Squarespace
permalink: /guides/og-images/squarespace/
parent: OG Images
grand_parent: Guides
nav_order: 2
description: >-
  Add automatic Open Graph images to Squarespace pages with page header code injection and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Squarespace Site
{: .no_toc }
{: .fs-9 }

Connect Squarespace pages to automatic HCTI social cards with page-level header code injection.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for your Squarespace site's exact custom-domain origin, such as `https://www.example.com`. Copy the generated domain ID.

Choose **Page Screenshot** when the Squarespace page itself should become the image. Choose **Template Values** when you want a consistent branded design and can provide each page's title, description, or other values in metadata.

## Add tags to a static Squarespace page

Code injection availability depends on your Squarespace plan. To add metadata to one page:

1. Open **Pages**.
2. Open the page's settings.
3. Select **Advanced**.
4. Add the tags under **Page Header Code Injection**.

Use the complete published path for that page:

```html
<meta property="og:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
<meta property="og:image:secure_url" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
```

Replace `YOUR_DOMAIN_ID` and `/about`. Repeat this for each static page that needs an automatic card.

Squarespace can also set a built-in social sharing image. Clear that page-level image, or inspect the output carefully, so Squarespace does not emit another `og:image` that competes with the HCTI tag.

## Customize a page screenshot

Add HCTI metadata in the same page header field:

```html
<meta property="hcti:selector" content="#social-card">
<meta property="hcti:ms_delay" content="500">
<meta property="hcti:content_version" content="2">
```

Page metadata overrides screenshot defaults in the config. Increment the numeric content version when the visual content changes without changing the page path or other extracted metadata.

## Send values to an HCTI template

Add values whose names match your HCTI template variables:

```html
<meta property="html:tv:headline" content="About Acme Studio">
<meta property="html:tv:summary" content="Independent design and research from Brooklyn.">
<meta property="html:tv:accent" content="#7c3aed">
```

For fields Squarespace already outputs, prefer mapping `og:title`, `og:description`, the title tag, or description metadata in the HCTI dashboard. This avoids entering the same copy twice.

## Understand collection-page limitations

Page Header Code Injection can add metadata to a regular page or to the collection page itself. Squarespace's blog-post item injection is placed in the page body, not reliably in each item's `<head>`, so it is not a dependable way to create per-post social metadata.

For a blog post, event, or product collection, use one of these approaches:

- Add a static HCTI image URL to each item through the SEO/social settings when the editor accepts an external URL.
- Use a custom developer integration that emits a server-rendered tag containing the current item path.
- Keep Squarespace's built-in per-item social image for collections, and use HCTI on the static pages where page header injection is available.

Do not inject the tag with ordinary browser JavaScript. Social crawlers may read the original HTML without running it.

## Verify the published page

Publish the page, use **View Source**, and confirm the intended tag appears inside `<head>`. Then test it with the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer).

See Squarespace's guides to [code injection](https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection), [page settings](https://support.squarespace.com/hc/en-us/articles/206543657-Page-settings), and [social sharing images](https://support.squarespace.com/hc/en-us/articles/205812778-Adding-social-sharing-images).

[Back to OG Image Configs](/getting-started/og-images/)
