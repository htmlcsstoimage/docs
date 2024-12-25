---
layout: page
title: selector
permalink: /parameters/selector/
parent: Parameters
nav_order: 9
description: >-
  Learn how to select and crop specific elements from a webpage using CSS selectors.
---

# CSS Selector Parameter
{: .no_toc }
{: .fs-9 }

Precisely capture specific elements from your webpage
{: .fs-6 .fw-300 }

<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

<hr>

## Overview

The `selector` parameter allows you to capture specific elements from a webpage by providing a CSS selector. The API will automatically crop the image to match the dimensions of the selected element.

{% include hint.md title="Works Everywhere" text="The selector parameter works with both HTML snippets and full URL screenshots." %}

## Basic Usage

### HTML Example

Consider this HTML structure:

```html
<div class="margin">
  <div class="content">
    This is an example
  </div>
</div>
```

To capture only the inner content div, set the selector parameter:

```json
{
  "html": "<div class=\"margin\">...</div>",
  "selector": ".content"
}
```

{% cloudinary /assets/images/selector-example.png alt="Example of using a CSS selector to crop an image" %}

## Common Selector Types

### Class Selectors

To select elements by class name:

```html
<!-- HTML -->
<div class="profile-card">...</div>

<!-- Selector -->
.profile-card
```

### ID Selectors

To select a unique element by ID:

```html
<!-- HTML -->
<div id="header">...</div>

<!-- Selector -->
#header
```

### Nested Selectors

To select nested elements:

```html
<!-- HTML -->
<div class="container">
  <section class="content">
    <article class="post">...</article>
  </section>
</div>

<!-- Selector -->
.container .content .post
```

### Multiple Classes

To select elements with multiple classes:

```html
<!-- HTML -->
<div class="card premium featured">...</div>

<!-- Selector -->
.card.premium.featured
```

## Advanced Selectors

For more complex selections, you can use:

| Selector | Example | Description |
|:---------|:--------|:------------|
| Child | `parent > child` | Selects direct children only |
| Nth Child | `div:nth-child(2)` | Selects specific child elements |
| Attribute | `[data-type="premium"]` | Selects elements with specific attributes |
| Combinators | `header + .content` | Selects elements that follow others |

## Best Practices

1. **Be Specific**: Use precise selectors to ensure you capture exactly what you need
2. **Test First**: Verify your selector works in the browser before using it in the API
3. **Consider Dynamic Content**: Allow time for JavaScript-rendered content using `ms_delay` if needed
4. **Unique Identifiers**: When possible, use IDs for more reliable selection

{% include hint.md title="Performance Tip" text="More specific selectors can help reduce processing time as the API can find the element faster." %}

## Common Issues and Solutions

### Element Not Found
If your selector doesn't match any elements, try:
- Verifying the selector syntax
- Ensuring dynamic content has loaded (use `ms_delay`)
- Checking for typos in class/ID names

### Wrong Element Selected
If the wrong element is captured:
- Make your selector more specific
- Use unique identifiers when possible
- Check for duplicats