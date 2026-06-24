---
layout: template-editor-block
title: Grid Panel
permalink: /template-editor/blocks/grid-panel/
parent: Blocks
grand_parent: Template Editor
nav_order: 8
description: >-
  Use the Grid Panel block for two-dimensional layouts.
---
# Grid Panel
{: .no_toc }
{: .fs-9 }

Use Grid Panels for two-dimensional layouts where rows and columns guide the flow.
{: .fs-4 .fw-300 }

<hr>

Add a Grid Panel from the left sidebar. Children flow through the grid in order. Dragging or moving children changes their place in that flow.

{% capture grid_size_details %}
{% include hint.md title="Auto size to grid cell" text="Blocks inside a Grid Panel can use Auto size to grid cell. When enabled, the child sizes to the grid area it receives. Turn it off when the child should keep its own width or height." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_size=grid_size_details %}

{% include template-editor/block-specific-options-intro.md %}

{% capture grid_flow_details %}
Unlike a Table Panel, Grid Panel children are not assigned to specific cells. They flow in order through the available grid space.
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Padding.md details="Space between the panel edge and its children" panel=true %}
  {% include template-editor/property.md name="Columns" details="Number and sizing of columns" more=grid_flow_details %}
  {% include template-editor/property.md name="Rows" details="Number and sizing of rows" %}
  {% include template-editor/property.md name="Column gap" details="Space between columns" %}
  {% include template-editor/property.md name="Row gap" details="Space between rows" %}
  {% include template-editor/property.md name="Justify items" details="Default horizontal alignment of children" %}
  {% include template-editor/property.md name="Align items" details="Default vertical alignment of children" %}
</div>

## Child Properties

{% include template-editor/child-properties-intro.md type="Grid" %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Columns" details="How many grid columns the child covers" %}
  {% include template-editor/property.md name="Rows" details="How many grid rows the child covers" %}
  {% include template-editor/property.md name="Horizontal align" details="Horizontal alignment override for this child" %}
  {% include template-editor/property.md name="Vertical align" details="Vertical alignment override for this child" %}
  {% include template-editor/property.md name="Margin" details="Extra space around this child" %}
  {% include template-editor/property.md name="Auto size to grid cell" details="Whether the child sizes to its grid area" %}
</div>

{% include template-editor/grid-tracks.md %}

See the [Advanced Panels guide](/template-editor/advanced/panels/) for help choosing and combining panel types.
