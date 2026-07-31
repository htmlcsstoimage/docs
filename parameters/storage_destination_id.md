---
layout: page
title: storage_destination_id
permalink: /parameters/storage_destination_id/
parent: Parameters
nav_order: 140
description: >-
  Store rendered images in an Amazon S3 or S3-compatible storage destination configured for your organization.
---

# Using storage_destination_id
{: .no_toc }
{: .fs-9 }

Store rendered images in a storage bucket your organization controls.
{: .fs-6 .fw-300 }

<hr>

## How it works

The `storage_destination_id` parameter tells the API to save rendered files to a destination configured in the dashboard at [https://htmlcsstoimage.com/dashboard/storage-destinations](https://htmlcsstoimage.com/dashboard/storage-destinations).

It works with:

- HTML/CSS image requests.
- URL screenshot requests.
- Image batches, as either a variation or a default option.
- Templates, where the destination is saved for images created from the template.

For provider setup, permissions, connection testing, and storage behavior, see the full [Storage Destinations guide](/guides/advanced/storage-destinations/).

When you choose to **Disable HCTI Storage**, the image create response contains a `/v1/store/...` URL. Send an authenticated `PUT` request to that URL using valid API credentials from the same organization as the image. A `200` or `424` response reports the overall outcome and the status, target, bucket, and key for the base image and any transformation. See [Store response](/guides/advanced/storage-destinations/#store-response) for the full response format.

## Value

| Type | Description                                                               |
|:-----|:--------------------------------------------------------------------------|
| `String` | The `id` for one of your organization's **enabled** storage destinations. |

## Example usage

### JSON request

```json
{
  "html": "<h1>Saved in my bucket</h1>",
  "storage_destination_id": "your-storage-destination-id"
}
```

### cURL

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'UserID:APIKey' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://example.com",
        "storage_destination_id": "your-storage-destination-id"
      }'
```

### Template

```json
{
  "name": "Stored template",
  "html": "<h1>Saved in my bucket</h1>",
  "storage_destination_id": "your-storage-destination-id"
}
```

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**." %}

{% include code_footer.md version=1 %}
