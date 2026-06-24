---
layout: template-editor-block
title: Table Panel
permalink: /template-editor/blocks/table-panel/
parent: Blocks
grand_parent: Template Editor
nav_order: 9
description: >-
  Use the Table Panel block for explicit cell layouts.
---
# Table Panel
{: .no_toc }
{: .fs-9 }

Use Table Panels when each child block belongs in a specific cell.
{: .fs-4 .fw-300 }

<hr>

Add a Table Panel from the left sidebar. Children are assigned to table positions, which makes the layout explicit instead of flow-based.

{% capture table_size_details %}
{% include hint.md title="Auto size to grid cell" text="Blocks inside a Table Panel can use Auto size to grid cell. When enabled, the child sizes to the cell area. Turn it off when the child should keep its own width or height." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_size=table_size_details %}

{% include template-editor/block-specific-options-intro.md %}

{% capture table_position_details %}
In a Table Panel, individual children have assigned table positions and can cover more than one row or column. In a Grid Panel, children flow in order instead of being assigned to exact cells.
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Padding.md details="Space between the panel edge and its children" panel=true %}
  {% include template-editor/property.md name="Columns" details="Number and sizing of columns" more=table_position_details %}
  {% include template-editor/property.md name="Rows" details="Number and sizing of rows" %}
  {% include template-editor/property.md name="Column gap" details="Space between columns" %}
  {% include template-editor/property.md name="Row gap" details="Space between rows" %}
  {% include template-editor/property.md name="Cell alignment" details="Default alignment for blocks inside cells" %}
</div>

## Child Properties

{% include template-editor/child-properties-intro.md type="Table" %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Position" details="Assigned column and row for the child" %}
  {% include template-editor/property.md name="Columns" details="How many table columns the child covers" %}
  {% include template-editor/property.md name="Rows" details="How many table rows the child covers" %}
  {% include template-editor/property.md name="Horizontal align" details="Horizontal alignment override for this child" %}
  {% include template-editor/property.md name="Vertical align" details="Vertical alignment override for this child" %}
  {% include template-editor/property.md name="Margin" details="Extra space around this child inside the table cell" %}
  {% include template-editor/property.md name="Auto size to grid cell" details="Whether the child sizes to the cell area" %}
</div>

Blocks inside table cells can use margin to create spacing within the cell without changing the whole table.

{% include template-editor/grid-tracks.md %}

See the [Advanced Panels guide](/template-editor/advanced/panels/) for help choosing and combining panel types.
