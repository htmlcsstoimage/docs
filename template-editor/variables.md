---
layout: page
title: Variables
permalink: /template-editor/variables/
parent: Template Editor
nav_order: 3
description: >-
  Use template variables to render dynamic images from editor templates.
---
# Variables
{: .no_toc }
{: .fs-9 }

Use variables for anything that changes at render time.
{: .fs-4 .fw-300 }

<hr>

Variables let one saved template create many different images. A variable can control text, an image URL, a color, a number, or another supported field.

Open the Variables tab in the right sidebar to see the variables in the current template, edit preview data, and check what the template expects before you save or render it.

## How Variables Are Added

Variables can come from two places:

| Source | How it works |
|:-------|:-------------|
| Handlebars in blocks | Rich text and HTML blocks can discover variables from Handlebars expressions, such as {% raw %}`{{title}}` or `{{#each items}}...{{/each}}`{% endraw %} |
| Property variables | Supported controls show a <img src="/assets/images/template-editor-hard-hat.svg" alt="Hard-hat icon" width="16" height="16" style="vertical-align:-3px;border:none;"> icon. Click it to connect that property to a variable |

Use the hard-hat icon when a specific editor field should be set from the API, such as a color, number, image URL, or text value.

## Variable Modes

Supported property fields use the hard-hat indicator to show their current variable mode.

<div class="te-variable-modes-grid">
  <div class="te-variable-modes-grid__heading" aria-hidden="true"></div>
  <div class="te-variable-modes-grid__heading">Mode</div>
  <div class="te-variable-modes-grid__heading">Behavior</div>

  <div class="te-variable-modes-grid__icon"><img src="/assets/images/template-editor-hard-hat.svg" alt="Hard-hat icon" width="16" height="16" style="vertical-align:-3px;border:none;"></div>
  <div>Not Templated</div>
  <div>The property uses the value saved in the editor.</div>

  <div class="te-variable-modes-grid__icon">{% include template-editor/hard-hat-icon.md color="#e11d48" label="Required variable" %}</div>
  <div>Required</div>
  <div>The image should fail if the value is not provided or invalid.</div>

  <div class="te-variable-modes-grid__icon">{% include template-editor/hard-hat-icon.md color="#ea580c" label="Fallback variable" %}</div>
  <div>Fallback</div>
  <div>The template uses a saved fallback value when a value is not included or is not valid.</div>

  <div class="te-variable-modes-grid__icon">{% include template-editor/hard-hat-icon.md color="#d97706" label="Ignored variable" %}</div>
  <div>Ignore</div>
  <div>The property is left unset when no value is provided.</div>
</div>

{% include hint.md title="Handlebars Variable Mode" text="Variables discovered within Handlebars content can be set to `Required`, `Fallback`, or `Ignore` (the default) in the Variables tab. Fallback variables can also store their fallback value there." %}


### Template Keys
Assign a template key when a property should respond to template values at render time.

Set the key in the variable popover, along with the variable mode.

Template keys can use dot notation for nested data, such as `author.name`. You can also refer to array elements using simple bracket notation like `tags[0]` or `items[2].name`.

You can assign the same template key to multiple properties when their types are compatible. The editor checks compatibility when you save the variable mode and key.

You cannot assign a template key that overlaps or conflicts with the object path of another property or Handlebars variable. For example, if one property uses `author.name`, another text block cannot use `author`, because `author` is already expected to be a JSON object instead of a string.


## Preview Data

<div class="te-doc-section-with-aside">
<div markdown="1">

The Variables tab includes a Test Payload area. Turn Preview on to render the canvas with the current test data.

Structured mode is easier for simple values. Raw JSON is better when the payload contains arrays or nested data. If the structured editor cannot represent the payload, switch to Raw JSON.

The sidebar lists active variables and can show inactive variables. Badges call out whether a variable comes from a property field, Handlebars, or a helper.

</div>
<figure class="te-doc-figure te-doc-figure--inline">
  <img src="/assets/images/template-editor/te-quote-preset-variables-preview-sidebar.png" alt="Variables tab showing structured preview fields for a quote template">
</figure>
</div>

## Rendering with variables

Pass values in `template_values` when generating the image. [Learn more](/getting-started/templates/#creating-an-image-with-a-template).

```json
{
  "template_values": {
    "title": "Launch Day",
    "accent_color": "#03B875",
    "avatar_url": "https://example.com/avatar.png"
  }
}
```

The HTML/export button in the top toolbar is useful when you want to inspect the generated HTML with the current template and preview values.
