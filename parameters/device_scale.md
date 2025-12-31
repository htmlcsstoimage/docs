---
layout: page
title: device_scale
permalink: /parameters/device_scale/
parent: Parameters
nav_order: 3
description: >-
  Control image resolution by adjusting the pixel ratio of screenshots
---
# Using device_scale
{: .no_toc }
{: .fs-9 }

Control image quality and size by adjusting the pixel ratio
{: .fs-6 .fw-300 }

<hr>

## How it works

The device_scale parameter controls the pixel ratio of generated images. Values range from `0.1` to `3`, where:
- `0.1` to `0.9` = reduced resolution (smaller file sizes, lower quality)
- `1` = standard resolution (1:1 pixel ratio)
- `2` = high resolution (2:1 pixel ratio, recommended for web)
- `3` = maximum resolution (3:1 pixel ratio)

## Default values
The default pixel ratio varies by image type:

1. HTML images: `2` (recommended for web use)
2. URL images: `1` (standard resolution)

## Common issues

### Blurry images
If your image appears blurry, especially on high-DPI displays, try increasing the device_scale to `2`. This is particularly important for web usage.

### Oversized images
If your image file size is larger than needed, consider reducing the device_scale. Remember that each increment doubles or triples the number of pixels.

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

## Using device_scale effectively

### For web usage
If you plan to use images on a website, use device_scale `2` to ensure crisp display on high-resolution screens. For example:
- Source image: `800x800` (device_scale: 2)
- Display size: `400x400` on webpage
- Result: Sharp image on both standard and high-DPI displays

### For print usage
For print materials, consider using device_scale `3` to ensure maximum quality. Note that this will significantly increase file size.

## Technical details

### Pixel ratio explained
Pixel ratio (or device pixel ratio/DPR) represents the relationship between physical pixels and CSS pixels:
```
Pixel Ratio = Physical Pixels / CSS Pixels
```

For example:
- Standard display: 1 physical pixel = 1 CSS pixel (ratio 1:1)
- Retina display: 2 physical pixels = 1 CSS pixel (ratio 2:1)
- High-DPI display: 3 physical pixels = 1 CSS pixel (ratio 3:1)

### Impact on file size
Each increment of device_scale significantly affects the total number of pixels:
- device_scale `1`: Base size (1x pixels)
- device_scale `2`: 4x total pixels
- device_scale `3`: 9x total pixels

### Best practices
1. For web usage:
   - Use device_scale `2` as default
   - Test images on both standard and high-DPI displays
   - Consider bandwidth constraints

2. For print usage:
   - Use device_scale `3` for highest quality
   - Verify final output resolution meets your needs
   - Account for larger file sizes

3. For standard resolution:
   - Use device_scale `1` when high resolution isn't needed
   - Ideal for thumbnails or preview images
   - Best for bandwidth-constrained situations

## Example usage

### In API requests
```javascript
{
  "html": "<div>Your content</div>",
  "device_scale": 2
}
```

{% include hint.md title="Performance tip" text="Higher device_scale values increase both rendering time and file size. Use the lowest value that meets your quality requirements." %}
