<div class="hint">
{% assign hint_heading = include.heading | default: true %}
{% if hint_heading == false or hint_heading == "false" %}
<div class="hint-title">
{% octicon info height:20 class:"right left" aria-label:info %}
{{ include.title }}
</div>
{% else %}
<h3>
{% octicon info height:20 class:"right left" aria-label:info %}
{{ include.title }}
</h3>
{% endif %}
{{ include.text | markdownify }}
</div>
