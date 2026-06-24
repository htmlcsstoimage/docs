{% capture opacity_details %}
Opacity controls transparency for the whole block, including its content and styling. Lower opacity makes the block more transparent.

{% include template-editor/templatable-properties.md items="Opacity" %}
{% endcapture %}

{% assign opacity_details_summary = include.details | default: "Transparency for the block" %}
{% include template-editor/property.md name="Opacity" details=opacity_details_summary more=opacity_details templated=true %}
