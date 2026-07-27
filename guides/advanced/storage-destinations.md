---
layout: page
title: Storage Destinations
permalink: /guides/advanced/storage-destinations/
parent: Advanced
grand_parent: Guides
nav_order: 7
description: >-
  Use Storage Destinations to automate rendering HTML/CSS images, URL screenshots or dynamic templated images to your Amazon S3 or S3-compatible bucket.
---

# Storage Destinations
{: .no_toc }
{: .fs-9 }

Store rendered images in an Amazon S3 or S3-compatible bucket you control.
{: .fs-6 .fw-300 }

<hr>

## Why use a storage destination?

A storage destination tells HTML/CSS to Image where to write a copy of each rendered file. Use one when you want to:

- Keep a copy of generated files in storage your organization controls.
- Apply your own retention, backup, replication, and access policies.
- Deliver images from your own domain or CDN.
- Keep rendered files out of HTML/CSS to Image storage when you choose **Disable HCTI Storage**.

By default, HTML/CSS to Image keeps its normal copy and also writes a copy to your destination. If you choose **Disable HCTI Storage**, your bucket becomes the only location where the rendered file is stored.

{% include hint.md title="Plan availability" text="Storage destinations are available on the **3,000 images/month plan or higher**. If you'd like to try this on a different plan, email **support@htmlcsstoimage.com**." %}

<hr>

## Supported providers

| Provider | Authentication | Additional settings |
|:---------|:---------------|:--------------------|
| Amazon S3 | IAM role | AWS region |
| Cloudflare R2 | R2 access key and secret | Cloudflare account ID and optional data jurisdiction |
| Backblaze B2 | Application key and secret | B2 region |
| DigitalOcean Spaces | Spaces access key and secret | Spaces region |
| Wasabi | Access key and secret | Wasabi region |
| Google Cloud Storage | HMAC access ID and secret | — |
| Other S3-compatible service | Access key and secret | Public HTTPS endpoint, optional signing region, and addressing style |

The bucket must already exist. HTML/CSS to Image does not create buckets for you.

<hr>

## Creating a storage destination

