const test = require('node:test');
const assert = require('node:assert/strict');

async function loadUtils() {
  return import('../src/js/app-url-utils.mjs');
}

test('toAppUrl keeps root-relative paths unchanged outside the ops-console mount', async () => {
  const { toAppUrl } = await loadUtils();

  assert.equal(
    toAppUrl('/api/auth/status', { pathname: '/', host: '127.0.0.1:10272', protocol: 'http:' }),
    '/api/auth/status'
  );
});

test('toAppUrl prefixes root-relative paths under the ops-console mount', async () => {
  const { toAppUrl } = await loadUtils();

  assert.equal(
    toAppUrl('/api/auth/status', { pathname: '/ops-console', host: '127.0.0.1:4173', protocol: 'http:' }),
    '/ops-console/api/auth/status'
  );
});

test('toAppWebSocketUrl preserves the ops-console prefix for websocket connections', async () => {
  const { toAppWebSocketUrl } = await loadUtils();

  assert.equal(
    toAppWebSocketUrl('/ws', { pathname: '/ops-console/chat', host: '127.0.0.1:4173', protocol: 'http:' }),
    'ws://127.0.0.1:4173/ops-console/ws'
  );
});
