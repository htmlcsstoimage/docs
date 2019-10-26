---
description: Rendering images using external CSS and custom fonts.
---

# External CSS and Fonts

The API supports including any CSS file or custom font. You can do this by including them in your HTML/CSS.

Be sure to use the full URL to the asset. We are unable to download relative URLs.

### External CSS Example

For an external CSS file, at it to your HTML with the following. Replace `href` with the URL to your CSS file.

{% code-tabs %}
{% code-tabs-item title="css.html" %}
```markup
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Primer/10.8.1/build.css" />
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### External Font Example

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

Your font will need proper CORS headers set for this to work. To test it, visit [test-cors.org](https://www.test-cors.org) and paste in your font link.

If it does not work, check that you have the following header set on your server.

`access-control-allow-origin: *`

### Google Fonts

If your custom font is available on [Google Fonts](https://fonts.google.com/), we recommend using our [built in parameter](using-google-fonts.md) for pre-loading them.

### Need help?

If you're having trouble with any of this. Send us an email and we'll help you debug: **support@htmlcsstoimage.com**

