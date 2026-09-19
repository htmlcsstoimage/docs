---
title: "Single-Request Image Generation endpoint"
slug: changelog/2025-06-15-single-request-image-generation-endpoint
description: "Render images on demand through signed create-and-render URLs."
section: Changelog
tableOfContents: false
changelog:
  date: '2025-06-15'
  anchor: single-request-image-generation-endpoint
sidebar:
  hidden: true
---

We've released a powerful new endpoint that allows you to generate images from HTML/CSS in a single request using signed URLs. This new [create-and-render endpoint](/getting-started/create-and-render/) eliminates the need for the traditional two-step process of creating an image and then fetching it.

Key benefits include:
- **Client-side friendly**: Generate image URLs without exposing your API key
- **No POST requests**: Skip the image creation step and go straight to rendering
- **HMAC authentication**: Secure signed URLs prevent unauthorized usage
- **Direct image response**: URLs return images immediately when accessed

This endpoint is perfect for scenarios where you need to generate image URLs from client-side code or want to simplify your image generation workflow. The endpoint uses HMAC SHA256 authentication to ensure security while keeping your API key private.

[All updates](/changelog/)
