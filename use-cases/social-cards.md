---
layout: page
title: Social Cards and Automatic Open Graph Images
permalink: /use-cases/social-cards/
parent: Use Cases
nav_order: 1
description: >-
  Generate Open Graph images, Twitter cards, and social media previews for websites, CMSs, and applications with HTML/CSS to Image.
---
# Social Cards and Open Graph Images
{: .no_toc }
{: .fs-9 }

Generate a link-preview image for every page, post, product, or profile.
{: .fs-4 .fw-300 }

<hr>

## What are social cards?

Social cards—also called **Open Graph images**, **OG images**, or **link-preview images**—appear when someone shares a URL on Twitter, Facebook, LinkedIn, Slack, and other platforms. The page identifies the image with `og:image` and `twitter:image` tags in its HTML `<head>`.

## The challenge

One fallback image is easy to maintain. A specific image for every blog post, product page, or user profile requires a repeatable way to combine page data with a design.

## Choose an OG image workflow

| Your situation | Recommended workflow |
|:---------------|:---------------------|
| You have an existing public website, CMS, store, or static site | Use an [OG Image Config](/getting-started/og-images/). It maps each page path to a screenshot or template without an API request or HMAC token per page. |
| Your application generates images from arbitrary or private data | Use the [image API](/getting-started/using-the-api/) with HTML/CSS or a reusable [template](/getting-started/templates/). |
| You need a render-on-demand `GET` URL containing template values or a target URL | Use [Signed Image URLs](/getting-started/create-and-render/). |

### Automatic OG images for an existing site

Create one OG Image Config for your site's exact origin. A page such as `/articles/hello` uses a matching image URL:

```html
<meta property="og:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/hello">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/og/DOMAIN_ID/articles/hello">
```

HCTI can capture the page or a selected element. It can also render a template using the page's title, description, Open Graph metadata, or explicit template values. See the [OG Image Config setup guide](/getting-started/og-images/) and the [CMS and platform guides](/guides/og-images/).

### API and template workflow

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
| Twitter | 1200 x 600 px |
| Facebook | 1200 x 630 px |
| LinkedIn | 1200 x 627 px |
| Slack | 1200 x 630 px |

For one broad fallback image, use **1200 x 630 pixels**. An [OG Image Config](/getting-started/og-images/#4-choose-image-size-optimization) can instead adapt one render or create a separate render for each recognized platform size.

## Adding to your HTML

Once you have the image URL, add it to your page's `<head>`. This can be the path-based URL from an OG Image Config or the URL returned by an API or template request:

```html
<!-- Open Graph / Facebook -->
<meta property="og:image" content="https://hcti.io/v1/image/your-image-id">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://hcti.io/v1/image/your-image-id">
```

## Using templates

For a consistent design, use [Templates](/getting-started/templates/). Create a template once with variables, then populate it through the API, a signed URL, or an OG Image Config.

You can build the social card visually with the [Template Editor](/template-editor/) and start from common sizes in the [Canvas guide](/template-editor/canvas/), including the Open Graph preset.

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
4. **Test the published URL** - Use the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer) and check more than one page path.

{% include code_footer.md version=1 %}
