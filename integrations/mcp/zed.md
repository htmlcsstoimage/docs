---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Zed"
nav_title: "Zed"
permalink: /integrations/mcp/zed/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 11
description: >-
  Learn how to connect Zed to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Zed MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Add a remote MCP server in Zed

1. Open **Settings → AI → MCP Servers**.
2. Select **Add Server → Add Remote Server**.
3. Enter `https://mcp.hcti.io` as the URL and name the server `hcti`.
4. Complete the OAuth prompt in your browser.

Alternatively, merge this entry into your Zed settings file, available through **zed: open settings file**:

```json
{
  "context_servers": {
    "hcti": {
      "url": "https://mcp.hcti.io"
    }
  }
}
```

Leave authentication headers unset so Zed can use OAuth. Check for the **Server is active** indicator, then open the Agent Panel and ask **"Use HCTI to check my image usage and account limits"**. This remote connection does not need a local `mcp-remote` process. See [Zed's MCP guide](https://zed.dev/docs/ai/mcp).

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

## How to render HTML/CSS from your editor

Include your HTML and CSS files in the Agent Panel context, then ask:

```text
Read the attached HTML and CSS. Make the markup self-contained, render it as a PNG with HCTI at device_scale 1, and return the image URL.
```

Zed supplies the file content to the assistant, which sends the rendering input to HCTI. A local file path or localhost URL alone is not enough for the hosted renderer.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Check the status indicator in Settings → AI → MCP Servers. If the server is active but tools are missing from the conversation, check the Agent Panel profile and enable the HCTI tools. Mention HCTI explicitly in your prompt.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
