---
layout: default
title: Google Fonts
permalink: /parameters/google_fonts/
parent: Parameters
nav_order: 2
---

# Google Fonts Parameter
{: .no_toc }
{: .fs-9 }

Load and use any Google Font in your generated images.
{: .fs-6 .fw-300 }

<hr>

## Parameter Details

| Name | Type | Required | Description |
|:-----|:-----|:---------|:------------|
| **google_fonts** | `String` | No | The names of Google Fonts to load, separated by `\|` for multiple fonts |

## Usage Examples

### Single Font

```json
{
  "google_fonts": "Roboto",
  "html": "<div class='text'>Hello World</div>",
  "css": ".text { font-family: 'Roboto', sans-serif; }"
}
```

### Multiple Fonts

```json
{
  "google_fonts": "Open Sans|Roboto|Montserrat",
  "html": "<div class='heading'>Title</div><div class='body'>Content</div>",
  "css": `
    .heading { font-family: 'Montserrat', sans-serif; }
    .body { font-family: 'Open Sans', sans-serif; }
  `
}
```

{% include hint.md title="Performance tip" text="Each additional font increases render time. Only load fonts you plan to use." %}

## Font Weights and Styles

### Specifying Font Weights

Google Fonts supports multiple weights for each font. You can specify which weights to load by including them in the `google_fonts` parameter.

**Explicit loading**: Specify the weight in the google_fonts parameter:

```json
{
  "google_fonts": "Roboto:300,400,700",  // Load light, regular, and bold weights
  "html": "<div class='text'>Hello World</div>",
  "css": ".text { font-family: 'Roboto', sans-serif; font-weight: 700; }"
}
```

Common font weights:
- 300: Light
- 400: Regular (default)
- 500: Medium
- 700: Bold
- 900: Black

### Debugging Font Weights

If your font weights aren't appearing correctly, try these steps:

1. **Verify available weights**: Check [Google Fonts](https://fonts.google.com) to ensure the weight exists for your font
   ```json
   {
     "google_fonts": "Roboto:300,400,700",  // Only include weights that exist
     "html": "<div class='debug'>Weight Test</div>",
     "css": ".debug { font-family: 'Roboto'; font-weight: 700; }"
   }
   ```

2. **Force weight loading**: Explicitly specify weights in the google_fonts parameter
   ```json
   {
     "google_fonts": "Roboto:700",  // Force load bold weight
     "html": "<div class='bold'>Bold Text</div>",
     "css": ".bold { font-family: 'Roboto'; font-weight: 700; }"
   }
   ```

3. **Check for FOUT**: Add ms_delay if fonts aren't loading in time
   ```json
   {
     "google_fonts": "Roboto:700",
     "ms_delay": 500,  // Give extra time for font loading
     "html": "<div class='bold'>Bold Text</div>",
     "css": ".bold { font-family: 'Roboto'; font-weight: 700; }"
   }
   ```

{% include hint.md title="Font weight tip" text="Not all fonts support all weights. Check Google Fonts for available weights before using them." %}

## Troubleshooting

### Flash of Unstyled Text (FOUT)

If fonts aren't rendering correctly, use the `ms_delay` parameter to allow time for font loading:

```json
{
  "google_fonts": "Roboto",
  "ms_delay": 500,
  "html": "<div class='text'>Hello World</div>",
  "css": ".text { font-family: 'Roboto', sans-serif; }"
}
```

Start with `ms_delay: 500` and increase if needed.

### Common Issues

1. **Font not appearing**: Verify the font name matches exactly as shown on Google Fonts
2. **Wrong font weight**: Ensure you're using a weight that exists for the chosen font
3. **Incorrect quotes**: Use single quotes in CSS: `font-family: 'Roboto', sans-serif;`

## Live Example

This example loads both Montserrat and Roboto fonts:

<div class="code-example" markdown="1">
<div class="hcti-container">
  {% cloudinary /assets/images/8e8c1093-d205-4994-845c-67419598d081.jpeg sizes="400px" alt="Convert html to an image using custom fonts" %}
</div>
</div>

```json
{
  "google_fonts": "Montserrat|Roboto",
  "html": "<div class='text'>Hello World!</div>",
  "css": ".text { font-family: 'Montserrat'; }"
}
```

## Alternative Approaches

If you need to use fonts not available on Google Fonts:
1. Use a different web font service by including their CSS in your HTML
2. Convert your font to base64 and include it directly in your CSS
3. Host the font files yourself and reference them via URL

[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }

{% include code_footer.md version=1 %} 