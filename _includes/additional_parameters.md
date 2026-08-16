{% comment %}
  Renders additional parameters from _data/parameters.json.

  context="html", "url", "templates", "og_config", or "create_and_render"
  filters to parameters supported in that context. With no context, the table
  keeps the combined HTML/URL API view. create_and_render=true remains supported
  for existing callers.
{% endcomment %}
{% assign parameter_context = include.context | default: "api" -%}
{% if include.create_and_render -%}
  {% assign parameter_context = "create_and_render" -%}
{% endif -%}
| Name | Type | Description |
|:-----|:-----|:------------|
{% for parameter in site.data.parameters.parameters -%}
  {% assign show_parameter = false -%}
  {% if parameter.additional -%}
    {% if parameter_context == "api" -%}
      {% if parameter.support.html or parameter.support.url -%}
        {% assign show_parameter = true -%}
      {% endif -%}
    {% elsif parameter.support[parameter_context] -%}
      {% assign show_parameter = true -%}
    {% endif -%}
  {% endif -%}
  {% if show_parameter -%}
| **[{{ parameter.name }}]({{ parameter.link }})** | `{{ parameter.type }}` | {{ parameter.description }} |
  {% endif -%}
{% endfor -%}
