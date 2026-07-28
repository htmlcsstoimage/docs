| Name | Type | Description |
|:-----|:-----|:------------|
| **[color_scheme](/parameters/color_scheme/)** | `String` | Set Chrome to render in `light` or `dark` mode. |
| **[device_scale](/parameters/device_scale/)** | `Double` | Adjust the pixel ratio for the screenshot. Minimum: `0.1`, Maximum: `3`. |
| **[disable_twemoji](/guides/debugging/emoji/#disabling-twemoji)** | `Boolean` | Set to `true` to use native emoji fonts instead of Twemoji. |
| **[google_fonts](/parameters/google_fonts/)** | `String` | Google fonts to be loaded. Example: `Roboto`. Load multiple fonts with `Roboto|Open Sans`. |
| **[jumbo_max_height](/guides/advanced/jumbo-images/)** | `Integer` | Maximum output height in jumbo mode, up to `80,000` pixels. Must be set with `jumbo_max_width`. Consumes extra renders. |
| **[jumbo_max_width](/guides/advanced/jumbo-images/)** | `Integer` | Maximum output width in jumbo mode, up to `80,000` pixels. Must be set with `jumbo_max_height`. Consumes extra renders. |
| **[max_wait_ms](/parameters/max_wait_ms/)** | `Integer` | Set a maximum time limit (`500`–`10000` milliseconds) for waiting before taking the screenshot. |
| **[media_type](/parameters/media_type/)** | `String` | Set Chrome to render using `screen` or `print` CSS media styles. |
| **[ms_delay](/parameters/ms_delay/)** | `Integer` | Delay before generating the image. Useful when waiting for JavaScript. We recommend starting with `500` milliseconds. |
| **[proxy_id](/parameters/proxy_id/)** | `String` | Route the render through one of your organization's configured HTTP proxies. Available on the 10k images/month plan or higher. |
| **[render_when_ready](/parameters/render_when_ready/)** | `Boolean` | Wait to generate the image until JavaScript calls `ScreenshotReady()`. |
| **[selector](/parameters/selector/)** | `String` | Crop the image to an element matching this CSS selector. For example: `section#complete-toolkit.container-lg`. |
| **[storage_destination_id](/parameters/storage_destination_id/)** | `String` | Save images created from this template to one of your organization's configured storage destinations. Available on the 3,000 images/month plan or higher. |
| **[timezone](/parameters/timezone/)** | `String` | Set Chrome's timezone using an IANA timezone identifier. |
| **[transparent_background](/parameters/transparent_background/)** | `Boolean` | Set to `true` to render images created from this template with a transparent background. |
| **[viewport_height](/parameters/viewport/#viewport-width-and-height)** | `Integer` | Set the height of Chrome's viewport. Both dimensions must be set if using either. |
| **[viewport_landscape](/parameters/viewport/#viewport-landscape)** | `Boolean` | Set Chrome's viewport to landscape mode. |
| **[viewport_mobile](/parameters/viewport/#viewport-mobile)** | `Boolean` | Set Chrome's viewport to emulate a mobile device. |
| **[viewport_touch](/parameters/viewport/#viewport-touch)** | `Boolean` | Set Chrome's viewport to support touch events. |
| **[viewport_width](/parameters/viewport/#viewport-width-and-height)** | `Integer` | Set the width of Chrome's viewport. Both dimensions must be set if using either. |
