---
title: "Clarified `disable_twemoji` behavior for URL images"
slug: changelog/2026-09-22-clarified-disable-twemoji-behavior-for-url-images
description: "URL images only receive Twemoji when disable_twemoji is explicitly false; HTML/CSS images still default to false."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-09-22'
  anchor: clarified-disable-twemoji-behavior-for-url-images
sidebar:
  hidden: true
---

For HTML/CSS and template images, Twemoji remains enabled by default. Set `disable_twemoji: true` to use your supplied fonts or the rendering environment's native emoji fonts.

For URL images, we leave the loaded page's emoji handling unchanged when `disable_twemoji` is omitted, `null`, or `true`. Set `disable_twemoji: false` explicitly to inject Twemoji. Setting it to `true` does not disable emoji scripts already present on the website.

See the [`disable_twemoji` parameter guide](/parameters/disable_twemoji/) for examples.

[All updates](/changelog/)
