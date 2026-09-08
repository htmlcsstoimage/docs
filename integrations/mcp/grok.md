---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Grok"
nav_title: "Grok"
permalink: /integrations/mcp/grok/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 6
description: >-
  Learn how to connect Grok to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Grok MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect HCTI in Grok Build

This guide uses **Grok Build**, the coding agent with MCP and plugin support.

### Install through the plugin marketplace

Open `/plugins` in Grok Build and browse the **Marketplace** tab for **HTML/CSS to Image**. If the plugin is available in your configured marketplace, install it, then open `/mcps` to enable its HCTI server and authenticate. The [HCTI plugin](https://github.com/htmlcsstoimage/agent-plugins) includes rendering and template workflow guidance.

### Add the MCP server directly

If the plugin is not listed, connect the same hosted tools from your terminal:

```bash
grok mcp add --transport http hcti https://mcp.hcti.io
grok mcp list
```

Open `/mcps` in Grok Build, select `hcti`, and press `i` to authenticate. Complete OAuth in the browser, then ask **"Use HCTI to check my image usage and account limits"**. Tools are namespaced, so `create_url_image` may appear as `hcti__create_url_image`.

Use one connection method to avoid duplicate tools. See the [Grok Build MCP guide](https://docs.x.ai/build/features/mcp-servers) and [plugin guide](https://docs.x.ai/build/features/skills-plugins-marketplaces).

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

## How to capture a pricing table

Give Grok Build a public pricing URL and the selector for its table:

```text
Use HCTI to screenshot https://example.com/pricing with selector=".pricing-grid" and device_scale=2. Return the image URL.
```

Replace the example URL and selector with a real page and matching element. Grok can inspect your project markup to help identify the selector; the deployed page must be reachable by HCTI.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Run `grok mcp doctor hcti` to diagnose the direct connection. In `/mcps`, refresh with `r`, enable the server, and authenticate with `i`. Use `grok inspect` to identify configurations inherited from another client if duplicate tools appear.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
