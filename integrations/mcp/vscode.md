---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with VS Code"
nav_title: "VS Code"
permalink: /integrations/mcp/vscode/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 9
description: >-
  Learn how to connect VS Code to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# VS Code MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

Using Copilot in your terminal? Follow the [GitHub Copilot guide](/integrations/mcp/github-copilot/).

## 1. Connect Copilot

In VS Code, sign in to GitHub Copilot, then:

1. Run **MCP: Add Server** from the Command Palette.
2. Select **HTTP**, enter `https://mcp.hcti.io`, and name it `hcti`.
3. Choose **Workspace** or **Global**, then start the server and accept its trust prompt.
4. Sign in to HCTI in the browser when prompted.
5. Open Copilot Chat in **Agent** mode and enable HCTI in the tool picker.

<details class="mcp-config" markdown="1">
<summary>Set up with mcp.json instead</summary>

Merge this into `.vscode/mcp.json`, then start HCTI using the controls above the entry. Complete browser sign-in and enable its tools in Copilot Chat.

```json
{
  "servers": {
    "hcti": {
      "type": "http",
      "url": "https://mcp.hcti.io"
    }
  }
}
```

For all projects, use **MCP: Open User Configuration**. [VS Code setup reference](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

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

Give Copilot the relevant stylesheet and page title, then ask:

```text
Read the brand colors and typography in this workspace. Create
self-contained HTML/CSS for a 1200×630 Open Graph card titled
"New release". Render it with HCTI at device_scale 1 and return the PNG URL.
```

Open the result to check the title, spacing, and brand colors. Ask Copilot to update the HTML/CSS and render again for changes. HCTI needs the rendered markup and accessible assets, so source component files may need to be converted first.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

Run **MCP: List Servers** and inspect HCTI's status and output. Check that the workspace configuration uses `servers`, that the URL includes `https://`, and that OAuth authorization completed.

In Copilot Chat, use Agent mode and enable HCTI in the tool picker. Check the selected workspace or user profile if the server appears elsewhere but not in this session. Organization policy can restrict MCP access.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
