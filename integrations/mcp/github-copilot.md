---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with GitHub Copilot"
nav_title: "GitHub Copilot"
permalink: /integrations/mcp/github-copilot/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 5
description: >-
  Learn how to connect GitHub Copilot CLI to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# GitHub Copilot MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

This guide uses **Copilot CLI**. For Copilot Chat in the editor, use the [VS Code guide](/integrations/mcp/vscode/).

## 1. Connect Copilot CLI

With Copilot CLI installed and signed in, add HCTI from your terminal:

```bash
copilot mcp add --transport http hcti https://mcp.hcti.io
```

1. Start `copilot` and run `/mcp auth hcti`.
2. Sign in to HCTI in the browser.
3. Run `/mcp show hcti` to check the connection and available tools.

<details class="mcp-config" markdown="1">
<summary>Set up with a configuration file instead</summary>

Merge this into `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "hcti": {
      "type": "http",
      "url": "https://mcp.hcti.io",
      "tools": ["*"]
    }
  }
}
```

Open Copilot CLI and complete `/mcp auth hcti`. For a shared repository configuration, use `.github/mcp.json` with the same contents. See [GitHub's MCP setup guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).

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

Run `/mcp show hcti` to inspect the server. If it needs authentication, run `/mcp auth hcti` again. Check that HCTI's tools are enabled and approve requested tool calls.

Copilot CLI reads `mcpServers` in its configuration, rather than VS Code's `servers` key. Repository configurations require folder trust, and an organization allowlist may restrict which servers can run. See the [Copilot CLI reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#oauth-re-authentication).

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
