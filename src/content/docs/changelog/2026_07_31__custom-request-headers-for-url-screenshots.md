---
title: "Custom request headers for URL screenshots"
slug: changelog/2026-07-31-custom-request-headers-for-url-screenshots
description: "Send custom headers when capturing authenticated pages and preview environments."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-07-31'
  anchor: custom-request-headers-for-url-screenshots
sidebar:
  hidden: true
---

URL screenshots can now include custom HTTP headers for authenticated pages, preview environments, origin-specific behavior, and other controlled workflows.

- Pass `headers` as a flat JSON object, or repeat `headers=name:value` in form and create-and-render requests.
- Custom headers are restricted to top-level navigations on the requested URL's origin by default.
- Set `include_headers_on_subrequests: true` when same-origin CSS, images, JavaScript, or API requests also require the headers.
- Use `additional_header_origins` to explicitly allow exact cross-origin schemes, hosts, and ports. Headers are never sent to origins outside this allowlist.
- Set `identify_as_hcti: true` to add `X-HCTI-SCREENSHOT: 1` when your application only needs to identify a screenshot request. This predictable value should not be used for authentication.
- Use the new options with the official .NET client v0.10.0 and TypeScript client v0.7.0, including signed create-and-render URLs.

Avoid long-lived credentials and do not put secrets in signed URLs. [Read the custom headers documentation](/parameters/headers/) or see how to [allow authorized renders through Cloudflare](/guides/debugging/cloudflare-challenges/).

[All updates](/changelog/)
