---
layout: page
title: Upload to Google Cloud Storage
nav_title: Google Cloud Storage
permalink: /guides/advanced/storage-destinations/google-cloud-storage/
parent: Storage Destinations
grand_parent: Advanced
great_grand_parent: Guides
nav_order: 6
description: >-
  Upload images generated from HTML/CSS, URL screenshots, and PDFs directly to Google Cloud Storage with HMAC credentials and HTML/CSS to Image.
---

# Upload images to Google Cloud Storage
{: .no_toc }
{: .fs-9 }

Send every rendered image or PDF to a Google Cloud Storage bucket you control.
{: .fs-6 .fw-300 }

<hr>

HTML/CSS to Image connects to Google Cloud Storage through its S3-compatible XML API. A Google Cloud service account supplies bucket permissions, and an HMAC access ID and secret authenticate HCTI requests.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

## Before you begin

You need:

- An existing Cloud Storage bucket.
- A Google Cloud service account for HCTI.
- Permission to grant bucket IAM roles and create HMAC keys.
- An optional key prefix, such as `hcti-renders`.

## Grant bucket access

Grant the service account access on the destination bucket. **Storage Object User** (`roles/storage.objectUser`) supports the complete HCTI workflow: creating, reading, updating, and deleting objects without granting bucket administration.

You can use a narrower role when your workflow permits it:

| Google Cloud access | HCTI behavior |
|:--------------------|:--------------|
| Create objects | **Required** to upload renders and pass the connection test. |
| Read objects | Needed for a later resize, crop, or format conversion when **Disable HCTI Storage** is selected. |
| Delete objects | Used only to remove connection-test objects. HCTI does not delete rendered images. |

**Storage Object Creator** (`roles/storage.objectCreator`) is sufficient for new-object writes, but it cannot read, delete, or overwrite objects. Use it only if those limitations match your HCTI workflow.

## Create an HMAC key

HMAC keys are different from downloadable JSON or RSA service account keys.

1. In the Google Cloud console, open **Cloud Storage → Settings**.
2. Select the **Interoperability** tab.
3. In the service account HMAC section, click **Create a key for a service account**.
4. Select the service account that has access to the bucket.
5. Create the key and copy its **Access ID** and **Secret**.

Google Cloud shows a service account HMAC secret only when the key is created. If you lose it, create a new HMAC key.

## Add Google Cloud Storage to HCTI

Open the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations), click **Add storage destination**, and enter:

| HCTI field | Google Cloud value |
|:-----------|:-------------------|
| Provider | **Google Cloud Storage** |
| Bucket | Existing Cloud Storage bucket name |
| Key prefix | Optional folder-like prefix, without leading or trailing slashes |
| Access key ID | HMAC Access ID |
| Secret access key | HMAC Secret |

Google Cloud Storage does not require a region in the HCTI form. Click **Test connection**, then enable and save the destination after the test succeeds. Copy the destination `id` for your API requests.

The test writes a small object under `<key-prefix>/.hcti/connection-tests/`. Cleanup is best-effort, so missing delete access does not make a successful write test fail.

## Upload an HCTI image to Cloud Storage

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

Rendering is lazy. With normal HCTI storage enabled, request the returned image URL to render the image and upload the Cloud Storage copy. With **Disable HCTI Storage** selected, send an authenticated `PUT` request to the returned `/v1/store/...` URL.

The base object is stored as `<key-prefix>/<image-id>.png`, or `.pdf` when the request uses `pdf_options`. Google Cloud IAM and bucket settings continue to control object access.

## Troubleshooting Google Cloud Storage uploads

- **Authentication fails with a JSON service account key** — Create an HMAC key and enter its Access ID and Secret instead.
- **The HMAC key exists but access is denied** — Confirm that its service account has object permissions on the exact destination bucket.
- **A new HMAC key fails immediately** — Confirm that the key is active. Google Cloud configuration changes can take time to propagate.
- **A later transformation fails with HCTI Storage disabled** — Grant object read access.
- **Connection-test objects remain** — Grant object delete access for `.hcti/connection-tests/`.

Google Cloud documents [creating service account HMAC keys](https://cloud.google.com/storage/docs/authentication/managing-hmackeys) and [Cloud Storage IAM roles](https://cloud.google.com/storage/docs/access-control/iam-roles).

{% include hint.md title="Next: use your storage destination" text="[Continue to the Storage Destinations guide](/guides/advanced/storage-destinations/) for templates, batches, object storage behavior, and the complete `PUT /v1/store` response." %}

{% include code_footer.md version=1 %}
