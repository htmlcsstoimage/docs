---
layout: page
title: MCP tools reference
permalink: /integrations/mcp/tools/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 0
nav_title: Tool Reference
description: >-
  All HCTI MCP tools for images, templates, usage, proxies, storage destinations, and OG configurations, with required permissions and arguments.
---
# MCP tools reference
{: .no_toc }

HCTI's MCP server provides image generation and organization resource management. Connect your assistant using a [client setup guide](/integrations/mcp/#choose-your-client), then approve the [permissions](/integrations/mcp/permissions/) needed for your work.

Listed tools describe supported capabilities. Your current connection may not have permission to execute every tool. Plan eligibility also applies.

## Screenshots and rendering

These tools require `images:create`. Rendering uses the organization's image credits.

| Tool | Arguments | Result |
|:-----|:----------|:-------|
| `create_image` | `content` with `html`, optional `css`, and render options; optional `include_image_data` | Created image details. |
| `create_url_image` | `content` with `url` and render options; optional `include_image_data` | Screenshot details. |
| `create_templated_image` | `template_id`, `template_values`; optional `version`, `include_image_data` | Image created from the selected template. |
| `create_batch_images` | Top-level `default_options` and `variations` | Batch image results. Check `get_max_batch_size` first. |

For example, arguments to `create_url_image`:

```json
{
  "content": {
    "url": "https://example.com",
    "viewport_width": 1440,
    "viewport_height": 900,
    "device_scale": 1
  },
  "include_image_data": false
}
```

Use the [rendering parameters](/integrations/mcp/#image-parameters) and the tool's input schema for supported options. `include_image_data` defaults to false; enable it for an inline preview when needed. A deferred render URL requires a separate authenticated PUT and must not be treated as an already rendered, readable image. See [storage behavior](/guides/advanced/storage-destinations/).

When you already know a template ID, pass it directly. Finding a template by name first requires `templates:read`.

## Template management

| Tool | Required permission | Arguments and behavior |
|:-----|:--------------------|:-----------------------|
| `create_template` | `templates:create_update` | `content` with template HTML/CSS and options. Returns template creation details. |
| `update_template` | `templates:create_update` | `template_id` and complete replacement `content`. Replaces the latest version if it has not rendered; otherwise creates a new version. |
| `list_templates` | `templates:read` | Required `count` (1–100), optional `max_version`. Returns templates with their latest versions and pagination. |
| `list_template_versions` | `templates:read` | `template_id`, required `count` (1–100), optional `max_version`. Returns paginated template versions. |

Template lists use `max_version` for pagination; use the returned pagination cursor for the next call. This differs from management-resource lists, which use `page_start`. See [templates](/getting-started/templates/) for template concepts and [the Template Editor](/template-editor/) for visual design.

## Usage and limits

| Tool | Required permission | Arguments and result |
|:-----|:--------------------|:---------------------|
| `check_usage` | `usage:read` | No arguments. Returns `images_used`, `images_allowed`, `overages_enabled`, and `next_reset`. |
| `get_max_batch_size` | `usage:read` | No arguments. Returns the maximum batch size; `0` means the plan does not support batching, so create images individually. |

Neither tool renders an image. Their responses differ from REST usage history; see [usage](/management-api/usage/).

## Proxies

| Tool | Required permission | Arguments |
|:-----|:--------------------|:----------|
| `list_proxies` | `proxies:read` | Optional `count`, `page_start`. |
| `get_proxy` | `proxies:read` | `id`. |
| `create_proxy` | `proxies:create_update` | `content`. |
| `update_proxy` | `proxies:create_update` | `id`, complete replacement `content`. |
| `delete_proxy` | `proxies:delete` | `id`. |

See the [Proxies API](/management-api/proxies/) for `content` fields and response details. Proxy responses include a top-level `username` (`null` for no authentication, with an empty string still valid) and omit passwords. To keep a password during update, send `authentication` with the unchanged username and `retain_password: true`, omitting the password. Omitting the whole `authentication` object removes authentication.

## Storage destinations

| Tool | Required permission | Arguments |
|:-----|:--------------------|:----------|
| `list_storage_destinations` | `storage_destinations:read` | Optional `count`, `page_start`. |
| `get_storage_destination` | `storage_destinations:read` | `id`. |
| `create_storage_destination` | `storage_destinations:create_update` | `content`. Tests a bucket write before enabling. |
| `update_storage_destination` | `storage_destinations:create_update` | `id`, complete replacement `content`. Connection changes or re-enabling trigger a write test. |
| `delete_storage_destination` | `storage_destinations:delete` | `id`. Deletes configuration and credentials, not bucket objects. |
| `get_aws_storage_external_id` | `storage_destinations:create_update` | No arguments. Returns `external_id` for the organization's AWS trust policy. |

See the [Storage destinations API](/management-api/storage-destinations/) for provider-specific `content` and connection-test results. To keep an access-key secret during update, set `connection_info.retain_secret_access_key: true`, keep the provider and access key ID unchanged, and omit the secret. Otherwise, supply the secret. Secret access keys are never returned.

## OG configurations

| Tool | Required permission | Arguments |
|:-----|:--------------------|:----------|
| `list_og_configs` | `og_configs:read` | Optional `count`, `page_start`. |
| `get_og_config` | `og_configs:read` | `id`. |
| `create_og_config` | `og_configs:create_update` | `content`, including `config_type`. |
| `update_og_config` | `og_configs:create_update` | `id`, complete replacement `content`, including `config_type`. |
| `delete_og_config` | `og_configs:delete` | `id`. |

See the [OG configurations API](/management-api/og-configs/) for screenshot and template request shapes. Use `id` for management and the returned `domain_id` in public OG image URLs.

For example, arguments to `create_og_config`:

```json
{
  "content": {
    "config_type": "html_css",
    "name": "Website screenshots",
    "base_url": "https://example.com",
    "extract_values": false,
    "default_options": { "viewport_width": 1200, "viewport_height": 630 }
  }
}
```

## Management results and pagination

Management tools return structured results with `success`, `item`, and `error`. On success, `item` contains the resource, list page, or `true` for deletion. A list page inside `item` has `data` and `pagination.next_page_start`.

Management lists accept `count` from 1 to 100 (default 10). Pass the returned cursor as `page_start` until it is null. Proxy, storage, and OG lists include disabled resources. Do not assume a disabled resource can be used for new renders.

Permission and rate-limit failures can be returned directly as MCP tool errors without this structured wrapper. Check the tool's error status and message before using its result.

## Permissions and rate limits

Management reads share **100 requests/minute per resource family and organization**; writes share **20 requests/minute**. These allowances are shared with REST. `get_aws_storage_external_id` uses the storage read group while requiring create/update permission. See [rate limits](/getting-started/using-the-api/rate-limits/).

If a tool reports insufficient permissions, it was not executed. [Reconnect and approve the required access](/integrations/mcp/permissions/#add-permissions-to-an-existing-connection) before retrying. A token refresh does not add permissions. For rate-limit errors, wait 60 seconds before retrying.

API key management is available through the [REST Management API](/management-api/api-keys/) and dashboard, not MCP. MCP also has no tools for deleting images/templates or changing billing, membership, or organization settings. Use the corresponding REST operations or dashboard where available.

{% include code_footer.md version=1 %}
