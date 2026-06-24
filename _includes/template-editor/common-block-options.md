## Common Properties

Most blocks share a core set of properties. The right sidebar shows the properties available for the current selection, including controls added by the parent panel.

{% assign extra_size = include.extra_size | default: include.extra_extra_size %}
{% assign extra_arrange = include.extra_arrange | default: include.extra_extra_arrange %}
{% assign extra_background = include.extra_background | default: include.extra_extra_background %}
{% assign extra_border = include.extra_border | default: include.extra_extra_border %}
{% assign extra_shadow = include.extra_shadow | default: include.extra_extra_shadow %}

{% capture size_details %}
<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Width</div>
    <p>Controls the block's horizontal space. Use a fixed value for a predictable footprint, `%` when the width should respond to the canvas or parent panel, or auto sizing when content or layout should decide the width.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Height</div>
    <p>Controls the block's vertical space. Height can be fixed, flexible, or constrained with minimum and maximum values when a block needs room to grow without getting too large or too small.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Aspect Ratio</div>
    <p>Keeps width and height connected so a block can scale without stretching. This is useful for images, shapes, and blocks that need to preserve a specific proportion.</p>
  </div>
</div>

<p class="te-property__meta">For units, auto sizing modes, min/max values, and responsive sizing patterns, see <a href="/template-editor/advanced/sizing-positioning/">the Sizing and Positioning guide</a>.</p>

{% if extra_size %}
{{ extra_size }}
{% endif %}
{% endcapture %}

{% capture arrange_details %}
<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">X and Y</div>
    <p>Set the block's position on the canvas or inside a Free Panel. X controls horizontal placement; Y controls vertical placement. Positions can use fixed units or `%` values with anchors.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Alignment</div>
    <p>Move a block to common canvas positions, or use anchors to decide how the block lines up to a percent-based X or Y value.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Rotation and Flip</div>
    <p>Rotate the block or flip it horizontally or vertically without changing the block's content.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Lock and Layer Order</div>
    <p>Lock a block to avoid accidental edits, or move it forward and backward when blocks overlap.</p>
  </div>
</div>

<p class="te-property__meta">For anchoring, percent positions, panel behavior, and layer order, see <a href="/template-editor/advanced/sizing-positioning/">the Sizing and Positioning guide</a>.</p>

{% if extra_arrange %}
{{ extra_arrange }}
{% endif %}
{% endcapture %}

{% capture background_details %}
<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Solid</div>
    <p>Assign a single color as the background of the block.</p>
    {% include template-editor/templatable-properties.md items="Color" %}
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Gradient</div>
    <p>Use a linear, radial, or conic gradient. Gradients are built from stops, and each stop has a color and a position. Stops are ordered by position, so moving a stop changes how the colors blend across the block.</p>
    {% include template-editor/templatable-properties.md items="Stop colors|Stop positions" %}
    <p class="te-property__meta">Linear and conic gradients also include an angle control.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Pattern</div>
    <p>Choose a pattern, then customize the colors it exposes. Some patterns also include a size control. Different patterns use different numbers of colors, so the available controls change after you choose a pattern.</p>
    {% include template-editor/templatable-properties.md items="Pattern colors|Pattern size" %}
    <p class="te-property__meta">Patterns are sourced from <a href="https://css-pattern.com/" target="_blank" rel="nofollow noopener">css-pattern.com</a>.</p>
  </div>
</div>

{% include hint.md title="Canvas backgrounds" text="Canvas and block backgrounds are separate. A transparent block can show the canvas background or the parent panel behind it." heading=false %}

{% if extra_background %}
{{ extra_background }}
{% endif %}
{% endcapture %}

{% capture border_details %}
Border controls are split into simple and advanced modes.

<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Simple</div>
    <p>Use simple border controls when the same color, thickness, line style, and corner radius should apply everywhere.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Advanced</div>
    <p>Open Advanced Border to edit sides and corners separately. Sides can have their own color, thickness, and line style. Corners can have their own radius.</p>
  </div>
</div>

{% if extra_border %}
{{ extra_border }}
{% endif %}
{% endcapture %}

{% capture shadow_details %}
Shadows can be layered. Use a regular shadow for depth, an inner shadow for inset effects, or a glow when the shadow should spread evenly around the block.

{% if extra_shadow %}
{{ extra_shadow }}
{% endif %}
{% endcapture %}

<div class="te-property-list">
  <div class="te-property-list__header"><span>Property</span><span>Details</span></div>
  {% include template-editor/property.md name="Size" details="Control how much space the block takes up" more=size_details templated=true %}
  {% include template-editor/property.md name="Arrange" details="Place and manage the block in its layout" more=arrange_details %}
  {% include template-editor/property.md name="Background" details="Style the surface behind the block's content" more=background_details templated=true %}
  {% include template-editor/property.md name="Border" details="Define the block's edge and corners" more=border_details %}
  {% include template-editor/property.md name="Shadow" details="Layer shadows to add depth to your blocks" more=shadow_details %}
</div>
