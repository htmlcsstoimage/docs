---
layout: page
title: timezone
permalink: /parameters/timezone/
parent: Parameters
nav_order: 11
description: >-
  Set Chrome's timezone for rendering time-sensitive content
---

# Using timezone
{: .no_toc }
{: .fs-9 }

Control the timezone used when rendering your images
{: .fs-6 .fw-300 }

<hr>

## How it works

The `timezone` parameter sets Chrome's timezone when rendering your image. This affects how dates, times, and any timezone-dependent content are displayed.

## Values

Pass any valid [IANA timezone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), such as:

| Timezone | Description |
|:---------|:------------|
| `America/New_York` | Eastern Time (US) |
| `America/Los_Angeles` | Pacific Time (US) |
| `Europe/London` | UK Time |
| `Europe/Paris` | Central European Time |
| `Asia/Tokyo` | Japan Standard Time |
| `Australia/Sydney` | Australian Eastern Time |
| `UTC` | Coordinated Universal Time |

## When to use it

Use `timezone` when:
- Taking screenshots that display the current time
- Rendering content with timezone-specific dates
- Testing how your application appears in different timezones
- Generating reports for specific regions

## Example usage

### Screenshot with specific timezone

```bash
curl -X POST https://hcti.io/v1/image -u 'UserID:APIKey' \
     --data-urlencode url="https://time.is" \
     --data timezone="America/New_York"
```

### JSON request

```json
{
  "url": "https://calendar.google.com",
  "timezone": "Europe/London"
}
```

### HTML with JavaScript dates

```json
{
  "html": "<div id='time'></div><script>document.getElementById('time').textContent = new Date().toLocaleString();</script>",
  "timezone": "Asia/Tokyo",
  "ms_delay": 500
}
```

## Common use cases

### Regional reports

Generate reports showing local times for different regions:

```json
{
  "html": "<div class='report-header'>Generated: <span id='date'></span></div><script>document.getElementById('date').textContent = new Date().toLocaleString();</script>",
  "timezone": "America/Chicago",
  "ms_delay": 500
}
```

### Calendar screenshots

Capture calendar views in the correct timezone:

```json
{
  "url": "https://calendar.example.com",
  "timezone": "Europe/Berlin",
  "viewport_width": 1200,
  "viewport_height": 800
}
```

### Testing localized content

Test how your application displays dates for users in different timezones:

```json
{
  "url": "https://myapp.com/dashboard",
  "timezone": "Australia/Melbourne"
}
```

## Technical details

When `timezone` is set:
- JavaScript's `Date` object will use the specified timezone
- `Intl.DateTimeFormat` will default to the specified timezone
- Any website that detects timezone will see the specified value

{% include hint.md title="Tip" text="Use timezone identifiers, not abbreviations. For example, use 'America/New_York' instead of 'EST' or 'EDT'." %}

{% include code_footer.md version=1 %}

