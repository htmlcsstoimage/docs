---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Cursor"
nav_title: "Cursor"
permalink: /integrations/mcp/cursor/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 4
description: >-
  Learn how to connect Cursor to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Cursor MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Add HCTI to Cursor Agent

Use this button to add the hosted MCP server:

<a href="cursor://anysphere.cursor-deeplink/mcp/install?name=HCTI&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLmhjdGkuaW8ifQ==" class="cursor-install-btn">
  <img src="https://cursor.com/deeplink/mcp-install-dark.png" alt="Add HTML/CSS to Image MCP server to Cursor" height="28" />
</a>

Alternatively, merge this entry into `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` for all projects:

```json
{
  "mcpServers": {
    "hcti": {
      "url": "https://mcp.hcti.io"
    }
  }
}
```

1. Open Cursor's MCP settings and enable the HCTI server.
2. Select **Connect** and authorize your HCTI account in the browser.
3. Start an Agent chat and ask **"Use HCTI to check my image usage and account limits"**.

If **HTML/CSS to Image API** is available in your Cursor Marketplace, installing that plugin is another option and includes workflow guidance. Use either the plugin or the direct MCP configuration to avoid duplicate tools. See [Cursor's MCP guide](https://cursor.com/docs/mcp).

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

## How to export a card from your codebase

Open the project containing your card styles and ask Cursor Agent:

```text
Read the card component and its styles in this project. Make a self-contained HTML/CSS version with the text "New release", render it with HCTI, and return the PNG URL.
```

A source component may need to be converted to HTML/CSS first. Ask Cursor to include the relevant styles and replace local asset paths with accessible URLs.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Check whether the server was added for this project or globally. Enable it in MCP settings, complete authorization, and open an Agent chat. If tools appear twice, keep either the plugin connection or the manual entry.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
