---
title: "Store rendered images in your own bucket"
slug: changelog/2026-07-27-store-rendered-images-in-your-own-bucket
description: "Write rendered images to S3, R2, and other supported storage destinations."
section: Changelog
tableOfContents: false
changelog:
  date: '2026-07-27'
  anchor: store-rendered-images-in-your-own-bucket
sidebar:
  hidden: true
---

You can now configure storage destinations for Amazon S3, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, Wasabi, Google Cloud Storage, and other S3-compatible services.

- Add and test destinations from the dashboard, with credentials scoped to your bucket and optional key prefix.
- Select the default, EU, or FedRAMP data jurisdiction when connecting a Cloudflare R2 bucket.
- Pass `storage_destination_id` when creating an HTML/CSS image, URL screenshot, image batch, or template.
- Keep the normal HTML/CSS to Image copy while also writing to your bucket, or choose to **Disable HCTI Storage** for files that should live only in your storage.
- Authenticate `PUT /v1/store/...` requests with your user ID and API key, and use the structured response to see the outcome, object status, bucket, and key for the base image and any transformation.
- Use `storage_destination_id` in the official TypeScript client or `StorageDestinationId` in the .NET client.

Storage destinations are available on the 10,000 images/month plan or higher. [Read the Storage Destinations guide](/guides/advanced/storage-destinations/).

[All updates](/changelog/)
