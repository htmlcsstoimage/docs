---
layout: page
title: Rendering emoji
permalink: /guides/debugging/emoji/
parent: Debugging
grand_parent: Guides
nav_order: 4
description: >-
  Emoji's are automatically replaced with images for consistent and clear rendering. This is enabled for you by default.
---

# Rendering Emoji
{: .no_toc }
{: .fs-9 }

Emoji rendering is built in and handled automatically for you.
{: .fs-6 .fw-300 }

<hr>

## How it works

Emoji's are automatically replaced with images for consistent and clear rendering. This is enabled for you by default.

{% cloudinary /assets/images/emoji.jpeg sizes="400px" alt="Emoji support in HTML/CSS to Image API" %}

## `emoji` class

Each image has an `emoji`class added to it on render. This makes it easy to tweak their display. 

Here is the default CSS we apply to all emoji. To make tweaks, adjust it and include it in your CSS to override the defaults.

```css
/* Take advantage of the built in 'emoji' class to modify the display of emoji */
img.emoji {
  height: 2em;
  width: 2em;
  margin: 0 .05em 0 .1em;
}
```

## Disabling Twemoji

By default, we use [Twemoji](https://github.com/twitter/twemoji) to render emoji as images for consistent cross-platform display. If you prefer to use the native emoji fonts instead (the API runs on Linux servers), you can disable Twemoji with the `disable_twemoji` parameter.

### When to disable Twemoji

- You're using a custom emoji font
- You prefer the native system (linux) emoji appearance

### Example

```json
{
  "html": "<div>Hello 👋 World 🌍</div>",
  "disable_twemoji": true
}
```

{% include hint.md title="Note" text="When Twemoji is disabled, emoji appearance will vary depending on the fonts available in our rendering environment. Twemoji provides more consistent results across all images." %}

{% include code_footer.md version=2 %}


