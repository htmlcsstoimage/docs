---
layout: page
title: Facebook screenshot
permalink: /guides/facebook-screenshot/
parent: Guides
nav_order: 4
description: >-
  Learn how to automatically generate a screenshot of a Facebook post with HTML/CSS to Image. This works with Zapier, Integromat or any programming language. JavaScript, PHP, Python, Ruby.
---
# Screenshot a Facebook post
{: .no_toc }
{: .fs-9 }

Use the HTML/CSS to Image API to autogenerate screenshots from Facebook.
{: .fs-6 .fw-300 }

<hr>

## How it works

To generate a screenshot of a Facebook post, we can make use of the Facebook embed feature.

For the image to work, make sure you set the `selector` param to `.fb-post` and `ms_delay` to `1500`.
This gives the embed extra time to load and has the API properly crop the image.


## Example code

Copy this example, and swap out the href to create an image of any Facebook post you'd like.

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img
    alt="Generate a screenshot of a Facebook post."
    loading="lazy"
    ix-path="/assets/images/facebook.png"
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
<div id="fb-root"></div>
<script crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=228636847765&autoLogAppEvents=1" nonce="XHMdHwJF"></script>

<!-- See data-href below. Replace that with the link to your Facebook post -->
<!-- set ms_delay: 1500 to give it extra time toload -->
<!-- set selector: .fb-post -->
<div class="fb-post" data-href="https://www.facebook.com/HermanMiller/photos/a.171562157561/10158261466927562/" data-show-text="true" data-width=""></div>
```

**Important:** set these parameters when creating the image.
- selector: `.fb-post`
- ms_delay: `1500`


{% include code_footer.md version=2 %}
