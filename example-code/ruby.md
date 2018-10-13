---
description: Converting HTML/CSS to an Image with Ruby
---

# Ruby

This example uses the [HTTParty gem](https://github.com/jnunemaker/httparty). Install with `gem install httparty`, or add it to your Gemfile.

### Example code

This code sample sets your authorization header and does a POST with HTML/CSS to the API. The response will be json with the URL to the generated image.

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

### More examples

For more advanced examples, [take a look here](../#examples).

