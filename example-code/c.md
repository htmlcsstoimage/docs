---
description: 'Converting HTML/CSS to an Image with C#'
---

# C\#

### Example Code

This code creates a WebClient, sets credentials and POSTS the HTML & CSS as values to the API.  The response will be json with the URL to the generated image.

```csharp
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
            '{"url":"https://hcti.io/v1/image/404ed70d-dcb9-4778-9be4-fad912321d5b"}
        }
    }
}

```

### More examples <a id="more-examples"></a>

For more advanced examples, [take a look here](/~/drafts/-LPHcAPUeRw0IdlUIJu2/primary/#examples).

