---
layout: page
title: Generate Automatic Open Graph Images for your Wix Site
nav_title: Wix
permalink: /guides/og-images/wix/
parent: OG Images
grand_parent: Guides
nav_order: 4
description: >-
  Add automatic Open Graph images to Wix pages and dynamic pages with Velo SEO APIs and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Wix Site
{: .no_toc }
{: .fs-9 }

Use Wix Velo to preserve existing SEO metadata while adding a path-specific HCTI social image on every page.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Connect a custom domain to Wix, then create an [OG Image Config](/getting-started/og-images/) for that exact public HTTPS origin. Copy the generated domain ID.

A custom domain is important because an OG Image Config accepts an origin, not a Wix free-site URL with a site-name path beneath a shared hostname.

- Choose **Page Screenshot** to capture each Wix page or a dedicated element.
- Choose **Template Values** to render Wix's existing SEO fields or custom Velo data in an HCTI template.

## Add the tags with Velo

Turn on Velo. Open the global `masterPage.js` file under **Page Code** so the code runs for every page.

Add this code and replace `YOUR_DOMAIN_ID`:

```javascript
import wixLocationFrontend from "wix-location-frontend";
import wixSeoFrontend from "wix-seo-frontend";

const domainId = "YOUR_DOMAIN_ID";
const existingMetaTags = wixSeoFrontend.metaTags;

$w.onReady(async function () {
  const pagePath = new URL(wixLocationFrontend.url).pathname;
  const imageUrl = `https://hcti.io/v1/og/${domainId}${pagePath}`;

  const tagsWithoutOldSocialImages = existingMetaTags.filter((tag) => {
    const key = (tag.property || tag.name || "").toLowerCase();
    return ![
      "og:image",
      "og:image:secure_url",
      "twitter:image",
      "twitter:card",
    ].includes(key);
  });

  await wixSeoFrontend.setMetaTags([
    ...tagsWithoutOldSocialImages,
    { property: "og:image", content: imageUrl },
    { property: "og:image:secure_url", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: imageUrl },
  ]);
});
```

Read `wixSeoFrontend.metaTags` outside `$w.onReady`, as shown. `setMetaTags()` overwrites the earlier meta-tag collection, so the code keeps the existing SEO tags, removes only old social-image tags, and writes the HCTI values inside `$w.onReady`.

The URL parser removes the query string and keeps the full published path. A Wix dynamic page such as `/recipes/waffles` therefore maps to `/v1/og/DOMAIN_ID/recipes/waffles`.

## Use Wix data in Template Values mode

In the HCTI dashboard, map Wix's existing title, description, `og:title`, or `og:description` metadata to your template variables. This works with SEO values configured in Wix without adding more code.

For custom fields on a dynamic page, run the complete metadata update after that page's dataset is ready. Use this in the dynamic page's code, changing `#dynamicDataset` and the field names to match your site:

```javascript
import wixLocationFrontend from "wix-location-frontend";
import wixSeoFrontend from "wix-seo-frontend";

const domainId = "YOUR_DOMAIN_ID";
const existingMetaTags = wixSeoFrontend.metaTags;

$w.onReady(function () {
  $w("#dynamicDataset").onReady(async function () {
    const item = $w("#dynamicDataset").getCurrentItem();
    const pagePath = new URL(wixLocationFrontend.url).pathname;
    const imageUrl = `https://hcti.io/v1/og/${domainId}${pagePath}`;
    const oldImages = [
      "og:image",
      "og:image:secure_url",
      "twitter:image",
      "twitter:card",
    ];
    const preservedTags = existingMetaTags.filter((tag) => {
      const key = (tag.property || tag.name || "").toLowerCase();
      return !oldImages.includes(key);
    });

    await wixSeoFrontend.setMetaTags([
      ...preservedTags,
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: imageUrl },
      { property: "html:tv:headline", content: item.title },
      { property: "html:tv:category", content: item.category },
    ]);
  });
});
```

Use this instead of the `masterPage.js` setter for that route. Remove the global setter or gate it so the two versions do not run on the same dynamic page; concurrent calls can overwrite one another.

## Configure Page Screenshot mode

Add page-specific HCTI meta objects to the same array when needed:

```javascript
{ property: "hcti:selector", content: "#socialCard" },
{ property: "hcti:ms_delay", content: "500" },
{ property: "hcti:content_version", content: "4" },
```

Wix element IDs and rendered DOM selectors are not always identical. Inspect the published HTML and verify that the selector identifies the intended rendered element before relying on it.

## Publish and verify

Publish to the same custom domain configured in HCTI. Use **View Source** and the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer) to confirm Wix exposed the final tags to crawlers. Check a regular page and at least one dynamic item.

See Wix's documentation for [global `masterPage.js` code](https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/overview/where-do-i-put-my-code), [`wix-seo-frontend.setMetaTags()`](https://dev.wix.com/docs/velo/apis/wix-seo-frontend/set-meta-tags), and [`wix-location-frontend`](https://dev.wix.com/docs/velo/apis/wix-location-frontend/url).

[Back to OG Image Configs](/getting-started/og-images/)
