---
description: How to render emoji with the HTML/CSS to Image API
---

# Rendering Emoji

Emoji's are automatically replaced with images for consistent and clear rendering. This is enabled for you by default.

![](../.gitbook/assets/emoji.jpeg)

{% hint style="info" %}
### emoji class

Each image has an `emoji`class added to it on render. This makes it easy to tweak their display. 
{% endhint %}

```css
/* Take advantage of the built in 'emoji' class to modify the display of emoji */
img.emoji {
  height: 2em;
  width: 2em;
  margin: 0 .05em 0 .1em;
}
```



