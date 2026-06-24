---
layout: template-editor-block
title: Image
permalink: /template-editor/blocks/image/
parent: Blocks
grand_parent: Template Editor
nav_order: 3
description: >-
  Use the Image block for media, image URLs, and stock photos.
templated_content: >-
  URL sources can be assigned to a template variable, enabling each image generated to use a different URL.
---
# Image Block
{: .no_toc }
{: .fs-9 }

Use Image blocks for photos, logos, avatars, product images, media library assets, and remote image URLs.
{: .fs-4 .fw-300 }

<hr>

Add an Image block from the left sidebar. You can start from your media library, a URL, or a stock photo, then change the source later from the block controls.

<figure class="te-doc-figure te-doc-figure--natural centered">
  <img src="/assets/images/template-editor/te-image-add-flow.png" alt="Image block source menu with Library Image, URL Image, and Stock Photo options">
</figure>

{% capture image_border_details %}
{% include hint.md title="Image borders" text="When an image uses `Contain` or `Scale Down`, the visible image may not fill the whole block. Borders and shadows can follow the rendered image more closely than the full block area." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_border=image_border_details %}

{% include template-editor/block-specific-options-intro.md %}

{% capture media_source_details %}
Choose from your organization's media library, paste an external URL, or select a stock photo from [Pexels](https://www.pexels.com/).
{% endcapture %}

{% capture fit_details %}
Fit controls how the image is sized inside the block, including whether it fills, stretches, crops, or stays at its natural size.
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Media source" details="Media library, external URL, or stock photo" more=media_source_details templated=true %}
  {% include template-editor/property.md name="Fit" details="How the image fits inside the block" more=fit_details %}
  {% include template-editor/Property_Opacity.md %}
  {% include template-editor/property.md name="Object position" details="Which part of the image stays visible when using cover-style cropping" templated=true %}
</div>

## Image Sources

The source control decides where the block gets its image.

### Media Library

Use the Media Library for assets you expect to reuse, such as logos, product photos, brand images, background images, and icons.

You can upload assets from the media browser when your plan supports uploads. Uploaded assets are shared across your organization's templates, so the same image can be reused without uploading it again for each template.

### URL

Use a URL source when the image already exists at an absolute URL, or when the image should come from render-time data through a template variable.

### Stock Photos

Use Stock Photos to choose an image provided by [Pexels](https://www.pexels.com/).

## Fit Modes

| Mode | Details |
|:-----|:--------|
| Cover | Fills the block and may crop the image |
| Contain | Keeps the whole image visible inside the block |
| Fill | Stretches the image to the block size |
| Scale Down | Keeps the image natural size unless it needs to shrink |
| None | Keeps the image at its natural size |
