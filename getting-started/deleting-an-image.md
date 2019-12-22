---
description: How to delete an image using the API.
---

# Deleting an image

To delete an image using the API, you can send a **DELETE** request to your image URL. This will remove your image from our servers and clear the caching for the image in our CDN. 

Because our CDN servers are distributed throughout the world, it may take a few minutes for this to take effect.

{% api-method method="delete" host="https://hcti.io" path="/v1/image/:id" %}
{% api-method-summary %}
Delete image
{% endapi-method-summary %}

{% api-method-description %}
Use this endpoint to delete one of your images. Authentication is the same as the create endpoint.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" %}
ID of the image..
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
HTTP Basic Authentication. Your username is your User ID and your password is your API. See Authentication for details.
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=202 %}
{% api-method-response-example-description %}
Image successfully deleted.
{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

### Need help?

If you need assistance with deleting images. Send us an email and we'll be happy to help you out. support@htmlcsstoimage.com

