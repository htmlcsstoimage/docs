---
title: "Automatic cookie consent banner blocking"
slug: changelog/2025-06-18-automatic-cookie-consent-banner-blocking
description: "Automatically hide common cookie-consent banners in URL screenshots."
section: Changelog
tableOfContents: false
changelog:
  date: '2025-06-18'
  anchor: automatic-cookie-consent-banner-blocking
sidebar:
  hidden: true
---

We've added a new `block_consent_banners` parameter that automatically blocks cookie consent popups and banners on websites. When set to `true`, the API will detect and hide common consent frameworks like OneTrust, Cookiebot, Quantcast Choice, TrustArc, and many others.

This feature is especially useful for URL screenshots where cookie banners can interfere with the desired content. Instead of manually writing CSS to hide specific banners, you can now use this single parameter to handle most cases automatically.

The automatic blocking is maintained and updated regularly to support new consent frameworks as they emerge. For custom implementations not covered by the automatic blocking, you can still use the existing CSS injection method.

[All updates](/changelog/)
