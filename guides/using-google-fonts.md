---
layout: page
title: Using Google Fonts
permalink: /guides/using-google-fonts/
parent: Guides
nav_order: 3
description: >-
  Learn how to load in Google Fonts and use them in your images.
---
# Using Google Fonts
{: .no_toc }
{: .fs-9 }

Learn how to load in Google Fonts and use them in your images.
{: .fs-6 .fw-300 }

<hr>

## How it works

The API supports all [Google Fonts](https://fonts.google.com/). To use them, you must specify the fonts you would like loaded via the `google_fonts` parameter when creating your image.

- To load a single font, set the parameter to the font name: `google_fonts=Roboto`. And then set the font family in your CSS: `font-family: 'Roboto';`. On render, the API will load the font and use it for creating your image.

- Multiple fonts must be delimited by the `|` character: `google_fonts=Open Sans|Roboto|Montserrat`

{% include hint.md title="Fonts and rendering speed" text="A large number of custom fonts can slow down initial render time. Only include the fonts you use." %}

## Example

This image was rendered using multiple Google Fonts. Here was passed `google_fonts=Montserrat|Roboto`. And then referenced them in the CSS.

<div class="code-example" markdown="1">
<div class="hcti-container">
  <img
    alt="Image generated with HTML/CSS to Image and multiple fonts."
    loading="lazy"
    ix-path="/assets/images/8e8c1093-d205-4994-845c-67419598d081.jpeg"
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
<div class="box">
  <h1>Hello world! 😎 /h1>
  <p>Just getting started with the HTML/CSS to Image <code>API</code>.</p>
</div>
<div class="box fancy-font gradient">
  <h1>Fancy font + Gradient + Emoji 😍</h1>
</div>
```

CSS
{:.text-delta}
```css
.box {
  width: 300px;
  border: 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-family: 'Roboto';
  background-color: #F1FFFF;
  height: 125px;
  text-align: center;
  padding: 20px;
  margin: 20px;
}

.gradient{
  background: linear-gradient(135deg, #ffffff 0%,#f3f3f3 50%,#ededed 51%,#ffffff 100%);
}

.fancy-font {
  font-family: 'Montserrat';
}

h1 {
  padding: 0px;
}

p {
  padding: 0px;
}

code {
  font-family: "Courier New";
  color: #d9534f;
}

body {
  background-color: #03B874;
}
```

[Try it yourself](https://htmlcsstoimage.com/demo){: .btn .btn-green .fs-5 .mb-4 .mb-md-0 .mr-2 }

<hr>

## Using other web fonts

The API supports loading in any type of web font. You can do this by including your font in your HTML with a normal link tag. It will get loaded in at render
like a normal webpage.

## Handling flash of unstyled text (FOUT)

If you are seeing intermittent issues with your font rendering, it's possible that the image is being rendered before the font has updated the text.

To fix this, you can use the `ms_delay` parameter to adjust how long the API lets the HTML render before creating the image. Start with a low value, such as `500` and increase from there
until your image generates reliably.

{% include code_footer.md version=1 %}
