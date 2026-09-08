---
layout: page
title: "HTML-to-Image, PDF & Screenshot MCP"
nav_title: MCP Server
permalink: /integrations/mcp/
parent: Integrations
has_children: true
nav_order: 4
description: >-
  Take website screenshots and render HTML/CSS as images or PDFs with Claude, ChatGPT, Cursor, and other AI tools through MCP.
---
# MCP Integration
{: .no_toc }

Take website screenshots and render HTML/CSS as images or PDFs directly from your AI assistant.
{: .fs-4 .fw-300 }

## Introduction

No matter which AI tool or agent you use, you can connect it to HTML/CSS to Image through MCP. Give any compatible assistant a public URL or HTML/CSS, and ask it to take a screenshot, render a PDF, or create images from your saved templates.

- **Start for free.** A free [HCTI account](https://htmlcsstoimage.com) works with any integration. Creating images uses your organization's available image credits just like the API.
- **Sign in securely.** Authorize your account through OAuth in your browser, without copying API keys into your assistant.
- **No browser infrastructure to manage.** HCTI handles rendering and returns a hosted URL you can open, download, or share.

## Choose your client

Choose your assistant for setup instructions and copyable examples.

| Client | How to connect |
|:-------|:---------------|
| <span id="setup-for-chatgpt-codex"></span>[ChatGPT & Codex](/integrations/mcp/chatgpt-codex/) | Install the official plugin; use it in a conversation or a coding task. |
| <span id="setup-for-claude-code"></span><span id="setup-for-claude-desktop"></span>[Claude & Claude Code](/integrations/mcp/claude/) | Install from the Claude Connectors Directory, or connect Claude Code. |
| <span id="setup-for-cline-vs-code"></span>[Cline](/integrations/mcp/cline/) | Connect a Streamable HTTP server from the Cline extension. |
| <span id="setup-for-cursor"></span>[Cursor](/integrations/mcp/cursor/) | Add HCTI to Cursor Agent with the install button or MCP configuration. |
| [GitHub Copilot](/integrations/mcp/github-copilot/) | Connect Copilot CLI from your terminal. |
| <span id="setup-for-grok"></span>[Grok](/integrations/mcp/grok/) | Use the HCTI plugin or a direct MCP connection in Grok Build. |
| [JetBrains IDEs](/integrations/mcp/jetbrains/) | Connect AI Assistant through an OAuth-capable MCP bridge. |
| <span id="setup-for-opencode"></span>[OpenCode](/integrations/mcp/opencode/) | Configure a remote MCP server and authorize it from the CLI. |
| [VS Code](/integrations/mcp/vscode/) | Add a remote HTTP server and use its tools in Copilot Agent mode. |
| <span id="setup-for-windsurf"></span>[Windsurf](/integrations/mcp/windsurf/) | Connect HCTI to Cascade for screenshots and rendering. |
| <span id="setup-for-zed"></span>[Zed](/integrations/mcp/zed/) | Add a remote MCP server to the Agent Panel. |

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io/) lets assistants call external tools. HCTI's hosted MCP server renders the HTML/CSS or public URL supplied by your assistant and returns the result. You do not need to run a rendering browser yourself.

**MCP server URL:** `https://mcp.hcti.io`

**Transport:** Streamable HTTP

**Authentication:** OAuth

Our [agent plugin](https://github.com/htmlcsstoimage/agent-plugins) also packages workflow guidance for using HCTI. Where a client supports that plugin, installing it provides both the connection and instructions for the assistant. A direct MCP connection gives access to the tools below.

{% include mcp_tools.md %}

## Authentication

After adding HCTI, use your client's connect or login action and complete authorization in your browser. Sign in to the HCTI account whose templates and credits you want to use, then return to the assistant. Some clients prompt automatically on first use; the individual guides show how to connect explicitly.

To check the connection without rendering an image, ask: **"Use HCTI to check my image usage and account limits."** The `check_usage` tool returns usage and limits without rendering an image. Rendering requests use your HCTI account's image allowance; your assistant subscription is separate.

## Example prompts

### How to take a website screenshot

```text
Use HTML/CSS to Image to screenshot https://example.com as a PNG.
Set viewport_width to 1440 and device_scale to 1. Return the image URL.
```

Open the returned URL to inspect the capture. To capture just part of your own site, provide a CSS selector such as `.pricing-grid` that actually exists on that page. HCTI must be able to reach the URL from its hosted service; `localhost` is not reachable.

### How to render HTML and CSS as a PNG

```text
Use HCTI to render this HTML and CSS as a PNG with device_scale set to 1.
HTML: <div class="card">Hello from HCTI</div>
CSS: .card { width: 1200px; height: 630px; display: flex;
align-items: center; justify-content: center; background: #172554;
color: white; font: 64px sans-serif; }
Return the hosted image URL.
```

The result should show white text centered on a dark blue card. The assistant sends HTML/CSS to HCTI for rendering. When working from a repository, ask it to read the relevant files and supply self-contained markup and styles; local asset paths need to be replaced with accessible assets.

### How to export a PDF

```text
Format the following report as HTML and CSS, then render it with HCTI
using format="pdf". Use clear headings and a readable table.
Report: January revenue $12,000; February revenue $14,500; March revenue $16,200.
Return the PDF URL.
```

### How to reuse a template and create variations

```text
Use HCTI to list my saved templates. Find the social-card template and
inspect its variables before rendering it with the headline "New release".
```

```text
Use HCTI to check my maximum batch size. Create five variations of the
HTML/CSS card we just rendered, with a different accent color in each.
Return a labeled list of image URLs.
```

Use the [Template Editor](/template-editor/) to design a template and define the values your assistant should pass as `template_values`.

## Image parameters

When creating images, the main parameters are:

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **html** | `String` | The HTML content to render. Required for `create_image`. |
| **css** | `String` | CSS styles for your HTML. |
| **url** | `String` | The URL to screenshot. Required for `create_url_image`. |

### Additional parameters

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
- Check that your account has available image credits on the [dashboard](https://htmlcsstoimage.com/dashboard)
- Ensure HTML content is valid
- For URL screenshots, verify the URL is publicly accessible

## Automation Platforms

You can also use the MCP server with automation platforms:

### Zapier

Zapier has a dedicated MCP Client that connects to MCP servers. This lets you use the HTML/CSS to Image MCP server within Zapier workflows without writing code.

[Zapier MCP Client Integration](https://zapier.com/apps/mcp-client-by-zapier/integrations){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

### Pipedream

Pipedream supports MCP servers for building serverless workflows. Connect the HTML/CSS to Image MCP server to automate image generation in your Pipedream workflows.

[Pipedream MCP Integration](https://mcp.pipedream.com/app/html_css_to_image){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

The MCP server is also listed on [Smithery](https://smithery.ai/servers/htmlcsstoimage/hcti).


{% include code_footer.md version=1 %}
