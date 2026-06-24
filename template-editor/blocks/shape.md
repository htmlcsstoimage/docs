---
layout: template-editor-block
title: Shape
permalink: /template-editor/blocks/shape/
parent: Blocks
grand_parent: Template Editor
nav_order: 4
description: >-
  Use the Shape block for simple graphic elements.
---
# Shape Block
{: .no_toc }
{: .fs-9 }

Use Shape blocks for simple marks, backgrounds, accents, and decorative structure.
{: .fs-4 .fw-300 }

<hr>

Add a Shape block from the left sidebar. Choose the shape when you add the block.

{% capture shape_background_details %}
{% include hint.md title="Shape background" text="Rectangles and circles support solid, gradient, and pattern backgrounds. Stars and triangles support solid backgrounds plus linear and radial gradients. Pattern backgrounds and conic gradients are not available for stars or triangles." heading=false %}
{% endcapture %}

{% capture shape_shadow_details %}
{% include hint.md title="Shape shadow" text="Stars and triangles support drop shadows and glows. Inner shadows and spread are not available for those shapes." heading=false %}
{% endcapture %}

{% capture shape_border_details %}
{% include hint.md title="Shape border" text="Rectangles and circles support advanced borders. Stars and triangles use simple border controls." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_background=shape_background_details extra_border=shape_border_details extra_shadow=shape_shadow_details %}

## Shape Types

Available shapes:

- Rectangle
- Circle
- Triangle
- Star

The shape type is set when the block is added and cannot be changed later. If you need a different shape, add a new Shape block.

## Block Specific Properties

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Opacity.md %}
</div>
