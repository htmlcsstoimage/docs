---
layout: page
title: C# / .NET
parent: Example code
permalink: /example-code/c/
description: >-
  Convert HTML to an image (png, jpg or webp) with C# / .NET + the HTML/CSS to Image
  API. Official NuGet package for .NET 6+.
---
# C# / .NET: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate png, jpg or webp images with C# and .NET. Renders exactly like Google Chrome.
{: .fs-6 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Official .NET Package

We provide an official NuGet package for .NET that makes it easy to generate images from HTML/CSS in your .NET applications.

| Package | Description |
|:--------|:------------|
| [HtmlCssToImage](https://www.nuget.org/packages/HtmlCssToImage) | Core client library for the HTML/CSS to Image API |
| [HtmlCssToImage.DependencyInjection](https://www.nuget.org/packages/HtmlCssToImage.DependencyInjection) | Integration with ASP.NET Core dependency injection |
| [HtmlCssToImage.Blazor](https://www.nuget.org/packages/HtmlCssToImage.Blazor) | Generate Open Graph image tags in Blazor applications |
| [HtmlCssToImage.TagHelper](https://www.nuget.org/packages/HtmlCssToImage.TagHelper) | Tag helpers for ASP.NET Core Razor Pages and MVC |

For full documentation, see the [GitHub repository](https://github.com/htmlcsstoimage/dotnet-client).

<hr>

## Quick Start

### 1. Install the NuGet package

```bash
dotnet add package HtmlCssToImage
```

Or using the Package Manager Console:

```powershell
Install-Package HtmlCssToImage
```

### 2. Create a client

```csharp
using HtmlCssToImage;

// Retrieve your User ID and API Key from https://htmlcsstoimage.com/dashboard
var client = new HtmlCssToImageClient("your-user-id", "your-api-key");
```

### 3. Generate an image

```csharp
var request = new CreateHtmlCssImageRequest
{
    Html = "<div class='box'>Hello, World!</div>",
    Css = ".box { padding: 20px; background: #03B875; color: white; font-family: 'Roboto'; }",
    GoogleFonts = "Roboto"
};

var result = await client.CreateImageAsync(request);

if (result.Success)
{
    Console.WriteLine($"Image URL: {result.Response.Url}");
    // https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d
}
```

<hr>

## Creating Images from a URL

Capture a screenshot of any webpage:

```csharp
var request = new CreateUrlImageRequest
{
    Url = "https://htmlcsstoimage.com",
    FullScreen = true  // Capture the full scrollable page
};

var result = await client.CreateImageAsync(request);

if (result.Success)
{
    Console.WriteLine($"Screenshot URL: {result.Response.Url}");
}
```

<hr>

## Using Templates

Generate images from pre-defined templates with dynamic values:

```csharp
var request = new CreateTemplatedImageRequest
{
    TemplateId = "your-template-id",
    TemplateValues = new Dictionary<string, string>
    {
        { "title", "Welcome!" },
        { "subtitle", "This is a templated image" }
    }
};

var result = await client.CreateImageAsync(request);
```

<hr>

## ASP.NET Core Integration

For ASP.NET Core applications, use the `HtmlCssToImage.DependencyInjection` package for seamless integration:

```bash
dotnet add package HtmlCssToImage.DependencyInjection
```

**Configure in `Program.cs`:**

```csharp
builder.Services.AddHtmlCssToImage(options =>
{
    options.UserId = "your-user-id";
    options.ApiKey = "your-api-key";
});
```

**Inject and use in your services:**

```csharp
public class ImageService
{
    private readonly IHtmlCssToImageClient _client;

    public ImageService(IHtmlCssToImageClient client)
    {
        _client = client;
    }

    public async Task<string> GenerateImageAsync(string html, string css)
    {
        var request = new CreateHtmlCssImageRequest { Html = html, Css = css };
        var result = await _client.CreateImageAsync(request);
        return result.Success ? result.Response.Url : null;
    }
}
```

<hr>

## Blazor Integration

For Blazor applications, use the `HtmlCssToImage.Blazor` package to easily generate Open Graph image tags:

```bash
dotnet add package HtmlCssToImage.Blazor
```

<hr>

## Razor Pages / MVC Tag Helpers

For ASP.NET Core Razor Pages and MVC applications, use the `HtmlCssToImage.TagHelper` package:

```bash
dotnet add package HtmlCssToImage.TagHelper
```

<hr>

## Batch Image Creation

Create multiple images in a single API call:

```csharp
var variations = new List<CreateHtmlCssImageRequest>
{
    new() { Html = "<div>Image 1</div>", Css = "div { color: red; }" },
    new() { Html = "<div>Image 2</div>", Css = "div { color: blue; }" },
    new() { Html = "<div>Image 3</div>", Css = "div { color: green; }" }
};

var result = await client.CreateImageBatchAsync(variations);

if (result.Success)
{
    foreach (var image in result.Response)
    {
        Console.WriteLine($"Image URL: {image.Url}");
    }
}
```

<hr>

## Signed URLs (Create and Render)

Generate signed URLs without making an API call. The image is rendered on-demand when the URL is accessed:

```csharp
// Generate a signed URL synchronously (no API call)
var url = client.CreateAndRenderUrl(new CreateHtmlCssImageRequest
{
    Html = "<div>Hello!</div>",
    Css = "div { padding: 20px; }"
});

Console.WriteLine($"Signed URL: {url}");
// Use this URL in img tags - the image renders when accessed
```

This is useful when you have content that may never be viewed, allowing you to generate images on-demand without using API credits upfront.

<hr>

## Performance & Native AOT

The official .NET client is built with performance in mind and fully supports Native AOT (Ahead-of-Time) compilation in .NET 9+. The client uses source-generated JSON serialization internally.

<hr>

## Plain HTTP Example

If you prefer not to use the NuGet package, you can make HTTP requests directly:

```csharp
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

var client = new HttpClient();

// Set up Basic Authentication
var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes("user_id:api_key"));
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

var payload = new
{
    html = "<div class='box'>Hello, world!</div>",
    css = ".box { padding: 20px; background-color: #03B875; color: white; }"
};

var content = new StringContent(
    JsonSerializer.Serialize(payload),
    Encoding.UTF8,
    "application/json"
);

var response = await client.PostAsync("https://hcti.io/v1/image", content);
var json = await response.Content.ReadAsStringAsync();

Console.WriteLine(json);
// {"url":"https://hcti.io/v1/image/be4c5118-fe19-462b-a49e-48cf72697a9d"}
```

<hr>

## Legacy WebClient Example

For older .NET Framework projects:

```csharp
using System.Net;

byte[] result;
string html = "<div class='ping'>Pong ✅</div>";
string css = ".ping {padding: 20px; font-family:'sans-serif'; }";

using (var client = new WebClient())
{
    string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes("user_id:api_key"));
    client.Headers[HttpRequestHeader.Authorization] = "Basic " + credentials;

    result = client.UploadValues(
        "https://hcti.io/v1/image",
        "POST", 
        new System.Collections.Specialized.NameValueCollection()
        {
            { "html", html }, { "css", css }
        }
    );
}

string resultString = System.Text.Encoding.UTF8.GetString(result);
Console.WriteLine(resultString);
// {"url":"https://hcti.io/v1/image/404ed70d-dcb9-4778-9be4-fad912321d5b"}
```

{% include code_footer.md version=2 %}
