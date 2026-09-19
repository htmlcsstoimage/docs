---
title: "Route renders through your own HTTP proxy"
slug: changelog/2026-04-18-route-renders-through-your-own-http-proxy
description: "Configure your own HTTP proxies and select them for image rendering."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-04-18'
  anchor: route-renders-through-your-own-http-proxy
sidebar:
  hidden: true
---

You can now configure HTTP proxies in the dashboard and route image renders through them. All outbound traffic for a render will go through the proxy you select. This is useful for restricting access to internal content, controlling the egress IP, or getting past bot detection.

- **Configure proxies** at [https://htmlcsstoimage.com/dashboard/proxies](https://htmlcsstoimage.com/dashboard/proxies). Set a URL, port, optional auth, and optional **Bypass Hosts** (hostnames that should skip the proxy).
- **Use a proxy** by passing `proxy_id` on the create image request.
- **Disable safely** — turning a proxy off does not affect images that have already been generated. Only new renders that try to use that `proxy_id` will be rejected.

Available on the **10,000 images/month plan or higher**. [Read the full guide](/guides/advanced/proxies/).

[All updates](/changelog/)
