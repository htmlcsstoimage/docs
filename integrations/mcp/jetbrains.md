---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with JetBrains IDEs"
nav_title: "JetBrains IDEs"
permalink: /integrations/mcp/jetbrains/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 7
description: >-
  Learn how to connect JetBrains IDEs to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# JetBrains IDEs MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect HCTI to JetBrains AI Assistant

This guide uses the **JetBrains AI Assistant** plugin in your IDE, such as IntelliJ IDEA, PyCharm, WebStorm, or Rider. Install and activate AI Assistant before adding HCTI. You also need Node.js and `npx` available to the IDE.

Use the [mcp-remote bridge](https://github.com/punkpeye/mcp-remote) to handle HCTI's browser-based OAuth login. The bridge runs locally and forwards tool calls to the hosted HCTI server.

1. Open **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**.
2. Click **Add** and choose the **STDIO** connection option.
3. Paste the following JSON configuration and choose whether to make the server available globally or only in the current project.

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

4. Click **OK**, enable the server, and click **Apply** to start it.
5. Complete HCTI authorization in the browser window opened by the bridge.
6. Check the **Status** column, then ask AI Assistant: **"Use HCTI to check my image usage and account limits."** The usage response confirms the connection.

These settings connect AI Assistant to HCTI. The separate **Tools → MCP Server** settings expose your IDE's own tools to external agents. See [JetBrains' MCP client instructions](https://www.jetbrains.com/help/ai-assistant/mcp.html#connect-to-an-mcp-server).

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

## How to export a report template from your project

Attach the relevant template and styles to AI Assistant, then ask:

```text
Read this report template and its CSS. Fill it with sample data and make
self-contained HTML/CSS. Render it through HCTI with format="pdf"
and return the PDF URL.
```

The assistant needs to resolve server-side template expressions before rendering. Ask it to use accessible image and font URLs instead of local asset paths.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

If the bridge cannot start, check that Node.js and `npx` are available to the IDE. If needed, replace `npx` in the configuration with its absolute executable path. On Windows, use `npx.cmd` if `npx` cannot be launched.

Use the **Reconnect** action in MCP settings after correcting the configuration. For bridge or login errors, open **Help → Show Log in Finder/Explorer** and inspect the `mcp` folder. An organization administrator may control which MCP servers you can add.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
