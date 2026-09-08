---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Cline"
nav_title: "Cline"
permalink: /integrations/mcp/cline/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 3
description: >-
  Learn how to connect Cline to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Cline MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect a remote server in Cline

1. Open the **MCP Servers** panel in the Cline extension.
2. Choose **Remote Servers** and enter `hcti` as the server name.
3. Enter `https://mcp.hcti.io` as the URL and select **Streamable HTTP**.
4. Add the server and complete the HCTI authorization prompt in your browser.

To edit the configuration instead, open **Configure → Configure MCP Servers** in that panel and merge this entry under `mcpServers`:

```json
{
  "mcpServers": {
    "hcti": {
      "type": "streamableHttp",
      "url": "https://mcp.hcti.io",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Keep `type` explicit: Cline defaults to legacy SSE when it is omitted. Check that HCTI's tools appear, then ask **"Use HCTI to check my image usage and account limits"** and approve the tool call when prompted. See [Cline's MCP guide](https://docs.cline.bot/mcp/mcp-overview).

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

## How to export a table as an image

Provide the data in your Cline conversation and ask:

```text
Create an HTML/CSS table showing Starter: $9, Pro: $29, and Team: $99 per month. Use readable text and consistent column widths. Render it as a PNG with HCTI and return the image URL.
```

Review the rendered table at the returned URL. Ask Cline to adjust column widths or text sizes and render again if needed.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Confirm the transport is Streamable HTTP, the server is enabled, and browser authorization completed. Restart the server from MCP settings if necessary. Cline may wait for tool-call approval before sending the rendering request.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
