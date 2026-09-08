---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with ChatGPT & Codex"
nav_title: "ChatGPT & Codex"
permalink: /integrations/mcp/chatgpt-codex/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 1
description: >-
  Learn how to connect ChatGPT & Codex to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# ChatGPT & Codex MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect ChatGPT or Codex to HCTI

### How to set up ChatGPT

1. Open the official [HTML/CSS to Image plugin](https://chatgpt.com/plugins/plugin_asdk_app_6a4d168031448191abcd6540497efb7b), or find **HTML/CSS to Image** in the Plugins Directory.
2. Install it and connect your HCTI account when prompted.
3. Complete browser authorization, then start a new conversation and ask ChatGPT to use HTML/CSS to Image.

### How to set up Codex

Install the same plugin from the Plugins Directory in the app. In Codex CLI, open `/plugins` to browse available plugins. Connect HCTI and start a new task after installation.

For a direct MCP connection in Codex CLI, run:

```bash
codex mcp add hcti --url https://mcp.hcti.io
codex mcp login hcti
codex mcp list
```

Complete OAuth in your browser. Use one installation method to avoid duplicate HCTI connections. The IDE extension uses MCP configuration rather than plugin installation. See the [OpenAI plugin guide](https://learn.chatgpt.com/docs/plugins) and [Codex MCP guide](https://developers.openai.com/codex/mcp) for supported surfaces and configuration.

In either product, ask **"Use HCTI to check my image usage and account limits"** to check the connection. The response shows your image usage and account limits.

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

## How to create an Open Graph card from your project

In Codex, open the repository containing your site and ask:

```text
Read the brand colors and typography in this project. Create self-contained HTML/CSS for a 1200×630 Open Graph card titled "New release". Render it with HCTI at device_scale 1 and return the image URL.
```

In ChatGPT, provide the brand colors, fonts, and title in the conversation instead of referring to local files.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

If the plugin is installed but its tools are missing, check that its HCTI connection is authorized and start a new conversation or task. For the CLI connection, check `codex mcp list` and rerun `codex mcp login hcti` if authentication is needed.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
