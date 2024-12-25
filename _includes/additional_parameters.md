| Name        | Type          | Description |
|:-------------|:------------------|:------|
| **google_fonts**   | `String` | [Google fonts](/parameters/google_fonts/) to be loaded. Example: `Roboto`. Multiple fonts can be loaded like this: `Roboto|Open Sans`  |
| **selector**  | `String` | A [CSS selector](/guides/selector/) for an element on the webpage. We'll crop the image to this specific element. For example: `section#complete-toolkit.container-lg` |
| **ms_delay**   | `Integer` | The number of milliseconds the API should delay before generating the image. This is useful when waiting for JavaScript. We recommend starting with `500`. Large values slow down the initial render time. [Learn more](/parameters/ms_delay/). |
| **device_scale**   | `Double` | Controls the image resolution by adjusting the pixel ratio. Minimum: `1`, Maximum: `3`. Higher values increase image quality and file size. For example, `2` will double the resolution. [Learn more](/parameters/device_scale/). |
| **render_when_ready**   | `Boolean` | Set to true to control when the image is generated. Call `ScreenshotReady()` from JavaScript to generate the image. [Learn more](/parameters/render_when_ready/). |
| **full_screen**   | `Boolean` | When set to true, the API will generate an image of the entire height of the page. |
| **viewport_width**   | `Integer` | Set the width of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. |
| **viewport_height**   | `Integer` | Set the height of Chrome's viewport. This will disable automatic cropping. Both height and width parameters must be set if using either. | 