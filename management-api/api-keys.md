---
layout: page
title: API key management
permalink: /management-api/api-keys/
parent: Management API
nav_order: 1
description: >-
  Create, list, update, disable, and rotate organization API keys with explicit permissions using the HCTI Management API.
---
# API key management
{: .no_toc }

Manage application credentials with the REST API. API key management is not available through MCP.

Use [HTTP Basic authentication](/getting-started/using-the-api/api-keys/) with an existing key authorized to manage keys. If your current key lacks those permissions, an Owner or Admin can create or edit a suitable key in the [dashboard](https://htmlcsstoimage.com/dashboard/api-keys).

## Operations

Use the key's resource `id` in these paths, not its authentication `api_id`. Reads share **100 requests/minute** and writes share **20 requests/minute**, per organization. See [rate limits](/getting-started/using-the-api/rate-limits/) and the [interactive API reference](https://htmlcsstoimage.com/api-docs) for complete schemas.

{% include operation-cards.html resource="api-keys" %}

## Create a key

This example creates a key that can create images and use authenticated image storage. The calling key needs `api_keys:create_update` and authority to grant both permissions.

```bash
curl 'https://hcti.io/v1/api-keys' \
  --user "$HCTI_API_ID:$HCTI_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Production renderer",
    "description": "Image generation for the website",
    "disabled": false,
    "all_future_permissions": false,
    "permissions": ["images:create", "images:store"]
  }'
```

The `200 OK` response includes these fields:

| Field | Description |
|:------|:------------|
| `id` | Resource ID used for management requests. |
| `api_id` | Basic Auth username for the new key. |
| `api_key` | Secret password. **Returned only by creation.** |
| `name` | Display name of the key. |
| `description` | Description of the key's purpose, if provided. |
| `enabled` | Whether the key can authenticate. |
| `permissions` | Granted current permission names. |
| `all_future_permissions` | Whether the key also automatically receives future permissions. |
| `created_at` | UTC timestamp when the key was created. |
| `updated_at` | UTC timestamp when the key was last updated. |

Store the new `api_id` and `api_key` securely before discarding the response. List, get, and update responses omit `api_key`. Key API responses use `Cache-Control: no-store`.

### Request fields

Create and update use the same request shape:

| Field | Required? | Behavior |
|:------|:----------|:---------|
| `name` | No | Up to 255 characters. Omitted, null, or blank uses `Key created YYYY-MM-DD HH:mm:ss`, based on the key's original creation time in UTC. |
| `description` | No | Up to 2,000 characters. Omitted, null, or blank clears it. |
| `disabled` | No | Defaults to `false`. Set `true` to disable. Responses use the inverse field, `enabled`. |
| `permissions` | Yes | Complete array of [permission names](/getting-started/using-the-api/permissions/). An empty array grants no product operations unless all-future access is enabled. |
| `all_future_permissions` | No | Defaults to `false`. Set `true` to grant all current and future permissions, and supply `permissions: []`. Requires the same authority in the caller. |

## List and retrieve keys

```bash
curl --get 'https://hcti.io/v1/api-keys' \
  --user "$HCTI_API_ID:$HCTI_API_KEY" \
  --data-urlencode 'count=20' \
  --data-urlencode 'include_disabled=true' \
  --data-urlencode 'with_permission=images:create' \
  --data-urlencode 'with_permission=images:store'
```

`with_permission` uses **all-of** matching: this example finds keys allowing both permissions, including keys with all-future access. Repeat the query parameter; do not combine names with commas or spaces.

`include_disabled` defaults to `false`. Results are newest first. Use `count` (1–100, default 10) and `page_start` to [paginate](/management-api/#resource-ids-and-pagination) until `pagination.next_page_start` is `null`.

To retrieve one key, including a disabled key:

```bash
curl "https://hcti.io/v1/api-keys/$KEY_ID" \
  --user "$HCTI_API_ID:$HCTI_API_KEY"
```

## Update a key

Send `POST /v1/api-keys/{id}` with the complete replacement configuration. The caller must have authority over **both the target's existing permissions and the requested permissions**, even when only changing its name or disabled state.

```bash
curl "https://hcti.io/v1/api-keys/$KEY_ID" \
  --user "$HCTI_API_ID:$HCTI_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Production renderer",
    "description": "Image generation for the website",
    "disabled": false,
    "all_future_permissions": false,
    "permissions": ["images:create", "images:store", "usage:read"]
  }'
```

Omitted optional fields reset to their defaults. This request does not rotate or return the secret. When re-enabling a key, resubmit the metadata and permissions you intend to retain with `disabled: false`.

## Disable a key

```bash
curl --request DELETE "https://hcti.io/v1/api-keys/$KEY_ID" \
  --user "$HCTI_API_ID:$HCTI_API_KEY"
```

Success returns `204 No Content`. DELETE **disables** the key; it does not permanently remove it. The caller needs `api_keys:delete` and authority over the target's existing permissions. Repeating the delete succeeds when authorized.

The disabled key remains retrievable and appears in lists with `include_disabled=true`. You can re-enable it through update. Re-enabling restores the same credentials, so replace a compromised key instead.

An organization can have up to 100 keys, including disabled keys. Disabling a key does not free a key slot; contact support if you reach this limit.

## Rotate a key

1. Create a replacement key with the necessary grants.
2. Store the returned API ID and secret in your application's secret manager.
3. Switch the application to those credentials and verify the operations it needs.
4. Disable the old key using its resource ID.

There is no separate secret-rotation endpoint. For permission errors, see [granting permissions](/getting-started/using-the-api/permissions/#granting-permissions). For other responses, see [Management API errors](/management-api/#errors-and-retries).

{% include code_footer.md version=1 %}
