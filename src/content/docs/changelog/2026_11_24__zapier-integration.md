---
title: "Zapier 1.1.0: New actions and updated fields"
slug: changelog/2026-11-24-zapier-integration
description: "New capture fields give you control over website screenshots and PDF layout. Record HTML or webpages as video or GIF, render saved templates, and generate signed URLs in your Zaps."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-24'
  anchor: zapier-integration-1-1-0
sidebar:
  hidden: true
---

We’ve modernized our Zapier integration with new fields for **Convert HTML to Image** and **Capture a Website Screenshot**. You can now block cookie banners on webpages, set page sizes and margins for PDFs, and pass the finished file to the next step as an email attachment or upload.

Version **1.1.0** also introduces these actions.

- **Create Recording From HTML** and **Create Recording From URL** turn a CSS animation or a webpage walkthrough into an MP4, WebM, or GIF. Add clicks, waits, and scrolls to the timeline, then share the media URL or send the recording as a file. [Record a webpage as a GIF](/integrations/zapier/#record-a-webpage-as-a-gif)
- **Fetch Recording Status** checks whether a recording is ready and returns any rendering error.
- **Create Image From Template** fills a saved HCTI template with data from earlier steps, such as a product name and price from a spreadsheet row.
- **Generate Signed Template URL** and **Generate Signed Webpage URL** give you a link that renders the template or captures the webpage when someone opens it.
- **Permanently Delete Image** and **Permanently Delete Recording** let you remove a specific image or recording by ID.

Existing Zaps using the original image actions keep their connections and field mappings. Read the [integration guide](/integrations/zapier/) or try the new actions in [HTML/CSS to Image on Zapier](https://zapier.com/apps/htmlcss-to-image/integrations).

[All updates](/changelog/)
