---
layout: page
title: Instagram embed
permalink: /guides/instagram-embed/
parent: Guides
nav_order: 4
description: >-
  Convert an Instagram post into an image.
---
# Convert an Instagram post into an image
{: .no_toc }
{: .fs-9 }

Learn how to use the API to generate an image from an Instagram post.
{: .fs-6 .fw-300 }

<hr>

## How it works

To generate a screenshot of an Instagram post, we can make use of the Instagram embed API.

We figured this out by getting the Instagram embed code from a post.
<img
  alt="Instagram embed instructions"
  loading="lazy"
  ix-path="/assets/images/insta-embed.png"
  sizes="150px"
  ix-params='{
  "w": 150,
  "format": "auto"
  }'>

You can generate this code yourself by viewing an Instagram post in a web browser. Clicking the top right hamburger menu, and then "Embed".

## Example code

Copy this example, and swap out the href to create an image of any post you'd like.

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img
    alt="Instagram post to image."
    loading="lazy"
    ix-path="/assets/images/instagram.png"
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
<script src="https://platform.instagram.com/en_US/embeds.js"></script>
<blockquote style="width:600px;" class="instagram-media" data-instgrm-version="7" >

<!-- replace this href with the link to the post -->
<a href="https://www.instagram.com/p/B2EkgKalrO6/"></a> 

</blockquote>
```

[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

{% include code_footer.md version=1 %}
