---
layout: page
title: Java - HTML to Image Example
nav_title: Java
parent: Example code
permalink: /example-code/java/
description: >-
  Convert HTML to an image (png, jpg or webp) with Java + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="Java" %}

Java includes an HTTP client in the standard library, but not a JSON encoder. This example uses the built-in Java 11+ `HttpClient` with [`Jackson`](https://github.com/FasterXML/jackson) to encode the JSON request body.

Add Jackson to your project:

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.17.2</version>
</dependency>
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

public class HctiExample {
    private static final String USER_ID = "your-user-id";
    private static final String API_KEY = "your-api-key";

    public static void main(String[] args) throws IOException, InterruptedException {
        Map<String, String> payload = Map.of(
            "html", "<div class='box'>Java ✅</div>",
            "css", ".box { border: 4px solid #03B875; padding: 20px; font-family: Roboto, sans-serif; }",
            "google_fonts", "Roboto"
        );
        String body = new ObjectMapper().writeValueAsString(payload);

        String auth = Base64.getEncoder().encodeToString(
            (USER_ID + ":" + API_KEY).getBytes(StandardCharsets.UTF_8)
        );

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://hcti.io/v1/image"))
            .header("Authorization", "Basic " + auth)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new RuntimeException("Request failed: " + response.statusCode() + " " + response.body());
        }

        System.out.println(response.body());
        // {"url":"https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
    }
}
```

{% include code_footer.md version=1 %}
