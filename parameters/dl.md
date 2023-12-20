---
layout: page
title: dl
permalink: /parameters/dl/
parent: Parameters
nav_order: 4
description: >-
  Use the dl query parameter to make the image downloadable.
---
# Using dl - download image
{: .no_toc }
{: .fs-9 }

Learn how to make your image url downloadable
{: .fs-6 .fw-300 }

<hr>

## How it works

To make your image url downloadable, you can add `?dl=1` to the end of the `hcti.io` URL. This will instruct the users
browser to download the image.

For example, to create a download link to your image. You could do the following.

```html
<a href="https://hcti.io/v1/image/7cb776c5-8c12-4b1a-84aa-9941b815d873.jpg?dl=1">
  Download image
</a>
```

This will download have the users browser download the image in jpg format.
