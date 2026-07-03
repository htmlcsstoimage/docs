---
layout: page
title: Kotlin - HTML to Image Example
nav_title: Kotlin
parent: Example code
permalink: /example-code/kotlin/
description: >-
  Convert HTML to an image (png, jpg or webp) with Kotlin + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="Kotlin" %}

This example uses the built-in Java 11+ `HttpClient` from Kotlin and [`kotlinx.serialization`](https://github.com/Kotlin/kotlinx.serialization) to encode the JSON request body.

Add the JSON serialization dependency:

```kotlin
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")
}
```

```kotlin
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.charset.StandardCharsets
import java.util.Base64

fun main() {
    val userId = "your-user-id"
    val apiKey = "your-api-key"

    val payload = mapOf(
        "html" to "<div class='box'>Kotlin ✅</div>",
        "css" to ".box { border: 4px solid #03B875; padding: 20px; font-family: Roboto, sans-serif; }",
        "google_fonts" to "Roboto"
    )
    val body = Json.encodeToString(payload)

    val auth = Base64.getEncoder().encodeToString(
        "$userId:$apiKey".toByteArray(StandardCharsets.UTF_8)
    )

    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://hcti.io/v1/image"))
        .header("Authorization", "Basic $auth")
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build()

    val response = HttpClient.newHttpClient()
        .send(request, HttpResponse.BodyHandlers.ofString())

    if (response.statusCode() !in 200..299) {
        error("Request failed: ${response.statusCode()} ${response.body()}")
    }

    println(response.body())
    // {"url":"https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
}
```

{% include code_footer.md version=1 %}
