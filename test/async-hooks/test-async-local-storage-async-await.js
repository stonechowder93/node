'use strict';
require('../common');
const assert = require('assert');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

async function test() {
  asyncLocalStorage.getStore().set('foo', 'bar');
  await Promise.resolve();
  assert.strictEqual(asyncLocalStorage.getStore().get('foo'), 'bar');
}

async function main() {
  await asyncLocalStorage.runSyncAndReturn(test);
  assert.strictEqual(asyncLocalStorage.getStore(), undefined);
}

main();
