---
layout: page
title: MCP permissions and authorization
permalink: /integrations/mcp/permissions/
parent: "HTML-to-Image, PDF & Screenshot MCP"
grand_parent: Integrations
nav_order: 1
nav_title: Permissions
description: >-
  Choose HCTI MCP OAuth permissions, add access to existing connections, and review or revoke authorized sessions.
---
# MCP permissions and authorization
{: .no_toc }

MCP uses OAuth to connect your assistant to an HCTI organization. You approve its permissions in your browser; there is no API key to paste into chat.

## Authorize a connection

1. Add HCTI using your [client's setup guide](/integrations/mcp/#choose-your-client), then choose its connect or login action.
2. Sign in to HCTI and check the organization shown during authorization. That organization supplies the resources and image credits for this connection.
3. Review **Requested permissions**. The simple view groups access into **Read** and **Write** by area. Uncheck access the assistant does not need, or turn on **Advanced mode** to choose individual actions.
4. Expand **More Permissions** if you want to grant additional access, such as managing OG configurations.
5. Select **Allow selected permissions**, then return to your assistant.

**Write includes deletion** for areas that support it. Use Advanced mode when you want to allow create/update without deletion. The page opens in Advanced mode automatically when the requested, allowed permissions include only part of a group. Use the info buttons to see the tools and permissions associated with each area.

Permissions unavailable to your organization role are disabled. Owners and Admins can approve management operations; Users can approve image/template operations and resource reads within their role. API key management and all-future permission grants are excluded from OAuth.

## Choose permissions for the task

| Task | Permissions |
|:-----|:------------|
| Render HTML/CSS or screenshot a URL | `images:create` |
| Render a known template ID | `images:create` |
| Find a template, then render it | `templates:read`, `images:create` |
| Create or update a template | `templates:create_update` |
| Check current usage or maximum batch size | `usage:read` |
| Inspect proxy, storage, or OG configurations | The corresponding `proxies:read`, `storage_destinations:read`, or `og_configs:read` |
| Create/update management resources | The corresponding `proxies:create_update`, `storage_destinations:create_update`, or `og_configs:create_update` |
| Delete a management resource | The corresponding resource's `:delete` permission |
| Get the AWS storage external ID | `storage_destinations:create_update` |

For workflows that first inspect and then update a resource, approve both read and create/update. Deletion is a separate permission. See the [complete tools reference](/integrations/mcp/tools/) and [permission model](/getting-started/using-the-api/permissions/).

A connection with no selected permissions cannot perform product operations. Successfully connecting or seeing a tool listed does not mean it is authorized.

## Add permissions to an existing connection

Existing connections keep their approved grants. The original MCP defaults cover images, templates, proxy/storage listings, and usage, but do not include the new management writes or OG configuration operations.

To add access:

1. Disconnect HCTI in your client's integration settings.
2. Reconnect to start a new OAuth authorization in the browser.
3. Check the intended organization and select the required permissions, including those under **More Permissions**.
4. Complete authorization, then retry the task.

Refreshing an existing token does not add permissions. If a tool is denied, stop retrying until its access changes. If a permission is unavailable because of your role, ask an organization Owner or Admin to help with access.

## Review and revoke sessions

Open [MCP Sessions](https://htmlcsstoimage.com/dashboard/mcp-sessions) in the dashboard to review connections and their granted permissions. Revoke a session to withdraw that authorization. Revocation covers the access and refresh tokens belonging to that authorization, including rotated tokens.

Changing the dashboard's selected organization does not switch an already authorized MCP connection to a different organization. Reconnect and authorize the intended organization instead.

## Troubleshooting

| Symptom | Next step |
|:--------|:----------|
| A listed tool reports permission denied | Reauthorize with the exact permission named in the error. Tool discovery describes supported capabilities, not your grants. |
| Usage check fails but rendering works | Add `usage:read`; image creation and usage checks have separate permissions. |
| Management permission cannot be selected | Check your role in the organization shown on the authorization page. |
| Permission is granted but a feature is denied | Read the error for plan eligibility or resource ownership requirements. |
| A rate-limit error appears | Wait 60 seconds. Management rate limits are shared with REST; reconnecting does not reset them. |
| Authentication fails | Reconnect and complete browser authorization. See [connection troubleshooting](/integrations/mcp/#authentication-errors). |

Never paste API keys or OAuth tokens into the conversation to fix a connection. If reauthorization with the correct organization and grants still fails, contact **support@htmlcsstoimage.com**.

{% include code_footer.md version=1 %}
