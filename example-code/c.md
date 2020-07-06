---
layout: page
title: C#
parent: Example code
permalink: /example-code/c/
description: >-
  Convert HTML to an image (png, jpg or webp) with C# + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="C#" %}

This code creates a WebClient, sets credentials and POSTS the HTML & CSS as values to the API. The response will be `json` with the URL to the generated image.

```clike
using System.Net;

namespace htciExample
{
    class Program
    {
        static void Main()
        {
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
        }
    }
}
```

{% include code_footer.md version=2 %}
