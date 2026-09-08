## Available tools

HTML/CSS to Image (HCTI) exposes the same MCP tools in every supported client. Ask your assistant to use HCTI by name when you want it to render HTML/CSS or capture a website.

### Account usage

| Tool | What it does |
|:-----|:------------|
| **check_usage** | Check images used, the account's image allowance, the next reset date, and whether overages are enabled. Does not render an image. |

### Screenshots and rendering

| Tool | What it does |
|:-----|:------------|
| **create_image** | Render HTML and CSS as PNG, JPG, WebP, or PDF. Accepts rendering options such as `device_scale`, `viewport_width`, `viewport_height`, and `ms_delay`. |
| **create_url_image** | Capture a public webpage or a specific element using a CSS selector. Supports viewport settings and cookie banner blocking. |
| **create_templated_image** | Render a saved template using its `template_id` and a `template_values` object. |
| **create_batch_images** | Render multiple variations in one request, with shared `default_options` and per-image `variations`. |
| **get_max_batch_size** | Check the authorized account's current batch limit before preparing a batch. |

### Template management

| Tool | What it does |
|:-----|:------------|
| **create_template** | Save HTML and CSS as a reusable template with variables. |
| **update_template** | Update an existing template by ID. |
| **list_templates** | Find templates in the connected HCTI account. |
| **list_template_versions** | Inspect the version history of a template. |

See the [rendering parameters](/integrations/mcp/#image-parameters) for available options and the [Template Editor guide](/template-editor/) for designing reusable templates.
