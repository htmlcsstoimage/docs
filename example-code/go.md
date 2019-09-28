---
description: >-
  Convert HTML to an image (png, jpg or webp) with Go + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---

# Go

In this post, you'll learn how to convert html to an image with Go.

Try it out yourself with the ****[**live demo**](https://htmlcsstoimage.com/#demo).

### Plain Go example

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

{% code-tabs %}
{% code-tabs-item title="main.go" %}
```go
package main
import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "time"
)
const (
    userID = "your_user_id"
    apiKey = "your_api_key"
)
func main() {
    data := map[string]string{
        "html": "<div class='ping'>Pong ✅</div>",
        "css":  ".ping { padding: 20px; font-family: 'sans-serif'; }",
    }
    reqBody, err := json.Marshal(data)
    if err != nil {
        log.Fatalf("unable to marshal data: %s", err.Error())
    }
    req, err := http.NewRequest("POST", "https://hcti.io/v1/image", bytes.NewReader(reqBody))
    if err != nil {
        log.Fatalf("unable to create new request: %s", err.Error())
    }
    req.SetBasicAuth(userID, apiKey)
    client := &http.Client{Timeout: time.Second * 10}
    resp, err := client.Do(req)
    if err != nil {
        log.Fatalf("request was unsuccessful: %s", err.Error())
    }
    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Fatalf("unable to read response body: %s", err.Error())
    }
    fmt.Println(string(body))

    // {"url":"https://hcti.io/v1/image/f1e2762b-1f95-4f99-ab5d-0444b26dfd42"}
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### More examples

For more advanced examples, [take a look here](../#examples).

### Need help? 

Email us **support@htmlcsstoimage.com** 

Share with us what you're building. We're experts at generating images and love to help.

