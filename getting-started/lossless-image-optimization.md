---
description: >-
  Accounts on the Growth plan or above have lossless image optimization
  automatically enabled for them.
---

# Lossless image optimization

## What is it?

Lossless image optimization reduces the file size of your images without any change in the quality. This improves your users download times and will boost your websites SEO/Pagespeed score.

All images created on the [Growth plan](https://htmlcsstoimage.com/#pricing) or above have this enabled automatically for all images. After the images initial render, our CDN will automatically compress the image for you. Subsequent downloads of the image will be automatically optimized.

### How do I know it's working?

Take a look at your images response headers. Images with lossless optimization running will have the following headers.

```http
cf-cache-status: HIT
cf-polished: origSize=15913
```

### What if cache status is MISS?

This means that the CDN server has not yet cached and optimized the image for you. This often happens when the image was just recently created.

```http
cf-cache-status: MISS
```

