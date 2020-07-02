---
description: Converting HTML/CSS to an image and saving to S3 with Ruby
---

# Create image and save to S3 \(Ruby\)

In this post, you'll learn how to create an image, download it and store it inside your own S3 bucket.

{% hint style="info" %}
**Do you need S3?**

We recommend using HCTI's built in CDN for serving images. It's optimized specifically for this purpose. But if you need to host them yourself, uploading them to S3 is a great option.
{% endhint %}

### Setup

You'll need the following gems installed to use this code:

```bash
gem install httparty
gem install aws-sdk-s3
```

Once those gems are installed, you'll need both `upload_s3.rb` and `html_css_to_image.rb` added to your project. The source for those files are below.

Each of these files are simple modules to help isolate the code and make it easier to read/maintain.

{% code title="html\_css\_to\_image.rb" %}
```ruby
require 'httparty'

module HtmlCssToImage
  AUTH = { username: ENV["HCTI_API_USER_ID"],
           password: ENV["HCTI_API_KEY"] }

  def self.url(html:, css: nil, google_fonts: nil)
    image = HTTParty.post("https://hcti.io/v1/image",
                          body: { html: html, css: css, google_fonts: google_fonts },
                          basic_auth: AUTH)

    if image["error"]
      raise image["message"]
    else
      image["url"]
    end
  end
end
```
{% endcode %}

{% code title="upload\_s3.rb" %}
```ruby
require 'aws-sdk-s3'
require 'httparty'
require 'uri'

module UploadS3
  BUCKET_NAME = 'my-bucket-name123'
  AWS_ID = ENV['AWS_ACCESS_ID']
  AWS_KEY = ENV['AWS_ACCESS_KEY']

  def self.store_on_s3(source_url:, filename: nil)
    filename = filename || filename_from_url(source_url)

    File.open("/tmp/#{filename}", "wb") do |f|
      f.write HTTParty.get(source_url).body
    end

    s3 = Aws::S3::Resource.new(region:'us-east-1')
    obj = s3.bucket(BUCKET_NAME).object(filename)

    # Permission set to public read.
    obj.upload_file("/tmp/#{filename}", acl: 'public-read')

    obj.public_url
  end

  def self.filename_from_url(url)
    uri = URI.parse(url)
    uri.path.split('/').last
  end
end
```
{% endcode %}

### S3 Bucket

For your S3 Bucket, you'll need to know the S3 bucket name and the region it is hosted in. Update `upload_s3.rb` with these values.

### Environment variables

Each module uses environment variables for your credentials. You'll need to setup both your S3 and HCTI api keys.

This will depend on your hosting environment. To do this locally, you can use the following in your terminal.

```bash
export HCTI_API_USER_ID=your-id
export HCTI_API_KEY=your-key
export AWS_ACCESS_ID=your-id
export AWS_ACCESS_KEY=your-aws-key
```

### Using the script

Here is everything put together. You can either use the generated ID as the filename, or customize your own.

By default, the script stores your image as `public-read` on S3. You can change the default permissions by editing `upload_s3.rb`.

{% code title="example.rb" %}
```ruby
require_relative 'upload_s3'
require_relative 'html_css_to_image'

# First, we create an image via the API. This returns the HCTI CDN url.
image_url = HtmlCssToImage.url(html: "<div class='box'>Testing</div>",
                           css: ".box { padding: 10px; width 400px; height 400px; border: 4px green solid; }")

# Then, we store it on S3 and get the URL
s3_url = UploadS3.store_on_s3(source_url: image_url)
# https://my-bucket-name123.s3.amazonaws.com/556bc69f-7b0a-4fa1-9e54-f5248c03dffb

# ------------------------------- 
# A custom filename is optional
s3_url = UploadS3.store_on_s3(source_url: image_url, filename: "custom.png")
# https://my-bucket-name123.s3.amazonaws.com/custom.png
puts s3_url
```
{% endcode %}

### Need more?

If you need help with this example, or anything else when using the API, email us! **support@htmlcsstoimage.com**

