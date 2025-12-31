---
layout: page
title: Ruby - HTML to Image Example
parent: Example code
permalink: /example-code/ruby/
description: >-
  Convert HTML to an image (png, jpg or webp) with Ruby + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
# Ruby: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp images with Ruby. Renders exactly like Google Chrome.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Generating images with Ruby
The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to convert your html into an image.
Use Ruby to send the API your HTML/CSS. You'll get back the URL to your generated image.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

## Ruby Example Code
Use the [HTML/CSS to Image Ruby client](https://github.com/htmlcsstoimage/ruby-client) to interact with the API.

Add this line to your application's Gemfile:

```ruby
gem 'htmlcsstoimage-api'
```

**Initializing the API client**
```ruby
require "htmlcsstoimage"

# Retrieve your user id and api key from https://htmlcsstoimage.com/dashboard
client = HTMLCSSToImage.new(user_id: "user-id", api_key: "api-key")
```

Alternatively, you can set `ENV["HCTI_USER_ID"]` and `ENV["HCTI_API_KEY"]`. These will be loaded automatically.

```ruby
client = HTMLCSSToImage.new
```

**Creating an image**

```ruby
image = client.create_image("<div>Hello, world</div>",
                            css: "div { background-color: red; font-family: Roboto; }",
                            google_fonts: "Roboto")

image
=> #<HTMLCSSToImage::ApiResponse url="https://hcti.io/v1/image/254b444c-dd82-4cc1-94ef-aa4b3a6870a6", id="254b444c-dd82-4cc1-94ef-aa4b3a6870a6">
image.url
=> "https://hcti.io/v1/image/254b444c-dd82-4cc1-94ef-aa4b3a6870a6"
```

To see additional methods available with the Ruby gem, see the [documentation here](https://htmlcsstoimage.github.io/ruby-client/HTMLCSSToImage.html).

## Example with HTTParty

This example uses the [HTTParty gem](https://github.com/jnunemaker/httparty). Install with `gem install httparty`, or add it to your Gemfile.

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

## Ruby on Rails example with caching

This example uses Rails built in caching.
- The cache key is a SHA of your html/css and google fonts.
- You'll only generate a unique image once. 
- If your HTML changes at all, a new image will be created. Subsequent calls using the same HTML/CSS parameters will return the cached URL rather than creating a new image.

```ruby
require "htmlcsstoimage"

def self.fetch_url(html:, css: nil, google_fonts: nil)
  cache_key = "htmlcssimage/#{html}/#{css}/#{google_fonts}"
  cached_url = Rails.cache.read(cache_key)

  return cached_url if cached_url.present?

  client = HTMLCSSToImage.new
  image = client.create_image(html: html, css: css, google_fonts: google_fonts)

  if image.success?
    Rails.cache.write(cache_key, image.url, expires_in: CACHE_EXPIRATION)
  end

  image.url
end
```


### Rendering a Rails view

This can be useful from within a controller. To render a view from Rails and pass it to the API, use `render_to_string` from within a controller action.

With this, you can create an image from a template and redirects the user to the image.

```ruby
html = render_to_string("path/to/view", formats: :html, layout: false)
redirect_to fetch_url(html: html, google_fonts: "Roboto|Roboto+Condensed"), status: :found
```

{% include hint.md title="Real world example" text="Take a look at [dev.to](https://dev.to)'s source code to see how they implemented this for generating social cards. [Code on GitHub.](https://github.com/thepracticaldev/dev.to/blob/9442fde9e799e0eaf82723550f29e0a677a0db2b/app/controllers/social_previews_controller.rb#L61)" %}


{% include code_footer.md version=1 %}
