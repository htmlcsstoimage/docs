---
title: "Choose the returned file format in image creation requests"
slug: changelog/2026-08-27-choose-the-returned-file-format-in-image-creation-requests
description: "Choose PNG, JPG, WebP, or PDF in image creation requests."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-08-27'
  anchor: choose-the-returned-file-format-in-image-creation-requests
sidebar:
  hidden: true
---

Image creation requests can now include `format` in the request body. This parameter selects the file extension included in the returned URL; it does not change the stored image definition.

- Set `format` to `png`, `jpg`, `webp`, or `pdf` for an HTML/CSS image, URL screenshot, saved-template image, or image batch.
- Raster images are rendered and stored as PNGs. JPG and WebP URLs convert that stored PNG when requested.
- PDFs are rendered and saved separately when a PDF URL is requested.
- The same image ID can still be requested later with a different supported extension.
- Batch requests can set `format` in `default_options` or override it in an individual variation.
- When omitted, the API returns its default extensionless URL, which renders as PNG.

The official clients now expose the body parameter and apply it to generated signed URL paths:

- [.NET client v0.12.0](https://github.com/htmlcsstoimage/dotnet-client) with `RenderImageFormat.PDF` support.
- [TypeScript client v0.9.0](https://github.com/htmlcsstoimage/ts-client).
- [Ruby client v0.3.0](https://github.com/htmlcsstoimage/ruby-client).

[Read the `format` parameter documentation](/parameters/format/) or compare output types in the [file formats guide](/guides/styling/file-formats/).

[All updates](/changelog/)
