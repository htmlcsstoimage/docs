---
title: "Feedback API and MCP tool"
slug: changelog/2026-10-06-feedback-api-and-mcp-tool
description: "Send bug reports, feature requests, and suggestions directly to the HCTI team through REST or MCP."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-10-06'
  anchor: feedback-api-and-mcp-tool
sidebar:
  hidden: true
---

You can now report bugs, request features, and suggest improvements with `POST /v1/feedback` or the `submit_feedback` MCP tool. Send a `message`, add a `subject` if needed, and get a confirmation with a feedback ID.

The API accepts anonymous submissions and reports linked to your organization through an API key. The MCP tool is available to every authenticated connection.

See the [feedback guide](/guides/debugging/feedback/) for examples, callbacks, and submission limits, or the [MCP tools reference](/integrations/mcp/tools/#feedback) for tool arguments.

[All updates](/changelog/)
