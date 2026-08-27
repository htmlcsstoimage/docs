---
layout: page
title: Upload to Wasabi
nav_title: Wasabi
permalink: /guides/advanced/storage-destinations/wasabi/
parent: Storage Destinations
grand_parent: Advanced
great_grand_parent: Guides
nav_order: 5
description: >-
  Upload images generated from HTML/CSS, URL screenshots, and PDFs directly to Wasabi using S3-compatible access keys and HTML/CSS to Image.
---

# Upload images to Wasabi
{: .no_toc }
{: .fs-9 }

Send every rendered image or PDF to a Wasabi bucket you control.
{: .fs-6 .fw-300 }

<hr>

HTML/CSS to Image connects to Wasabi through its S3-compatible API. HCTI derives the service endpoint from the bucket's Wasabi region and authenticates with an access key and secret.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

## Before you begin

You need:

- An existing Wasabi bucket.
- The bucket's Wasabi region, such as `us-east-1`.
- An optional key prefix, such as `hcti-renders`.

Use the region shown for the bucket in the Wasabi console. HCTI uses it to select the regional S3 service endpoint.

## Create Wasabi credentials

For least-privilege access, create a Wasabi sub-user for HCTI, restrict it to the destination bucket and optional prefix with a policy, and create an access key for that user.

The policy should allow the S3 equivalents of:

| Permission | Required? | Purpose |
|:-----------|:----------|:--------|
| `s3:PutObject` | **Required** | Writes rendered images and the connection-test object. |
| `s3:GetObject` | Optional | Reloads an original for a later transformation when **Disable HCTI Storage** is selected. |
| `s3:DeleteObject` | Optional | Removes connection-test objects. HCTI does not use it to delete rendered images. |

In the Wasabi console, open **Access Keys**, click **Create Access Key**, and create the key for the restricted sub-user. Copy the access key ID and secret key. Wasabi does not show the secret again after you close the key details.

## Add Wasabi to HCTI

Open the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations), click **Add storage destination**, and enter:

| HCTI field | Wasabi value |
|:-----------|:-------------|
| Provider | **Wasabi** |
| Bucket | Existing Wasabi bucket name |
| Key prefix | Optional folder-like prefix, without leading or trailing slashes |
| Region | Bucket region, such as `us-east-1` |
| Access key ID | Wasabi access key ID |
| Secret access key | Wasabi secret key |

Click **Test connection**, then enable and save the destination after the test succeeds. Copy the destination `id` for your API requests.

The test writes a small object under `<key-prefix>/.hcti/connection-tests/`. Cleanup is best-effort, so missing delete access does not make a successful write test fail.

## Upload an HCTI image to Wasabi

Pass the destination ID as `storage_destination_id` when you create an image:

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'user-id:api-key' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://example.com",
        "storage_destination_id": "your-storage-destination-id"
      }'
```

Rendering is lazy. With normal HCTI storage enabled, request the returned image URL to render the image and upload the Wasabi copy. With **Disable HCTI Storage** selected, send an authenticated `PUT` request to the returned `/v1/store/...` URL.

The base object is stored as `<key-prefix>/<image-id>.png`, or `.pdf` when the request uses `pdf_options`. Your Wasabi bucket policy controls access; HCTI does not make the object public.

## Troubleshooting Wasabi uploads

- **The connection test cannot find the bucket** — Confirm the bucket name and its Wasabi region.
- **Authentication fails** — Confirm that both parts of the Wasabi access key pair are current and belong to the intended user.
- **A restricted user returns Access Denied** — Confirm that both the identity policy and bucket policy permit writes to the configured prefix and do not contain a conflicting explicit deny.
- **A later transformation fails with HCTI Storage disabled** — Add `s3:GetObject` for the configured prefix.
- **Connection-test objects remain** — Add `s3:DeleteObject` for `.hcti/connection-tests/`.

Wasabi documents [creating access keys](https://docs.wasabi.com/docs/creating-a-new-access-key) and its [regional S3 service endpoints](https://docs.wasabi.com/docs/service-url-endpoints).

{% include hint.md title="Next: use your storage destination" text="[Continue to the Storage Destinations guide](/guides/advanced/storage-destinations/) for templates, batches, object storage behavior, and the complete `PUT /v1/store` response." %}

{% include code_footer.md version=1 %}
