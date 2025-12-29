---
layout: page
title: MCP Server
permalink: /integrations/mcp/
parent: Integrations
nav_order: 4
description: >-
  Use the HTML/CSS to Image MCP server to generate images directly from AI assistants like Cursor, Claude, Windsurf, Cline, Zed, and OpenCode.
---
# MCP Server Integration
{: .no_toc }
{: .fs-9 }

Generate images with AI assistants using the Model Context Protocol.
{: .fs-4 .fw-300 }

[Get an API Key](https://htmlcsstoimage.com){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
<hr>

Table of contents
{: .text-delta }
- TOC
{:toc}

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that allows AI assistants to connect to external tools and services. With our MCP server, you can generate images directly from your AI coding assistant without writing any code.

Simply describe what you want, and the AI will use the HTML/CSS to Image API to create it for you.

**MCP Server URL:** `mcp.hcti.io`

## Available Tools

The MCP server provides the following tools:

### Image Creation

| Tool | Description |
|:-----|:------------|
| **create_image** | Generate an image from HTML and CSS. Supports all standard parameters like `device_scale`, `viewport_width`, `viewport_height`, `ms_delay`, and more. |
| **create_url_image** | Take a screenshot of any public URL. Includes options for selectors, viewport settings, and cookie banner blocking. |
| **create_templated_image** | Generate an image using a saved template. Pass `template_id` and `template_values` to substitute variables in your template. |
| **create_batch_images** | Create up to 25 images in a single request. Set `default_options` and provide `variations` for each image. |
| **get_max_batch_size** | Check the maximum number of images you can create in a single batch based on your plan. |

### Template Management

| Tool | Description |
|:-----|:------------|
| **create_template** | Save a reusable HTML/CSS template for generating images with variable substitution. |
| **update_template** | Modify an existing template by providing the `template_id` and new content. |
| **list_templates** | View all saved templates in your account. Returns up to 100 templates per request. |
| **list_template_versions** | View the version history of a specific template. |

## Authentication

The MCP server uses OAuth for authentication. When you first connect, your browser will open automatically to authorize access to your HTML/CSS to Image account. No manual credential configuration is required.

## Setup for Cursor

To use the HTML/CSS to Image MCP server in Cursor, add the following configuration to your `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "hcti": {
      "type": "http",
      "url": "https://mcp.hcti.io"
    }
  }
}
```

Restart Cursor after saving the configuration. The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for Claude Code

To use the MCP server with Claude Code, run the following command:

```bash
claude mcp add hcti --transport http https://mcp.hcti.io
```

To verify the server was added:

```bash
claude mcp list
```

The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for Claude Desktop

Claude Desktop (the standalone app) also supports MCP servers. Edit your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "hcti": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.hcti.io"]
    }
  }
}
```

Restart Claude Desktop after saving the configuration. The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for Windsurf

[Windsurf](https://codeium.com/windsurf) (by Codeium) supports MCP servers. Add the following to your `~/.codeium/windsurf/mcp_config.json` file:

```json
{
  "mcpServers": {
    "hcti": {
      "serverUrl": "https://mcp.hcti.io"
    }
  }
}
```

Restart Windsurf after updating the configuration. The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for Cline (VS Code)

[Cline](https://github.com/cline/cline) is a popular autonomous coding agent for VS Code. To add the MCP server:

1. Open VS Code and go to **Cline Settings**
2. Navigate to **MCP Servers**
3. Click **Add Server** and configure:

```json
{
  "hcti": {
    "url": "https://mcp.hcti.io"
  }
}
```

Alternatively, edit your Cline MCP settings file directly at `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`.

The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for Zed

[Zed](https://zed.dev) is a high-performance code editor with AI features. Add the MCP server to your Zed settings (`~/.config/zed/settings.json`):

```json
{
  "context_servers": {
    "hcti": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.hcti.io"]
    }
  }
}
```

The first time you use the server, you'll be prompted to authorize access via your browser.

## Setup for OpenCode

[OpenCode](https://opencode.ai) is an open-source AI coding assistant. Add the MCP server to your `opencode.json` configuration file:

```json
{
  "mcp": {
    "hcti": {
      "type": "remote",
      "url": "https://mcp.hcti.io",
      "enabled": true
    }
  }
}
```

Alternatively, add it via the command line:

```bash
opencode mcp add
```

The first time you use the server, you'll be prompted to authorize access via your browser.

## Automation Platforms

You can also use the MCP server with automation platforms:

### Zapier

Zapier has a dedicated MCP Client that connects to MCP servers. This lets you use the HTML/CSS to Image MCP server within Zapier workflows without writing code.

[Zapier MCP Client Integration](https://zapier.com/apps/mcp-client-by-zapier/integrations){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

### Pipedream

Pipedream supports MCP servers for building serverless workflows. Connect the HTML/CSS to Image MCP server to automate image generation in your Pipedream workflows.

[Pipedream MCP Integration](https://mcp.pipedream.com/app/html_css_to_image){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

## Example Prompts

Once configured, you can ask your AI assistant to generate images naturally. Here are some examples:

### Create an Image from HTML

> "Create an image of a blue button that says 'Subscribe Now' with rounded corners and a subtle shadow"

The AI will generate the HTML/CSS and use the `create_image` tool to render it.

### Screenshot a Website

> "Take a screenshot of https://stripe.com with device_scale set to 2 for high resolution"

### Screenshot a Specific Element

> "Screenshot the pricing table on https://example.com/pricing using the selector '.pricing-grid'"

### Generate Social Media Images

> "Create a Twitter/X card image with a gradient background, the title 'Launching Soon', and our logo"

### Batch Create Images

> "Create 10 variations of a product card image, each with a different background color"

### Work with Templates

> "List my saved templates"

> "Create an image using my 'social-card' template with the title set to 'New Feature Release'"

> "Save this HTML/CSS as a template called 'blog-header' so I can reuse it"

## Image Parameters

When creating images, the main parameters are:

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **html** | `String` | The HTML content to render. Required for `create_image`. |
| **css** | `String` | CSS styles for your HTML. |
| **url** | `String` | The URL to screenshot. Required for `create_url_image`. |

### Additional Parameters

{% include additional_parameters.md %}

## Troubleshooting

### Authentication Errors

If you receive authentication errors:
- Try disconnecting and reconnecting the MCP server to trigger a new OAuth flow
- Ensure you're logged into the correct HTML/CSS to Image account in your browser
- Check that pop-ups are not blocked when the OAuth window tries to open

### Connection Issues

If the MCP server is not connecting:
- Ensure your network allows outbound HTTPS connections
- Check that the URL is exactly `https://mcp.hcti.io`
- Restart your AI assistant after updating the configuration

### Image Generation Errors

If images fail to generate:
- Check your account has available renders on the [dashboard](https://htmlcsstoimage.com/dashboard)
- Ensure HTML content is valid
- For URL screenshots, verify the URL is publicly accessible

## Need Help?

We're happy to help you get started with the MCP server. Send us an email: **support@htmlcsstoimage.com**

{% include code_footer.md version=1 %}

