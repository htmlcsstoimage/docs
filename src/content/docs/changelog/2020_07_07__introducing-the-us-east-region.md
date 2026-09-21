---
title: "Introducing the US-EAST region"
slug: changelog/2020-07-07-introducing-the-us-east-region
description: "US-EAST rendering improves regional latency and failover."
section: Changelog
tableOfContents: false
changelog:
  date: '2020-07-07'
  anchor: introducing-the-us-east-region
sidebar:
  hidden: true
---

We have enabled our US-EAST region. Your API requests will now be automatically routed to either US-WEST or US-EAST based on where you ae located.
This will improve latency for requests as well as reliability of the API. We will automatically fail over to the other region is one is unhealthy.

We plan to introduce an EU region in the future.

[All updates](/changelog/)
