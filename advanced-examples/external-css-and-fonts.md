---
description: Rendering images using external CSS and custom fonts.
---

# External CSS and Fonts

The API supports including any CSS file or custom font. You can do this by including them in your HTML.

Be sure to use the full URL to the asset. We are unable to download relative URLs.

{% code-tabs %}
{% code-tabs-item title="css.html" %}
```markup
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Primer/10.8.1/build.css" />
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Multiple CSS files are supported, load in everything you need. Large files may slow down initial render time.

### Google Fonts

If your custom font is available on [Google Fonts](https://fonts.google.com/), we recommend using our [built in parameter](using-google-fonts.md) for pre-loading them.

