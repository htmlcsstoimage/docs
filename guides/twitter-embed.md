---
layout: page
title: Twitter embed
permalink: /guides/twitter-embed/
parent: Guides
nav_order: 4
description: >-
  Automatically generate a screenshot of a tweet with code.
---
# Screenshot a Tweet
{: .no_toc }
{: .fs-9 }

Use the HTML/CSS to Image API to generate images of tweets.
{: .fs-6 .fw-300 }

<hr>

## How it works

To generate a screenshot of a Tweet, we can make use of the Twitter embed API.

For the image to work, make sure you set the `selector` param to `.twitter-tweet` and `ms_delay` to `1500`.
This gives the embed extra time to load and has the API properly crop the tweet.


## Example code

Copy this example, and swap out the href to create an image of any tweet you'd like.

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img
    alt="Generate a screenshot of a tweet."
    loading="lazy"
    ix-path="/assets/images/tweet.png"
    sizes="400px"
    ix-params='{
      "w": 400,
      "format": "auto"
    }'>
</div>
</div>

HTML
{:.text-delta}
```html
<blockquote class="twitter-tweet" style="width: 400px;" data-dnt="true">
<p lang="en" dir="ltr"></p>

<a href="https://twitter.com/fortnitegame/status/1253524351376330752"></a>

</blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

**Important:** set these parameters when creating the image.
- selector: `.twitter-tweet`
- ms_delay: `1500`


{% include code_footer.md version=1 %}
