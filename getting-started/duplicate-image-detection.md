---
description: Protection against generating duplicate images.
---

# Duplicate image detection

The API will automatically detect if your API key is creating the same image repeatedly within a short time period. When this happens, a new image will not be created and you will get back the URL to the existing image.

This protects you from accidentally using up your image quota due to a bug in a script or abuse from a user/robot.

{% hint style="warning" %}
**Warning**: This feature should not be relied on for stopping the creation of duplicate images. Duplicate detection is limited to a period of 4 hours and is geographically dependent.
{% endhint %}



