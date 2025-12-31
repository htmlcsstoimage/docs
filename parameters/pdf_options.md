---
layout: page
title: pdf_options
permalink: /parameters/pdf_options/
parent: Parameters
nav_order: 13
description: >-
  Customize PDF output with page size, margins, and scaling options
---

# PDF Options
{: .no_toc }
{: .fs-9 }

Generate customized PDF documents from HTML
{: .fs-6 .fw-300 }

<hr>

## Overview

When generating PDFs, use the `pdf_options` parameter to control page size, margins, scaling, and background printing.

To get a PDF instead of an image, add `.pdf` to your image URL:

```
https://hcti.io/v1/image/abc123.pdf
```

## Parameters

The `pdf_options` object accepts the following properties:

| Property | Type | Description |
|:---------|:-----|:------------|
| **page_width** | `String` | Width of the page with unit (px, in, cm, mm, pt). Example: `8.5in` |
| **page_height** | `String` | Height of the page with unit (px, in, cm, mm, pt). Example: `11in` |
| **scale** | `Number` | Scale of the webpage rendering. Range: `0.1` to `2`. Default: `1` |
| **margins** | `Array` | Page margins as 4 values: [top, right, bottom, left]. Example: `["1cm", "1cm", "1cm", "1cm"]` |
| **print_background** | `Boolean` | Whether to print background graphics. Default: `false` |

## Common page sizes

| Size | Dimensions | Use Case |
|:-----|:-----------|:---------|
| Letter | `8.5in` x `11in` | US standard documents |
| A4 | `210mm` x `297mm` | International standard |
| Legal | `8.5in` x `14in` | Legal documents |
| A5 | `148mm` x `210mm` | Smaller documents |

## Example usage

### Basic PDF generation

Create an image and access it as PDF:

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     -H "Content-Type: application/json" \
     -d '{
       "html": "<h1>Invoice #1234</h1><p>Thank you for your purchase.</p>"
     }'
```

Then append `.pdf` to the returned URL:
```
https://hcti.io/v1/image/abc123.pdf
```

### Letter size with margins

```json
{
  "html": "<div class='invoice'>...</div>",
  "pdf_options": {
    "page_width": "8.5in",
    "page_height": "11in",
    "margins": ["0.5in", "0.5in", "0.5in", "0.5in"],
    "print_background": true
  }
}
```

### A4 document

```json
{
  "html": "<div class='report'>...</div>",
  "pdf_options": {
    "page_width": "210mm",
    "page_height": "297mm",
    "margins": ["20mm", "15mm", "20mm", "15mm"],
    "print_background": true
  }
}
```

### Scaled content

If your HTML is too large for the page, use scale to fit:

```json
{
  "html": "<div style='width: 1200px'>Wide content...</div>",
  "pdf_options": {
    "page_width": "8.5in",
    "page_height": "11in",
    "scale": 0.75,
    "print_background": true
  }
}
```

## Common use cases

### Invoices and receipts

```json
{
  "html": "<div class='invoice'><h1>Invoice</h1>...</div>",
  "css": ".invoice { font-family: Arial; padding: 40px; }",
  "pdf_options": {
    "page_width": "8.5in",
    "page_height": "11in",
    "margins": ["0.75in", "0.75in", "0.75in", "0.75in"],
    "print_background": true
  }
}
```

### Certificates

```json
{
  "html": "<div class='certificate'>...</div>",
  "css": ".certificate { background: linear-gradient(...); }",
  "pdf_options": {
    "page_width": "11in",
    "page_height": "8.5in",
    "print_background": true
  }
}
```

### Reports

```json
{
  "html": "<div class='report'><h1>Monthly Report</h1>...</div>",
  "pdf_options": {
    "page_width": "210mm",
    "page_height": "297mm",
    "margins": ["25mm", "20mm", "25mm", "20mm"],
    "print_background": true
  }
}
```

## Best practices

1. **Always set print_background** if you have CSS backgrounds, gradients, or colors
2. **Use appropriate margins** for your content - typically 0.5-1 inch for printable documents
3. **Test your page size** before bulk generation
4. **Use print media queries** in your CSS for optimal PDF styling:

```css
@media print {
  .no-print { display: none; }
  body { font-size: 12pt; }
}
```

## Units

All size values support these units:

| Unit | Description | Example |
|:-----|:------------|:--------|
| `px` | Pixels | `612px` |
| `in` | Inches | `8.5in` |
| `cm` | Centimeters | `21cm` |
| `mm` | Millimeters | `210mm` |
| `pt` | Points (1/72 inch) | `72pt` |

{% include hint.md title="Tip" text="For print documents, use inches (in) or millimeters (mm) for more accurate sizing." %}

{% include code_footer.md version=2 %}

