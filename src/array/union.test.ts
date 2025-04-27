import { union } from './union';

describe('测试联合类型', () => {
  it('没有参数的时候返回空的数组', () => {
    expect(union()).toStrictEqual([]);
  });
  it('测试抛出错误的情况', () => {
    expect(() => union(1)).toThrow(TypeError);
    expect(() => union(null)).toThrow(TypeError);
    expect(() => union(undefined)).toThrow(TypeError);
    expect(() => union('hello')).toThrow(TypeError);
    expect(() => union(true)).toThrow(TypeError);
  });

  it('当只有一个参数数组时，直接返回该数组', () => {
    expect(union([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  it('常规调用', () => {
    expect(union([1], [3])).toStrictEqual([1, 3]);
  });
});
