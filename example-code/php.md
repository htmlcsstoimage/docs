---
layout: page
title: PHP - HTML to Image Example
nav_title: PHP
parent: Example code
permalink: /example-code/php/
description: >-
  Convert HTML to an image (png, jpg or webp) with PHP + the HTML/CSS to Image
  API. Official Composer package for PHP 8.2+.
---
{% include intro.md language="PHP" %}

## Official Composer client

For typed requests, responses, and signed URL helpers, use the official [`html-css-to-image/client`](https://packagist.org/packages/html-css-to-image/client) package.

```bash
composer require html-css-to-image/client
```

```php
<?php

use HtmlCssToImage\HtmlCssToImageClient;
use HtmlCssToImage\Request\CreateHtmlCssImageRequest;
use HtmlCssToImage\Response\CreateImageSuccessResponse;

require __DIR__ . '/vendor/autoload.php';

$client = new HtmlCssToImageClient(
    apiId: 'your-api-id',
    apiKey: 'your-api-key',
);

$result = $client->createImage(
    new CreateHtmlCssImageRequest(
        html: "<div class='box'>PHP ✅</div>",
        css: '.box { border: 4px solid #03B875; padding: 20px; }',
    ),
);

if ($result instanceof CreateImageSuccessResponse) {
    echo $result->url;
} else {
    echo $result->error;
}
```

The client also supports URL screenshots, templates, batches, image deletion, render options, and signed URLs. See the [PHP client repository](https://github.com/htmlcsstoimage/php-client) for complete usage and API documentation.

<hr>

## Direct HTTP example

```php
{% include_snippet everything from snippets/plain_php.php %}
```

## PHP example with Guzzle library

Using an HTTP library such as [Guzzle](https://github.com/guzzle/guzzle) can simplify your code even further. Here's an example of how to use the HTML/CSS to Image API with Guzzle.

Installation instructions for Guzzle are [here](https://github.com/guzzle/guzzle#installing-guzzle).

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

The code turns out to be a bit more readable and less complex when using Guzzle. A great option if you're open to adding the library to your project.

## Debugging Error:SSL certificate problem: unable to get local issuer certificate

When running this script on a Windows machine, it's possible you'll get an SSL error. The fix for this [is here](https://stackoverflow.com/questions/28858351/php-ssl-certificate-error-unable-to-get-local-issuer-certificate/32095378#32095378).

{% include code_footer.md version=2 %}
