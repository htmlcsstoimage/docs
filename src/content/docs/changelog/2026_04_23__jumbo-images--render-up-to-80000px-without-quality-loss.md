---
title: "Jumbo images — render up to 80,000px without quality loss"
slug: changelog/2026-04-23-jumbo-images--render-up-to-80000px-without-quality-loss
description: "Render large images at full resolution with tiled rendering and jumbo dimensions."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-04-23'
  anchor: jumbo-images--render-up-to-80000px-without-quality-loss
sidebar:
  hidden: true
---

You can now render images far beyond Chrome's usual ~8000px limit by setting `jumbo_max_width` and `jumbo_max_height`. The renderer splits the output into 8000 x 8000 tiles, renders each natively, and stitches them into a single image. Preserving your full `device_scale` so the result stays sharp at any size.

- **Render up to 80,000px on each side** (subject to a 400,000,000-pixel total area cap).
- **Quality is preserved.** Each tile renders at full resolution and the final image keeps its `device_scale`. No more blurry downscaled output when your render naturally exceeds 8000px.
- **Both params required together.** Pass `jumbo_max_width` and `jumbo_max_height` on the create image request. Works with both `html`/`css` and `url` renders.
- **Billed per tile.** Each 8000 x 8000 tile consumes one image credit.

Without jumbo, a render larger than ~8000px is automatically scaled down to fit, which usually produces a blurry image. If you're rendering big, set the jumbo params.

[Read the full Jumbo Images guide](/guides/advanced/jumbo-images/).

[All updates](/changelog/)