Storage destinations are managed in the [Storage Destinations dashboard](https://htmlcsstoimage.com/dashboard/storage-destinations). A destination combines a bucket, an optional key prefix, credentials, and the choice of whether HTML/CSS to Image should also keep its normal copy.

1. Click **Add storage destination**.
2. Enter an internal name and choose the provider.
3. Enter the existing bucket name and, optionally, a key prefix such as `renders`.
4. Add the provider-specific authentication details.
5. Click **Test connection**.
6. Enable and save the destination after the test succeeds.
7. Copy the destination `id` for use as `storage_destination_id` in API requests.

The optional key prefix works like a folder and keeps HCTI objects within one part of the bucket. Enter it without leading or trailing slashes.

### Amazon S3

Amazon S3 uses an IAM role instead of a long-lived access key. HTML/CSS to Image assumes that role and receives temporary AWS credentials when it needs to access your bucket.

The dashboard generates two example policies after you enter the bucket and optional key prefix. They serve different purposes and belong in different parts of the IAM role.

#### Trust policy

The trust policy answers: **Who can assume this role?**

- Add it to the role's **Trust relationships** in AWS IAM.
- Its principal is the HTML/CSS to Image storage writer role.
- Its action is `sts:AssumeRole`.
- Its `sts:ExternalId` condition contains an ID unique to your HTML/CSS to Image organization.

The external ID prevents the HCTI writer role from using this role on behalf of a different organization. Use the value generated in your dashboard and do not reuse it for another organization. The trust policy only allows the role to be assumed; it does not grant access to any S3 objects.

#### Role permissions policy

The role permissions policy answers: **What can HCTI do after assuming the role?**

Attach the generated policy to the role as an inline or managed permissions policy. It should scope object access to:

- `arn:aws:s3:::<bucket>/<key-prefix>/*` for rendered images.
- `arn:aws:s3:::<bucket>/<key-prefix>/.hcti/connection-tests/*` for connection-test cleanup.

The generated example includes these permissions:

| Permission | Required? | What happens without it |
|:-----------|:----------|:------------------------|
| `s3:PutObject` | **Required** | The connection test fails, the destination cannot be enabled, and HCTI cannot save rendered files. |
| `s3:GetObject` | Optional | When you choose to **Disable HCTI Storage**, HCTI can still write the base image and any transformation included in the initial render. A later resize, crop, or format conversion returns an error because HCTI cannot reload the original from your bucket. |
| `s3:DeleteObject` | Optional | The connection test still succeeds, but its small test object remains under `<key-prefix>/.hcti/connection-tests/`. This permission is not used to delete rendered images. |

The connection test verifies that HCTI can assume the role and write a small text object. Deleting that object is best-effort, so cleanup failure does not fail the test. The test does not verify `s3:GetObject`; if you plan to use **Disable HCTI Storage** and request transformations after the initial store, include read access in the role policy.

To finish the AWS setup:

1. Create an IAM role in your AWS account.
2. Add the dashboard-generated trust policy to the role's trust relationship.
3. Attach the dashboard-generated role permissions policy.
4. Paste the role ARN into the storage destination form.
5. Test the connection, then enable and save the destination.

### Cloudflare R2

Cloudflare R2 uses your Cloudflare account ID and S3 API credentials. Create the credentials from an R2 API token with **Object Read & Write** access scoped to the destination bucket.

The optional **Data jurisdiction** setting selects the R2 jurisdictional endpoint:

| Dashboard option | Endpoint | Use when |
|:-----------------|:---------|:---------|
| **Default** | `<account-id>.r2.cloudflarestorage.com` | The bucket has no jurisdiction restriction. This is also the correct choice for buckets that use a location hint. |
| **European Union** | `<account-id>.eu.r2.cloudflarestorage.com` | The bucket was created in the European Union jurisdiction. |
| **FedRAMP** | `<account-id>.fedramp.r2.cloudflarestorage.com` | The bucket was created in the FedRAMP jurisdiction. |

Choose the jurisdiction that was used when the bucket was created. Selecting **European Union** or **FedRAMP** for a bucket without that restriction, or selecting **Default** for a jurisdiction-restricted bucket, points HCTI at the wrong endpoint and causes the connection test to fail.

Changing **Data jurisdiction** changes the destination endpoint. Run **Test connection** again before saving the updated destination.

### Other providers

Backblaze B2, DigitalOcean Spaces, Wasabi, Google Cloud Storage, and other S3-compatible services also use provider-issued access keys. Create credentials restricted to the destination bucket and key prefix whenever the provider supports it.

Those credentials need the provider's equivalent of object write permission. Read permission has the same conditional requirement described above, and delete permission is only used to clean up connection-test objects.

Credentials are encrypted before being stored. Saved secret access keys are not displayed again.

{% include hint.md title="Custom endpoints must be public" text="An **Other S3-compatible** endpoint must use HTTPS, resolve to public IP addresses, and must not include credentials, a path, query string, or fragment." %}

<hr>

## Using a destination

Once the destination is enabled, pass its ID as `storage_destination_id` when creating an image or template.

You can use Storage Destinations to automate rendering HTML/CSS images, URL screenshots or dynamic templated images to your S3-compatible bucket.

### JSON request

```json
{
  "html": "<div class='card'>Saved in my bucket</div>",
  "css": ".card { padding: 40px; background: #f4f4f5; }",
  "storage_destination_id": "your-storage-destination-id"
}
```

### cURL

```bash
curl -X POST https://hcti.io/v1/image \
  -u 'user-id:api-key' \
  -H 'Content-Type: application/json' \
  -d '{
        "url": "https://example.com",
        "storage_destination_id": "your-storage-destination-id"
      }'
```

### TypeScript client

```typescript
import {
  CreateHtmlCssImageRequest,
  HtmlCssToImageClient
} from '@html-css-to-image/client';

const client = HtmlCssToImageClient.fromEnv();

const result = await client.createImage(new CreateHtmlCssImageRequest({
  html: '<h1>Saved in my bucket</h1>',
  storage_destination_id: 'your-storage-destination-id'
}));
```

### .NET client

```csharp
using HtmlCssToImage.Models.Requests;

using var result = await client.CreateImageAsync(new CreateHtmlCssImageRequest
{
    Html = "<h1>Saved in my bucket</h1>",
    StorageDestinationId = "your-storage-destination-id"
});
```

The parameter also works in image batches. Set it on an individual variation or in `default_options`.

Creating an image records which destination to use, but rendering remains lazy. The file is not written until the image is first rendered. With normal HCTI storage enabled, request the returned image URL as usual; that render writes both the HCTI copy and the destination copy. Until then, the image may appear as **External save pending** in the dashboard.

The base object key is `<key-prefix>/<image-id>.png`, or `.pdf` for an image with `pdf_options` defined. Resized, cropped, or reformatted variants use separate object keys so they do not replace the base image (but will begin with the same `<key-prefix>/<image-id>`).

<hr>

## Using a destination with templates

You can set `storage_destination_id` when creating or updating a template. Each image created from that template inherits the destination saved on the template.

```json
{
  "name": "Storage example",
  "html": "<h1>Saved in my bucket</h1>",
  "storage_destination_id": "your-storage-destination-id"
}
```

The destination and its **Disable HCTI Storage** behavior are captured when an image is created. Updating the template later, or changing that setting on the destination, does not change images that have already been created, even if they have not been rendered or stored.

<hr>

## Disable HCTI Storage

When you choose to **Disable HCTI Storage**, images assigned to that destination:

- Are stored only in your bucket.
- Are not cached by the HTML/CSS to Image CDN.
- Do not have a publicly available HTML/CSS to Image image URL.

HTML/CSS to Image still retains the image settings and metadata needed to process the render, but it does not store a final rendered image. Your application is responsible for reading or serving the resulting object from your bucket.

{% include hint.md title="This setting is captured per image" text="Changing **Disable HCTI Storage** affects only images created afterward. Existing images keep the storage behavior selected when they were created." %}

## `PUT /v1/store`

`PUT /v1/store` renders and stores an image without returning the image bytes. It requires HTTP Basic authentication using valid API credentials from the same organization that owns the image.

When you create an image with a destination configured to **Disable HCTI Storage**, the create response contains an authenticated `/v1/store/...` URL instead of a public `/v1/image/...` URL. Send a `PUT` request to the returned URL to render the image and save it to your destination.

```bash
curl -X PUT 'https://hcti.io/v1/store/your-image-id' \
  -u 'user-id:api-key'
```

All `/v1/store/...` URL variants require authentication. A request with missing or invalid credentials returns `401 Unauthorized`.

### Store response

When the request reaches the storage step, a `200` or `424` response contains a JSON `StoreImageResult`. It reports the overall outcome and separately describes what happened to the base image and any transformed variant requested by the URL:

```json
{
  "outcome": "complete",
  "baseResult": {
    "status": "stored",
    "target": "storage_destination",
    "bucket": "my-rendered-images",
    "key": "renders/your-image-id.png"
  },
  "transformationResult": null,
  "success": true,
  "message": "Stored the base image.",
  "statusCode": 200
}
```

For example, if the base image is stored but a requested transformation cannot be written, the endpoint returns `424 Failed Dependency` with a `partial` outcome:

```json
{
  "outcome": "partial",
  "baseResult": {
    "status": "stored",
    "target": "storage_destination",
    "bucket": "my-rendered-images",
    "key": "renders/your-image-id.png"
  },
  "transformationResult": {
    "status": "failed",
    "target": "storage_destination",
    "bucket": "my-rendered-images",
    "key": "renders/your-image-id_w-400.webp"
  },
  "error": "Storage destination error",
  "referenceId": "request-reference-id",
  "success": false,
  "message": "The base image is stored, but the transformed image could not be stored.",
  "statusCode": 424
}
```

Errors that happen before a storage result is available—such as invalid credentials, an invalid image ID, invalid render options, or an unavailable source image—use the standard API error format instead of `StoreImageResult`.

| Field | Description |
|:------|:------------|
| `outcome` | Summary of the object results. `complete` means every object HCTI attempted is stored, `partial` means the base image is stored but its transformation failed, and `failed` means the base image could not be stored. |
| `baseResult` | Result for the original PNG or PDF. This field is always present. |
| `transformationResult` | Result for the resized, cropped, or reformatted variant requested in the store URL. It is `null` when the request has no separate transformation result. |
| `success` | `true` only for a `complete` outcome. Check `outcome` and the object results for more detail when this is `false`. |
| `message` | Human-readable summary, including whether an object was newly written, already existed, or failed. Do not use this field for program logic. |
| `statusCode` | The HTTP response status repeated in the JSON body: `200` for a complete result or `424` for a partial or failed store operation. |
| `error` | Short error category, present only for a `partial` or `failed` outcome. |
| `referenceId` | Identifier for a failed request. Present only for a `partial` or `failed` outcome; include it when contacting support. |

`baseResult` and a non-null `transformationResult` use the same object format:

| Field | Description |
|:------|:------------|
| `status` | Result for this object: `stored`, `already_stored`, `failed`, or `not_attempted`. See the status table below. |
| `target` | Storage system used for this object. `storage_destination` means your configured bucket; `hcti_storage` means HTML/CSS to Image managed storage. |
| `bucket` | Bucket containing the object when `target` is `storage_destination`. This is `null` for `hcti_storage`. |
| `key` | Exact object key within `bucket`, including the configured prefix and filename. This is `null` for `hcti_storage`. |

The object `status` values have these meanings:

| `status` | Meaning |
|:---------|:--------|
| `stored` | The object was written during this request. |
| `already_stored` | HCTI had already recorded the object as stored, so it did not write it again. This counts as a successful result. |
| `failed` | HCTI attempted to store the object, but the write did not succeed. |
| `not_attempted` | HCTI did not try to create the transformed object because storing the required base image failed first. |

The HTTP status and `outcome` tell you how to handle the result:

| HTTP status | `outcome` | Meaning |
|:------------|:----------|:--------|
| `200 OK` | `complete` | The base image is stored or was already stored. Any transformation reported in the response is also stored or was already stored. |
| `424 Failed Dependency` | `partial` | The base image is available, but HCTI could not store the requested transformation. |
| `424 Failed Dependency` | `failed` | HCTI could not store the base image. If a transformation depended on it, that object is reported as `not_attempted`. |

Inspect the object results when handling a `424` response. A `partial` outcome means the base image is already available at the bucket and key in `baseResult`, even though the transformed image failed.

After a complete store request, read or serve the object from the bucket and key returned in the response. Objects use the access settings configured on your bucket; HCTI does not make them public or add a public-read ACL. Configure your bucket, application, or CDN to provide whatever access your use case requires.

<hr>

## Disabling or deleting a destination

- A disabled destination cannot be selected for new images.
- Renders or storage retries that depend on a disabled or deleted destination will fail.
- Deleting a destination removes its stored credentials, but does not delete files already written to your bucket. Deleting the image from HCTI also does not delete those files.
- Existing images keep their destination reference.

<hr>

## Troubleshooting

- **`storage_destination_id` is rejected** — Confirm the ID belongs to the same organization as the API key and that the destination is enabled.
- **Connection test fails** — Recheck the bucket, region, endpoint, role, and credentials. For Amazon S3, confirm the trust policy has the generated principal and external ID, then confirm the role has `s3:PutObject` for the configured prefix.
- **A later transform returns `422` with Disable HCTI Storage selected** — Add `s3:GetObject`, or the provider's equivalent read permission, so HCTI can reload the base image before resizing, cropping, or reformatting it.
- **Connection-test objects remain in the bucket** — Add `s3:DeleteObject`, or the provider's equivalent delete permission, for the `.hcti/connection-tests/` prefix. Deletion is only cleanup and does not affect whether the connection test passes.
- **Custom endpoint is rejected** — Use a public HTTPS service endpoint with no path, credentials, query string, or fragment.

{% include code_footer.md version=1 %}
