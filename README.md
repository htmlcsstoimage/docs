---
description: >-
  Welcome to the HTML/CSS to Image API documentation. This page will get you
  started and show you how to start generating images from HTML/CSS in a variety
  of languages using our API.
---

# Getting started

{% api-method method="post" host="https://htmlcsstoimage.com" path="/api/v1/image" %}
{% api-method-summary %}
Create an Image
{% endapi-method-summary %}

{% api-method-description %}
This endpoint generates an image from HTML/CSS.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" %}
ID of the cake to get, for free of course.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Authentication token to track down who is emptying our stocks.
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="css" type="string" required=true %}
Your css. Example: .red { color: red; }
{% endapi-method-parameter %}

{% api-method-parameter name="html" type="string" required=true %}
Your html markup. Example: &lt;div class="red"&gt;Hello world!&lt;/div&gt;
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```javascript
{
    "url":"https://htmlcsstoimage.com/v1/image/7dc505c1-f43b-43ed-a33a-a8f861c4c1ab"
} 
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "errors":[{"location":"body","param":"css","msg":"Invalid value"}]
} 
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
    "error":"Invalid credentials. Visit https://htmlcsstoimage.com/dashboard for your User ID and API Key."
} 
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://htmlcsstoimage.com" path="/api/v1/image/:image\_id" %}
{% api-method-summary %}
Get an image
{% endapi-method-summary %}

{% api-method-description %}
Returns your image
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



