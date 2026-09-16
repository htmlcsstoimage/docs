---
layout: page
title: Go - HTML to Image Example
nav_title: Go
parent: Example code
permalink: /example-code/go/
description: >-
  Convert HTML to an image (png, jpg or webp) with Go + the HTML/CSS to Image
  API. Official Go client for Go 1.21+.
---
{% include intro.md language="Go" %}

## Official Go client

For typed requests, responses, and signed URL helpers, use the official [`github.com/htmlcsstoimage/go-client`](https://pkg.go.dev/github.com/htmlcsstoimage/go-client) module. Requires Go 1.21 or newer.

```bash
go get github.com/htmlcsstoimage/go-client
```

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/htmlcsstoimage/go-client"
)

func main() {
	client := hcti.NewClient("your-api-id", "your-api-key")

	image, err := client.CreateImage(context.Background(), &hcti.HTMLImageRequest{
		HTML:        "<div class='box'>Go ✅</div>",
		CSS:         hcti.Ptr(".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }"),
		GoogleFonts: hcti.GoogleFonts{"Roboto"},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(image.URL)
}
```

The module's package name is `hcti`. Alternatively, use `hcti.NewClientFromEnv()` to load `HCTI_API_ID` and `HCTI_API_KEY`; it returns a client and an error. Optional request fields use pointers: `hcti.Ptr(false)`, `hcti.Ptr(0)`, and `hcti.Ptr("")` send explicit values, while nil leaves the field unspecified.

The client also supports URL screenshots, PDF options, templates, batches, image deletion, resizing and cropping, and signed URLs. See the [Go client repository](https://github.com/htmlcsstoimage/go-client) for usage and runnable examples, and the [package documentation on pkg.go.dev](https://pkg.go.dev/github.com/htmlcsstoimage/go-client) for the API reference.

<hr>

## Direct HTTP example

You can also call the API directly using Go's standard library:

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{Timeout: time.Second * 10}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("request was unsuccessful: %s", err.Error())
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("unable to read response body: %s", err.Error())
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		log.Fatalf("API request failed (HTTP %d)", resp.StatusCode)
	}
	fmt.Println(string(body))

	// {"url":"https://hcti.io/v1/image/f1e2762b-1f95-4f99-ab5d-0444b26dfd42"}
}
```

{% include code_footer.md version=2 %}
