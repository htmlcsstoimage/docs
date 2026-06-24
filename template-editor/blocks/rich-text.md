---
layout: template-editor-block
title: Rich Text
permalink: /template-editor/blocks/rich-text/
parent: Blocks
grand_parent: Template Editor
nav_order: 1
description: >-
  Use the Rich Text block for styled and templated text in the template editor.
templated_content: >-
  Rich Text supports Handlebars inside the text content. Use it for variables, loops, conditionals, and repeated content inside one text block.
---
# Rich Text Block
{: .no_toc }
{: .fs-9 }

Use Rich Text when one text block needs varied typography, inline styling, or Handlebars composition.
{: .fs-4 .fw-300 }

<hr>

Add a Rich Text block from the left sidebar by choosing **Rich Text Box**. Double-click the block on the canvas to edit the text directly.

<figure class="te-doc-figure te-doc-figure--wide">
  <img src="/assets/images/template-editor/te-rich-text-typography-editor.png" alt="Rich Text block selected in the template editor with typography controls open">
</figure>

Select a word, line, letter, or any range of text and use the inline toolbar to change font size, color, underline, and other text styling for only that selection.

Use the right sidebar when you want one value across the whole block. Changing a text styling property there applies that value across the block for that property, replacing per-selection differences.

Some inline toolbar controls can show `mixed` when the current selection already contains more than one value. Choosing a new value applies it to the current selection.

{% capture text_shadow_details %}
{% include hint.md title="Text block shadows" text="Rich Text blocks support drop shadows and glows. Inner shadows and spread are not available for text blocks." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_shadow=text_shadow_details %}

{% include template-editor/block-specific-options-intro.md %}

{% capture selected_text_details %}
Select text on the canvas to apply this property to only that selection. Use the right sidebar to set one value across the whole block for this property.
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/Property_Opacity.md %}
  {% include template-editor/property.md name="Font" details="Font family, weight, and italic style" %}
  {% include template-editor/property.md name="Font size" details="Text size for the selected text or block" more=selected_text_details templated=true %}
  {% include template-editor/property.md name="Font color" details="Text color" more=selected_text_details templated=true %}
  {% include template-editor/property.md name="Line height" details="Space between lines" templated=true %}
  {% include template-editor/property.md name="Letter spacing" details="Space between letters" templated=true %}
  {% include template-editor/property.md name="Horizontal align" details="How lines align inside the block" %}
  {% include template-editor/property.md name="Vertical align" details="How text sits inside the block" %}
  {% include template-editor/property.md name="Wrap" details="How text wraps across lines" %}
  {% include template-editor/property.md name="Overflow" details="What happens when text is larger than the block" %}
  {% include template-editor/property.md name="Underline" details="Underline style and color" more=selected_text_details templated=true %}
  {% include template-editor/property.md name="Text outline" details="Stroke around text" templated=true %}
  {% include template-editor/property.md name="Transform" details="Text casing" %}
  {% include template-editor/Property_Padding.md details="Space between the block edge and the text" %}
</div>
