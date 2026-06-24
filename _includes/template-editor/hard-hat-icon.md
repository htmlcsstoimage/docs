{%- assign icon_variant = include.variant | default: "solid" -%}
{%- assign icon_color = include.color | default: "#475569" -%}
{%- assign icon_label = include.label | default: "Variable mode" -%}
{%- if icon_variant == "outline" -%}
  {%- assign icon_href = "/assets/images/template-editor-hard-hat.svg#template-editor-hard-hat-outline" -%}
{%- else -%}
  {%- assign icon_href = "/assets/images/template-editor-hard-hat-solid.svg#template-editor-hard-hat-solid" -%}
{%- endif -%}
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" role="img" aria-label="{{ icon_label }}" style="vertical-align:-3px;border:none;color:{{ icon_color }};fill:{{ icon_color }};"><use href="{{ icon_href }}"></use></svg>
