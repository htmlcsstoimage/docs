---
description: API endpoint for retrieving an image.
---

# Retrieving an image

After [creating an image](creating-an-image.md), you'll receive a URL to your image. This URL will render your image. The URL is permanent for as long as your account is active. It can be used for hot linking.

{% api-method method="get" host="https://hcti.io" path="/v1/image/:image\_id" %}
{% api-method-summary %}
Get an image
{% endapi-method-summary %}

{% api-method-description %}
Renders your HTML/CSS into an image. Returns a jpeg by default. Change the file extension to return a png or webp image.
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

{% hint style="success" %}
### Global CDN

All images are served by Cloudflare's global content delivery network. They will be cached on servers around the world to provide fast load times.
{% endhint %}



