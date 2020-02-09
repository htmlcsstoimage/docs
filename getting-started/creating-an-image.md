---
description: >-
  Converting HTML/CSS to an Image (jpg, png, webp) with the API. Renders exactly
  like Google Chrome.
---

# Creating an image

Learn to use the API to generate images from your HTML and CSS.

![Converting HTML/CSS to an image.](../.gitbook/assets/image%20%2811%29.png)

Try it out yourself with the [**live demo**](https://htmlcsstoimage.com/#demo).

### How it works

To create an image, send an **HTTP POST** request to the `/v1/image` endpoint. This can be done with any language or framework. We have code samples in many languages.

* [PHP](../example-code/php.md)
* [JavaScript](../example-code/javascript.md)
* [Ruby](../example-code/ruby.md)
* [Python](../example-code/python.md)
* [VB.NET](../example-code/vb.net.md)
* [Go](../example-code/go.md)
* [C\#](../example-code/c.md)

The API will return JSON with the URL to your newly created image.

```javascript
{
  "url": "https://hcti.io/v1/image/6e253850-736c-487a-8dc8-b6950ca94703"
}
```

By default, this URL will return a **png**. See [File formats](file-formats.md) for other options.

Take a [look at our examples](../#examples) for ways to make use of the API.

{% api-method method="post" host="https://hcti.io" path="/v1/image" %}
{% api-method-summary %}
Create an image
{% endapi-method-summary %}

{% api-method-description %}
Create a new image
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
CSS styles for your image.
{% endapi-method-parameter %}

{% api-method-parameter name="google\_fonts" type="string" required=false %}
Google fonts to be loaded. Example: Roboto. Multiple fonts delimited by \|. Roboto\|Open Sans
{% endapi-method-parameter %}

{% api-method-parameter name="ms\_delay" type="number" required=false %}
The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time.
{% endapi-method-parameter %}

{% api-method-parameter name="url" type="string" required=false %}
The fully qualified URL to a public webpage. Such as `https://htmlcsstoimage.com`. When passed this will override the **html** param and will generate a screenshot of the url.
{% endapi-method-parameter %}

{% api-method-parameter name="viewport\_width" type="number" required=false %}
Set the width of Chrome's viewport. This will disable automatic cropping.
{% endapi-method-parameter %}

{% api-method-parameter name="viewport\_height" type="number" required=false %}
Set the height of Chrome's viewport. This will disable automatic cropping.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Image successfully created
{% endapi-method-response-example-description %}

{% code title="example\_response.json" %}
```javascript
{
  "url": "https://hcti.io/v1/image/6e253850-736c-487a-8dc8-b6950ca94703"
}
```
{% endcode %}
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Missing parameter
{% endapi-method-response-example-description %}

{% code title="bad\_request.json" %}
```javascript
{
  "error": "Bad Request",
  "statusCode": 400,
  "message": "HTML is Required"
}
```
{% endcode %}
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Invalid authorization token
{% endapi-method-response-example-description %}

{% code title="bad\_token.json" %}
```javascript
{
  "error": "Unauthorized",
  "statusCode": 401,
  "message": "Bad username or password."
}
```
{% endcode %}
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

### Designing your image

We recommend using [CodePen](https://codepen.io/mscccc/pen/eLRLQq) when writing your HTML/CSS to quickly preview what your image will look like when rendered. It makes debugging easy. Here's an example where we used CodePen to design a Social Graph image.

![Use CodePen to test your HTML/CSS](../.gitbook/assets/image%20%288%29.png)

### Learn more

Take a look at the following pages for more details on how to generate images. 

{% page-ref page="../advanced-examples/using-google-fonts.md" %}

{% page-ref page="setting-height-and-width.md" %}

{% page-ref page="../advanced-examples/external-css-and-fonts.md" %}

### Get help from us

Tell us what you're building. We're experts at generating images and will help you get your project up and running quickly with the API.

Email: **support@htmlcsstoimage.com**. We reply fast!

