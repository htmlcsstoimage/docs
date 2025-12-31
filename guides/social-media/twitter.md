---
layout: page
title: Twitter/X screenshot
permalink: /guides/social-media/twitter/
parent: Social Media
grand_parent: Guides
nav_order: 1
description: >-
  Learn how to automatically generate a screenshot of a tweet/post on X (formerly Twitter) with HTML/CSS to Image. This works with Zapier, Make, or any programming language.
---
# Screenshot a Tweet/Post
{: .no_toc }
{: .fs-9 }

Use the HTML/CSS to Image API to generate images of tweets and posts on X.
{: .fs-6 .fw-300 }

<hr>

There are two ways to capture a screenshot of a tweet: using the **URL method** (recommended) or the **HTML embed method**.

## Method 1: URL Screenshot (Recommended)

The simplest approach is to use the `url` parameter to directly screenshot the tweet on x.com.

### Example

Pass the tweet URL directly to the API with the `selector` parameter set to `article` to crop to just the tweet.

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://x.com/usahockey/status/2006109366827597923",
    "selector": "article",
    "ms_delay": 3000,
    "device_scale": 2
  }'
```

### Result

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img src="https://hcti.io/v1/image/019b7170-7bcd-74e0-955c-24adbddf937f" alt="Screenshot of a tweet using the URL method" style="max-width: 100%; border-radius: 8px;" />
</div>
</div>

### Parameters

| Parameter | Value | Description |
|:----------|:------|:------------|
| **url** | Tweet URL | The full URL to the tweet on x.com (e.g., `https://x.com/username/status/123456789`) |
| **selector** | `article` | Crops the image to just the tweet content |
| **ms_delay** | `3000` | Gives the page time to fully load (3 seconds recommended) |
| **device_scale** | `2` | Optional. Higher resolution image |

{% include hint.md title="Twitter vs X URLs" text="Both `twitter.com` and `x.com` URLs work. The API will follow redirects automatically." %}

<hr>

## Method 2: HTML Embed

You can also use the X/Twitter embed widget to render a tweet. This gives you a card-style appearance.

HTML
{:.text-delta}
```html
<blockquote class="twitter-tweet" data-dnt="true">
  <a href="https://twitter.com/usahockey/status/2006109366827597923"></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

### Result

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img src="https://hcti.io/v1/image/019b7170-819f-7c67-a4fa-9d26739b7199" alt="Screenshot of a tweet using the HTML embed method" style="max-width: 100%; border-radius: 8px;" />
</div>
</div>

### Parameters for HTML Embed

| Parameter | Value | Description |
|:----------|:------|:------------|
| **selector** | `.twitter-tweet` | Crops to the rendered tweet widget |
| **ms_delay** | `3000` | Gives the embed time to load via JavaScript |

<hr>

## Choosing the Right Method

| Method | Best For |
|:-------|:---------|
| **URL Screenshot** | Full tweet appearance as seen on x.com, including engagement metrics |
| **HTML Embed** | Card-style appearance with X branding, "Follow" button, and replies link |

<hr>

## Getting the Tweet URL

To get the URL of any tweet:

1. Click on the tweet to open it
2. Copy the URL from your browser's address bar
3. The URL format is: `https://x.com/username/status/tweet_id`

{% include code_footer.md version=1 %}

