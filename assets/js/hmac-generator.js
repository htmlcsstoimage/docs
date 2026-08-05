(function () {
  'use strict';

  var generator = document.querySelector('[data-hmac-generator]');
  if (!generator) return;

  var form = generator.querySelector('[data-hmac-form]');
  var queryInput = generator.querySelector('[data-hmac-query]');
  var secretInput = generator.querySelector('[data-hmac-secret]');
  var toggleButton = generator.querySelector('[data-hmac-toggle]');
  var submitButton = generator.querySelector('[data-hmac-submit]');
  var result = generator.querySelector('[data-hmac-result]');
  var tokenInput = generator.querySelector('[data-hmac-token]');
  var copyButton = generator.querySelector('[data-hmac-copy]');
  var status = generator.querySelector('[data-hmac-status]');

  function setStatus(message, type) {
    status.textContent = message;
    status.classList.toggle('hmac-generator__status--error', type === 'error');
    status.classList.toggle('hmac-generator__status--success', type === 'success');
  }

  function bytesToHex(bytes) {
    return Array.prototype.map.call(bytes, function (byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  }

  async function generateHmac(message, secret) {
    var encoder = new TextEncoder();
    var key = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    var signature = await window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return bytesToHex(new Uint8Array(signature));
  }

  toggleButton.addEventListener('click', function () {
    var shouldShow = secretInput.type === 'password';
    secretInput.type = shouldShow ? 'text' : 'password';
    toggleButton.textContent = shouldShow ? 'Hide' : 'Show';
    toggleButton.setAttribute('aria-pressed', String(shouldShow));
    secretInput.focus();
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var queryString = queryInput.value;
    var secret = secretInput.value;

    if (!queryString || !secret) {
      result.hidden = true;
      setStatus('Enter both the query string and API key.', 'error');
      return;
    }

    if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === 'undefined') {
      result.hidden = true;
      setStatus('This browser does not support the Web Crypto API required to generate the token.', 'error');
      return;
    }

    if (queryString.charAt(0) === '?') queryString = queryString.slice(1);

    submitButton.disabled = true;
    submitButton.textContent = 'Generating…';
    setStatus('', '');

    try {
      tokenInput.value = await generateHmac(queryString, secret);
      result.hidden = false;
      setStatus('Token generated locally in your browser.', 'success');
    } catch (error) {
      result.hidden = true;
      tokenInput.value = '';
      setStatus('Unable to generate the token in this browser.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Generate HMAC';
    }
  });

  copyButton.addEventListener('click', async function () {
    if (!tokenInput.value) return;

    try {
      await navigator.clipboard.writeText(tokenInput.value);
      copyButton.textContent = 'Copied!';
      setStatus('Token copied to your clipboard.', 'success');
      window.setTimeout(function () {
        copyButton.textContent = 'Copy';
      }, 1500);
    } catch (error) {
      tokenInput.focus();
      tokenInput.select();
      setStatus('Select the token and copy it manually.', 'error');
    }
  });

  window.addEventListener('pagehide', function () {
    secretInput.value = '';
    tokenInput.value = '';
  });
})();
