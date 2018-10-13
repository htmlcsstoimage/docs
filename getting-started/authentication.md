# Authentication

The API is protected by [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Authentication is only required for [creating a new image](creating-an-image.md).

Your username is your **User ID** and your password is your **API Key**. Both of these values are available from the [dashboard](https://htmlcsstoimage.com/dashboard).

To test your authentication without creating an image, use the `v1/ping` endpoint. Authentication via cURL would look like the following.

### Run the following in your terminal

```bash
# Replace UserID and APIKey with the values from the dashboard.
curl -X POST https://hcti.io/v1/ping -u 'UserID:APIKey'
```



