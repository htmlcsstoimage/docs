---
description: Protection against generating duplicate images.
---

# Duplicate image detection

### What happens if I create the same image multiple times?

The API will automatically detect if your API key is creating the same image repeatedly within a short time period. When this happens, a new image will not be created and you will get back the URL to the existing image.

This protects you from accidentally using up your image quota due to a bug in a script or abuse from a user/robot.

We use the entire payload sent to the API to determine duplicates. If there a single character difference between images, it will not be considered a duplicate.

{% hint style="warning" %}
**Warning**: This feature should not be relied on for stopping the creation of duplicate images. Duplicate detection happens on our Edge CDN. This means it is geographically dependent. If you create identical images from servers in two different locations, we won't be able to detect that they are the same.
{% endhint %}



