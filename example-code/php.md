---
description: Convert HTML/CSS to an image with PHP.
---

# PHP

Here we will show you how to generate an image from HTML/CSS with PHP.

### Plain PHP example

{% code-tabs %}
{% code-tabs-item title="html\_css\_to\_image.php" %}
```php
<?php

$html = "<div class='box'>Generated from PHP ✅</div>";
$css = ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }";
$google_fonts = "Roboto";
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://hcti.io/v1/image");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_POSTFIELDS, 'html='.$html.'&css='.$css.'&google_fonts='.$google_fonts);

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
{% endcode-tabs-item %}
{% endcode-tabs %}

![URL: https://hcti.io/v1/image/202dc04d-5efc-482e-8f92-bb51612c84cf](../.gitbook/assets/image%20%284%29.png)

### PHP example with Guzzle library

This example uses the [Guzzle library](https://github.com/guzzle/guzzle). Installation instructions are [here](https://github.com/guzzle/guzzle#installing-guzzle).

{% code-tabs %}
{% code-tabs-item title="php\_example.php" %}
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
{% endcode-tabs-item %}
{% endcode-tabs %}

### More examples

For more advanced examples, [take a look here](../#examples).

