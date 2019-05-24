---
description: >-
  Example code for converting HTML/CSS to an Image with Ruby. Renders the image
  exactly like Google Chrome.
---

# Ruby

In this post, you'll learn how to convert html/css to an image with Ruby

![HTML to Image with Ruby](../.gitbook/assets/image%20%2810%29.png)

Try it out yourself with the ****[**live demo**](https://htmlcsstoimage.com/#demo).

### Plain Ruby example

To create an image, you need to send a POST request to the  `v1/image` endpoint. 

The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to generate the image.

#### Parameters

{% tabs %}
{% tab title="html" %}
**Data type:** String \(required\)

This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage.

**External JS and CSS are supported.** 

You can include script tags and &lt;link&gt; tags to CSS. Be sure that any assets you include are available via a full publicly accessible URL so that we can download them before rendering.
{% endtab %}

{% tab title="css" %}
**Data type:** String \(optional\)

The CSS for your image.
{% endtab %}

{% tab title="google\_fonts" %}
**Data type:** String \(optional\)

Google Fonts to be loaded before rendering the image. To see all of the fonts available, visit: [https://fonts.google.com/](https://fonts.google.com/)

**Single font**

Pass the font name as the parameter.

`Roboto`

**Multiple fonts**

Separate multiple fonts with a `|`.

`Roboto|Roboto Condensed|Open Sans`

\*\*\*\*
{% endtab %}
{% endtabs %}

This script will send HTML/CSS to the API and get back a URL to your new image. You'll need an API key to use this example.

If you'd like to try it out first without writing any code, take a look at the [demo](https://htmlcsstoimage.com/#demo).

### Setup

This example uses the [HTTParty gem](https://github.com/jnunemaker/httparty). Install with `gem install httparty`, or add it to your Gemfile.

### Example code

{% code-tabs %}
{% code-tabs-item title="image.rb" %}
```ruby
require "httparty"
# Retrieve your user id and api key from the Dashboard
auth = { username: 'user_id', password: 'api_key' }

html = "<div class='ping'>Pong ✅</div>"
css = ".ping { padding: 20px; font-family: 'sans-serif'; }"

image = HTTParty.post("https://hcti.io/v1/image",
                      body: { html: html, css: css },
                      basic_auth: auth)

# => {"url"=>"https://hcti.io/v1/image/bde7d5bf-f7bb-49d9-b931-74e5512b8738"}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Advanced examples

* [Generating an image and storing on S3](../advanced-examples/create-image-and-save-to-s3-ruby.md)
* For more advanced examples, [take a look here](../#examples).

### Need help?

Email us **support@htmlcsstoimage.com**

Share with us what you're building. We're experts at generating images and love to help.

