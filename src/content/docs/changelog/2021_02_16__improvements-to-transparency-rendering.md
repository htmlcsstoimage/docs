---
title: "Improvements to transparency rendering"
slug: changelog/2021-02-16-improvements-to-transparency-rendering
description: "Transparent backgrounds are now supported for URL screenshots."
section: Changelog
tableOfContents: false
changelog:
  date: '2021-02-16'
  anchor: improvements-to-transparency-rendering
sidebar:
  hidden: true
---

<a href="/guides/styling/transparent-background/">Background transparency</a> now also works for images generated from URLs. To do it, pass the following code in your CSS param.

```
body {
  background-color: transparent;
}
```

Note: this will only work for PNG's. Jpeg's do not support transparency.

[All updates](/changelog/)
