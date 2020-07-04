---
layout: page
title: Ruby
parent: Example code
permalink: /example-code/ruby/
description: >-
  Convert HTML to an image (png, jpg or webp) with Ruby + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="Ruby" %}


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

This example shows a common setup for a Rails application. Add this file to your `lib` folder, such as `app/lib/html_css_to_image.rb`.
You'll then be able to use it from any of your models.

We also use Rails built in caching. This works best with Memcached or Redis. The cache key is a SHA of your html/css and google fonts. Which is essentially a unique thumbprint of the data used to create the image.
This means you'll only generate a unique image once. If your HTML changes at all, a new image will be created. Subsequent calls using the same HTML/CSS parameters will return the cached URL rather than creating a new image.

```ruby
module HtmlCssToImage
  # User ID and API Key are stored as environment variables.
  AUTH = { username: ApplicationConfig["HCTI_API_USER_ID"],
           password: ApplicationConfig["HCTI_API_KEY"] }.freeze

  FALLBACK_IMAGE = "https://thepracticaldev.s3.amazonaws.com/i/g355ol6qsrg0j2mhngz9.png".freeze

  CACHE_EXPIRATION = 6.months

  def self.url(html:, css: nil, google_fonts: nil)
    image = HTTParty.post("https://hcti.io/v1/image",
                          body: { html: html, css: css, google_fonts: google_fonts },
                          basic_auth: AUTH)

    image["url"] || FALLBACK_IMAGE
  end

  def self.fetch_url(html:, css: nil, google_fonts: nil)
    cache_key = "htmlcssimage/#{html}/#{css}/#{google_fonts}"
    cached_url = Rails.cache.read(cache_key)

    return cached_url if cached_url.present?

    image_url = url(html: html, css: css, google_fonts: google_fonts)
    unless image_url == FALLBACK_IMAGE
      Rails.cache.write(cache_key, image_url, expires_in: CACHE_EXPIRATION)
    end

    image_url
  end
end
```

This class can then be used like this.

```ruby
## Fetch from cache or create an image.
HtmlCssToImage.fetch_url(html: "<div>Hello, world</div>", css: "div { background-color: blue; }", google_fonts: "Roboto")

## Or without caching.
HtmlCssToImage.url(html: "<div>Hello, world</div>", css: "div { background-color: blue; }", google_fonts: "Roboto")
```

This can be useful from within a controller. To render a template from Rails and pass it to the API, use `render_to_string` from within a controller action.

With this, you can create an image from a template and redirects the user to the image.

```ruby
html = render_to_string(template, formats: :html, layout: false)
redirect_to HtmlCssToImage.fetch_url(html: html, google_fonts: "Roboto|Roboto+Condensed"), status: :found
```

<hr>

{% include hint.md title="Real world example" text="Take a look at [dev.to](https://dev.to)'s source code to see how they implemented this for generating social cards. [Code on GitHub.](https://github.com/thepracticaldev/dev.to/blob/9442fde9e799e0eaf82723550f29e0a677a0db2b/app/controllers/social_previews_controller.rb#L61)" %}


{% include code_footer.md version=1 %}
