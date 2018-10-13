---
description: Convert HTML/CSS to an image with PHP.
---

# PHP

Here we will show you how to generate an image from HTML/CSS with PHP.

This example uses the [Guzzle library](https://github.com/guzzle/guzzle). Install instructions are [here](https://github.com/guzzle/guzzle#installing-guzzle).

### Example code

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

