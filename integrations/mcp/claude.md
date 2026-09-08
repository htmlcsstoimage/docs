---
layout: page
content_class: mcp-client-guide
title: "How to take screenshots and render HTML/CSS with Claude & Claude Code"
nav_title: "Claude & Claude Code"
permalink: /integrations/mcp/claude/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 2
description: >-
  Learn how to connect Claude & Claude Code to HTML/CSS to Image, take website screenshots, and render HTML/CSS as PNG or PDF with copyable prompts.
---
# Claude & Claude Code MCP Integration
{: .no_toc }

Capture a webpage or turn HTML/CSS into a PNG, WebP, or PDF with HTML/CSS to Image.
{: .mcp-lead }

**You'll need:** an [HCTI account](https://htmlcsstoimage.com) with image credits. Sign in through your browser when connecting—no API key to copy.

## 1. Connect Claude or Claude Code to HCTI

### Claude web or desktop

HTML/CSS to Image is available in the **Claude Connectors Directory**.

1. Open **Customize → Connectors**, click **+**, and choose **Browse connectors**.
2. Search for **HTML/CSS to Image** and open its listing.
3. Select **Connect** and sign in to your HCTI account.
4. Enable the connector in your conversation and ask Claude to use HCTI.

<details class="mcp-config" markdown="1">
<summary>Connect manually instead</summary>

In **Customize → Connectors**, choose **Add custom connector** and enter `https://mcp.hcti.io`. Add it, then select **Connect** to authorize your account.

Custom connector availability depends on your plan. For Team and Enterprise accounts, an owner may need to configure access. See [Claude's remote connector instructions](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

</details>

### How to set up Claude Code

Add the remote server from your terminal:

```bash
claude mcp add --transport http hcti https://mcp.hcti.io
claude mcp list
```

Open Claude Code, run `/mcp`, select `hcti`, and complete browser authentication. This adds the server for the current project context. See [Claude Code's MCP guide](https://code.claude.com/docs/en/mcp) for user-wide and shared project scopes.

If **HTML/CSS to Image** is available in your Claude Code plugin marketplace, you can install that package instead; it includes HCTI workflow guidance. Connect its server through `/mcp`. Use the direct command above if the listing is not available, and avoid adding the same server twice.

In either client, ask **"Use HCTI to check my image usage and account limits"**. The usage response confirms that Claude can reach your account.

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

## How to turn a report into a PDF

Paste your report into Claude, then ask:

```text
Format this report as HTML/CSS with headings and a table. Use HCTI with format="pdf" to render it and return the PDF URL. Report: January revenue $12,000; February $14,500; March $16,200.
```

In Claude Code, you can instead point to a report file in the current project and ask Claude to read it before rendering.

{% include mcp_tools.md %}

## Troubleshooting

### Missing tools or connection errors

In Claude web/desktop, check that the connector is connected and available in the current conversation. In Claude Code, inspect `/mcp` and authenticate `hcti`. If a shared workspace does not allow adding connectors, its owner needs to configure access.

### Rendering errors

HCTI fetches webpages from its hosted service. Use a publicly accessible URL; it cannot reach your computer's `localhost`. For HTML/CSS rendering, supply the file contents and accessible assets rather than local file paths. Check your [HCTI dashboard](https://htmlcsstoimage.com/dashboard) for available image credits.

See [shared MCP troubleshooting](/integrations/mcp/#troubleshooting) for authentication and rendering errors, or [choose another client](/integrations/mcp/#choose-your-client).

{% include code_footer.md version=1 %}
