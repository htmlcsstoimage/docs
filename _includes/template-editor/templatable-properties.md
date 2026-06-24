{% assign templatable_items = include.items | default: "" | strip %}
{% if templatable_items != "" %}
<div class="te-property-templatable">
  <div class="te-property-templatable__title">Can be templated</div>
  <ul class="te-property-templatable__list">
    {% assign templatable_item_list = templatable_items | split: "|" %}
    {% for item in templatable_item_list %}
      {% assign item_text = item | strip %}
      {% if item_text != "" %}
      <li><span class="te-property-templatable__marker" aria-hidden="true"></span><span>{{ item_text }}</span></li>
      {% endif %}
    {% endfor %}
  </ul>
</div>
{% endif %}
