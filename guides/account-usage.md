---
layout: page
title: Checking account usage
permalink: /guides/account-usage/
parent: Guides
nav_order: 2
description: >-
  Learn how to monitor your HTML/CSS to Image API usage through response headers and dedicated endpoints.
---

# Monitoring API Usage
{: .no_toc }
{: .fs-9 }

Two simple ways to track your image generation usage
{: .fs-6 .fw-300 }

<hr>

## Automated Usage Alerts

We automatically send email notifications when your account reaches usage thresholds:
- At 80% of your monthly limit
- At 100% of your monthly limit

## Response Headers

The simplest way to monitor usage is through the response headers returned with each image creation. These headers provide real-time usage information:

| Header | Description |
|:-------|:------------|
| `x-renders-allowed` | Your total image allowance for the current billing period |
| `x-renders-consumed` | Number of renders used by this specific request |
| `x-renders-used` | Total renders used in the current billing period |

{% include hint.md title="Monitoring Tip" text="These headers make it easy to implement usage alerts in your application before hitting your plan limits." %}

## Usage API Endpoint

For detailed usage statistics, use our dedicated usage endpoint:

<pre class="http-method fs-4">
  <span>get</span> https://hcti.io<b>/v1/usage</b>
</pre>

This endpoint returns comprehensive usage data broken down by:
- Hourly usage (last 72 hours)
- Daily usage (last 60 days)
- Monthly usage (last 12 months)
- Per billing period statistics

### Example Request

```bash
curl -X GET https://hcti.io/v1/usage \
  -u 'user-id:api-key'
```

### Response Format

The response includes usage data organized into different time periods:

```javascript
{
  "data": {
    "hour": {
      "2024-03-17T13:00:00Z": 29,
      // ... hourly data
    },
    "day": {
      "2024-03-17T00:00:00Z": 838,
      // ... daily data
    },
    "month": {
      "2024-03-01T00:00:00Z": 50747,
      // ... monthly data
    }
  },
  "per_billing_period": [
    {
      "total_images": 40935,
      "start": "2024-03-01T00:00:00Z",
      "end": "2024-04-01T00:00:00Z"
    }
    // ... previous billing periods
  ]
}
```

{% include hint.md title="Usage Tracking" text="Consider implementing regular usage checks with this endpoint to monitor trends and plan capacity needs." %}

{% include code_footer.md version=1 %}
