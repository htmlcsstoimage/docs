---
title: "Batch templated images"
slug: changelog/2026-10-02-batch-templated-images
description: "Create multiple images from one or more templates with shared defaults and per-image variations."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-10-02'
  anchor: batch-templated-images
sidebar:
  hidden: true
---

Create multiple templated images in a single request with `POST /v1/image/batch/templated`. Share a template, version, output format, and variable values through `default_options`, then override them in each variation. A batch can use multiple templates, including templates built in the visual editor.

Template values merge recursively by object key. Arrays, scalar values, and explicit null values replace defaults. Results follow the order of your variations, and identical images reuse existing assets.

See the [batch templated image API reference](/getting-started/using-the-api/#batch-templated-image-creation) for request examples, version inheritance, and validation requirements.

[All updates](/changelog/)
