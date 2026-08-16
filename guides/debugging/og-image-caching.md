---
layout: page
title: OG Image Caching and Refreshes
nav_title: OG Image caching
permalink: /guides/debugging/og-image-caching/
parent: Debugging
grand_parent: Guides
nav_order: 6
description: >-
  Understand OG Image Config refresh intervals, source cache headers, content versions, background refreshes, and social crawler caches.
---
# OG Image caching and refreshes
{: .no_toc }
{: .fs-9 }

Learn when HCTI checks a source page, renders a new social card, and serves the updated image to social crawlers.
{: .fs-6 .fw-300 }

<hr>

## The three caches involved

An automatic OG image can pass through three separate caches:

1. **Page metadata cache:** HCTI stores the title, description, Open Graph tags, `hcti:` options, and `html:tv:` values read from the source page.
2. **Rendered image cache:** HCTI reuses an existing image while the inputs that affect the render remain the same.
3. **Social platform cache:** Facebook, LinkedIn, Twitter, Slack, and other apps can keep their own copy of a page's link preview.

Refreshing one layer does not force every downstream platform to discard its copy.

## What the refresh interval controls

The **Refresh interval** on an [OG Image Config](/getting-started/og-images/) controls how soon HCTI checks the source page again. The default is 24 hours, and the minimum interval depends on your plan.

The usual request flow is:

1. The first request for a path fetches the source page's metadata and renders its image.
2. Requests before the interval expires reuse the stored metadata and image.
3. The first request after the metadata becomes stale can receive the current image while HCTI starts a background refresh.
4. A later request uses the refreshed metadata and renders a new image when the effective inputs changed.

This stale-while-refresh behavior keeps social crawlers from waiting on the source page.

### Source cache headers can extend the interval

HCTI also respects usable freshness information from the source response. `Cache-Control: s-maxage`, `Cache-Control: max-age`, or `Expires` can make the next metadata check later than the interval configured in the dashboard.

If you need HCTI to see edits quickly, check the cache headers returned by the source page as well as the config's refresh interval. `no-cache` and `no-store` do not extend the configured interval.

When the source sends an `ETag`, HCTI can make a conditional request. A `304 Not Modified` response updates the last-check time without treating the page content as new.

## Why a metadata refresh may reuse the same image

A refresh checks the page; it does not guarantee a new render. If the metadata and render options are unchanged, HCTI can keep using the same image.

Changing an OG Image Config's screenshot settings, template values or version, or optimization settings changes the effective inputs. A page metadata change also produces a new result when that value affects the render.

## Force a new content identity

If a page changes while keeping the same URL, add a monotonically increasing integer in `hcti:content_version`:

```html
<meta property="hcti:content_version" content="1735689600">
```

A Unix timestamp, database version number, or numeric build ID works well. Update it whenever the page content used by the screenshot or template changes.

`hcti:content_version` is useful when:

- A page screenshot changes visually but its standard metadata does not.
- A template depends on content that is not otherwise represented in extracted metadata.
- Your publishing system already exposes an update counter or timestamp.

The value must be an integer. Do not use a UUID, hash, or arbitrary text.

## Query strings do not bust this cache

OG Image Config URLs are path based. These requests resolve to the same configured page and image identity:

```text
https://hcti.io/v1/og/DOMAIN_ID/articles/hello
https://hcti.io/v1/og/DOMAIN_ID/articles/hello?v=2
https://hcti.io/v1/og/DOMAIN_ID/articles/hello?updated=true
```

Use `hcti:content_version` or a new page path instead. Query strings are ignored so tracking parameters and crawler-added parameters cannot create unbounded images.

## Use Refresh metadata in the dashboard

**Refresh metadata** makes the next image request recheck the source page. It is rate limited to once per minute for each config.

After selecting it:

1. Request the HCTI image URL once to start the source recheck.
2. Allow the background refresh to complete.
3. Request the image again and verify the result.

If the extracted values did not change, HCTI can still reuse the existing image. For a screenshot whose pixels changed without a metadata change, update `hcti:content_version` on the source page.

## Social platforms may still show the old card

Once HCTI serves the new image, a social app may continue showing its cached link preview. Use the platform's rescrape or inspection tool when one is available:

- [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Pinterest Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)

Some apps only refresh on their own schedule. In that case, confirm that HCTI is returning the new image and allow the platform cache to expire.

## Troubleshooting checklist

1. Use **View Source**, not only the browser inspector, to confirm that the page's server-rendered `<head>` contains the intended tags.
2. Check for duplicate `og:image`, `twitter:image`, `hcti:`, or `html:tv:` tags from a theme or SEO plugin.
3. Open the HCTI image URL directly and confirm that the path matches the source page path exactly.
4. Check the config's refresh interval and the source page's `Cache-Control`, `Expires`, and `ETag` headers.
5. Update the numeric `hcti:content_version` when the render-visible content changed without an extracted metadata change.
6. Use **Refresh metadata**, request the image once, wait for the background check, and request it again.
7. If the direct HCTI image is current but a shared link is not, refresh the social platform's cache.

Use the [Social Card Previewer](https://htmlcsstoimage.com/tools/social-card-previewer) to inspect the current metadata and platform-shaped previews for a public URL.
