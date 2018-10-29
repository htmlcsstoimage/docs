---
description: Converting HTML/CSS to an Image with the API
---

# Creating an image

To create an image, send an **HTTP POST** request to the `/v1/image` endpoint. This can be done with any language or framework.

This API endpoint will return the URL to your newly created image.

Take a [look at our examples](../#examples) for ways to make use of the API.

{% api-method method="post" host="https://hcti.io" path="/v1/image" %}
{% api-method-summary %}
Create an image
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to create a new image.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
HTTP Basic Authentication. Your username is your `User ID` and your password is your `API Key`. See Authentication for details.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="html" type="string" required=true %}
HTML markup. An entire page or an HTML snippet.
{% endapi-method-parameter %}

{% api-method-parameter name="css" type="string" required=false %}
CSS styles for your image
{% endapi-method-parameter %}

{% api-method-parameter name="google\_fonts" type="string" required=false %}
Google fonts to be loaded. Example: Roboto. Multiple fonts delimited by \|. Roboto\|Open Sans
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Image successfully created
{% endapi-method-response-example-description %}

{% code-tabs %}
{% code-tabs-item title="example\_response.json" %}
```javascript
{
  "url": "https://hcti.io/v1/image/6e253850-736c-487a-8dc8-b6950ca94703"
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Missing parameter
{% endapi-method-response-example-description %}

{% code-tabs %}
{% code-tabs-item title="bad\_request.json" %}
```javascript
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "child \"html\" fails because [\"html\" is required]"
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Invalid authorization token
{% endapi-method-response-example-description %}

{% code-tabs %}
{% code-tabs-item title="bad\_token.json" %}
```javascript
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Bad username or password",
    "attributes": {
        "error": "Bad username or password"
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endapi-method-response-example %}

{% api-method-response-example httpCode=429 %}
{% api-method-response-example-description %}
Plan limit exceeded
{% endapi-method-response-example-description %}

```javascript
{
	"statusCode": 429,
	"error": "Plan limit exceeded",
	"message": "You've used 3102 of your 3000 renders. Upgrade via the Dashboard: https://htmlcsstoimage.com/dashboard"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

Visit [this page for more information about using Google Fonts](../advanced-examples/using-google-fonts.md).

