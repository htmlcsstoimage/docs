---
title: "Official Clients 1.0"
slug: changelog/2026-11-16-official-clients-1-0
description: "The official TypeScript, .NET, Python, PHP, Go, and Ruby clients reach version 1.0, with recordings support in every language."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-11-16'
  anchor: official-clients-1-0
sidebar:
  hidden: true
---

Our open source clients for **TypeScript, .NET, Python, PHP, Go, and Ruby** are now at **version 1.0**.

We've been working on these clients for a while now, adding languages and features along the way. With [recordings](/changelog/2026-11-16-recordings/) now supported in all of them, every client covers the same core API: HTML/CSS and URL images, templates, batches, image and recording deletion, signed URLs, and MP4, WebM, and GIF recordings.

Version 1.0 means:

- **They're official.** We maintain them alongside the API and support them like any other part of HCTI.
- **They're stable.** We follow semantic versioning, so breaking changes only come with a new major version.
- **They keep up.** New API features will be added to every client, not just one.

| Language | Package | Install |
|:---------|:--------|:--------|
| TypeScript / JavaScript | [`@html-css-to-image/client`](https://www.npmjs.com/package/@html-css-to-image/client) | `npm install @html-css-to-image/client` |
| C# / .NET | [`HtmlCssToImage`](https://www.nuget.org/packages/HtmlCssToImage) | `dotnet add package HtmlCssToImage` |
| Python | [`html-css-to-image`](https://pypi.org/project/html-css-to-image/) | `pip install html-css-to-image` |
| PHP | [`html-css-to-image/client`](https://packagist.org/packages/html-css-to-image/client) | `composer require html-css-to-image/client` |
| Go | [`github.com/htmlcsstoimage/go-client`](https://pkg.go.dev/github.com/htmlcsstoimage/go-client) | `go get github.com/htmlcsstoimage/go-client` |
| Ruby | [`htmlcsstoimage-api`](https://rubygems.org/gems/htmlcsstoimage-api) | `gem install htmlcsstoimage-api` |

See [Example code](/example-code/#start-with-a-client-library) to get started in your language. Each client is open source on [GitHub](https://github.com/htmlcsstoimage), and we welcome issues and pull requests.

[All updates](/changelog/)
