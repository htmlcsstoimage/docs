---
title: "Terraform and Pulumi providers"
slug: changelog/2026-09-17-terraform-and-pulumi-providers
description: "Manage images, templates, API keys, proxies, storage destinations, and Open Graph configurations with Terraform or Pulumi."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-09-17'
  anchor: terraform-and-pulumi-providers
sidebar:
  hidden: true
---

Official Terraform and Pulumi providers are now available. Manage your HTML/CSS to Image setup alongside the infrastructure that uses it: images, templates, API keys, proxies, storage destinations, and Open Graph configurations.

Keep configuration in version control, review changes before applying them, and pass resource IDs between providers. For example, create an S3 bucket and connect it to an HCTI storage destination in the same deployment.

Image resources save definitions without rendering them during apply or refresh. Open the returned rendering URL when you need the image, or add a render step to your deployment.

Start with the [infrastructure as code overview](/management-api/iac/), or go straight to the [Terraform guide](/management-api/terraform/) or [Pulumi guide](/management-api/pulumi/).

[All updates](/changelog/)
