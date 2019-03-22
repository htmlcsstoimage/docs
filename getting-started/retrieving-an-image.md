---
description: API endpoint for retrieving an image.
---

# Retrieving an image

After [creating an image](creating-an-image.md), you'll receive the URL to your image.

This URL is permanent for as long as your account is active. It's automatically cached and optimized by Cloudflare's global content delivery network. You can use it directly on your webpages and not worry about hurting your page speed score.

* **Lossless optimization:** each image is optimized with no change in image quality.
* **Global cache:** the image is cached near your users to reduce latency.

{% api-method method="get" host="https://hcti.io" path="/v1/image/:image\_id" %}
{% api-method-summary %}
Get an image
{% endapi-method-summary %}

{% api-method-description %}
Renders your HTML/CSS into an image. Returns a png by default. Change the file extension to return a jpeg or webp image.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-query-parameters %}
{% api-method-parameter name="height" type="integer" required=false %}
The height of the image. Maximum: 5000
{% endapi-method-parameter %}

{% api-method-parameter name="width" type="integer" required=false %}
The width of the image. Maximum 5000
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
Rendered image
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=422 %}
{% api-method-response-example-description %}
Invalid filetypes will return an error
{% endapi-method-response-example-description %}

```
Sorry, we do not currently support that format. Valid image types are: jpg, webp or png
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

You can modify this URL to adjust the size and file format.

{% page-ref page="file-formats.md" %}

{% page-ref page="setting-height-and-width.md" %}

