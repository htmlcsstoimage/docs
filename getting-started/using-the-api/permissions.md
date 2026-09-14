---
layout: page
title: API permissions
nav_title: Permissions
permalink: /getting-started/using-the-api/permissions/
parent: Using the API
grand_parent: Getting started
nav_order: 2
description: >-
  Reference for HCTI API key permissions, organization roles, and MCP OAuth grants across image and management operations.
---
# API permissions
{: .no_toc }

Permissions control what an API key or MCP connection can do within its organization. Choose only the operations your application or assistant needs.

## How access is determined

| Access method | What determines access |
|:--------------|:-----------------------|
| Dashboard | Your membership role in the selected organization. |
| REST API | The permissions granted to the API key used for the request. |
| MCP | The permissions approved for that OAuth connection. You can approve only permissions allowed by your organization role. |

Most resource areas have separate read, create/update, and delete permissions. Images also have distinct create and store permissions; usage has read access only. Granting one permission does not grant the others, and permissions do not override plan restrictions.

## Permission reference

Use these exact strings in API key `permissions` arrays. MCP OAuth uses the same strings for supported scopes, but does not expose API key management.

| Permission | Allows |
|:-----------|:-------|
| <span id="permission-images-create"></span>`images:create` | Create images from HTML/CSS, URLs, templates, or batches; sign create-and-render URLs. |
| <span id="permission-images-read"></span>`images:read` | List images and read their details. |
| <span id="permission-images-delete"></span>`images:delete` | Delete images. |
| <span id="permission-images-store"></span>`images:store` | Use authenticated store endpoints to render and store images in their configured storage destination. |
| <span id="permission-templates-read"></span>`templates:read` | List/read templates and their versions. |
| <span id="permission-templates-create-update"></span>`templates:create_update` | Create and update templates. |
| <span id="permission-templates-delete"></span>`templates:delete` | Delete templates. |
| <span id="permission-proxies-read"></span>`proxies:read` | List/get proxy configurations, including usernames but never passwords. |
| <span id="permission-proxies-create-update"></span>`proxies:create_update` | Create/update proxies, credentials, and enabled state. |
| <span id="permission-proxies-delete"></span>`proxies:delete` | Delete proxies. |
| <span id="permission-storage-destinations-read"></span>`storage_destinations:read` | List/get storage configurations and test results without secret access keys. |
| <span id="permission-storage-destinations-create-update"></span>`storage_destinations:create_update` | Create/update storage destinations and credentials; obtain the AWS external ID. |
| <span id="permission-storage-destinations-delete"></span>`storage_destinations:delete` | Delete storage destination configurations. |
| <span id="permission-og-configs-read"></span>`og_configs:read` | List/get OG configurations. |
| <span id="permission-og-configs-create-update"></span>`og_configs:create_update` | Create/update OG configurations. |
| <span id="permission-og-configs-delete"></span>`og_configs:delete` | Delete OG configurations. |
| <span id="permission-usage-read"></span>`usage:read` | Read REST usage; call MCP `check_usage` and `get_max_batch_size`. |
| <span id="permission-api-keys-read"></span>`api_keys:read` | List/get API key metadata without secrets. REST only. |
| <span id="permission-api-keys-create-update"></span>`api_keys:create_update` | Create/update API keys within the caller's authority. REST only. |
| <span id="permission-api-keys-delete"></span>`api_keys:delete` | Disable API keys through DELETE, within the caller's authority. REST only. |

The [MCP tools reference](/integrations/mcp/tools/) lists which operations have tools. A supported OAuth scope does not necessarily have a dedicated tool; for example, there are no image or template deletion tools.

## Using resources versus managing them

Creating an image from a known template ID uses `images:create`. Discovering templates first requires `templates:read`. Updating the template requires `templates:create_update`.

Likewise, configuring a proxy or storage destination is a management operation. Passing an existing `proxy_id` or `storage_destination_id` to image creation does not require permission to edit that resource. Resource ownership, enabled state, and plan eligibility still apply. A separate authenticated `PUT /v1/store/{id}` request requires `images:store`.

Reading an already hosted public image URL does not require `images:read`.

## Granting permissions

A key with `api_keys:create_update` can create keys only with permissions it can itself grant. To update an existing key, the caller must be able to grant both its existing permissions and the requested replacement permissions. This check also applies to disabling or re-enabling a key. Disabling through DELETE requires authority over the target key's existing permissions.

For example, a key with `api_keys:create_update` and `images:create` can create another image-creation key. It cannot grant `templates:delete`, and it cannot edit a key that already has that permission.

### Current and future permissions

An explicit permission list grants only those operations. Even selecting every current permission does not grant permissions introduced later.

For API keys, `all_future_permissions: true` opts into all current and future permissions. Only a caller with that authority can grant it. Dashboard Owners have this authority; Admins have the current permission set. MCP cannot grant all future permissions or manage API keys.

The API requires a `permissions` array. Use `[]` with `all_future_permissions: true`. With `all_future_permissions: false`, an empty array grants no product operations.

## Organization roles

Owners can grant all current and future permissions. Admins can grant current permissions, including management operations, but cannot manage keys with all-future access. Users can operate on images and templates, view usage, and read organization resource configurations and API key metadata; they cannot manage keys or change proxy, storage, or OG configurations.

See [organization settings](/guides/account/organization-settings/) for membership and billing permissions. API keys belong to the organization; their grants are distinct from the dashboard role of the person using the API.

## Existing keys and connections

The original API key defaults include image creation/read/delete/store, template read/create-update/delete, and usage read. They do not include management-resource grants.

The original MCP defaults include image creation/read/store, template read/create-update, proxy and storage listing, and usage read. Existing connections do not automatically gain new management permissions. Complete a new [MCP authorization](/integrations/mcp/permissions/) to approve additional access. Refreshing an existing token does not expand its permissions.

## Permission errors

A REST request with valid credentials but insufficient permissions returns `403` with a message identifying the required permission. MCP returns a tool error and does not execute the denied operation. Add the appropriate key grant or reauthorize the MCP connection before retrying. If the message identifies a plan restriction, changing permissions alone will not resolve it.

{% include code_footer.md version=1 %}
