{% comment %}
  Pass create_and_render=true to omit options unsupported by signed create-and-render URLs.
{% endcomment %}

| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **[additional_header_origins](/parameters/headers/#additional-header-origins)** | `Array` | Allow custom `headers` on requests to specific additional HTTP or HTTPS origins. |
| **[block_consent_banners](/guides/advanced/blocking-cookie-banners/)**   | `Boolean` | When set to `true`, automatically blocks cookie consent banners and popups on websites. Most useful for URL screenshots. |
| **[color_scheme](/parameters/color_scheme/)**   | `String` | Set Chrome to render in `light` or `dark` mode. Affects websites using `prefers-color-scheme`. |
{% unless include.create_and_render -%}
| **[dedupe_duration_s](/parameters/dedupe_duration_s/)** | `Integer` | Reuse an identical recent image without consuming image credits. Sets the lookback window in seconds; defaults and allowed values vary by image type and plan. |
{% endunless -%}
| **[device_scale](/parameters/device_scale/)**   | `Double` | Controls the image resolution by adjusting the pixel ratio. Minimum: `0.1`, Maximum: `3`. Higher values increase image quality and file size. For example, `2` will double the resolution. |
| **[disable_twemoji](/guides/debugging/emoji/#disabling-twemoji)**   | `Boolean` | Twemoji is used by default to render emoji consistently. Set to `true` to use native emoji fonts instead. |
| **[full_screen](/parameters/full_screen/)**   | `Boolean` | When set to true, the API will generate an image of the entire height of the page. |
| **[google_fonts](/parameters/google_fonts/)**   | `String` | Google fonts to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **[headers](/parameters/headers/)** | `Object` | Add custom HTTP headers when screenshotting a URL. Headers are restricted to the requested URL's origin and any `additional_header_origins`. |
| **[identify_as_hcti](/parameters/identify_as_hcti/)** | `Boolean` | Add `X-HCTI-SCREENSHOT: 1` to the top-level request when screenshotting a URL. |
| **[include_headers_on_subrequests](/parameters/headers/#include-headers-on-subrequests)** | `Boolean` | Also add custom `headers` to same-origin subrequests and subrequests matching `additional_header_origins`. |
| **[jumbo_max_height](/guides/advanced/jumbo-images/)**   | `Integer` | Maximum output height when rendering a jumbo image (up to 80,000px). Must be set together with `jumbo_max_width`. Consumes additional image credits. |
| **[jumbo_max_width](/guides/advanced/jumbo-images/)**   | `Integer` | Maximum output width when rendering a jumbo image (up to 80,000px). Must be set together with `jumbo_max_height`. Consumes additional image credits. |
| **[max_wait_ms](/parameters/max_wait_ms/)**   | `Integer` | Sets a maximum time limit (500-10000ms) for waiting before taking the screenshot. Unlike `ms_delay`, this is a cap rather than a fixed delay. Useful when pages load extra irrelevant content. |
| **[media_type](/parameters/media_type/)** | `String` | Set Chrome to render using `screen` or `print` CSS media styles. |
| **[ms_delay](/parameters/ms_delay/)**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time. |
{% unless include.create_and_render -%}
| **[pdf_options](/parameters/pdf_options/)**   | `Object` | Customize PDF output with page size, margins, scale, and background printing. Use this when you plan to request the generated URL with a `.pdf` extension. |
{% endunless -%}
| **[proxy_id](/parameters/proxy_id/)**   | `String` | Route the render's outbound traffic through one of your [HTTP proxies](/guides/advanced/proxies/) configured in the dashboard. Available on the 10k images/month plan or higher. |
| **[render_when_ready](/parameters/render_when_ready/)**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. |
| **[selector](/parameters/selector/)**  | `String` | A CSS selector for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **[storage_destination_id](/parameters/storage_destination_id/)**   | `String` | Save rendered files to one of your organization's [storage destinations](/guides/advanced/storage-destinations/). Available on the 10,000 images/month plan or higher. |
| **[timezone](/parameters/timezone/)**   | `String` | Render your image with Chrome set to a specified timezone. Use IANA timezone identifiers like `America/New_York`. |
| **[transparent_background](/parameters/transparent_background/)**   | `Boolean` | Set to `true` to render with a transparent background. The existing CSS-based method remains supported. |
| **[viewport_height](/parameters/viewport/#viewport-width-and-height)**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **[viewport_landscape](/parameters/viewport/#viewport-landscape)**| `Boolean` | Set Chrome's viewport to landscape mode. |
| **[viewport_mobile](/parameters/viewport/#viewport-mobile)** | `Boolean` | Set Chrome's viewport to emulate a mobile device. |
| **[viewport_touch](/parameters/viewport/#viewport-touch)** | `Boolean` | Set Chrome's viewport to support touch events. |
| **[viewport_width](/parameters/viewport/#viewport-width-and-height)**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
