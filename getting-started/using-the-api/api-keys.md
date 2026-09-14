---
layout: page
title: Authentication and API keys
permalink: /getting-started/using-the-api/api-keys/
nav_title: Auth & API Keys
parent: Using the API
grand_parent: Getting started
nav_order: 1
description: >-
  Create scoped API keys, authenticate requests, choose permission presets, and replace or disable HTML/CSS to Image credentials.
---
# Authentication and API keys
{: .no_toc }

Every new HCTI organization automatically includes an API key, so you can start using the API without creating one yourself. You'll find its API ID and secret API key in the [API keys dashboard](https://htmlcsstoimage.com/dashboard/api-keys).

This key starts with the **Basics** permission set for everyday operations: creating and managing images, working with templates, and checking usage. It belongs to your organization and uses that organization's resources and image credits.

You can expand its permissions to include [Management API](/management-api/) operations, or reduce them to just what your application needs. You can also create separate keys for different applications or environments, each with its own permissions—for example, an image-creation key for your website and a read-only key for monitoring usage. Organization Owners and Admins can manage these permissions within their authority.

To use your existing key, skip to [authenticating a request](#authenticate-a-request). To create another key or understand the permission controls, follow the guide below.

## Create a key in the dashboard

1. Open the [API keys dashboard](https://htmlcsstoimage.com/dashboard/api-keys) in the intended organization.
2. Select **Create New Key**. Organization Owners and Admins can create keys within their authority.
3. Give the key a name and optional description, such as `Production renderer` and the application that uses it.
4. Choose a permission preset, then adjust the selected permissions for your application.
5. Save the key and store the API ID and secret API key in your server's environment or secret manager.

### Simple view: read and write by area

By default, the form groups permissions into **Read** and **Write** for each area, such as Images, Templates, or Proxies. Choose a preset as a starting point, then adjust the groups your application needs.

**Write includes deletion** where the area supports it. For example, selecting Write for Proxies grants both create/update and delete permissions. Usage has only a Read permission.

<figure class="te-doc-figure">
  <a href="/assets/images/api-keys/create-key-simple.png"><img src="/assets/images/api-keys/create-key-simple.png" alt="Create an API key in the default simple view, with Read and Write permission groups for each resource area and the Basics preset selected." width="1272" height="802" loading="lazy"></a>
  <figcaption>The default view groups permissions by area. Click the screenshot to view it full size.</figcaption>
</figure>

### Permission presets

| Preset | Included access |
|:-------|:----------------|
| **Basics** | Original image, template, and usage operations, including image/template deletion and image storage. |
| **Image Creator** | `images:create` and `images:store`. Add `templates:read` if the application needs to discover templates, or `usage:read` to check usage. |
| **Administrator** | All current resource permissions, including key management. Does not automatically grant future permissions. |
| **Read Only** | Read permissions for images, templates, proxies, storage destinations, OG configurations, usage, and API key metadata. |
| **Custom** | Choose individual permissions for your application's needs. |

### Advanced mode: choose individual actions

Turn on **Advanced mode** to see the granular permissions within each area. Read, Create/Update, and Delete are shown separately; Images also separates Create and Store. This lets you allow an application to create and update proxies without allowing it to delete them, for example.

Simple and advanced mode are two views of the same permission selection. Advanced mode lets you choose exactly which actions a key can perform.

<figure class="te-doc-figure">
  <a href="/assets/images/api-keys/create-key-advanced.png"><img src="/assets/images/api-keys/create-key-advanced.png" alt="Advanced mode in the API key form, showing separate Read, Create/Update, and Delete permissions, with Create and Store separated for Images." width="1269" height="802" loading="lazy"></a>
  <figcaption>Advanced mode exposes individual actions instead of grouping all writes together.</figcaption>
</figure>

### See what each permission allows

Expand an area's details using the arrow next to its name. The details explain its read and write permissions. Expand **Endpoints and required permissions** to see which API endpoints use each permission, including the exact names to use in API requests.

<figure class="te-doc-figure">
  <a href="/assets/images/api-keys/permission-details.png"><img src="/assets/images/api-keys/permission-details.png" alt="Expanded OG Configs permission details showing read and write descriptions and the permissions required for each Open Graph configuration endpoint." width="997" height="634" loading="lazy"></a>
  <figcaption>Each area includes descriptions and an endpoint-to-permission reference.</figcaption>
</figure>

See the [permission reference](/getting-started/using-the-api/permissions/) for the complete list. Plan and authentication requirements still apply to each endpoint.

### Automatically grant future permissions

The **Automatically grant future permissions** toggle grants **all current permissions and any new permissions added in the future**. It does not just add future permissions to a limited selection. Leave it off to keep a key restricted to the permissions you explicitly choose.

Selecting the **Administrator** preset, or manually selecting every current permission, does not enable this setting. Those selections cover current permissions only.

In the Management API, this setting is called `all_future_permissions`. To enable it, send `all_future_permissions: true` with `permissions: []`. With `all_future_permissions: false`, the `permissions` array is the complete set of grants; an empty array grants no product operations.

Only callers with all-future authority can grant it. In the dashboard, Owners have that authority; Admins can grant current permissions but cannot enable all-future access or edit a key that has it. See [API key management](/management-api/api-keys/) for request examples.

## Authenticate a request

The image API and Management API both use HTTP Basic authentication:

| Value | Use |
|:------|:----|
| **API ID** (`api_id`) | Basic Auth username. Some older examples call this the User ID. |
| **API Key** (`api_key`) | Basic Auth password; keep it secret. |

With `HCTI_API_ID` and `HCTI_API_KEY` set in your server environment:

```bash
curl 'https://hcti.io/v1/image' \
  --user "$HCTI_API_ID:$HCTI_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '{"html":"<h1>Hello from HCTI</h1>"}'
```

This request requires `images:create`. The same credentials can call the [Management API](/management-api/) if the key has the required management permissions.

Keep the secret out of browser code, public repositories, and chat messages. For browser-facing image generation, use [signed create-and-render URLs](/getting-started/create-and-render/). Their signing key needs `images:create`.

## Edit permissions or disable a key

Open the key's controls in the dashboard to edit its name, description, enabled state, or permissions. Disabled keys cannot authenticate requests and appear in **Disabled Keys**. Re-enable a key only if you intend to restore access for applications holding its existing credentials.

Owners can grant all current and future permissions. Admins can manage keys limited to current permissions, but cannot modify a key that grants all future permissions. API callers are likewise limited by the calling key's authority. See [granting permissions](/getting-started/using-the-api/permissions/#granting-permissions).

## Replace credentials

To rotate a key, create a replacement with the required permissions, update your application's stored API ID and API key, verify its requests, then disable the old key. Editing permissions does not change the secret.

When creating a key through the Management API, the secret is returned only in the creation response. List, get, and update responses contain metadata without the secret. See [API key management](/management-api/api-keys/) for an automated rotation workflow.

## Troubleshooting

- **`401 Unauthorized`**: Check the API ID/secret pair and whether the key is enabled.
- **`403 Forbidden`**: Read the missing permission or plan requirement in the response. Valid credentials do not imply access to every operation.
- **Wrong organization**: Use credentials created in the organization that owns the resource.

MCP connections use [OAuth authorization](/integrations/mcp/permissions/), so you do not need to copy API keys into an assistant.

<span id="existing-keys"></span>

## Legacy API keys

All keys created before the introduction of granular permissions (September 2026) have the default permission set, unless their permissions have since been changed:

| Area | Default permissions |
|:-----|:--------------------|
| Images | `images:create`, `images:read`, `images:delete`, `images:store` |
| Templates | `templates:read`, `templates:create_update`, `templates:delete` |
| Usage | `usage:read` |

These eight permissions match the **Basics** preset and preserve the original image, template, and usage operations. Legacy keys do not automatically receive proxy, storage destination, OG configuration, or API key management permissions, and do not opt into `all_future_permissions`.

To use management operations, edit the key's permissions in the dashboard or create a separate key with the required grants.

{% include code_footer.md version=1 %}
