---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Windsurf"
nav_title: "Windsurf"
permalink: /integrations/mcp/windsurf/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 10
description: >-
  Learn how to connect Windsurf to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Windsurf MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect HCTI to Cascade

Merge this entry into `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "hcti": {
      "serverUrl": "https://mcp.hcti.io"
    }
  }
}
```

1. Save the configuration and refresh the servers in Cascade's MCP settings.
2. Enable HCTI and use its authentication action to authorize your account in the browser.
3. Open a Cascade conversation and ask **"Use HCTI to check my image usage and account limits"**.

You can access the configuration through the client's MCP settings. The [Cascade MCP documentation](https://docs.windsurf.com/windsurf/cascade/mcp) describes remote HTTP servers and team controls; its documentation now lives under Devin Desktop.

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

## How to create card variations with Cascade

After rendering a card, ask Cascade:

```text
Use HCTI to check my maximum batch size. Render five versions of this HTML/CSS card with different accent colors. Keep the text and layout identical and return a labeled list of image URLs.
```

Checking the account limit first lets Cascade choose a supported batch size. Shared layout options can stay in default_options while individual colors vary.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Refresh the MCP servers after editing the configuration, and confirm HCTI tools are enabled in Cascade. If a team allowlist is configured, it must permit the `hcti` server. Reconnect the account if authorization has expired.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
