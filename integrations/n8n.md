---
layout: page
title: n8n integration
nav_title: n8n
permalink: /integrations/n8n/
parent: Integrations
nav_order: 3
description: >-
  Generate images, website screenshots, PDFs, and signed image URLs in n8n with the HTML/CSS to Image API community node.
---
# n8n: HTML/CSS to Image API
{: .no_toc }
{: .fs-9 }

Generate images, website screenshots, PDFs, and signed image URLs in your n8n workflows.
{: .fs-4 .fw-300 }

[View package on npm](https://www.npmjs.com/package/@html-css-to-image/n8n-nodes-html-css-to-image){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com/dashboard){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

{% include hint.md title="Verification pending" text="We've submitted the node to n8n for verification. While that review is in progress, you can install it as a community node on a self-hosted n8n instance. It is not currently available to install on n8n Cloud." %}

<hr>

## Install on self-hosted n8n

An n8n instance owner or admin can install the node from npm:

1. In n8n, go to **Settings → Community Nodes**.
2. Select **Install**.
3. Enter this npm package name:

   ```text
   @html-css-to-image/n8n-nodes-html-css-to-image
   ```

4. Acknowledge the community-node installation warning.
5. Select **Install**.

After installation, add the **HTML/CSS to Image API** node to a workflow.

See [n8n's community-node installation guide](https://docs.n8n.io/integrations/community-nodes/installation/gui-install/) for the latest requirements and installation details.

## Add your credentials

1. Open the HTML/CSS to Image node and create a new **HTML/CSS to Image API** credential.
2. Copy your **API ID** and **API Key** from the [HTML/CSS to Image dashboard](https://htmlcsstoimage.com/dashboard/api-keys).
3. Enter both values and save the credential.

n8n stores the values in its encrypted credential store and tests them against the HTML/CSS to Image ping endpoint.

## Available operations

- **Create From HTML/CSS** — Render HTML and CSS as an image or PDF.
- **Create From URL** — Take a screenshot of a public webpage.
- **Create From Template** — Render a saved template with dynamic values.
- **Generate Signed URL** — Create a signed template or webpage URL that renders on demand.

All input fields support n8n expressions, so content and options can come from earlier workflow steps.

## Choose the output

Image creation operations can return:

- The generated image URL and metadata
- A binary PNG, JPG, WebP, or PDF file
- Both metadata and a binary file

Use binary output when the next node needs a file, such as an email, Slack, S3, or Google Drive node.

## Example workflow

To render HTML produced by an earlier step:

1. Add an **HTML/CSS to Image API** node.
2. Select **Create From HTML/CSS**.
3. Set **HTML** to an expression such as {% raw %}`{{$json.html}}`{% endraw %}.
4. Add CSS and any rendering options you need.
5. Select **URL and Metadata** or a binary output.
6. Execute the workflow.

For saved templates, add each variable under **Template Values**. You can choose the value type for each property or use an expression that resolves to an object.

## Resources

- [npm package](https://www.npmjs.com/package/@html-css-to-image/n8n-nodes-html-css-to-image)
- [Source code and issue tracker](https://github.com/htmlcsstoimage/n8n-node)
- [HTML/CSS to Image API documentation](/getting-started/using-the-api/)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)
