---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Gemini CLI"
nav_title: "Gemini CLI"
permalink: /integrations/mcp/gemini/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 6
description: >-
  Learn how to connect Gemini CLI to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Gemini CLI MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

This guide uses **Gemini CLI**, Google's terminal-based agent. Install and sign in to [Gemini CLI](https://geminicli.com/docs/) before connecting HCTI.

## 1. Connect Gemini CLI

Add HCTI for the current project from your terminal:

```bash
gemini mcp add --transport http hcti https://mcp.hcti.io
```

1. Start `gemini` and run `/mcp auth hcti`.
2. Sign in to HCTI and review the organization and permissions. Include `usage:read` to check your account usage.
3. Run `/mcp list` to check the connection.

Ask **"Use HCTI to check my image usage and account limits"** to verify access without rendering an image.

<details class="mcp-config" markdown="1">
<summary>Set up with settings.json instead</summary>

Merge this into `.gemini/settings.json` in your project, or `~/.gemini/settings.json` for all projects:

```json
{
  "mcpServers": {
    "hcti": {
      "httpUrl": "https://mcp.hcti.io"
    }
  }
}
```

Use `httpUrl` for Streamable HTTP; Gemini CLI's `url` field selects the legacy SSE transport. Restart Gemini CLI after editing settings, then run `/mcp auth hcti`.

To configure all projects from the terminal, add `--scope user` to the `gemini mcp add` command. See [Gemini CLI's MCP guide](https://geminicli.com/docs/tools/mcp-server/).

</details>

## 2. Take a screenshot

Send this prompt after connecting:

```text
Use HTML/CSS to Image to screenshot https://example.com as a PNG.
Set viewport_width to 1440 and device_scale to 1. Return the image URL.
```

Open the returned image URL to view your screenshot. Replace `https://example.com` with your own public URL.

## 3. Render HTML/CSS

Try a small card with explicit text, colors, and dimensions:

```text
Use HCTI to render this HTML and CSS as a PNG at device_scale 1.
HTML: <div class="card">Hello from HCTI</div>
CSS: .card { width: 1200px; height: 630px; display: flex;
align-items: center; justify-content: center; background: #172554;
color: white; font: 64px sans-serif; }
Return the hosted image URL.
```

The result is a dark blue card with centered white text. Edit the text or CSS and render again to refine it.

## Create an Open Graph card

Give Gemini the relevant stylesheet and page title, then ask:

```text
Read the brand colors and typography in this workspace. Create
self-contained HTML/CSS for a 1200×630 Open Graph card titled
"New release". Render it with HCTI at device_scale 1 and return the PNG URL.
```

Open the result to check the title, spacing, and brand colors. Ask Gemini to update the HTML/CSS and render again for changes. HCTI needs the rendered markup and accessible assets, so source component files may need to be converted first.

{% include mcp_tools.md %}

## Troubleshooting

For a permission-denied error, [reconnect and approve the required access](/integrations/mcp/permissions/#add-permissions-to-an-existing-connection) before retrying. Usage checks and maximum batch-size checks require `usage:read`.

### Missing tools or connection errors

Run `/mcp list` inside Gemini CLI or `gemini mcp list` from your terminal to inspect connection errors. Run `/mcp auth hcti` to sign in again if needed.

Check that the server uses `httpUrl` in settings and that HCTI is enabled. If you configured `includeTools` or `excludeTools`, make sure they allow the tool you want to use. Approve tool calls when Gemini prompts you.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
