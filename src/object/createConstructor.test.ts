import { createConstructor } from './createConstructor';

describe('测试 createConstructor 函数', () => {
  it('createConstructor 函数本质上返回参数自身', () => {
    /**  测试用一下  */
    function test() {}

    expect(createConstructor(test)).toBe(test);
  });
});
