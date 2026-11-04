---
title: "MCP Updates"
slug: changelog/2026-11-03-mcp-updates
description: "More OAuth client authentication options, embedded image files, and a higher size limit for MCP image responses."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-03'
  anchor: mcp-updates
sidebar:
  hidden: true
---

HCTI's MCP server now supports more ways for clients to authenticate and receive rendered images.

- **More OAuth client authentication options.** Clients using Dynamic Client Registration (DCR) can now register with `client_secret_post` or `client_secret_basic`. These let the client authenticate at the token endpoint by sending its client ID and secret in the request body or the HTTP Basic Authorization header, respectively, improving compatibility with MCP clients.
- **Attach the rendered file.** Ask your agents to set `include_file: true` when creating an image to attach the output as an MCP embedded resource. This is useful for clients that restrict external image links or cannot display inline image content. The option defaults to `false` and also supports PDF output.
- **Larger image responses.** The byte limit for both `include_file` and `include_image_data` has increased from **4 MiB to 10 MiB**, allowing larger files and inline previews to be returned directly through MCP.

See the [MCP tools reference](/integrations/mcp/tools/#screenshots-and-rendering) for image response options and [MCP authentication](/integrations/mcp/#authentication) for connection details.

[All updates](/changelog/)
