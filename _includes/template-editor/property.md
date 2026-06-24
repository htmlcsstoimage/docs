{% assign property_name = include.name | default: include.property %}
{% assign property_details = include.details | default: include.summary %}
{% assign property_template_marker = include.templated | default: include.templatable %}
{% assign property_can_template = false %}
{% if property_template_marker == true or property_template_marker == "true" %}
  {% assign property_can_template = true %}
{% endif %}
{% capture rendered_details %}{{ property_details | markdownify | strip }}{% endcapture %}
{% assign rendered_details = rendered_details | remove_first: "<p>" | remove: "</p>" %}

{% if include.more %}
<details class="te-property">
  <summary class="te-property__summary">
    <span class="te-property__variable">
      {% if property_can_template %}
      <img class="te-property__templated-icon" src="/assets/images/template-editor-hard-hat.svg" alt="Templatable" title="This property's value can be templated">
      {% endif %}
    </span>
    <span class="te-property__name">
      <span class="te-property__name-text">{{ property_name }}</span>
    </span>
    <span class="te-property__details">{{ rendered_details }}</span>
  </summary>
  <div class="te-property__more">
    <div class="te-property__more-inner">
      {{ include.more | markdownify }}
    </div>
  </div>
</details>
{% else %}
<div class="te-property te-property--static">
  <div class="te-property__summary">
    <span class="te-property__variable">
      {% if property_can_template %}
      <img class="te-property__templated-icon" src="/assets/images/template-editor-hard-hat.svg" alt="Templatable" title="This property's value can be templated">
      {% endif %}
    </span>
    <span class="te-property__name">
      <span class="te-property__name-text">{{ property_name }}</span>
    </span>
    <span class="te-property__details">{{ rendered_details }}</span>
  </div>
</div>
{% endif %}
