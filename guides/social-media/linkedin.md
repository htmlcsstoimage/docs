---
layout: page
title: LinkedIn screenshot
permalink: /guides/social-media/linkedin/
parent: Social Media
grand_parent: Guides
nav_order: 4
description: >-
  Learn how to automatically generate a screenshot of a LinkedIn post with HTML/CSS to Image. This works with Zapier, Integromat or any programming language. JavaScript, PHP, Python, Ruby.
---
# Screenshot a LinkedIn Post
{: .no_toc }
{: .fs-9 }

Use the HTML/CSS to Image API to generate images from LinkedIn embed's.
{: .fs-6 .fw-300 }

<hr>

## How it works

To generate a screenshot of a post on LinkedIn, we can make use of the LinkedIn embed API.

For the image to work, make sure you set the `selector` param to `iframe` and `ms_delay` to `2500`.
This gives the embed extra time to load and nicely crops the post.


## Example code

First, you need to grab the LinkedIn embed code. This is available by clicking the 3 dots on the top right of a LinkedIn post and then clicking "embed this post".

If you're automating this, notice in the embed code that the ID for the post is in the URL. You can swap that ID out to load a different post.

<div class="code-example" markdown="1">
<div class="hcti-container">
  {% cloudinary /assets/images/linkedin.png alt="Generate a screenshot of a LinkedInPost" %}
</div>
</div>

HTML
{:.text-delta}
```html
<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:6846990735720361984" height="610" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
```

**Important:** set these parameters when creating the image.
- selector: `iframe`
- ms_delay: `2500`

[Try it yourself](https://htmlcsstoimage.com){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

{% include code_footer.md version=1 %}


