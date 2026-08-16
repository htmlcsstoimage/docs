---
layout: page
title: Generate Automatic Open Graph Images for your Sitepress Site
nav_title: Sitepress
permalink: /guides/og-images/sitepress/
parent: OG Images
grand_parent: Guides
nav_order: 8
description: >-
  Add automatic Open Graph images to Sitepress pages with ERB layouts, frontmatter, request paths, and HTML/CSS to Image.
---
# Generate Automatic Open Graph Images for your Sitepress Site
{: .no_toc }
{: .fs-9 }

Use Sitepress request paths and frontmatter to generate an HCTI social card for every page in a Rails-hosted or compiled static site.
{: .fs-6 .fw-300 }

<hr>

## Before you begin

Create an [OG Image Config](/getting-started/og-images/) for the exact HTTPS origin where the Sitepress content is published, then copy the domain ID.

Choose **Page Screenshot** to capture each rendered resource or a selected element. Choose **Template Values** to send Sitepress frontmatter into a reusable HCTI template.

## Add the tags to a shared ERB layout

In the layout that renders your document `<head>`, build the HCTI URL from the current resource's request path:

```erb
<% hcti_path = current_page.request_path.to_s %>
<% hcti_path = "/#{hcti_path}" unless hcti_path.start_with?("/") %>
<% hcti_image = "https://hcti.io/v1/og/YOUR_DOMAIN_ID#{hcti_path}" %>

<meta property="og:image" content="<%= hcti_image %>">
<meta property="og:image:secure_url" content="<%= hcti_image %>">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="<%= hcti_image %>">
```

Replace `YOUR_DOMAIN_ID`. For Sitepress mounted below a Rails scope, confirm that `hcti_path` includes the public mount path. If it only contains the resource-relative path, prepend the mount prefix before constructing the URL.

If the Rails application or another layout helper already emits social-image metadata, change that integration instead of adding duplicate tags.

## Use Sitepress frontmatter as template values

Add fields to a page:

```yaml
---
title: A practical guide to social cards
description: Build a unique preview for every Sitepress page.
author: Sam Rivera
accent: "#c2410c"
og_content_version: 5
---
```

Read them from `current_page.data` in the layout:

```erb
<% if current_page.data["title"] %>
  <meta property="html:tv:headline" content="<%= ERB::Util.html_escape(current_page.data["title"]) %>">
<% end %>
<% if current_page.data["description"] %>
  <meta property="html:tv:summary" content="<%= ERB::Util.html_escape(current_page.data["description"]) %>">
<% end %>
<% if current_page.data["author"] %>
  <meta property="html:tv:author" content="<%= ERB::Util.html_escape(current_page.data["author"]) %>">
<% end %>
<% if current_page.data["accent"] %>
  <meta property="html:tv:accent" content="<%= ERB::Util.html_escape(current_page.data["accent"]) %>">
<% end %>
<% if current_page.data["og_content_version"] %>
  <meta property="hcti:content_version" content="<%= Integer(current_page.data["og_content_version"]) %>">
<% end %>
```

The names after `html:tv:` must match the selected HCTI template's variables. You can instead map the site's existing title, description, or Open Graph metadata in the HCTI dashboard.

## Configure Page Screenshot mode

Add a selector to frontmatter:

```yaml
og_selector: "#social-card"
```

Then emit it from the shared layout:

```erb
<% if current_page.data["og_selector"] %>
  <meta property="hcti:selector" content="<%= ERB::Util.html_escape(current_page.data["og_selector"]) %>">
<% end %>
```

The selected element must exist in the rendered public page and cannot be `display: none`.

## Compile and verify

Compile the site or run the Rails application, then inspect the generated HTML or use **View Source**. Test both root-mounted content and any Sitepress site mounted under a Rails scope. The public page path and HCTI path must match exactly.

Use the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer) to check the final metadata and platform-specific results.

See the [Sitepress repository and documentation](https://github.com/sitepress/sitepress) for current frontmatter, resource, Rails-mounting, and compilation behavior.

[Back to OG Image Configs](/getting-started/og-images/)
