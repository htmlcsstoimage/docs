---
layout: page
title: Social Cards
permalink: /use-cases/social-cards/
parent: Use Cases
nav_order: 1
description: >-
  Generate Open Graph images, Twitter cards, and social media previews automatically with HTML/CSS to Image.
---
# Social Cards
{: .no_toc }
{: .fs-9 }

Auto-generate beautiful social media images for every page.
{: .fs-4 .fw-300 }

<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

<hr>

## What are social cards?

Social cards (also called Open Graph images or OG images) are the preview images that appear when you share a link on Twitter, Facebook, LinkedIn, Slack, or other platforms. They're crucial for engagement - posts with images get significantly more clicks and shares.

## The challenge

Manually creating social images for every blog post, product page, or user profile doesn't scale. That's where HTML/CSS to Image comes in - you design a template once, then generate unique images automatically.

## How it works

1. **Design your template** - Create an HTML/CSS layout for your social card
2. **Make it dynamic** - Use placeholders for title, author, date, etc.
3. **Call the API** - Generate a unique image for each page
4. **Add the meta tag** - Include the image URL in your page's `<head>`

## Real-world example: Dev.to

[Dev.to](https://dev.to) generates thousands of social cards automatically. Every blog post gets a custom image with the title, author, and branding.

{% cloudinary /assets/images/image%20%2823%29.png alt="Dev.to social card generated from HTML" %}

## Example template

Here's a simple social card template you can customize:

```html
<div style="width: 1200px; height: 630px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 60px; font-family: sans-serif; color: white; display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <h1 style="font-size: 48px; margin: 0; line-height: 1.2;">
      Your Article Title Goes Here
    </h1>
    <p style="font-size: 24px; margin-top: 20px; opacity: 0.9;">
      A brief description or subtitle for your content
    </p>
  </div>
  <div style="display: flex; align-items: center;">
    <img src="https://example.com/avatar.jpg" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 20px;">
    <div>
      <p style="margin: 0; font-size: 20px; font-weight: bold;">Author Name</p>
      <p style="margin: 0; font-size: 16px; opacity: 0.8;">yoursite.com</p>
    </div>
  </div>
</div>
```

## API request

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div style=\"width:1200px;height:630px;background:linear-gradient(135deg,#667eea,#764ba2);padding:60px;font-family:sans-serif;color:white;\"><h1 style=\"font-size:48px;\">Your Title Here</h1></div>"
  }'
```

## Recommended dimensions

| Platform | Recommended Size |
|:---------|:-----------------|
| Twitter | 1200 x 628 px |
| Facebook | 1200 x 630 px |
| LinkedIn | 1200 x 627 px |
| Slack | 1200 x 630 px |

For best results across all platforms, use **1200 x 630 pixels**.

## Adding to your HTML

Once you have the image URL, add it to your page's `<head>`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:image" content="https://hcti.io/v1/image/your-image-id">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/image/your-image-id">
```

## Using templates

For high-volume use, consider using [Templates](/getting-started/templates/). Create a template once with variables, then generate images by passing just the dynamic values.

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "your-template-id",
    "template_values": {
      "title": "My Blog Post Title",
      "author": "Jane Doe",
      "date": "December 2025"
    }
  }'
```

## Tips for great social cards

1. **Keep text large** - Social cards are often viewed as thumbnails
2. **Use high contrast** - Ensure text is readable at small sizes
3. **Include branding** - Add your logo or consistent colors
4. **Test across platforms** - Preview how your card looks on Twitter, Facebook, etc.

{% include code_footer.md version=1 %}

