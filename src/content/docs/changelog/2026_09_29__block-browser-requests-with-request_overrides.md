---
title: "Block browser requests with `request_overrides`"
slug: changelog/2026-09-29-block-browser-requests-with-request-overrides
description: "Block selected scripts, images, and other browser requests while rendering images or templates."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-09-29'
  anchor: block-browser-requests-with-request-overrides
sidebar:
  hidden: true
---

Use the new `request_overrides` parameter to block selected network requests while Chrome renders an HTML/CSS image, URL screenshot, or template. Match a request by URL pattern, browser resource type, or both. For example, this rule blocks scripts from an analytics host:

```json
{
  "request_overrides": [
    {
      "action": "block",
      "url": "*://analytics.example.com/*",
      "resource_types": ["script"]
    }
  ]
}
```

You can also set rules in an HTML/CSS Open Graph configuration's `default_options`. The [parameter guide](/parameters/request_overrides/) explains wildcard matching, supported resource types, limits, and request formats. Signed create-and-render URLs do not support this parameter.

The official [TypeScript](https://github.com/htmlcsstoimage/ts-client), [Go](https://github.com/htmlcsstoimage/go-client), [Python](https://github.com/htmlcsstoimage/python-client), [PHP](https://github.com/htmlcsstoimage/php-client), [Ruby](https://github.com/htmlcsstoimage/ruby-client), and [.NET](https://github.com/htmlcsstoimage/dotnet-client) clients have been updated to accept `request_overrides`, including resource type values that serialize to the API's strings.

The [Terraform provider v0.2.1](https://github.com/htmlcsstoimage/terraform-provider-html-css-to-image/releases/tag/v0.2.1) and [Pulumi provider v0.2.0](https://github.com/htmlcsstoimage/pulumi-html-css-to-image/releases/tag/v0.2.0) also support request override rules for images, templates, and Open Graph default options. See the [Terraform guide](/management-api/terraform/) and [Pulumi guide](/management-api/pulumi/) for setup.

[All updates](/changelog/)
