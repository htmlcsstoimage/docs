---
layout: page
title: Generate Automatic Open Graph Images for your Astro Site
nav_title: Astro
permalink: /guides/og-images/astro/
parent: OG Images
grand_parent: Guides
nav_order: 7
description: >-
  Add automatic Open Graph images to every Astro static or server-rendered page with a reusable SEO component and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Astro Site
{: .no_toc }
{: .fs-9 }

Use one Astro component to generate a matching HCTI social-card URL for every static or server-rendered route.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for the deployed site's exact public HTTPS origin and copy its domain ID.

- Choose **Page Screenshot** to capture each Astro route or a dedicated component.
- Choose **Template Values** to pass Astro props or content-collection data into an HCTI template.

## Create an SEO component

Create `src/components/HctiOgImage.astro`:

```html
---
interface Props {
  title?: string;
  description?: string;
  selector?: string;
  contentVersion?: number;
}

const {
  title,
  description,
  selector,
  contentVersion,
} = Astro.props;

const domainId = "YOUR_DOMAIN_ID";
const imageUrl = new URL(
  `/v1/og/${domainId}${Astro.url.pathname}`,
  "https://hcti.io",
).href;
---

<meta property="og:image" content={imageUrl} />
<meta property="og:image:secure_url" content={imageUrl} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={imageUrl} />

{title && <meta property="html:tv:headline" content={title} />}
{description && <meta property="html:tv:summary" content={description} />}
{selector && <meta property="hcti:selector" content={selector} />}
{contentVersion !== undefined && (
  <meta property="hcti:content_version" content={String(contentVersion)} />
)}
```

Replace `YOUR_DOMAIN_ID`. `Astro.url.pathname` supplies the generated route without its query string.

## Render it from a shared layout

Import the component into the layout that owns `<head>`:

```html
---
import HctiOgImage from "../components/HctiOgImage.astro";

const {
  title,
  description,
  ogSelector,
  ogContentVersion,
} = Astro.props;
---

<html lang="en">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <HctiOgImage
      title={title}
      description={description}
      selector={ogSelector}
      contentVersion={ogContentVersion}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Pass values from page frontmatter or an Astro content collection into the layout. In **Template Values** mode, remove explicit props you do not need and map the existing title or description metadata in the HCTI dashboard instead.

If another SEO component already emits `og:image` and `twitter:image`, change that component to use `imageUrl` or remove its image output. Do not leave duplicate primary image tags.

## Adapt a page screenshot

Pass a selector for routes that render a dedicated card component:

```html
<Layout
  title="A guide to social cards"
  description="Automatic images for every route"
  ogSelector="#social-card"
  ogContentVersion={7}
>
  <SocialCard id="social-card" />
</Layout>
```

The component must be present in the HTML returned at the public route. It can be visually positioned away from the main content, but it cannot use `display: none` when HCTI captures it.

## Build and verify

For a static Astro project, build the site and inspect HTML under `dist`. For an SSR project, use **View Source** on the deployed page. Confirm that the HCTI URL contains the final route path and the tags exist in `<head>` before client hydration.

Test several routes with the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer).

See Astro's documentation for [components](https://docs.astro.build/en/basics/astro-components/), [layouts](https://docs.astro.build/en/basics/layouts/), and [pages and routes](https://docs.astro.build/en/basics/astro-pages/).

[Back to OG Image Configs](/getting-started/og-images/)
