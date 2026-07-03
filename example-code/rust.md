---
layout: page
title: Rust - HTML to Image Example
nav_title: Rust
parent: Example code
permalink: /example-code/rust/
description: >-
  Convert HTML to an image (png, jpg or webp) with Rust + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="Rust" %}

Rust's standard library does not include an HTTP client. This example uses [`reqwest`](https://docs.rs/reqwest/) for HTTP and [`serde_json`](https://docs.rs/serde_json/) to build the JSON request body.

Add the dependencies to your `Cargo.toml`:

```toml
[dependencies]
reqwest = { version = "0.12", features = ["blocking", "json"] }
serde_json = "1"
```

```rust
use serde_json::json;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let user_id = "your-user-id";
    let api_key = "your-api-key";

    let client = reqwest::blocking::Client::new();
    let payload = json!({
        "html": "<div class='box'>Rust ✅</div>",
        "css": ".box { border: 4px solid #03B875; padding: 20px; font-family: Roboto, sans-serif; }",
        "google_fonts": "Roboto"
    });

    let response = client
        .post("https://hcti.io/v1/image")
        .basic_auth(user_id, Some(api_key))
        .json(&payload)
        .send()?
        .error_for_status()?;

    let body = response.text()?;
    println!("{body}");

    // {"url":"https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
    Ok(())
}
```

{% include code_footer.md version=1 %}
