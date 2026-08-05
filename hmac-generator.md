---
layout: default
title: HMAC SHA-256 Generator
permalink: /hmac-generator/
nav_exclude: true
description: >-
  Generate an HMAC SHA-256 signature from any message and secret key with this private, client-side tool. Nothing is sent to our servers.
---

# HMAC SHA-256 Generator
{: .no_toc }
{: .fs-9 }

Generate a token for an HTML/CSS to Image signed URL.
{: .fs-6 .fw-300 }

<style>
  .hmac-generator {
    max-width: 46rem;
    margin: 1.75rem 0;
  }

  .hmac-generator__privacy {
    margin-bottom: 1.25rem;
    padding: 0.9rem 1rem;
    color: #124d38;
    background: #eaf8f2;
    border: 1px solid #b7e4d1;
    border-left: 4px solid #018a59;
    border-radius: 6px;
  }

  .hmac-generator__form,
  .hmac-generator__result {
    padding: 1.25rem;
    background: #f8faf9;
    border: 1px solid #d8d5d8;
    border-radius: 6px;
  }

  .hmac-generator__field + .hmac-generator__field {
    margin-top: 1.1rem;
  }

  .hmac-generator label {
    display: block;
    margin-bottom: 0.4rem;
    color: #27262b;
    font-weight: 600;
  }

  .hmac-generator input,
  .hmac-generator textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 0.7rem 0.75rem;
    color: #27262b;
    font: inherit;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    line-height: 1.45;
    background: white;
    border: 1px solid #b8c0c8;
    border-radius: 4px;
  }

  .hmac-generator textarea {
    resize: vertical;
  }

  .hmac-generator [data-hmac-token] {
    font-size: 0.8rem;
  }

  .hmac-generator input:focus,
  .hmac-generator textarea:focus,
  .hmac-generator button:focus-visible {
    outline: 3px solid rgba(1, 138, 89, 0.22);
    outline-offset: 2px;
    border-color: #018a59;
  }

  .hmac-generator__input-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.55rem;
  }

  .hmac-generator__secondary-button {
    min-width: 4.75rem;
    padding: 0.65rem 0.85rem;
    color: #016847;
    font: inherit;
    font-weight: 600;
    background: white;
    border: 1px solid #8fa69d;
    border-radius: 4px;
    cursor: pointer;
  }

  .hmac-generator__secondary-button:hover {
    background: #eef8f4;
  }

  .hmac-generator__submit {
    height: auto;
    margin-top: 1.25rem;
    border: 0;
    cursor: pointer;
  }

  .hmac-generator__submit:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .hmac-generator__help {
    margin: 0.45rem 0 0;
    color: #5c5962;
    font-size: 0.85rem;
    line-height: 1.45;
  }

  .hmac-generator__result {
    margin-top: 1rem;
    background: white;
  }

  .hmac-generator__status {
    min-height: 1.5rem;
    margin: 0.65rem 0 0;
    color: #5c5962;
    font-size: 0.9rem;
  }

  .hmac-generator__status--success {
    color: #016847;
  }

  .hmac-generator__status--error {
    color: #b42318;
  }

  @media (max-width: 31rem) {
    .hmac-generator__input-row {
      grid-template-columns: 1fr;
    }

    .hmac-generator__secondary-button {
      width: 100%;
    }
  }
</style>

<div class="hmac-generator" data-hmac-generator>
  <div class="hmac-generator__privacy" role="note">
    <strong>Completely client-side.</strong>
    Your API key and query string never leave this browser tab. This tool does not transmit, log, or store them. HMAC generation uses your browser's built-in Web Crypto API.
  </div>

  <form class="hmac-generator__form" data-hmac-form autocomplete="off">
    <div class="hmac-generator__field">
      <label for="hmac-query-string">Query string</label>
      <textarea id="hmac-query-string" data-hmac-query data-1p-ignore rows="4" required autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="html=%3Cdiv%3EHello%3C%2Fdiv%3E"></textarea>
      <p class="hmac-generator__help">Enter the exact encoded query string that follows <code>?</code>. A leading <code>?</code> is ignored. Parameter order, encoding, whitespace, and repeated values matter.</p>
    </div>

    <div class="hmac-generator__field">
      <label for="hmac-api-key">API Key</label>
      <div class="hmac-generator__input-row">
        <input id="hmac-api-key" data-hmac-secret data-1p-ignore type="password" required autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Your secret API key">
        <button class="hmac-generator__secondary-button" data-hmac-toggle type="button" aria-controls="hmac-api-key" aria-pressed="false">Show</button>
      </div>
    </div>

    <button class="btn btn-primary hmac-generator__submit" data-hmac-submit type="submit">Generate HMAC</button>
  </form>

  <div class="hmac-generator__result" data-hmac-result hidden>
    <label for="hmac-token">HMAC SHA-256 token</label>
    <div class="hmac-generator__input-row">
      <input id="hmac-token" data-hmac-token data-1p-ignore type="text" readonly autocomplete="off" spellcheck="false">
      <button class="hmac-generator__secondary-button" data-hmac-copy type="button">Copy</button>
    </div>
  </div>

  <p class="hmac-generator__status" data-hmac-status aria-live="polite"></p>
</div>

Use the token in the path of your [create-and-render URL](/getting-started/create-and-render/#creating-an-image). Keep your API key secret; only the generated token belongs in the signed URL.

<script src="/assets/js/hmac-generator.js" defer></script>
