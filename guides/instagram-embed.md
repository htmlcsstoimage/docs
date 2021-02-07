---
layout: page
title: Instagram embed
permalink: /guides/instagram-embed/
parent: Guides
nav_order: 4
description: >-
  Learn how to automate converting an Instagram post into an image. Works with Zapier and any programming language. Ruby, PHP, JavaScript.
---
# Convert an Instagram post into an image
{: .no_toc }
{: .fs-9 }

Learn how to use the API to generate an image from an Instagram post.
{: .fs-6 .fw-300 }

<hr>

## How it works

To generate a screenshot of an Instagram post, you can make use of the Instagram embed API.

{% cloudinary /assets/images/insta-embed.png sizes="300px" alt="Generate a screenshot of an instagram post" %}

You can generate this code yourself by viewing an Instagram post in a web browser. Clicking the top right hamburger menu, and then "Embed".

## Example code

Copy this example, and swap out the href to create an image of any post you'd like.

<div class="code-example" markdown="1">
<div class="hcti-container">
  {% cloudinary /assets/images/instagram.png sizes="400px" alt="Create a screenshot of an instagram post" %}
</div>
</div>
HTML
{:.text-delta}
```html
<script src="https://platform.instagram.com/en_US/embeds.js"></script>
<blockquote style="width:600px;" class="instagram-media" data-instgrm-version="7" >

<!-- replace this href with the link to the post -->
<a href="https://www.instagram.com/p/B2EkgKalrO6/"></a> 

</blockquote>
```

**Important:** set these parameters when creating the image.
- selector: `.instagram-media-rendered`
- ms_delay: `1750`

[Try it yourself](https://htmlcsstoimage.com/examples/instagram-post-screenshot){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

{% include code_footer.md version=1 %}
