---
layout: page
title: headers
permalink: /parameters/headers/
parent: Parameters
nav_order: 50
description: >-
  Add custom HTTP headers when screenshotting a URL.
---

# Using headers
{: .no_toc }
{: .fs-9 }

Add custom HTTP headers to a URL screenshot request.
{: .fs-6 .fw-300 }

<hr>

## How it works

The `headers` parameter adds custom HTTP headers when the API loads a page from `url`. By default, they are sent only with top-level page navigations to the requested URL's origin.

Custom headers are restricted by origin:

- The requested URL's origin is always allowed.
- Requests to another origin receive the headers only when that exact origin is listed in `additional_header_origins`.
- Subrequests for resources like CSS, images, and JavaScript receive the headers only when `include_headers_on_subrequests` is `true`.

An origin is the combination of scheme, hostname, and port. For example, `https://example.com`, `http://example.com`, and `https://api.example.com` are different origins. This restriction prevents custom headers from leaking through cross-origin redirects or third-party resources.

This parameter is available for URL screenshots. It is not used when rendering HTML/CSS or templates.

Common uses include:

- Supplying a session `Cookie` for a page you are authorized to access.
- Sending an `Authorization` header to a protected application.
- Passing a custom header that selects test content or safely bypasses a challenge on a site you control.
- Overriding `User-Agent` for a specific render.

{% include hint.md title="Protect secrets" text="Avoid exposing long-lived credentials in screenshot requests. Prefer short-lived, narrowly scoped tokens. Never put secrets in a create-and-render URL because URLs can be stored in browser history, access logs, analytics, and referrer data." %}

{% include hint.md title="User-Agent behavior" text="User-Agent configures Chrome's browser-level user agent and applies to all requests made by the page. Other custom headers follow the origin restrictions documented here." %}

## Request formats

### JSON

For a JSON request, pass `headers` as a flat object whose properties are header names and string values:

```json
{
  "url": "https://example.com/account",
  "headers": {
    "Cookie": "session=short-lived-session-value",
    "X-Preview-Mode": "enabled"
  }
}
```

The object has a maximum depth of one. Nested objects and arrays are not supported.

### Form submission

For an `application/x-www-form-urlencoded` form submission, repeat the `headers` field once for each header. Each field uses `name:value`:

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'UserID:APIKey' \
  --data-urlencode 'url=https://example.com/account' \
  --data-urlencode 'headers=Cookie:session=short-lived-session-value' \
  --data-urlencode 'headers=X-Preview-Mode:enabled'
```

The API splits each entry at the first colon, so a header value can contain additional colons.

### Create-and-render URL

For a [signed create-and-render request](/getting-started/create-and-render/), repeat the `headers` query parameter using the same `name:value` format:

```text
url=https%3A%2F%2Fexample.com%2Fpreview&headers=X-Preview-Mode%3Aenabled&headers=X-Release%3A2026-07
```

Every repeated parameter, in its exact order and encoding, must be included when calculating the HMAC token.

Use create-and-render headers only for non-sensitive values. The complete header names and values are visible in the URL.

## Header rules and limits

- A request can include up to 20 custom headers.
- Header names are case-insensitive and must not be repeated. For example, `Authorization` and `authorization` are the same name.
- A header name can be up to 512 ASCII characters. Valid HTTP header names use ASCII letters, digits, and the standard header-name punctuation characters.
- A header value can be up to 8,192 UTF-8 bytes.
- Header values cannot contain control characters other than a horizontal tab.
- Hop-by-hop, proxy, forwarding, connection, host, and other infrastructure-controlled headers cannot be overridden. Header names beginning with `Proxy-`, `Sec-`, or `X-Forwarded-` are also restricted.

Validation is performed by the API. Invalid, duplicate, restricted, or oversized headers return a request error.

## additional_header_origins
{: #additional-header-origins }

| Type | Default | Description |
|:-----|:--------|:------------|
| `Array of strings` | `[]` | Additional exact HTTP or HTTPS origins allowed to receive custom `headers`. |

Use `additional_header_origins` when an authorized cross-origin navigation or subrequest also needs the custom headers:

```json
{
  "url": "https://app.example.com/private-report",
  "headers": {
    "Authorization": "Bearer short-lived-token"
  },
  "additional_header_origins": [
    "https://api.example.com",
    "https://assets.example.com:8443"
  ],
  "include_headers_on_subrequests": true
}
```

Each value must be an exact origin in the form `scheme://host[:port]`:

- Only `http` and `https` origins are supported.
- Paths, queries, fragments, credentials, and wildcards are not allowed.
- A trailing `/` is optional.
- You can include up to 20 unique origins, each up to 512 UTF-8 bytes.
- Equivalent or duplicate origins are ignored.
- `headers` must also be present when using `additional_header_origins`.

For form and create-and-render requests, repeat the parameter once per origin:

```text
additional_header_origins=https%3A%2F%2Fapi.example.com&additional_header_origins=https%3A%2F%2Fassets.example.com%3A8443
```

Include every repeated value in the exact query string used to calculate a create-and-render HMAC token.

## include_headers_on_subrequests
{: #include-headers-on-subrequests }

| Type | Default | Description |
|:-----|:--------|:------------|
| `Boolean` | `false` | Also send custom `headers` with subrequests to the requested URL's origin and any `additional_header_origins`. |

Set `include_headers_on_subrequests` to `true` only when subrequests for resources like CSS, images, and JavaScript also require the same headers:

```json
{
  "url": "https://example.com/private-report",
  "headers": {
    "Authorization": "Bearer short-lived-token"
  },
  "include_headers_on_subrequests": true
}
```

Requests to origins outside the requested URL's origin and `additional_header_origins` never receive the custom headers. Keep `include_headers_on_subrequests` set to `false` when the header is needed only for the main page.

For a practical use case, see [Bypassing Cloudflare challenges for sites you control](/guides/debugging/cloudflare-challenges/).

{% include code_footer.md version=3 %}
