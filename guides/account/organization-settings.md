---
layout: page
title: Organization settings
permalink: /guides/account/organization-settings/
parent: Account & organizations
grand_parent: Guides
nav_order: 2
description: >-
  Manage your organization, members, invites, and roles. Learn about Owner, Admin, and User permissions.
---

# Organization settings
{: .no_toc }
{: .fs-9 }

Manage members, invites, usage, and billing for your organization.
{: .fs-6 .fw-300 }

<hr>

Organization settings are available at [https://htmlcsstoimage.com/dashboard/organization-settings](https://htmlcsstoimage.com/dashboard/organization-settings). What you can do there depends on your role in the organization.

## What is an organization?

An **organization** groups API keys, image usage, and billing under one account. You can have multiple organizations (for example, one per product or client) and switch between them in the dashboard. Each organization has its own members, invites, and plan.

## Member roles

Every member has one of three roles. Permissions are enforced everywhere (dashboard and API).

| Role | What they can do |
|:-----|:-----------------|
| **Owner** | Full control: change organization name, manage billing, API keys, members, and invites. Only owners can assign the Owner role or change organization metadata. The person who creates the organization is an Owner; the creator cannot be removed or have their role changed. |
| **Admin** | Manage billing, API keys, and users: invite members (as Admin or User only), change roles for admins and users, remove admins and users, and control who receives billing emails. Cannot invite or assign anyone as Owner. |
| **User** | View organization resources and create images using the organization's API keys. Cannot manage billing, API keys, or other members. |

## Invites

Owners and admins can **invite** people by email from the organization settings page. When you invite someone you choose their role (Admin or User; only Owners can invite as Owner) and whether they should receive billing emails.

- Invitees receive an email with a link to accept or decline.
- Accepting adds them to the organization with the assigned role.
- Invites expire after 14 days and can be cancelled or updated (role, billing emails) before they're accepted.
- You cannot invite an email that is already a member; outstanding invites for the same email must be resolved first.

## Managing members and billing emails

On the organization settings page you'll see:

- **Members** — List of current members with role and "Receive Billing Emails" per person. Owners and admins can change roles (within the rules above) and remove members (except the organization creator). Only owners and admins can toggle billing emails for members; the organization creator always receives billing emails.
- **Invites** — Pending invites with role and billing-email option. Owners and admins can change role, billing emails, or remove the invite.

Usage and current period information for the organization are also shown on the same page.

## See also

- [Account settings](/guides/account/account-settings/) — Your personal account, switching organizations, and pending invites.
- [Account usage](/guides/advanced/account-usage/) — Monitoring API usage for your organization.

{% include code_footer.md version=1 %}
