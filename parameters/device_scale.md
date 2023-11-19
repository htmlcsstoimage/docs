---
layout: page
title: device_scale
permalink: /parameters/device_scale/
parent: Parameters
nav_order: 3
description: >-
  Adjust the pixel ratio of the screenshot. How it affects screensizes and its use in web development
---
# Using device_scale
{: .no_toc }
{: .fs-9 }

Learn how to adjust the pixel ratio of your images and why it matters
{: .fs-6 .fw-300 }

<hr>

## How it works

Use this parameter to adjust the pixel ratio of the generated image. Minimum: `1`, Maximum: `3`.

## Default values
HTML images and URL images have different default values

1. HTML images: 2
2. URL images: 1

## Blurry URL images
If you have an image that looks blurry on your monitor, this often means it could be improved by increasing the pixel ratio.

## Why is my image double the size?

This is due to the device scale. If you plan to use this image on a website, then keeping it double the size is important for a crisp, high resolution image.

For example, if you want an image to display as `400x400` on your website. Then you will want the source image to be `800x800` to account for high resolutions screens.

When device_scale is set to `1`, the resulting image will match the exact dimensions of the HTML.

If the device_scale is higher, such as `2`. Then the resulting image will be double the size of the HTML dimensions.

## What is pixel ratio and why it matters
Pixel ratio, often referred to as device pixel ratio (DPR), is a metric that represents the ratio between physical pixels on a display device and logical pixels used in web development. It is commonly expressed as a decimal or a whole number.

The formula for pixel ratio is:

```
Pixel Ratio = Physical Pixels / Logical Pixels
```

Here, "Physical Pixels" refer to the actual physical pixels on the screen, and "Logical Pixels" refer to the virtual pixels that web developers use when specifying sizes and positions in their code.

Pixel ratio becomes particularly relevant in the context of responsive web design, where websites aim to provide a good user experience across a variety of devices with different screen sizes and resolutions.

### Pixel Ratio and Old Screens
Older screens and devices, especially those from the early days of the internet, often had lower pixel ratios. For example, many desktop monitors might have had a pixel ratio of 1:1, meaning one physical pixel corresponds to one logical pixel. In these cases, web developers could make design assumptions based on a relatively straightforward mapping between logical and physical pixels.

### Pixel Ratio and New Screens (High-DPI or Retina Displays):
In contrast, newer screens, especially high-DPI (dots per inch) or Retina displays commonly found in modern smartphones, tablets, and some laptops, often have higher pixel ratios. For instance, a device with a Retina display might have a pixel ratio of 2:1 or even higher. This means that for every logical pixel specified in the code, there are two or more physical pixels on the screen.

This higher pixel ratio allows for sharper and more detailed visuals, as more physical pixels contribute to rendering each logical pixel. However, it introduces challenges for web developers because they need to consider how to adapt their designs and assets to look good on both standard and high-DPI screens.

### Handling Pixel Ratio in Web Development
To address the challenges posed by varying pixel ratios, web developers often use techniques such as:

1. **CSS Media Queries:** Developers can use CSS media queries to apply specific styles based on the characteristics of the device, including pixel ratio. This allows for responsive designs that adapt to different screen configurations.

    ```css
    @media only screen and (min--moz-device-pixel-ratio: 2),
       only screen and (-o-min-device-pixel-ratio: 2/1),
       only screen and (-webkit-min-device-pixel-ratio: 2),
       only screen and (min-device-pixel-ratio: 2) {
       /* Styles for high-DPI screens */
    }
    ```

2. **Retina Images:** Providing higher resolution images (2x or 3x) for high-DPI screens ensures that images look crisp and clear.

3. **Viewport Meta Tag:** The viewport meta tag in HTML can be used to control the initial scale of the webpage on a mobile device, helping to optimize the display for different pixel ratios.

    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ```

Understanding and accommodating pixel ratio is crucial for delivering a consistent and visually appealing experience across a diverse range of devices in modern web development.
