| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/parameters/google_fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A [CSS selector](/parameters/selector/) for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time. [Learn more](/parameters/ms_delay/). |
| **max_wait_ms**   | `Integer` | Sets a maximum time limit (500-10000ms) for waiting before taking the screenshot. Unlike `ms_delay`, this is a cap rather than a fixed delay. Useful when pages load extra irrelevant content. |
| **device_scale**   | `Double` | Controls the image resolution by adjusting the pixel ratio. Minimum: `0.1`, Maximum: `3`. Higher values increase image quality and file size. For example, `2` will double the resolution. [Learn more](/parameters/device_scale/). |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/parameters/render_when_ready/). |
| **full_screen**   | `Boolean` | When set to true, the API will generate an image of the entire height of the page. [Learn more](/parameters/full_screen/). |
| **block_consent_banners**   | `Boolean` | When set to `true`, automatically blocks cookie consent banners and popups on websites. Most useful for URL screenshots. [Learn more](/guides/blocking-cookie-banners/). |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. [Learn more](/getting-started/setting-height-and-width/). |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. [Learn more](/getting-started/setting-height-and-width/). |
| **color_scheme**   | `String` | Set Chrome to render in `light` or `dark` mode. Affects websites using `prefers-color-scheme`. [Learn more](/parameters/color_scheme/). |
| **timezone**   | `String` | Render your image with Chrome set to a specified timezone. Use IANA timezone identifiers like `America/New_York`. [Learn more](/parameters/timezone/). |
| **disable_twemoji**   | `Boolean` | Twemoji is used by default to render emoji consistently. Set to `true` to use native emoji fonts instead. |
