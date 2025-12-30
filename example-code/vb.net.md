---
layout: page
title: VB.NET
parent: Example code
permalink: /example-code/vb.net/
description: >-
  Convert HTML to an image (png, jpg or webp) with VB.NET + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
# VB.NET: HTML/CSS to Image
{: .no_toc }
{: .fs-9 }

Generate a png, jpg or webp images from your terminal with VB.NET
{: .fs-4 .fw-300 }

[Live demo](https://htmlcsstoimage.com/demo){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }
<hr>

## Generate an image with VB.NET
The API takes your HTML/CSS and runs it in an instance of Google Chrome to convert your html into an image.
Use VB.NET to send the API your HTML/CSS. You'll get back the URL to your generated image.

For more details on how this works, see [Creating an image](/getting-started/using-the-api#creating-an-image).

## Example code

This code creates a `WebClient`, sets credentials and POSTS the HTML & CSS as values to the API.  The response will be json with the URL to the generated image.

```clike
Imports System
Imports System.Net
Public Module htciExample

    Sub Main()
        Dim result As Byte()
        Dim html As String = "<div class='ping'>Pong ✅</div>"
            Dim css As String = ".ping {padding: 20px; font-family:'sans-serif'; }"
            Using client = New WebClient
            client.Credentials = New NetworkCredential("user_id", "api_key")
            result = client.UploadValues(
                    "https://hcti.io/v1/image",
                    "POST",
                    New Specialized.NameValueCollection() From {
                                             {"html", html}, {"css", css}
                                             }
                                             )
            End Using
            Dim resultString = System.Text.Encoding.UTF8.GetString(result)
            Console.WriteLine(resultString)
            '{"url":"https://hcti.io/v1/image/9dce5b30-3d9a-46b3-926b-651e5955f9a2"}
    End Sub

End Module

```

{% include code_footer.md version=1 %}
