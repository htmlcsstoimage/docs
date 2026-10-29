import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const secret = process.env.HCTI_WEBHOOK_SECRET;
if (!secret?.startsWith('whsec_')) {
  throw new Error('Set HCTI_WEBHOOK_SECRET to your dashboard signing secret');
}

// Keep this file and its SQLite sidecar files on persistent local storage.
const db = new DatabaseSync(process.env.WEBHOOK_DB || './webhooks.sqlite');
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = FULL;
  PRAGMA busy_timeout = 1000;
  CREATE TABLE IF NOT EXISTS webhook_inbox (
    event_id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    payload TEXT NOT NULL,
    received_at TEXT NOT NULL,
    processed_at TEXT
  ) STRICT;
`);
const accept = db.prepare(`
  INSERT INTO webhook_inbox (event_id, type, payload, received_at, processed_at)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT (event_id) DO NOTHING
`);

function verifyWebhook(rawBody, headers) {
  const id = headers.get('webhook-id');
  const timestamp = headers.get('webhook-timestamp');
  const signatures = headers.get('webhook-signature');
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) {
    throw new Error('Missing or invalid webhook headers');
  }
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) {
    throw new Error('Webhook timestamp outside tolerance');
  }
  const key = Buffer.from(secret.slice(6), 'base64');
  const expected = createHmac('sha256', key)
    .update(`${id}.${timestamp}.`)
    .update(rawBody)
    .digest();
  const valid = signatures.split(/\s+/).some(signature => {
    const [version, encoded] = signature.split(',');
    if (version !== 'v1' || !encoded) return false;
    const received = Buffer.from(encoded, 'base64');
    return received.length === expected.length &&
      timingSafeEqual(received, expected);
  });
  if (!valid) throw new Error('Invalid webhook signature');
}

const server = createServer(async (request, response) => {
  if (request.method !== 'POST' || request.url?.split('?')[0] !== '/hcti') {
    response.writeHead(404).end();
    return;
  }

  let rawBody;
  try {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > 8 * 1024 * 1024) {
        response.writeHead(413).end();
        return;
      }
      chunks.push(chunk);
    }
    rawBody = Buffer.concat(chunks);
    verifyWebhook(rawBody, new Headers(request.headers));
  } catch {
    response.writeHead(400).end('Invalid webhook request');
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
    if (typeof event?.event_id !== 'string' || !event.event_id ||
        typeof event.type !== 'string' || !event.type) {
      throw new Error('Invalid envelope');
    }
  } catch {
    response.writeHead(400).end('Invalid event envelope');
    return;
  }

  try {
    const now = new Date().toISOString();
    // This single committed insert both deduplicates and queues business events.
    // Test events are recorded as processed and never start business work.
    accept.run(event.event_id, event.type, rawBody.toString('utf8'), now,
      event.type === 'webhook_test' ? now : null);
    response.writeHead(204).end();
  } catch (error) {
    console.error('Could not persist webhook:', error.code);
    response.writeHead(503).end('Try again later');
  }
});

server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => {
  console.log(`Webhook receiver: http://127.0.0.1:${server.address().port}/hcti`);
});
