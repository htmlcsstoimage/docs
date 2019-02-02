---
description: >-
  For height and width you have two options. Setting it in your HTML or using
  the API to crop your images on the fly. For perfect images, we recommend a
  combination of both.
---

# Setting height and width

## Setting height/width within your HTML

The API will auto crop your image to the height/width of the outermost HTML element. For example, the following will generate a screenshot that is 400px wide and 400px tall.

{% code-tabs %}
{% code-tabs-item title="height\_width\_example.html" %}
```markup
<div style="height: '400px'; width: '400px'">
  <h1>Hello, world</h1>
</div>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Margins are respected by the API. To add padding around your image, you can do the following.

{% code-tabs %}
{% code-tabs-item title="with\_margin.html" %}
```markup
<div style="height: '400px'; width: '400px'; margin: 10px; border: 5px solid #03B875;"> 
  <h1>Hello, world</h1>
</div>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="info" %}
### Retina by default

We render all images **@2X** by default. This results in a super high quality image that will work with any monitor. When specifying **400px** in your HTML, the resulting image will be **800px** to account for high res screens.
{% endhint %}

## Resize on the fly

Once an image is generated, use our API to adjust the image to any size you need with the **width** and **height** params. When only one param is passed, the API will maintain the aspect ratio of the original image.

This is useful for displaying images at different resolutions without having to setup your own CDN.

**?width=400**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?width=400](../.gitbook/assets/w400.jpeg)

**?width=400&height=400**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?width=400&amp;height=400](../.gitbook/assets/w400h400.jpeg)

**?height=300**

![URL: https://hcti.io/v1/image/cd514452-b86c-4ab3-b109-2ef13a7ed00c?height=300](../.gitbook/assets/h300.jpeg)

{% hint style="info" %}
Resized images will be automatically cached by the CDN as well. You can use these URLs directly on your webpages and expect lightning fast response times + optimization for SEO.
{% endhint %}

