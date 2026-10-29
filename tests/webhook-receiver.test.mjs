import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

test('published receiver verifies signatures and durably accepts events before acknowledgment', {
  skip: Number(process.versions.node.split('.')[0]) < 24,
}, async t => {
  const { DatabaseSync } = await import('node:sqlite');
  const directory = await mkdtemp(join(tmpdir(), 'hcti-webhook-'));
  const databasePath = join(directory, 'inbox.sqlite');
  const key = Buffer.alloc(32, 7);
  let child;
  let db;
  async function stop() {
    if (!child || child.exitCode !== null || child.signalCode !== null) return;
    const exited = once(child, 'exit');
    child.kill();
    await exited;
  }
  t.after(async () => {
    db?.close();
    await stop();
    await rm(directory, { recursive: true, force: true });
  });

  async function start() {
    child = spawn(process.execPath, [fileURLToPath(new URL('../public/example-code/webhook-receiver.mjs', import.meta.url))], {
      env: { ...process.env, PORT: '0', WEBHOOK_DB: databasePath, HCTI_WEBHOOK_SECRET: `whsec_${key.toString('base64')}` },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Receiver did not start')), 10000);
      let output = '';
      child.stdout.on('data', chunk => {
        output += chunk;
        const address = output.match(/http:\/\/127\.0\.0\.1:\d+\/hcti/);
        if (address) { clearTimeout(timer); resolve(address[0]); }
      });
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('exit', code => { clearTimeout(timer); reject(new Error(`Receiver exited: ${code}`)); });
      child.stderr.resume();
    });
  }
  let address = await start();
  db = new DatabaseSync(databasePath);
  const count = () => db.prepare('SELECT count(*) AS n FROM webhook_inbox').get().n;
  const event = { event_id: 'stored-event', type: 'image_stored', schema_version: 1, data: { image_id: 'image-1', note: 'Café 🖼️' } };
  const body = JSON.stringify(event, null, 2);
  function headers(rawBody, timestamp = Math.floor(Date.now() / 1000).toString()) {
    const id = 'delivery-1';
    const signature = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest('base64');
    return { 'Content-Type': 'application/json', 'webhook-id': id, 'webhook-timestamp': timestamp, 'webhook-signature': `v1,${signature}` };
  }
  async function send(rawBody, requestHeaders = headers(rawBody)) {
    return (await fetch(address, { method: 'POST', body: rawBody, headers: requestHeaders })).status;
  }

  assert.equal((await fetch(address)).status, 404);
  assert.equal(await send(`${body} `, headers(body)), 400, 'verify raw bytes rather than parsed JSON');
  assert.equal(await send(body, headers(body, `${Math.floor(Date.now() / 1000) - 600}`)), 400);
  assert.equal(await send(body, {}), 400);
  assert.equal(await send(body, { ...headers(body), 'webhook-signature': 'v1,AA==' }), 400);
  assert.equal(await send('{bad-json'), 400);
  assert.equal(await send('{"type":"image_stored"}'), 400);
  assert.equal(count(), 0, 'invalid requests must not enter the durable inbox');

  const multiple = headers(body);
  multiple['webhook-signature'] = `v2,unknown v1,AA== ${multiple['webhook-signature']}`;
  assert.equal(await send(body, multiple), 204);
  const accepted = db.prepare('SELECT * FROM webhook_inbox WHERE event_id = ?').get(event.event_id);
  assert.equal(accepted.payload, body);
  assert.equal(accepted.processed_at, null);
  assert.deepEqual(await Promise.all(Array.from({ length: 8 }, () => send(body))), Array(8).fill(204));
  assert.equal(count(), 1, 'simultaneous redeliveries must queue only one event');

  const testBody = JSON.stringify({ event_id: 'test-event', type: 'webhook_test', schema_version: 1, data: { webhook_id: 'webhook-1' } });
  assert.equal(await send(testBody), 204);
  assert.ok(db.prepare('SELECT processed_at FROM webhook_inbox WHERE event_id = ?').get('test-event').processed_at);
  assert.equal(count(), 2);

  await stop();
  address = await start();
  assert.equal(await send(body), 204);
  assert.equal(count(), 2, 'deduplication survives receiver restarts');
  assert.equal(db.prepare('SELECT payload FROM webhook_inbox WHERE event_id = ?').get(event.event_id).payload, body);

  const blockedBody = JSON.stringify({ ...event, event_id: 'retry-later' });
  db.exec('BEGIN IMMEDIATE');
  try {
    assert.equal(await send(blockedBody), 503, 'do not acknowledge a failed durable write');
  } finally {
    db.exec('ROLLBACK');
  }
  assert.equal(count(), 2);
  assert.equal(await send(blockedBody), 204, 'redelivery can succeed after storage recovers');
  assert.equal(count(), 3);
});
