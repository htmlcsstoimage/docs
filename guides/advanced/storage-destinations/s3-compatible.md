---
layout: page
title: Upload to an S3-compatible service
nav_title: S3-compatible
permalink: /guides/advanced/storage-destinations/s3-compatible/
parent: Storage Destinations
grand_parent: Advanced
great_grand_parent: Guides
nav_order: 7
description: >-
  Upload images generated from HTML/CSS, URL screenshots, and PDFs directly to an S3-compatible object storage service with HTML/CSS to Image.
---

# Upload images to an S3-compatible service
{: .no_toc }
{: .fs-9 }

Connect HTML/CSS to Image to an S3-compatible provider that is not listed separately in the dashboard.
{: .fs-6 .fw-300 }

<hr>

Use the **Other S3-compatible** provider when your object storage service supports the S3 API but does not have a dedicated HCTI option. You supply the service endpoint, signing region, addressing style, and access keys.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **10,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

## Before you begin

You need:

- An existing bucket on an S3-compatible service.
- A public HTTPS S3 API endpoint.
- An access key ID and secret access key.
- The signing region required by the provider, if it uses one.
- The provider's required bucket addressing style.
- An optional key prefix, such as `hcti-renders`.

This option is for public cloud object-storage APIs. HCTI cannot connect to a private network endpoint, a local development server, or a hostname that resolves to a private IP address.

## Create provider credentials

Create credentials restricted to the destination bucket and key prefix whenever the service supports it.

| S3 permission | Required? | Purpose |
|:--------------|:----------|:--------|
| `PutObject` | **Required** | Writes rendered images and the connection-test object. |
| `GetObject` | Optional | Reloads an original for a later transformation when **Disable HCTI Storage** is selected. |
| `DeleteObject` | Optional | Removes connection-test objects. HCTI does not use it to delete rendered images. |

Provider permission names may differ, but the allowed object operations should be equivalent. Confirm that a bucket policy, access policy, or firewall rule does not override the credential with an explicit deny.

## Choose the endpoint and addressing style

Enter the provider's S3 **service endpoint**, not a bucket URL or public file URL.

The custom endpoint must:

- Start with `https://`.
- Resolve to public IP addresses.
- Contain no username or password.
- Contain no path, query string, or fragment.

For example, enter `https://objects.example-provider.com`, not `https://objects.example-provider.com/my-bucket`.

Choose the addressing style required by your provider:

| Addressing style | Request shape |
|:-----------------|:--------------|
| Virtual-hosted | `https://<bucket>.<endpoint>/<key>` |
| Path-style | `https://<endpoint>/<bucket>/<key>` |

Use the provider's S3 integration documentation to determine the signing region and addressing style. A region used for request signing is not always the same as a friendly data-center label.

## Add the service to HCTI

Open the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations), click **Add storage destination**, and enter:

| HCTI field | Value |
|:-----------|:------|
| Provider | **Other S3-compatible** |
| Bucket | Existing bucket name |
| Key prefix | Optional folder-like prefix, without leading or trailing slashes |
| Endpoint | Public HTTPS S3 service endpoint |
| Signing region | Provider's signing region, if required |
| Addressing style | Virtual-hosted or path-style, as required by the provider |
| Access key ID | Provider-issued access key ID |
| Secret access key | Provider-issued secret access key |

Click **Test connection**, then enable and save the destination after the test succeeds. Copy the destination `id` for your API requests.

The test writes a small object under `<key-prefix>/.hcti/connection-tests/`. Cleanup is best-effort, so missing delete access does not make a successful write test fail.

## Upload an HCTI image to your bucket

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

Rendering is lazy. With normal HCTI storage enabled, request the returned image URL to render the image and upload the provider copy. With **Disable HCTI Storage** selected, send an authenticated `PUT` request to the returned `/v1/store/...` URL.

The base object is stored as `<key-prefix>/<image-id>.png`, or `.pdf` when the request uses `pdf_options`. The provider's bucket policy continues to control object access.

## Troubleshooting S3-compatible uploads

- **The custom endpoint is rejected** — Remove the bucket path, credentials, query string, or fragment. Confirm the endpoint uses HTTPS and public DNS.
- **TLS validation fails** — Use the provider's public service hostname with a valid certificate. Self-signed certificates are not supported.
- **The connection test returns a signature error** — Recheck the access key, secret, signing region, and the provider's expected clock and signing configuration.
- **The bucket is missing from the request** — Switch between virtual-hosted and path-style addressing according to the provider's documentation.
- **A later transformation fails with HCTI Storage disabled** — Add the provider's equivalent of `GetObject`.

If the provider has a dedicated option in HCTI, use that option instead; it preconfigures the endpoint and addressing behavior. See the [Amazon S3](/guides/advanced/storage-destinations/s3/), [Cloudflare R2](/guides/advanced/storage-destinations/r2/), [Backblaze B2](/guides/advanced/storage-destinations/backblaze-b2/), [DigitalOcean Spaces](/guides/advanced/storage-destinations/digitalocean-spaces/), [Wasabi](/guides/advanced/storage-destinations/wasabi/), and [Google Cloud Storage](/guides/advanced/storage-destinations/google-cloud-storage/) guides.

{% include hint.md title="Next: use your storage destination" text="[Continue to the Storage Destinations guide](/guides/advanced/storage-destinations/) for templates, batches, object storage behavior, and the complete `PUT /v1/store` response." %}

{% include code_footer.md version=1 %}
