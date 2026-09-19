---
title: "Control duplicate image detection with dedupe_duration_s"
slug: changelog/2026-08-05-control-duplicate-image-detection-with-dedupe_duration_s
description: "Control how long matching image requests can reuse an existing image."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-08-05'
  anchor: control-duplicate-image-detection-with-dedupe_duration_s
sidebar:
  hidden: true
---

You can now set `dedupe_duration_s` when creating an HTML/CSS image or URL screenshot. When an image with the same content and parameters was created within that lookback window, the API can return its existing image ID and URL without consuming another image credit.

- URL screenshots default to a 0-second lookback.
- HTML/CSS images default to 30 days on Free and Basic plans, 180 days on Pro, and 365 days on Scale.
- Free and Basic plans support either `0` or the plan default. Pro and Scale plans support any value from `0` through their plan maximum.
- The option is available for standard single-image POST requests and MCP-created images. It does not apply to batches, templates, or signed create-and-render URLs.
- The official TypeScript client v0.8.0 and .NET client v0.11.0 now expose the option when creating images. It is not included in generated create-and-render URLs or batch requests.

Read the [`dedupe_duration_s` parameter docs](/parameters/dedupe_duration_s/) or the [duplicate detection guide](/guides/advanced/duplicate-detection/).

[All updates](/changelog/)
