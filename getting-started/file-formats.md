---
description: Output images in the file format you need.
---

# File formats

The API supports `jpeg`, `png` and `webp`. If no file extension is passed, you'll get back a png by default. If you need a different file format, simply adjust the extension on the url. Such as: `v1/image/image_id`**`.jpeg`**.

| **Format** | **Example** |
| :--- | :--- |
| jpeg | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e`**`.jpeg`** |
| png | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e`**`.png`** |
| webp | `https://hcti.io/v1/image/a3ab2ab2-906e-4b5c-a88d-41a1c3f3779e`**`.webp`** |

{% hint style="success" %}
### **Global CDN**

All images are cached and served by a global content delivery network. After the initial render, you can expect lighting fast load times.
{% endhint %}

