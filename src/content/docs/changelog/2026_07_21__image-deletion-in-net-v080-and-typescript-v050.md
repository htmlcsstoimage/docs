---
title: "Image deletion in .NET v0.8.0 and TypeScript v0.5.0"
slug: changelog/2026-07-21-image-deletion-in-net-v080-and-typescript-v050
description: "Delete individual images or batches with the official .NET and TypeScript clients."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-07-21'
  anchor: image-deletion-in-net-v080-and-typescript-v050
sidebar:
  hidden: true
---

The official .NET and TypeScript clients now support deleting images through the API:

- Delete one image with `DeleteImageAsync` in .NET or `deleteImage` in TypeScript.
- Delete multiple images in one request with `DeleteImageBatchAsync` in .NET or `deleteImageBatch` in TypeScript.

The .NET client's `ApiResult<T>` now implements `IDisposable` because it owns the raw `HttpResponseMessage`. The raw response remains available when you need headers, the originating request, or other transport details. C# callers should use `using` or `using var` when reading API results.

[View the C# examples](/example-code/c/) or [TypeScript examples](/example-code/typescript/).

[All updates](/changelog/)
