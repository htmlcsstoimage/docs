---
title: "Webhooks in Terraform and Pulumi"
slug: changelog/2026-11-04-webhooks-in-terraform-and-pulumi
description: "Manage HCTI webhook subscriptions, signing, and delivery parameters with the official Terraform and Pulumi providers."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-04'
  anchor: webhooks-in-terraform-and-pulumi
sidebar:
  hidden: true
---

You can now manage webhooks with the official [Terraform](/management-api/terraform/#webhooks) and [Pulumi](/management-api/pulumi/#webhooks) providers, starting with version **0.3.0** of each.

Configure event subscriptions, signing, and custom headers or query parameters in the same project as your webhook receiver. New webhooks expose their signing secret as a sensitive output, so you can pass it directly to your receiver's secrets manager.

Both providers support importing existing webhooks and retaining secret parameters during updates without resending their values. See the provider guides for setup examples, or the [webhooks guide](/guides/webhooks/) for event types, signature verification, and a runnable receiver.

[All updates](/changelog/)
