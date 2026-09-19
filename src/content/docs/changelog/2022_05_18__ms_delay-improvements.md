---
title: "ms_delay improvements"
slug: changelog/2022-05-18-ms_delay-improvements
description: "Rendering delays now support up to 20 seconds, with additional credits above five seconds."
section: Changelog
tableOfContents: false
changelog:
  date: '2022-05-18'
  anchor: ms_delay-improvements
sidebar:
  hidden: true
---

This has been a much requested feature!

We have increased the `ms_delay` limit to 20 seconds (20,000ms). Usage above 5000ms does cost an additional image credit.
For example, using `ms_delay` of 10000ms on an image will consume 2 image credits.

This is useful for pages with very slow load times, such as metrics dashboards. We hope you find it useful!

[All updates](/changelog/)
