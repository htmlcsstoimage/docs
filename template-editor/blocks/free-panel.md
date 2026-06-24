---
layout: template-editor-block
title: Free Panel
permalink: /template-editor/blocks/free-panel/
parent: Blocks
grand_parent: Template Editor
nav_order: 6
description: >-
  Use the Free Panel block for grouped free-positioned content.
---
# Free Panel
{: .no_toc }
{: .fs-9 }

Use a Free Panel when a group of blocks should move together while its children keep normal canvas-style positioning inside the panel.
{: .fs-4 .fw-300 }

<hr>

Add a Free Panel from the left sidebar. Put blocks inside it by dragging them in or using the reparent control.

{% include template-editor/common-block-options.md %}

{% include template-editor/block-specific-options-intro.md %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Padding.md details="Space between the panel edge and its children" panel=true %}
  {% include template-editor/property.md name="Overflow" details="Content can be clipped or allowed to show outside the panel" %}
  {% include template-editor/property.md name="Child positioning" details="Children use X/Y position inside the panel area" %}
  {% include template-editor/property.md name="Reparenting" details="Move existing blocks into or out of the panel" %}
</div>

See the [Advanced Panels guide](/template-editor/advanced/panels/) for help choosing and combining panel types.
