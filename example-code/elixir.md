---
layout: page
title: Elixir - HTML to Image Example
nav_title: Elixir
parent: Example code
permalink: /example-code/elixir/
description: >-
  Convert HTML to an image (png, jpg or webp) with Elixir + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="Elixir" %}

This example sends JSON using [`Jason`](https://hexdocs.pm/jason/) for encoding and Erlang/OTP's built-in `:httpc` client for the HTTP request.

Add `Jason` to your `mix.exs` dependencies:

```elixir
defp deps do
  [
    {:jason, "~> 1.4"}
  ]
end
```

{% raw %}
```elixir
:inets.start()
:ssl.start()

user_id = "your-user-id"
api_key = "your-api-key"

payload = %{
  html: "<div class='box'>Elixir ✅</div>",
  css: ".box { border: 4px solid #03B875; padding: 20px; font-family: Roboto, sans-serif; }",
  google_fonts: "Roboto"
}

body = Jason.encode!(payload)

auth = Base.encode64("#{user_id}:#{api_key}")

headers = [
  {'authorization', String.to_charlist("Basic #{auth}")},
  {'accept', 'application/json'}
]

request = {
  'https://hcti.io/v1/image',
  headers,
  'application/json',
  String.to_charlist(body)
}

case :httpc.request(:post, request, [], []) do
  {:ok, {{_, status, _}, _headers, response_body}} when status in 200..299 ->
    IO.puts(response_body)

  {:ok, {{_, status, _}, _headers, response_body}} ->
    raise "Request failed with status #{status}: #{to_string(response_body)}"

  {:error, reason} ->
    raise "Request failed: #{inspect(reason)}"
end

# {"url":"https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f"}
```
{% endraw %}

<hr>

## Phoenix example with Req

For Phoenix applications, [`Req`](https://hexdocs.pm/req/) is a popular HTTP client that keeps the request code compact and uses `Jason` for JSON encoding.

Add `Req` and `Jason` to your `mix.exs` dependencies:

```elixir
defp deps do
  [
    {:jason, "~> 1.4"},
    {:req, "~> 0.5"}
  ]
end
```

Store your credentials in config or environment variables, then call the API from a context or service module.

{% raw %}
```elixir
defmodule MyApp.Images.HtmlCssToImage do
  @endpoint "https://hcti.io/v1/image"

  def create_image do
    user_id = System.fetch_env!("HCTI_USER_ID")
    api_key = System.fetch_env!("HCTI_API_KEY")

    payload = %{
      html: "<div class='box'>Phoenix ✅</div>",
      css: ".box { border: 4px solid #03B875; padding: 20px; font-family: Roboto, sans-serif; }",
      google_fonts: "Roboto"
    }

    case Req.post(@endpoint, auth: {:basic, "#{user_id}:#{api_key}"}, json: payload) do
      {:ok, %{status: status, body: %{"url" => url}}} when status in 200..299 ->
        {:ok, url}

      {:ok, %{status: status, body: body}} ->
        {:error, {status, body}}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
```
{% endraw %}

{% include code_footer.md version=1 %}
