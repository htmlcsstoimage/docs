---
layout: page
title: Generate Automatic Open Graph Images for your Jekyll Site
nav_title: Jekyll
permalink: /guides/og-images/jekyll/
parent: OG Images
grand_parent: Guides
nav_order: 6
description: >-
  Add automatic Open Graph images to every Jekyll page and post with Liquid layouts, front matter, and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Jekyll Site
{: .no_toc }
{: .fs-9 }

Use a shared Jekyll layout to give every generated page and post an HCTI social card with the matching path.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for your deployed site's exact HTTPS origin, then copy its domain ID.

- Use **Page Screenshot** to capture the rendered Jekyll page or a dedicated card element.
- Use **Template Values** to render front matter inside an HCTI template.

## Add a reusable head include

Create `_includes/hcti-og-image.html` with this Liquid:

{% raw %}
```liquid
{% assign hcti_path = page.url | relative_url %}
{% assign hcti_og_image = 'https://hcti.io/v1/og/YOUR_DOMAIN_ID' | append: hcti_path %}

<meta property="og:image" content="{{ hcti_og_image }}">
<meta property="og:image:secure_url" content="{{ hcti_og_image }}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{{ hcti_og_image }}">
```
{% endraw %}

Replace `YOUR_DOMAIN_ID`. The `relative_url` filter preserves a configured `baseurl`, so a deployed page at `/docs/start/` maps to the same source path.

Include it inside the `<head>` of the layout used by your pages and posts:

{% raw %}
```liquid
<head>
  {% include hcti-og-image.html %}
  <!-- the rest of your head -->
</head>
```
{% endraw %}

If `jekyll-seo-tag`, a theme, or another plugin already emits `og:image` or `twitter:image`, configure or change that output instead of leaving duplicate image tags.

## Use front matter for per-page controls

Add optional fields to a page or post:

```yaml
---
title: A practical guide to social cards
description: Build a unique social preview for every Jekyll page.
og_selector: "#social-card"
og_content_version: 4
accent: "#0f766e"
---
```

Then extend the include.

### Page Screenshot mode

{% raw %}
```liquid
{% if page.og_selector %}
  <meta property="hcti:selector" content="{{ page.og_selector | escape }}">
{% endif %}
{% if page.og_content_version %}
  <meta property="hcti:content_version" content="{{ page.og_content_version }}">
{% endif %}
```
{% endraw %}

### Template Values mode

{% raw %}
```liquid
{% if page.title %}
  <meta property="html:tv:headline" content="{{ page.title | escape }}">
{% endif %}
{% if page.description %}
  <meta property="html:tv:summary" content="{{ page.description | escape }}">
{% endif %}
{% if page.accent %}
  <meta property="html:tv:accent" content="{{ page.accent | escape }}">
{% endif %}
```
{% endraw %}

The variable names after `html:tv:` must match your HCTI template. You can also map the title tag, description, `og:title`, or `og:description` in the dashboard instead of adding explicit tags.

## Build and verify

Build the site, then inspect a generated HTML file in `_site` and a deployed page with **View Source**. Confirm that:

- The HCTI URL contains the same path as the deployed page, including `baseurl` when used.
- Liquid placeholders have been replaced with real values.
- Only the intended social-image tags remain.

Test the deployed URL in the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer).

See Jekyll's documentation for [front matter](https://jekyllrb.com/docs/front-matter/), [includes](https://jekyllrb.com/docs/includes/), and [layouts](https://jekyllrb.com/docs/layouts/).

[Back to OG Image Configs](/getting-started/og-images/)
