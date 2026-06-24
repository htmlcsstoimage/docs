---
layout: template-editor-block
title: Flex Panel
permalink: /template-editor/blocks/flex-panel/
parent: Blocks
grand_parent: Template Editor
nav_order: 7
description: >-
  Use the Flex Panel block for rows, columns, and dynamic stacks.
---
# Flex Panel
{: .no_toc }
{: .fs-9 }

Use Flex Panels for one-direction layouts: rows, columns, stacks, and bars.
{: .fs-4 .fw-300 }

<hr>

Add a Flex Panel from the left sidebar. Children flow in one direction and can respond when content changes.

{% include template-editor/common-block-options.md %}

{% include template-editor/block-specific-options-intro.md %}

{% capture align_items_details %}
Alignment on the panel is the default. Children can override the default alignment when one item needs to sit differently from the rest.
{% endcapture %}

{% capture flex_basis_details %}
Basis can stay automatic or use a specific size in the panel's flow direction.
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Padding.md details="Space between the panel edge and its children" panel=true %}
  {% include template-editor/property.md name="Direction" details="Row or column layout" %}
  {% include template-editor/property.md name="Wrap" details="Whether children stay on one line or wrap" %}
  {% include template-editor/property.md name="Gap" details="Space between child blocks" %}
  {% include template-editor/property.md name="Justify content" details="Distribution along the main direction" %}
  {% include template-editor/property.md name="Align items" details="Default alignment across the panel" more=align_items_details %}
</div>

## Child Properties

{% include template-editor/child-properties-intro.md type="Flex" %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Grow" details="How much the child expands when extra space is available" %}
  {% include template-editor/property.md name="Shrink" details="How much the child can contract when space is tight" %}
  {% include template-editor/property.md name="Align" details="Alignment override for this child" %}
  {% include template-editor/property.md name="Basis" details="Auto sizing or a specific starting size" more=flex_basis_details %}
  {% include template-editor/property.md name="Margin" details="Extra space around this child" %}
</div>

See the [Advanced Panels guide](/template-editor/advanced/panels/) for help choosing and combining panel types.
