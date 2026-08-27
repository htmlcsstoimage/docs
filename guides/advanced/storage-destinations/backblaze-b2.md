---
layout: page
title: Upload to Backblaze B2
nav_title: Backblaze B2
permalink: /guides/advanced/storage-destinations/backblaze-b2/
parent: Storage Destinations
grand_parent: Advanced
great_grand_parent: Guides
nav_order: 3
description: >-
  Upload images generated from HTML/CSS, URL screenshots, and PDFs directly to Backblaze B2 using its S3-compatible API and HTML/CSS to Image.
---

# Upload images to Backblaze B2
{: .no_toc }
{: .fs-9 }

Send every rendered image or PDF to a Backblaze B2 bucket you control.
{: .fs-6 .fw-300 }

<hr>

HTML/CSS to Image connects to Backblaze B2 through its S3-compatible API. A scoped B2 application key supplies the access key ID and secret used by HCTI.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

## Before you begin

You need:

- An existing B2 bucket.
- The bucket's B2 region, such as `us-west-004`.
- An optional key prefix, such as `hcti-renders`.

The region appears in the bucket's S3 endpoint: `https://s3.<region>.backblazeb2.com`.

## Create a Backblaze application key

In the Backblaze web console, open **Application Keys** and create a new application key.

1. Give the key a recognizable name.
2. Restrict it to the destination bucket.
3. Choose **Read and Write** access if HCTI may need to create later transformations while HCTI Storage is disabled. Write access is enough for base uploads.
4. If offered, restrict the key to the same file-name prefix you will enter in HCTI.
5. Copy the resulting `keyID` and `applicationKey`. The application key secret is shown only once.

Do not use the master application key. Backblaze does not support it with the S3-compatible API.

The credentials map to HCTI fields like this:

| Backblaze value | HCTI field |
|:----------------|:-----------|
| `keyID` | Access key ID |
| `applicationKey` | Secret access key |

For least-privilege custom capabilities, `writeFiles` provides uploads, `readFiles` supports later transformations, and `deleteFiles` supports connection-test cleanup. Some S3 integrations also need `listAllBucketNames` for a bucket-scoped key, although HCTI's connection test writes directly to the configured bucket.

## Add Backblaze B2 to HCTI

Open the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations), click **Add storage destination**, and enter:

| HCTI field | Backblaze value |
|:-----------|:----------------|
| Provider | **Backblaze B2** |
| Bucket | Existing B2 bucket name |
| Key prefix | Optional folder-like prefix, without leading or trailing slashes |
| Region | Region from the B2 S3 endpoint, such as `us-west-004` |
| Access key ID | Application key `keyID` |
| Secret access key | `applicationKey` secret |

Click **Test connection**, then enable and save the destination after the test succeeds. Copy the destination `id` for your API requests.

The test writes a small object under `<key-prefix>/.hcti/connection-tests/`. Cleanup is best-effort, so missing delete access does not make a successful write test fail.

## Upload an HCTI image to B2

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

Rendering is lazy. With normal HCTI storage enabled, request the returned image URL to render the image and upload the B2 copy. With **Disable HCTI Storage** selected, send an authenticated `PUT` request to the returned `/v1/store/...` URL.

The base object is stored as `<key-prefix>/<image-id>.png`, or `.pdf` when the request uses `pdf_options`. Your B2 bucket settings determine whether that object is private or publicly accessible.

## Troubleshooting Backblaze B2 uploads

- **Authentication fails with a master key** — Create a standard application key; the master application key does not work with the S3-compatible API.
- **The connection test uses the wrong endpoint** — Enter the region embedded in the bucket's S3 endpoint, including its numeric suffix.
- **A bucket-scoped key is rejected** — Confirm the key is scoped to the exact bucket. If the error involves listing buckets, enable **Allow List All Bucket Names**.
- **A later transformation fails with HCTI Storage disabled** — Add `readFiles` access.
- **Connection-test objects remain** — Add the capabilities Backblaze requires for deleting objects, including `deleteFiles`.

Backblaze documents [creating scoped application keys](https://www.backblaze.com/docs/en/cloud-storage-get-started-with-a-backblaze-integration) and [calling the B2 S3-compatible API](https://www.backblaze.com/docs/en/cloud-storage-call-the-s3-compatible-api).

{% include hint.md title="Next: use your storage destination" text="[Continue to the Storage Destinations guide](/guides/advanced/storage-destinations/) for templates, batches, object storage behavior, and the complete `PUT /v1/store` response." %}

{% include code_footer.md version=1 %}
