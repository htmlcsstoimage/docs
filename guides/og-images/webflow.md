---
layout: page
title: Generate Automatic Open Graph Images for your Webflow Site
nav_title: Webflow
permalink: /guides/og-images/webflow/
parent: OG Images
grand_parent: Guides
nav_order: 3
description: >-
  Add automatic Open Graph images to Webflow static and CMS pages with head custom code, dynamic fields, and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Webflow Site
{: .no_toc }
{: .fs-9 }

Add HCTI social cards to Webflow static pages and generate path-specific cards for CMS Collection pages.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for your published custom-domain origin and copy its domain ID.

Choose **Page Screenshot** for a visual capture of the Webflow page or one element. Choose **Template Values** for a reusable design populated by Webflow SEO metadata or CMS fields.

Custom code availability depends on your Webflow Site or Workspace plan. Changes only reach the public HTML after you publish the site.

## Add tags to a static page

Open the page's **Settings**, find **Custom Code**, and add this inside the `<head>` field:

```html
<meta property="og:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
<meta property="og:image:secure_url" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/about">
```

Replace the domain ID and `/about` with the published page path. In the page's Open Graph settings, remove the old social image so Webflow does not emit a competing `og:image`.

## Add tags to a CMS Collection page

Open the Collection template's **Page settings** and add the same tags to its `<head>` custom code. Build the HCTI URL from the collection route plus Webflow's dynamic **Slug** field.

For a collection route such as `/articles/{slug}`, the finished output needs this shape:

```html
<meta property="og:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/articles/each-item-slug">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/YOUR_DOMAIN_ID/articles/each-item-slug">
```

Use Webflow's **Add Field** control to insert the current Collection item's Slug after `/articles/`; do not type `each-item-slug` literally. Publish, then use **View Source** on two different Collection items to verify that each received its own path.

If your editor does not offer dynamic fields in the `<head>` custom-code field, do not recreate the tag with browser JavaScript. Use per-page static tags, export to a host where you can generate the head server-side, or keep Webflow's built-in dynamic social image for that Collection.

## Pass Webflow CMS fields to a template

In **Template Values** mode, first map Webflow's existing `og:title`, `og:description`, title, or description metadata in the HCTI dashboard.

For custom values, add tags to the Collection template and insert dynamic CMS fields into `content` with Webflow's field picker:

```html
<meta property="html:tv:headline" content="Current item Name field">
<meta property="html:tv:category" content="Current item Category field">
<meta property="html:tv:accent" content="Current item Accent field">
```

The text shown above represents dynamic field tokens selected in Webflow, not literal text. The names after `html:tv:` must match the selected HCTI template's variables.

## Customize Page Screenshot mode

Add HCTI controls in the same page or Collection-template head field:

```html
<meta property="hcti:selector" content="#social-card">
<meta property="hcti:ms_delay" content="300">
```

For a CMS page, you can insert a numeric updated-version field into `hcti:content_version` when your Collection contains one.

## Publish and verify

Publish to the same custom domain configured in HCTI. Use **View Source** on the public page to confirm that the tags are inside `<head>`, contain resolved CMS values, and do not conflict with Webflow's built-in Open Graph image. Then use the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer).

See Webflow's guides to [custom code in the head](https://help.webflow.com/hc/en-us/articles/33961357265299), [Open Graph settings](https://help.webflow.com/hc/en-us/articles/33961370297107-Control-the-look-of-social-shares-with-Open-Graph), and [Collection pages](https://help.webflow.com/hc/en-us/articles/33961277976467-Structure-and-style-Collection-pages).

[Back to OG Image Configs](/getting-started/og-images/)
