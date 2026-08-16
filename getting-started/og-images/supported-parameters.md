---
layout: page
title: Supported OG Image parameters
permalink: /getting-started/og-images/supported-parameters/
parent: Open Graph Images
nav_exclude: true
description: >-
  The complete list of hcti: page metadata supported by HTML/CSS to Image OG Image Configs.
---
# Supported OG Image parameters
{: .no_toc }
{: .fs-9 }

Control how an individual page is rendered by adding `hcti:` metadata to its HTML.
{: .fs-6 .fw-300 }

The most common screenshot controls are provided in the dashboard when you create or edit an OG Image Config. Use page-level metadata when a particular page needs to override those defaults.

Some parameters from the general HTML/CSS to Image API are not supported here because they do not make sense for OG Image Configs or must be configured at the config or template level. The table below is the full list of parameters supported in page metadata.

Add a supported parameter to the page's `<head>` using either the `property` or `name` attribute:

```html
<meta property="hcti:selector" content="#social-card">
<meta property="hcti:viewport_width" content="1200">
<meta property="hcti:viewport_height" content="630">
```

Page metadata takes precedence over the corresponding defaults in the dashboard. Keep **Parse meta tags for each path** enabled for these overrides to be read.

| Metadata | Type | Description |
|:---------|:-----|:------------|
{% for parameter in site.data.parameters.parameters -%}
  {% if parameter.support.og_config -%}
| [`hcti:{{ parameter.name }}`]({{ parameter.link }}) | `{{ parameter.type }}` | {{ parameter.description }} |
  {% endif -%}
{% endfor %}

For parameters used outside OG Image Configs, see the [complete API parameter reference](/parameters/).
