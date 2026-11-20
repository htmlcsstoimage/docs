---
title: "Recordings: HTML and URLs to Video and GIF"
slug: changelog/2026-11-16-recordings
description: "Turn HTML/CSS or any URL into an MP4, WebM, or GIF. Scroll, click, and run JavaScript while recording, then embed the recording URL anywhere."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-16'
  anchor: recordings
sidebar:
  hidden: true
---

You can now **turn HTML/CSS or any URL into a video or GIF**. Send the same HTML or URL you'd use for an image, choose how long to record, and get back a `recording_url` you can embed in your app, website, or email, or request directly.

```json
{
  "url": "https://example.com",
  "duration_ms": 6000,
  "output": { "format": "mp4" },
  "actions": [{ "type": "simple_scroll" }]
}
```

- **MP4, WebM, and GIF output.** Set the format, frame rate, and scale with [`output`](/parameters/output/).
- **Actions.** Scroll, click, pause, and run JavaScript during the recording with optional [`actions`](/parameters/actions/), with easing for smooth movement.
- **Start at the right moment.** Use a [`trigger`](/parameters/trigger/) to wait for an element to appear or for your page to call `window.RecordingReady()`, so loading spinners stay out of the video.
- **Flexible length.** Record for a fixed time, or let [`duration_mode`](/parameters/duration_mode/) fit the video to your actions.
- **Works with what you already use.** Recordings support viewport settings, proxies, cookie banner blocking, storage destinations, and the [`dl`](/parameters/dl/) download parameter.
- **Manage and automate.** List, retrieve, store, and delete recordings with the [Management API](/management-api/recordings/). You can optionally check a recording's status for workflows, and subscribe to `recording_stored`, `recording_failed`, and `recording_deleted` [webhook events](/guides/webhooks/).
- **MCP tools.** Agents can create and manage recordings with the new [recording tools](/integrations/mcp/tools/#recordings).

Recordings are available on any plan with 10,000+ credits/month. A recording uses 2 credits for its first 5 seconds and 1 credit for each additional 5 seconds. See [Credits](/getting-started/recordings/#credits) for how duration modes affect usage, with worked examples.

Get started with the [Recordings overview](/getting-started/recordings/), or follow a guide for [scrolling videos](/guides/recordings/scrolling-video/), [animated HTML](/guides/recordings/animated-html/), or [interactions](/guides/recordings/interactions/).

[All updates](/changelog/)
