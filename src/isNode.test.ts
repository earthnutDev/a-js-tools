import { isUndefined } from 'a-type-of-js';
import { isBrowser, isNode } from './isNode';

describe('测试 is node', () => {
  it('应该浏览器返回 false', () => {
    //
    expect(isNode()).toEqual(false);
  });

  it('应该浏览器返回 true', () => {
    //
    expect(isBrowser()).toEqual(true);
  });
  it.skip('测试为伪装的 node 环境', () => {
    const originalWindow = global.window;

    if (!isUndefined(global.window)) {
      global.window = undefined;
    }

    const result = isNode();

    expect(result).toBe(true);

    if (originalWindow) {
      global.window = originalWindow;
    }
  });
});
