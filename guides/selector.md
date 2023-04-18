---
layout: page
title: Selecting part of a page
permalink: /guides/selector/
parent: Guides
nav_order: 9
description: >-
  Learn how to select a specific part of an image with the selector param.
---
# Selecting part of a page
{: .no_toc }
{: .fs-9 }

Learn how to select/crop a specific part of an image with the selector param.
{: .fs-6 .fw-300 }

<hr>
## Selector

The `selector` param allows you to pass a CSS selector to the API. This will auto crop the image to the height and width of the selected
html element.

This works for both HTML and URL images.

### Example

With the following HTML, we only want to screenshot the inner `content` area. The rest should be cropped out.

```html
<div class="margin">
  <div class="content">
    This is an example
  </div>
</div>
```

To do this, we would set `selector` to `.content` and the API will crop to the inner div.

{% cloudinary /assets/images/selector-example.png alt="Use a CSS selector to crop an image" %}

### Selector examples

CSS selectors can get quite complicated, here are a couple simple examples.


**Class name selector:**
```html
<div class="example"></div>
```

A CSS selector for a `class` can be specified with a period before the class name. Here we'd use `.example`.

Note: when selecting a class, the API will use the first instance that matches on the page since css classes are not unique.

**ID selector:**

```html
<div id="example"></div>
```

When selecting and ID, we add a hash before the id. Here we'd use `#example`.

**More examples**

For a full guide to CSS selectors with examples, please take a look at this <a href="https://www.w3schools.com/cssref/css_selectors.php">W3 schools article on CSS selectors</a>.







