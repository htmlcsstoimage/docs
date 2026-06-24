---
layout: page
title: Canvas
permalink: /template-editor/canvas/
parent: Template Editor
nav_order: 2
description: >-
  Configure the canvas for templates built in the editor.
---
# Canvas
{: .no_toc }
{: .fs-9 }

The canvas is the image area your blocks sit on.
{: .fs-4 .fw-300 }

<hr>

Open the Canvas tab in the right sidebar to change canvas settings. These settings apply to the whole template.

## Rendered Image Properties

These settings affect the saved template and the image that is generated from it.

{% capture image_settings_details %}
Image settings are saved with the template and flow through when the template is rendered. They map to API parameters such as [`device_scale`](/parameters/device_scale/), [`ms_delay`](/parameters/ms_delay/), [`selector`](/parameters/selector/), and [`proxy_id`](/parameters/proxy_id/).
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Width" details="The design width of the template" %}
  {% include template-editor/property.md name="Height" details="The design height of the template" %}
  {% include template-editor/property.md name="Background" details="The base background behind all blocks" %}
  {% include template-editor/property.md name="Padding" details="Space inside the canvas edge" %}
  {% include template-editor/property.md name="Overflow" details="Whether content outside the canvas is hidden or visible" %}
  {% include template-editor/property.md name="Emoji" details="Emoji rendering behavior for the template" %}
  {% include template-editor/property.md name="Image Settings" details="Render settings used when the template is turned into an image" more=image_settings_details %}
</div>

## Editor Settings

These settings can make editing easier. They do not add visible content to the final image.

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Quick Presets" details="Sets the canvas width and height from a common size" %}
  {% include template-editor/property.md name="Show grid" details="Whether the grid is visible while editing" %}
  {% include template-editor/property.md name="Grid size" details="The spacing used for the editor grid" %}
  {% include template-editor/property.md name="Snap to grid" details="Whether blocks snap while moving or resizing" %}
  {% include template-editor/property.md name="Show invisible block outlines" details="Shows outlines for blocks that are hard to see while editing" %}
</div>

## Canvas Presets

Canvas presets are shortcuts for common image sizes. Choosing a preset updates the width and height. It does not resize or rearrange the blocks already on the canvas.

Presets are grouped by how the image is usually used:

| Group | Examples |
|:------|:---------|
| Social Content | Instagram feed, square, story, reel, Facebook cover, X header, Pinterest pin, LinkedIn post |
| Digital Ads | Google responsive display, IAB banner, leaderboard, rectangle, and mobile ad sizes |
| Web, Product, and Docs | Open Graph image, presentation slide, website hero, email hero |

Common presets include:

| Image type | Common canvas size |
|:-----------|:-------------------|
| Open Graph image | 1200 x 630 |
| Instagram square | 1080 x 1080 |
| Instagram story/reel | 1080 x 1920 |
| Presentation slide | 1920 x 1080 |
| Email hero | 1200 x 600 |

## Image Settings

Image settings are saved with the template and flow through when the template is rendered.

| Property | Related API parameter |
|:---------|:----------------------|
| Device Scale | [`device_scale`](/parameters/device_scale/) |
| MS Delay | [`ms_delay`](/parameters/ms_delay/) |
| Selector | [`selector`](/parameters/selector/) |
| Proxy | [`proxy_id`](/parameters/proxy_id/) |

Use Device Scale when the final image needs more or fewer pixels than the canvas design size. For example, a `1200 x 630` canvas with `device_scale: 2` renders at `2400 x 1260`.

Use MS Delay when content needs a moment to settle before capture. Most templates should not need a long delay.

Use Selector only when the render should crop to a specific element. Most editor templates can leave this empty.

Use Proxy when remote images or assets should be fetched through one of your configured proxies.
