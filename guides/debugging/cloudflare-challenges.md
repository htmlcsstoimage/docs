---
layout: page
title: Avoiding Cloudflare Challenges in Screenshots
nav_title: Cloudflare Challenges
permalink: /guides/debugging/cloudflare-challenges/
parent: Debugging
grand_parent: Guides
nav_order: 5
description: >-
  Allow authorized HTML/CSS to Image renders through a Cloudflare challenge on a site you control.
---

# Bypassing Cloudflare challenges for sites you control
{: .no_toc }
{: .fs-9 }

Diagnose screenshots that capture a Cloudflare challenge instead of your page, then create a safe exception for authorized renders.
{: .fs-6 .fw-300 }

<hr>

{% include hint.md title="Only for sites you control" text="Use this approach only for a domain and Cloudflare account you own or administer. It is not a way to bypass another site's access controls." %}

## The problem

HCTI loads your page in Chrome from AWS. Cloudflare may classify the request as automated traffic and return a challenge instead of your page. HCTI renders that response, so the image may show **Just a moment**, appear blank, or time out even though the URL works in your browser.

Because Cloudflare is intentionally withholding the page, increasing `ms_delay` or retrying the render will not resolve the problem.

This guide is for sites whose Cloudflare configuration you control. It creates a narrow exception for authorized HCTI renders while leaving protections in place for other traffic.

## The approach

Send a private value with the HCTI [`headers` parameter](/parameters/headers/), then create a Cloudflare rule that recognizes it and skips only the protection blocking the authorized render.

Do not use [`identify_as_hcti`](/parameters/identify_as_hcti/) as the allow signal. Its `X-HCTI-SCREENSHOT: 1` value is public and can be copied by anyone.

## 1. Create a private header

Choose a header name and a long, random value. Treat the value like a password. For example:

```text
Header name:  X-HCTI-Allow
Header value: replace-with-a-long-random-value
```

Use a value dedicated to this rule so it can be rotated or revoked without affecting another system. A short-lived or regularly rotated value is preferable.

## 2. Add a Cloudflare skip rule

In the Cloudflare dashboard:

1. Select your domain and open **Security > WAF > Custom rules**.
2. Create a custom rule and place it before the rule or protection issuing the challenge.
3. Match both your hostname and the private header value:

   ```text
   (http.host eq "example.com" and any(http.request.headers["x-hcti-allow"][*] eq "replace-with-a-long-random-value"))
   ```

4. Choose the **Skip** action.
5. Select only the Cloudflare components responsible for the challenge, then deploy the rule.

Cloudflare normalizes header names to lowercase in rule expressions. Its [header-field reference](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#http-request-header-fields) documents the request-header map and `any()` syntax.

Keep the bypass narrow: require the exact hostname and secret value, and skip as few security features as possible. Cloudflare documents the available [Skip rule options](https://developers.cloudflare.com/waf/custom-rules/skip/options/) and explains how rule order affects a [Skip custom rule](https://developers.cloudflare.com/waf/custom-rules/skip/).

## 3. Send the header with HCTI

Send a standard authenticated JSON request so the private value is not placed in a URL:

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'UserID:APIKey' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://example.com/private-report",
        "headers": {
          "X-HCTI-Allow": "replace-with-a-long-random-value"
        }
      }'
```

The custom header is sent to the top-level document by default. It is restricted to the requested URL's origin, so a cross-origin redirect will not receive it unless that exact origin is explicitly allowed with [`additional_header_origins`](/parameters/headers/#additional-header-origins).

## 4. Verify and troubleshoot

First confirm that an HCTI request without the private header is still challenged and that the request with the correct value succeeds. Then check Cloudflare's [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to identify the product or rule taking action if the request is still blocked.

Cloudflare Skip rules can bypass selected products and phases, including Managed Rules, rate limiting rules, and Super Bot Fight Mode when the corresponding options are available. Cloudflare's [feature-interoperability reference](https://developers.cloudflare.com/waf/feature-interoperability/) notes that Bot Fight Mode itself cannot be skipped with a custom rule.

If a same-origin CSS file, image, JavaScript file, or API request is challenged separately, set [`include_headers_on_subrequests`](/parameters/headers/#include-headers-on-subrequests) to `true`:

```json
{
  "url": "https://example.com/private-report",
  "headers": {
    "X-HCTI-Allow": "replace-with-a-long-random-value"
  },
  "include_headers_on_subrequests": true
}
```

If the protected resource uses a different origin, add that exact origin to `additional_header_origins`:

```json
{
  "url": "https://example.com/private-report",
  "headers": {
    "X-HCTI-Allow": "replace-with-a-long-random-value"
  },
  "additional_header_origins": [
    "https://assets.example.com"
  ],
  "include_headers_on_subrequests": true
}
```

Custom headers are never sent to an origin outside the requested URL's origin and this explicit allowlist. Add only origins you control and that use the same private-header rule.

## Operational checklist

- Store the value in your server's secret manager or environment configuration.
- Do not put it in client-side JavaScript, source control, or a create-and-render URL.
- Scope the Cloudflare expression to the expected hostname and exact header value.
- Keep `additional_header_origins` limited to exact origins you control.
- Skip only the feature that blocks the authorized render.
- Rotate the value periodically and immediately after suspected exposure.

{% include hint.md title="Not a Cloudflare challenge?" text="If the site is not protected by Cloudflare, or the problem is related to the render's source IP, network access, or region, an [HTTP proxy](/guides/advanced/proxies/) may be a better fit. Proxies can provide a stable allowlisted IP, access to private content, or different outbound routing." %}

{% include code_footer.md version=2 %}
