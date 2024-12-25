---
layout: default
title: Parameters
permalink: /parameters/
nav_order: 4
expanded: false
has_children: true
---
# Parameters Reference
{: .no_toc }
{: .fs-9 }

Detailed information on all the available parameters for the API.
{: .fs-4 .fw-300 }

### Parameters

The create image endpoint accepts the following parameters. Accepted as either `json` or `formdata`.

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **html**† | `String`  | This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage. |
| **css** | `String` | The CSS for your image. When using with `url` it will be injected into the page. |
| **url**† | `String` | The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the html param and will generate a screenshot of the url. |

{% include hint.md title="Required params" text="† Either `url` OR `html` is required, but not both. `css` is optional." %}

<hr>

### Additional parameters

Optional parameters for greater control over your image.

{% include additional_parameters.md %}

<hr>

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 }
