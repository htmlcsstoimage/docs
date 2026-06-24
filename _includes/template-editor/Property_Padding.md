{% capture padding_details %}
Padding creates space inside the block's edge before content is laid out.

<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Simple</div>
    <p>Use one value when every side should have the same inset.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Advanced</div>
    <p>Open Advanced Padding to set <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> independently.</p>
  </div>
</div>

{% if include.panel %}
{% include hint.md title="Panel spacing" text="Panel padding is separate from gap and child margin. Padding creates space inside the panel edge; gap and child margin control spacing between child blocks." heading=false %}
{% endif %}
{% endcapture %}

{% assign padding_details_summary = include.details | default: "Space inside the block edge" %}
{% include template-editor/property.md name="Padding" details=padding_details_summary more=padding_details %}
