---
description: Converting HTML/CSS to an Image with VB.NET
---

# VB.NET

### Example Code

This code creates a WebClient, sets credentials and POSTS the HTML & CSS as values to the API.  The response will be json with the URL to the generated image.

```csharp
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

### More examples <a id="more-examples"></a>

For more advanced examples, [take a look here](/~/drafts/-LPHcAPUeRw0IdlUIJu2/primary/#examples).

