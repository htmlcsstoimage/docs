---
layout: page
title: Sizing and Positioning
permalink: /template-editor/advanced/sizing-positioning/
parent: Advanced
grand_parent: Template Editor
nav_order: 1
description: >-
  Understand block sizing and positioning in the template editor.
---
# Sizing and Positioning
{: .no_toc }
{: .fs-9 }

Control where blocks sit and how much space they take.
{: .fs-4 .fw-300 }

<hr>

The right sidebar's Sizing and Arrange sections control a block's dimensions, position, rotation, order, and lock state.

## Sizing

Width and height can use `px`, `em`, `rem`, or `%`. The available modes depend on the block type and where the block sits.

| Mode | Details |
|:-----|:--------|
| Fixed | Use the value exactly |
| Auto | Let the content or parent layout decide |
| Auto, Fixed Min | Auto size, but do not go below the minimum |
| Auto, Fixed Max | Auto size, but do not go above the maximum |
| Auto, Between Min & Max | Auto size within a defined range |

Use fixed sizes when the block should keep a specific footprint. Use auto sizing when the block should respond to its content. Use min and max values when the block should be flexible but still stay within a useful range.

Percent sizes are relative to the available space from the canvas or parent panel. They are useful for templates that need to respond to different canvas or panel sizes.

## Aspect Ratio

Aspect ratio keeps width and height connected. When aspect ratio is locked, one axis acts as the source and the other axis is calculated from it.

Use aspect ratio for images, shapes, or blocks that should scale without stretching. If both width and height are fully auto, the editor may need one axis defined before aspect ratio can be locked.

## X and Y Position

Blocks on the canvas and inside Free Panels use X and Y values. X/Y can be set from the left/top edge or from the right/bottom edge.

When X or Y uses `%`, the anchor selector also controls how the block itself lines up to that percentage:

| Percent anchor | Details |
|:---------------|:--------|
| Start | The block starts at the percent position |
| Center | The block is centered on the percent position |
| End | The block ends at the percent position |

For example, set X to `50%` and choose Center to keep a block centered horizontally as the canvas or panel changes size. This works by applying the right CSS translation behind the scenes.

## Arrange Controls

The Arrange section also includes:

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Align to canvas" details="Quickly aligns a selected block to the canvas" %}
  {% include template-editor/property.md name="Rotation" details="Rotates the block" %}
  {% include template-editor/property.md name="Flip" details="Flips the block horizontally or vertically" %}
  {% include template-editor/property.md name="Lock" details="Prevents accidental movement or selection changes" %}
  {% include template-editor/property.md name="Layer order" details="Moves a block forward, backward, to the front, or to the back" %}
  {% include template-editor/property.md name="ID" details="Sets a block id for advanced targeting" %}
  {% include template-editor/property.md name="Extra CSS" details="Opens advanced CSS controls for the selected block" %}
</div>

Rotation and flip affect the visible block. The block still belongs to its parent layout.

## Inside Panels

Blocks inside panels follow the panel layout. A child in a Flex Panel behaves differently than a child in a Grid Panel or Table Panel.

| Parent | How children are placed |
|:-------|:------------------------|
| Canvas | Free positioning |
| Free Panel | Free positioning inside the panel |
| Flex Panel | Row or column flow |
| Grid Panel | Flow through rows and columns |
| Table Panel | Assigned row and column positions |

In Flex, Grid, and Table Panels, children can use margin and alignment overrides. Grid and Table children can also use auto sizing to fill the space their parent gives them.

## Practical Patterns

- Use `%` position with Center anchors to keep a block centered.
- Use right or bottom anchoring when a block should stay pinned to the far edge.
- Use `Auto, Fixed Max` for content that can shrink naturally but should never get too wide.
- Use `Auto, Fixed Min` when content can grow but should not collapse below a readable size.
- Use `Auto, Between Min & Max` when a block should respond to content inside a controlled range.
