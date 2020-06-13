---
description: The HTML/CSS to Image API uses HTTP Basic Authentication
---

# Authentication

Here you will learn all about Authentication for the HTML/CSS to Image API.

### How to authenticate

We use the "HTTP Basic" authentication scheme for the API. 

Your username is your accounts **User ID** and your password is your **API Key**. Both of these are available from the [dashboard](https://htmlcsstoimage.com/dashboard).

For HTTP Basic, you need to add an Authorization header to your request. It will look something like this.

```text
authorization: Basic VXNlcklkOkFQSUtleQo=
```

The value after `Basic` in the authentication string is constructed like this.

1. Create a string with your UserID and API Key separated by a colon.  `UserID:ApiKey`
2. Then, you need to base64 encode that string. This will depend on the language you are using.

Here's an example using the command line.

```text
echo "UserId:APIKey" | base64
VXNlcklkOkFQSUtleQo=
```

{% hint style="info" %}
**Use our code samples**

Generating the header will depend on the programming language you are using. We recommend either using one of our code samples or looking up "http basic" examples for the language you are using. Many built in HTTP libraries will do this for you.
{% endhint %}

### More information

We chose HTTP Basic for our authentication because it's a simple and commonly used authentication method. You should be able to find examples for how to do it in any language.

We only require authentication when creating or deleting an image. Downloading an image does not require authentication.

You should treat your API Key like it is a password and keep it secret. This means it should not be exposed in your frontend code \(such as HTML or JavaScript\). If it's exposed, then a bad actor could make use of your account. If this happens, please contact us immediately.

### Need help?

Email us **support@htmlcsstoimage.com**. We'd be happy to generate a code sample for you or debug any issues you are having.

