---
title: "Management API and scoped permissions"
slug: changelog/2026-09-14-management-api-and-scoped-permissions
description: "Manage organization resources through REST and MCP with scoped permissions."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-09-14'
  anchor: management-api-and-scoped-permissions
sidebar:
  hidden: true
---

Manage API keys, proxies, storage destinations, and Open Graph configurations through the [Management API](/management-api/). Create application-specific credentials with explicit permissions, monitor [usage](/management-api/usage/), and automate resource configuration.

MCP adds proxy, storage destination, and OG configuration management tools. Approve the access you need through [OAuth authorization](/integrations/mcp/permissions/); API key management remains available through REST and the dashboard. See the [complete tools reference](/integrations/mcp/tools/).

Management resource operations have per-organization rate limits shared across REST and MCP: 100 reads and 20 writes per minute for each resource family. These limits are separate from image credits. See [rate limits](/getting-started/using-the-api/rate-limits/).

[All updates](/changelog/)
