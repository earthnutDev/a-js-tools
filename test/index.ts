// import

import {
  getRandomFloat,
  getRandomInt,
  isTTY,
  throttle,
  typeOf,
  TypeOf,
} from '../index';
import assert from 'node:assert';
import test, { mock } from 'node:test';

/** 测试数据类型判断 */
test.skip('type of', t => {
  assert.equal(typeOf(''), 'string');
  assert.notEqual(typeof new String(), typeOf(new String()));
  assert.equal(typeOf(new String()), 'string');
});

/** 测试当前是否为终端环境 */
test.skip('is  tyy', t => {
  assert.equal(isTTY(), true);
});
/** 测试获取随机浮点数 */
test.skip('get random float', t => {
  const testNumber = 1;
  assert.equal(getRandomFloat(testNumber) < testNumber, true);
});

/** 测试获取随机整数 */
test.skip('get random int', t => {
  const testNumber = 10;
  assert.equal(getRandomInt(testNumber) < testNumber, true);
});

/** 测试节流 */
test('throttle', t => {
  // const fn = mock.fn();
  mock.timers.enable({ apis: ['setTimeout'] });
  let resultNumber: { num: number } = { num: 0 };
  const testFunc = throttle((a: any) => a.num++, 5000);
  testFunc(resultNumber);
  mock.timers.tick(2500);
  testFunc(resultNumber);
  assert.equal(resultNumber.num !== 2, true);
  mock.timers.tick(2501);
  testFunc(resultNumber);
  assert.equal(resultNumber.num == 2, true);
});
