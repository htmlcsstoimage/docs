---
description: >-
  For height and width you have two options. Setting it in your HTML or using
  the API to crop your images on the fly. For perfect images, we recommend a
  combination of both.
---

# Setting height and width

## Setting height/width within your HTML

The API will auto crop your image to the height/width of the outermost HTML element. For example, the following will generate a screenshot that is 400px wide and 400px tall.

{% tabs %}
{% tab title="height\_width\_example.html" %}
```markup
<div style="height: '400px'; width: '400px'">
  <h1>Hello, world</h1>
</div>
```
{% endtab %}
{% endtabs %}

Margins are respected by the API. To add padding around your image, you can do the following.

{% tabs %}
{% tab title="with\_margin.html" %}
```markup
<div style="height: '400px'; width: '400px'; margin: 10px; border: 5px solid #03B875;"> 
  <h1>Hello, world</h1>
</div>
```
{% endtab %}
{% endtabs %}

### Performance considerations

For best performance, we recommend a maximum of 2000x2000 pixels in your HTML. This will result in a 4000x4000 pixel image.

{% hint style="info" %}
### Retina by default

We render all images **@2X** by default. This results in a super high quality image that will work with any monitor. When specifying **400px** in your HTML, the resulting image will be **800px** to account for high resolution screens.
{% endhint %}

### Resize on the fly

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

### Height and width for print

Calculating the perfect height and width for print requires knowing the correct formula.

**Formula:**`(DPI * (size in inches)) / 2 = pixels`

DPI = Dots Per Inch. For high quality print, you will want 300 DPI.

{% hint style="info" %}
**Why divide by 2?**

The API renders at 2X resolution by default. Divide by 2 to get the correct size for print.
{% endhint %}

#### A4 paper example

For a 300 DPI print on A4 \(8.27 x 11.69 inches\) paper, you would do the following:

Width: ****`(300 * 8.27) / 2 = 1240 pixels`

Height: ****`(300 * 11.69) / 2 = 1754 pixels`

#### Business card example

For a 300 DPI business card \(3.5 x 2 inches\).

Width: ****`(300 * 3.5) / 2 = 525 pixels`

Height: ****`(300 * 2) / 2 = 300 pixels`

Once you have determined your height and width in pixels, you can then set your HTML to render the exact size you need. We recommend doing this by adding `height` and `width` style parameters to the outermost HTML element in your code.

### Need help?

Send us an email: **support@htmlcsstoimage.com**. We're happy to help!

