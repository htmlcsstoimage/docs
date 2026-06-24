---
layout: template-editor-block
title: Simple Text
permalink: /template-editor/blocks/simple-text/
parent: Blocks
grand_parent: Template Editor
nav_order: 2
description: >-
  Use the Simple Text block for direct templating and auto font sizing.
templated_content: >-
  Simple Text can source its Content property directly from a template variable. Do not use Handlebars syntax in the text itself.
---
# Simple Text Block
{: .no_toc }
{: .fs-9 }

Use Simple Text when one block should render one text value with a shared style.
{: .fs-4 .fw-300 }

<hr>

Add a Simple Text block from the left sidebar by choosing **Simple Text Box**. Its content and text properties are available in the right sidebar.

{% capture text_shadow_details %}
{% include hint.md title="Text block shadows" text="Simple Text blocks support drop shadows and glows. Inner shadows and spread are not available for text blocks." heading=false %}
{% endcapture %}

{% include template-editor/common-block-options.md extra_shadow=text_shadow_details %}

{% include template-editor/block-specific-options-intro.md %}

{% capture auto_font_size_details %}
<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Auto Font Size</div>
    <p>When enabled, the text can scale to fit the block instead of staying at one fixed size.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Minimum Font Size</div>
    <p>Available when auto font size is enabled. This is the smallest size the text can use while fitting the block.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Maximum Font Size</div>
    <p>Available when auto font size is enabled. This is the largest size the text can use while fitting the block.</p>
  </div>
</div>

{% include template-editor/templatable-properties.md items="Auto font size|Minimum font size|Maximum font size" %}
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Content" details="The text value rendered by the block" templated=true %}
  {% include template-editor/property.md name="Auto font size" details="Scales text within a defined font-size range" more=auto_font_size_details templated=true %}
  {% include template-editor/Property_Padding.md details="Space between the block edge and the text" %}
  {% include template-editor/Property_Opacity.md %}
  {% include template-editor/property.md name="Font" details="Font family, weight, and italic style" %}
  {% include template-editor/property.md name="Font color" details="The text color" templated=true %}
  {% include template-editor/property.md name="Line height" details="Space between lines" templated=true %}
  {% include template-editor/property.md name="Letter spacing" details="Space between letters" templated=true %}
  {% include template-editor/property.md name="Horizontal align" details="Left, center, or right alignment" %}
  {% include template-editor/property.md name="Vertical align" details="Top, middle, or bottom alignment inside the block" %}
  {% include template-editor/property.md name="Underline" details="Underline style and color" templated=true %}
  {% include template-editor/property.md name="Text outline" details="Stroke around text" templated=true %}
  {% include template-editor/property.md name="Transform" details="Text casing" %}
</div>

## Auto Font Size

Auto font size lets the text scale to fit the block while staying inside the range you set. When it is enabled, Minimum font size and Maximum font size controls become available.

<figure class="te-doc-figure te-doc-figure--natural">
  <img src="/assets/images/template-editor/te-simple-text-auto-size.gif" alt="Simple Text block resizing text automatically as the block size changes">
</figure>

Turn auto font size off when the block should keep one specific font size.
