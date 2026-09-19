---
title: "Transparent backgrounds with one parameter"
slug: changelog/2026-07-20-transparent-backgrounds-with-one-parameter
description: "Set transparent_background to render a transparent PNG with one option."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-07-20'
  anchor: transparent-backgrounds-with-one-parameter
sidebar:
  hidden: true
---

You can now render a transparent PNG by setting `transparent_background: true` on the create image request. It works with both HTML/CSS and URL-based images, as well as saved templates and image batches.

The existing CSS-based transparent background method remains supported. The official clients expose the new option as `TransparentBackground` in .NET and `transparent_background` in TypeScript.

[Read the transparent background guide](/guides/styling/transparent-background/).

[All updates](/changelog/)
