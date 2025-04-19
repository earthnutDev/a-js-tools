import { isUndefined } from 'a-type-of-js';
import assert from 'node:assert';
import test from 'node:test';

test('测试是否是 node 环境', async it => {
  await it.test('测试正确的值返回 true', () => {
    assert.equal(typeof window === 'undefined', true);
  });

  await it.test('测试报错将返回错误', () => {
    assert.notEqual(isUndefined(globalThis.window), false);
  });
});
