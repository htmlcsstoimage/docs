---
layout: default
title: TypeScript
parent: Example code
permalink: /example-code/typescript/
description: >-
  Convert HTML to an image (png, jpg or webp) with TypeScript + the HTML/CSS to Image
  API. Renders exactly like Google Chrome.
---
{% include intro.md language="TypeScript" %}

This example uses the [axios package](https://www.npmjs.com/package/axios). Install with `npm install axios`.

```typescript
import axios from 'axios';

interface ImageRequest {
  html: string;
  css?: string;
  google_fonts?: string;
}

interface ImageResponse {
  url: string;
}

async function createImage(): Promise<string> {
  const payload: ImageRequest = {
    html: "<div class='box'>TypeScript ✅</div>",
    css: ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }",
    google_fonts: "Roboto"
  };

  // Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
  const response = await axios.post<ImageResponse>(
    'https://hcti.io/v1/image',
    payload,
    {
      auth: {
        username: 'your-user-id',
        password: 'your-api-key'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.url;
}

createImage()
  .then(url => console.log(url))
  .catch(error => console.error(error));

// https://hcti.io/v1/image/1113184e-419f-49f1-b231-2069942a186f
```

To see all of the available parameters, see: [Creating an image](/getting-started/using-the-api/#creating-an-image).

{% include hint.md title="Can I use this in a browser?" text="We recommend only using the API server-side. This is important because it keeps your API key secret. If you expose them in the browser, they can be used by anyone." %}

<hr>

## TypeScript example with Fetch API

Using the built-in Fetch API (available in Node.js 18+ and modern browsers).

```typescript
interface ImageRequest {
  html: string;
  css?: string;
  google_fonts?: string;
}

interface ImageResponse {
  url: string;
}

async function createImage(request: ImageRequest): Promise<ImageResponse> {
  const username = 'your-user-id';
  const password = 'your-api-key';

  const response = await fetch('https://hcti.io/v1/image', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<ImageResponse>;
}

// Usage
const html = "<div class='box'>Hello from TypeScript!</div>";
const css = ".box { background-color: #03B875; color: white; padding: 20px; }";

createImage({ html, css })
  .then(data => console.log(data.url))
  .catch(error => console.error(error));
```

<hr>

## TypeScript with full type definitions

For larger projects, you may want more comprehensive type definitions for the API.

```typescript
// types.ts
export interface HtmlCssToImageRequest {
  /** The HTML you want to render */
  html?: string;
  /** The CSS for your image */
  css?: string;
  /** The URL of a webpage to screenshot */
  url?: string;
  /** Google fonts to load (comma separated) */
  google_fonts?: string;
  /** Delay in milliseconds before capturing */
  ms_delay?: number;
  /** Device scale factor (1-3) */
  device_scale?: number;
  /** Whether to render the full page */
  full_screen?: boolean;
  /** CSS selector to screenshot */
  selector?: string;
}

export interface HtmlCssToImageResponse {
  url: string;
}

export interface HtmlCssToImageError {
  error: string;
  statusCode: number;
  message: string;
}

// api.ts
import type { HtmlCssToImageRequest, HtmlCssToImageResponse } from './types';

export class HtmlCssToImageClient {
  private readonly baseUrl = 'https://hcti.io/v1/image';
  private readonly authHeader: string;

  constructor(userId: string, apiKey: string) {
    this.authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64');
  }

  async createImage(request: HtmlCssToImageRequest): Promise<HtmlCssToImageResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json() as Promise<HtmlCssToImageResponse>;
  }
}

// Usage
const client = new HtmlCssToImageClient('your-user-id', 'your-api-key');

const image = await client.createImage({
  html: "<div class='card'>Welcome!</div>",
  css: ".card { padding: 20px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }",
  google_fonts: "Inter"
});

console.log(image.url);
```

<hr>

## URL to Image with TypeScript

Capture a screenshot of any webpage:

```typescript
interface ScreenshotRequest {
  url: string;
  full_screen?: boolean;
  ms_delay?: number;
}

async function screenshotUrl(request: ScreenshotRequest): Promise<string> {
  const response = await fetch('https://hcti.io/v1/image', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from('your-user-id:your-api-key').toString('base64')
    }
  });

  const data = await response.json();
  return data.url;
}

// Capture a full-page screenshot
const imageUrl = await screenshotUrl({
  url: 'https://htmlcsstoimage.com',
  full_screen: true,
  ms_delay: 500
});

console.log(imageUrl);
```

{% include code_footer.md version=1 %}

