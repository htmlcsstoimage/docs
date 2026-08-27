---
layout: page
title: Upload to DigitalOcean Spaces
nav_title: DigitalOcean Spaces
permalink: /guides/advanced/storage-destinations/digitalocean-spaces/
parent: Storage Destinations
grand_parent: Advanced
great_grand_parent: Guides
nav_order: 4
description: >-
  Upload images generated from HTML/CSS, URL screenshots, and PDFs directly to DigitalOcean Spaces with a scoped Spaces key and HTML/CSS to Image.
---

# Upload images to DigitalOcean Spaces
{: .no_toc }
{: .fs-9 }

Send every rendered image or PDF to a DigitalOcean Space you control.
{: .fs-6 .fw-300 }

<hr>

HTML/CSS to Image connects to DigitalOcean Spaces through its S3-compatible API. HCTI derives the service endpoint from the Space's region and authenticates with a Spaces access key and secret.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

## Before you begin

You need:

- An existing DigitalOcean Space.
- The Space's region, such as `nyc3`, `sfo3`, or `ams3`.
- An optional key prefix, such as `hcti-renders`.

The region appears at the beginning of the Spaces endpoint: `https://<region>.digitaloceanspaces.com`.

## Create a Spaces access key

In the DigitalOcean control panel, open the **Spaces Keys** section and generate a new key.

1. Give the key a recognizable name.
2. Restrict it to the destination Space when possible.
3. Grant object read, write, and delete access for the complete HCTI workflow.
4. Copy the access key and secret. Save the secret when it is shown.

Write access is required for images and connection tests. Read access lets HCTI reload the original for a later resize, crop, or format conversion when **Disable HCTI Storage** is selected. Delete access only cleans up connection-test objects; HCTI does not delete your rendered images.

If you configure both a scoped key and an HCTI key prefix, make sure the key's permitted object path includes that same prefix.

## Add DigitalOcean Spaces to HCTI

Open the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations), click **Add storage destination**, and enter:

| HCTI field | DigitalOcean value |
|:-----------|:-------------------|
| Provider | **DigitalOcean Spaces** |
| Bucket | Existing Space name |
| Key prefix | Optional folder-like prefix, without leading or trailing slashes |
| Region | Space region, such as `nyc3` |
| Access key ID | Spaces access key |
| Secret access key | Spaces secret key |

Click **Test connection**, then enable and save the destination after the test succeeds. Copy the destination `id` for your API requests.

The test writes a small object under `<key-prefix>/.hcti/connection-tests/`. Cleanup is best-effort, so missing delete access does not make a successful write test fail.

## Upload an HCTI image to Spaces

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

Rendering is lazy. With normal HCTI storage enabled, request the returned image URL to render the image and upload the Spaces copy. With **Disable HCTI Storage** selected, send an authenticated `PUT` request to the returned `/v1/store/...` URL.

The base object is stored as `<key-prefix>/<image-id>.png`, or `.pdf` when the request uses `pdf_options`. HCTI does not change the Space's file permissions or CDN configuration.

## Troubleshooting DigitalOcean Spaces uploads

- **The connection test cannot find the Space** — Confirm the Space name and the region at the beginning of its endpoint.
- **Authentication fails** — Use a Spaces key pair, not a DigitalOcean personal access token.
- **A scoped key returns Access Denied** — Confirm that it grants write access to the Space and to the configured prefix.
- **A later transformation fails with HCTI Storage disabled** — Add object read access.
- **Connection-test objects remain** — Add object delete access for `.hcti/connection-tests/`.

DigitalOcean documents the [Spaces S3-compatible API, endpoints, and permission levels](https://docs.digitalocean.com/reference/api/spaces/).

{% include hint.md title="Next: use your storage destination" text="[Continue to the Storage Destinations guide](/guides/advanced/storage-destinations/) for templates, batches, object storage behavior, and the complete `PUT /v1/store` response." %}

{% include code_footer.md version=1 %}
