---
title: "Your recordings can now include audio"
slug: changelog/2026-11-25-recording-audio
description: "Add an audio track to an MP4 or WebM recording using a file from your Asset Library or a public URL."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-25'
  anchor: recording-audio
sidebar:
  hidden: true
---

Use the new `audio` parameter to add a track when you record HTML/CSS or a webpage as MP4 or WebM. You can loop background music through an animation, time a sound effect to a reveal, or narrate a product walkthrough.

Pass `audio.asset_id` to reuse a file from your Asset Library, including a private upload, or `audio.url` for a track you already host. You can choose where playback starts in the file and whether the video continues or ends when the track finishes.

The latest versions of all six [official SDKs](/example-code/#start-with-a-client-library) support recording audio in TypeScript, .NET, Python, PHP, Go, and Ruby.

[Add a soundtrack to a recording](/getting-started/recordings/#add-a-soundtrack) or [explore the audio settings](/parameters/audio/).

[All updates](/changelog/)
