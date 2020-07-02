---
description: Learn how to render an image with no background.
---

# Transparent background

To render an image with a transparent background, include the following in your CSS when generating your image.

```css
body { 
  background-color: transparent;
}
```

The API will render your image with a transparent background. This is only supported by the PNG file format. If you're rendering your image as a JPG or WEBP, transparency will not work because it is not supported by those file formats.

![https://hcti.io/v1/image/9bd2fa85-c6fc-4890-b90a-da63647ce323](../.gitbook/assets/cat.png)

{% hint style="info" %}
Transparency is only supported by the **PNG** file format. By default, all images are rendered as PNG's.
{% endhint %}

