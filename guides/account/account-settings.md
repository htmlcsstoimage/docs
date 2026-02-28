---
layout: page
title: Account settings
permalink: /guides/account/account-settings/
parent: Account & organizations
grand_parent: Guides
nav_order: 1
description: >-
  Your personal account: email, organizations, switching orgs, and accepting invites.
---

# Account settings
{: .no_toc }
{: .fs-9 }

Manage your login, organizations, and pending invites in one place.
{: .fs-6 .fw-300 }

<hr>

Account settings are available at [https://htmlcsstoimage.com/account/settings](https://htmlcsstoimage.com/account/settings). This page is about **you** — your email, which organizations you belong to, and how you switch between them — not about managing a single organization's members or billing (that's [organization settings](/guides/account/organization-settings/)).

## What you'll find here

- **Login info** — Your email, how you sign in (e.g. Google or username/password), last login, and user ID. If you use email/password (not a social provider), you can change your email from here; we'll send a verification link to the new address.
- **Organizations** — A list of organizations you're a member of. You can open any of them to see that org's dashboard, or create a new organization.

## Switching organizations

The dashboard (usage, API keys, images, invoices, etc.) always shows data for your **current** organization. To work in a different organization:

1. Go to [Account settings](https://htmlcsstoimage.com/account/settings).
2. In the **Organizations** section, use the control to switch to the organization you want (or open it).
3. You'll be taken to that organization's context; the dashboard and API keys you see are for that org.

You can also switch org from the top navigation when you're already in the dashboard.

## Accepting or declining invites

When someone invites you to an organization by email, you'll get a link to accept or decline. You can also see and respond to pending invites from the account area (e.g. [Account → Invites](https://htmlcsstoimage.com/account/invites) if you have that path).

- **Accept** — You're added to the organization with the role and billing-email option set by the inviter. You're then typically redirected to that organization so it becomes your current context.
- **Decline** — The invite is closed and you are not added.

Your email must be verified before you can accept an invite. If you change your email in account settings, complete the verification flow first.

## Organization settings vs account settings

| Area | Purpose |
|:-----|:--------|
| **Account settings** | Your identity and session: email, login method, which orgs you're in, switching orgs, and handling invites sent to you. |
| **Organization settings** | One organization's context: its members, roles, invites you send, billing emails, usage, and plan. Use the org switcher to choose which organization's settings you're viewing. |

## See also

- [Organization settings](/guides/account/organization-settings/) — Roles, inviting members, and managing an organization.
- [Account usage](/guides/advanced/account-usage/) — Monitoring API usage.

{% include code_footer.md version=1 %}
