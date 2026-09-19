---
title: "DPI query param"
slug: changelog/2024-12-18-dpi-query-param
description: "Set an image’s DPI metadata with the dpi query parameter."
section: Changelog
tableOfContents: false
changelog:
  date: '2024-12-18'
  anchor: dpi-query-param
sidebar:
  hidden: true
---

We've added a new query param `dpi` which allows you to set the DPI metadata tag on your generated image. For example `hcti.io/v1/image/123abc?dpi=300`.
This only sets the metadata tag, you must still create an image large enough for the needed DPI.

[All updates](/changelog/)
