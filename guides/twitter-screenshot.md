---
layout: page
title: Twitter screenshot
permalink: /guides/twitter-screenshot/
parent: Guides
nav_order: 4
description: >-
  Learn how to automatically generate a screenshot of a tweet with HTML/CSS to Image. This works with Zapier, Integromat or any programming language. JavaScript, PHP, Python, Ruby.
---
# Screenshot a Tweet
{: .no_toc }
{: .fs-9 }

Use the HTML/CSS to Image API to generate images of tweets.
{: .fs-6 .fw-300 }

<hr>

{% include hint.md title="Problems with Twitter screenshots" text="The Twitter embed API has changed and is blocking many requests. This has resulted in screenshots often returning blank images. We currently do not have a solution, but are working on it." %}

## How it works

To generate a screenshot of a Tweet, we can make use of the Twitter embed API.

For the image to work, make sure you set the `selector` param to `.twitter-tweet` and `ms_delay` to `1500`.
This gives the embed extra time to load and has the API properly crop the tweet.


## Example code

Copy this example, and swap out the href to create an image of any tweet you'd like.

<div class="code-example" markdown="1">
<div class="hcti-container">
  {% cloudinary /assets/images/tweet.png alt="Generate a screenshot of a tweet automatically" %}
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

[Try it yourself](https://htmlcsstoimage.com/examples/twitter-tweet-screenshot){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

{% include code_footer.md version=1 %}
