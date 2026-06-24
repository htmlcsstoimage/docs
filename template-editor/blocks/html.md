---
layout: template-editor-block
title: HTML
permalink: /template-editor/blocks/html/
parent: Blocks
grand_parent: Template Editor
nav_order: 5
description: >-
  Use the HTML block for custom markup inside a template editor design.
templated_content: >-
  HTML blocks can use Handlebars-style placeholders inside their markup.
---
# HTML Block
{: .no_toc }
{: .fs-9 }

Use HTML blocks when a design needs custom markup inside the editor canvas.
{: .fs-4 .fw-300 }

<hr>

Add an HTML block from the left sidebar. Use the right sidebar for block properties, or double-click the block on the canvas to edit its markup inline.

{% include template-editor/common-block-options.md %}

{% include template-editor/block-specific-options-intro.md %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Markup" details="The HTML rendered inside the block" %}
  {% include template-editor/Property_Padding.md details="Space between the block edge and the HTML content" %}
  {% include template-editor/property.md name="Text color" details="Default text color inside the block" templated=true %}
</div>

## Preview Notes

HTML blocks are previewed in an iframe while you work in the editor. That keeps custom markup isolated from the editor UI, but it can make some preview behavior look slightly different from the exported HTML.

If something looks off in the editor preview, use the HTML/export button in the top toolbar to inspect the generated HTML.
