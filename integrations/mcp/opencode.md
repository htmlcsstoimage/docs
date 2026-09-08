---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with OpenCode"
nav_title: "OpenCode"
permalink: /integrations/mcp/opencode/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 8
description: >-
  Learn how to connect OpenCode to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# OpenCode MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Add the remote MCP server to OpenCode

Merge this entry into your project's `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "hcti": {
      "type": "remote",
      "url": "https://mcp.hcti.io",
      "enabled": true
    }
  }
}
```

Authenticate and check the server from that project directory:

```bash
opencode mcp auth hcti
opencode mcp list
```

Complete authorization in your browser, then open OpenCode and ask **"Use HCTI to check my image usage and account limits"**. OpenCode also prompts for OAuth when a remote server needs authentication on first use. See [OpenCode's MCP documentation](https://opencode.ai/docs/mcp-servers/).

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

## How to reuse a saved template

After connecting HCTI, ask OpenCode:

```text
Use HCTI to list my templates. Find the social-card template, check its variables, and render it with the headline "Shipping today". Return the image URL.
```

Replace social-card with a template in your account. If you do not have one yet, ask OpenCode to save the HTML/CSS card from the previous step as a reusable template.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Run `opencode mcp list` from the project directory and confirm `hcti` is enabled. Use `opencode mcp auth hcti` to authenticate. Check that your agent configuration has not disabled HCTI tools.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
