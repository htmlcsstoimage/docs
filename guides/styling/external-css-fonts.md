---
layout: page
title: External CSS & Fonts
permalink: /guides/styling/external-css-fonts/
parent: Styling
grand_parent: Guides
nav_order: 1
description: >-
  Learn how to use external CSS, JavaScript and fonts when generating your images.
---
# External CSS, JavaScript & Fonts
{: .no_toc }
{: .fs-9 }

Learn how to include external assets when generating images.

{: .fs-6 .fw-300 }

<hr>

The API supports including any CSS file, JavaScript file or custom font. You can do this by including them in your HTML/CSS.

Be sure to use the full URL to the asset. We are unable to download relative URLs.

## External JavaScript Example
To include JavaScript, you can load it in by using a normal script tag in your html. Replace `src` with the URL to your JavaScript file.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
```

## External CSS Example

For an external CSS file, add it to your HTML with the following. Replace `href` with the URL to your CSS file.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Primer/10.8.1/build.css" />
```

## External Font Example

You can load in a custom font using CSS.

```css
@font-face {
  font-family: "CustomFont";
  src: url(https://url-to-your-font/FontNameRegular.ttc);
}
.box {
  font-family: "CustomFont"
}
```

Your font will need proper CORS headers set for this to work. To test it, visit [CORS Tester](https://cors-test.codehappy.dev/) and paste in your font link.

If it does not work, check that you have the following header set on your server.

`access-control-allow-origin: *`

{% include code_footer.md version=1 %}


