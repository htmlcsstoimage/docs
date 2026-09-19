---
title: "Render when ready"
slug: changelog/2020-07-26-render-when-ready
description: "Control capture timing with render_when_ready and ScreenshotReady()."
section: Changelog
tableOfContents: false
changelog:
  date: '2020-07-26'
  anchor: render-when-ready
sidebar:
  hidden: true
---

We have added the [`render_when_ready` parameter to image creation](/parameters/render_when_ready/). This gives you control over when the image is rendered.

By setting `render_when_ready` to `true`, we will wait to generate the image until your HTML calls the `ScreenshotReady()` function in JavaScript.

This is useful for images that have complex JS and you need control over when it's ready to have an image created.

[All updates](/changelog/)
