---
description: >-
  Convert HTML to an image (png, jpg or webp) with PHP + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---

# PHP

In this post, you'll learn how to convert html to an image with PHP

![HTML to an image with PHP](../.gitbook/assets/image%20%2821%29.png)



Try it out yourself with the ****[**live demo**](https://htmlcsstoimage.com/#demo).

### Plain PHP example

To create an image, you need to send a POST request to the  `v1/image` endpoint. 

The API takes your HTML/CSS and runs it inside a real instance of Google Chrome to generate the image.

#### Parameters

{% tabs %}
{% tab title="html" %}
**Data type:** String \(required\)

This is the HTML you want to render. You can send an HTML snippet \(`<div>Your content</div>`\) or an entire webpage.

**External JS and CSS are supported.** 

You can include script tags and &lt;link&gt; tags to CSS. Be sure that any assets you include are available via a full publicly accessible URL so that we can download them before rendering.
{% endtab %}

{% tab title="css" %}
**Data type:** String \(optional\)

The CSS for your image.
{% endtab %}

{% tab title="google\_fonts" %}
**Data type:** String \(optional\)

Google Fonts to be loaded before rendering the image. To see all of the fonts available, visit: [https://fonts.google.com/](https://fonts.google.com/)

**Single font**

Pass the font name as the parameter.

`Roboto`

**Multiple fonts**

Separate multiple fonts with a `|`.

`Roboto|Roboto Condensed|Open Sans`

\*\*\*\*
{% endtab %}
{% endtabs %}

This script will send HTML/CSS to the API and get back a URL to your new image. You'll need an API key to use this example.

If you'd like to try it out first without writing any code, take a look at the [demo](https://htmlcsstoimage.com/#demo).

{% code title="html\_css\_to\_image.php" %}
```php
<?php

$html = <<<EOD
<div class='box'>
  Generated from PHP ✅
</div>
EOD;

$css = <<<EOD
.box { 
  border: 4px solid #03B875; 
  padding: 20px; 
  font-family: 'Roboto'; 
}
EOD;

$google_fonts = "Roboto";

$data = array('html'=>$html,
              'css'=>$css,
              'google_fonts'=>$google_fonts);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://hcti.io/v1/image");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

curl_setopt($ch, CURLOPT_POST, 1);
// Retrieve your user_id and api_key from https://htmlcsstoimage.com/dashboard
curl_setopt($ch, CURLOPT_USERPWD, "user_id" . ":" . "api_key");

$headers = array();
$headers[] = "Content-Type: application/x-www-form-urlencoded";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
  echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
$res = json_decode($result,true);
echo $res['url'];
// https://hcti.io/v1/image/202dc04d-5efc-482e-8f92-bb51612c84cf
?>
```
{% endcode %}

![URL: https://hcti.io/v1/image/202dc04d-5efc-482e-8f92-bb51612c84cf](../.gitbook/assets/image%20%2819%29.png)

### PHP example with Guzzle library

Using an HTTP library such as [Guzzle](https://github.com/guzzle/guzzle) can simplify your code even further. Here's an example of how to use the HTML/CSS to Image API with Guzzle.

Installation instructions for Guzzle are [here](https://github.com/guzzle/guzzle#installing-guzzle).

{% code title="php\_example.php" %}
```php
<?php
require 'vendor/autoload.php';

$html = "<div class='ping'>Pong ✅</div>";
$css = ".ping { padding: 20px; font-family: 'sans-serif'; }";

$client = new GuzzleHttpClient();
// Retrieve your user_id and api_key from https://htmlcsstoimage.com/dashboard
$res = $client->request('POST', 'https://hcti.io/v1/image', [
  'auth' => ['user_id', 'api_key'],
  'form_params' => ['html' => $html, 'css' => $css]
]);

echo $res->getBody();
// {"url":"https://hcti.io/v1/image/5803a3f0-abd3-4f56-9e6c-3823d7466ed6"}
?>
```
{% endcode %}

The code turns out to be a bit more readable and less complex when using Guzzle. A great option if you're open to adding the library to your project.

### More examples

This page showed really simple image examples. The API can render anything that Google Chrome can. For more advanced examples, [take a look here](../#examples).

### Need help?

Email us **support@htmlcsstoimage.com**

Share with us what you're building. We're experts at generating images and love to help.

