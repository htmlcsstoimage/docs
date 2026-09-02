---
layout: page
title: n8n integration
nav_title: n8n
permalink: /integrations/n8n/
parent: Integrations
nav_order: 3
description: >-
  Generate images, website screenshots, PDFs, and signed image URLs in n8n with the verified HTML/CSS to Image API node.
---
# n8n: HTML/CSS to Image API
{: .no_toc }
{: .fs-9 }

Generate images, website screenshots, PDFs, and signed image URLs in your n8n workflows.
{: .fs-4 .fw-300 }

[Install in n8n](https://n8n.io/integrations/htmlcss-to-image-api/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[View package on npm](https://www.npmjs.com/package/@html-css-to-image/n8n-nodes-html-css-to-image){: .btn .fs-5 .mb-4 .mb-md-0 .mr-2 target="_blank" }
[Get an API Key](https://htmlcsstoimage.com/dashboard){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" }

{% include hint.md title="Verified by n8n" text="The HTML/CSS to Image integration is verified by n8n and available for both n8n Cloud and self-hosted instances." %}

<hr>

## Install the integration

An n8n instance owner or admin can install the verified node for everyone on the instance:

1. Open a workflow in n8n and select **+** to open the Nodes panel.
2. Search for **HTML/CSS to Image API**.
3. Select the node under **More from the community**.
4. Select **Install**.
5. Add the node to your workflow.

See [n8n's verified community-node installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/install-verified-community-nodes) for instance settings and the latest installation details.

### Manual installation on self-hosted n8n

Most users should install the verified node from the Nodes panel. If you manage community packages manually—for example, on an n8n instance running in queue mode—you can install the package from npm instead:

```shell
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
npm install @html-css-to-image/n8n-nodes-html-css-to-image
```

Restart n8n after installation. This method is only for self-hosted instances; it isn't needed or available on n8n Cloud.

See [n8n's manual community-node installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/manual-installation) for Docker and queue-mode details.

## Add your credentials

1. Open the HTML/CSS to Image node and create a new **HTML/CSS to Image API** credential.
2. Copy your **API ID** and **API Key** from the [HTML/CSS to Image dashboard](https://htmlcsstoimage.com/dashboard/api-keys).
3. Enter both values and save the credential.

n8n stores the values in its encrypted credential store and tests them against the HTML/CSS to Image ping endpoint.

## Available operations

- **Create From HTML/CSS** — Render HTML and CSS as an image or PDF.
- **Create From URL** — Take a screenshot of a public webpage.
- **Create From Template** — Render a saved template with dynamic values.
- **Delete** — Permanently delete an image by ID.
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

- [HTML/CSS to Image on n8n](https://n8n.io/integrations/htmlcss-to-image-api/)
- [npm package](https://www.npmjs.com/package/@html-css-to-image/n8n-nodes-html-css-to-image)
- [Source code and issue tracker](https://github.com/htmlcsstoimage/n8n-node)
- [HTML/CSS to Image API documentation](/getting-started/using-the-api/)
- [n8n verified community-node documentation](https://docs.n8n.io/integrations/community-nodes/installation-and-management/install-verified-community-nodes)
