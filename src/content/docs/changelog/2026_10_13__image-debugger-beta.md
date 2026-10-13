---
title: "Image debugger (beta)"
slug: changelog/2026-10-13-image-debugger-beta
description: "Inspect image renders live in the dashboard with event timing, network requests, console logs, errors, and the captured output."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-10-13'
  anchor: image-debugger-beta
sidebar:
  hidden: true
---

The **image debugger is now in beta**. Use it to investigate images that look wrong, render slowly, or fail. A debug render runs an existing image again with its saved settings, bypasses the cached output, and streams diagnostics as the render happens.

![Animated walkthrough of starting and inspecting an image debug render in the dashboard.](/assets/images/image-debugger/debugger-walkthrough.gif)

Open an image's details in the dashboard and click **Debug render**, or select **Debugger [beta]** in the navigation and enter an image ID. Click **Start debug render** to inspect:

- **Events:** render phases, timing, waits, applied settings, and capture steps.
- **Requests:** resource URLs, statuses, initiators, failures, and a network waterfall.
- **Logs:** console output and uncaught JavaScript errors, with source locations and stack traces when available.
- **Image:** the output captured by that debug run.

Finished runs can be revisited for **7 days** through **Recent debug runs**. Debug renders are available on plans that include them; the dashboard shows your organization's remaining allowance.

See [Using the image debugger](/guides/debugging/using-the-image-debugger/) for a walkthrough, screenshots, and a sample HTML report with intentional console messages and errors.

[All updates](/changelog/)
