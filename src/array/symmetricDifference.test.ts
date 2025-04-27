import { symmetricDifference } from './symmetricDifference';

describe('测试两个数组的差集', () => {
  it('抛出错误', () => {
    expect(() => symmetricDifference([], 'a')).toThrow(TypeError);
    expect(() => symmetricDifference([], undefined)).toThrow(TypeError);
    expect(() => symmetricDifference([], null)).toThrow(TypeError);
    expect(() => symmetricDifference([], 1)).toThrow(TypeError);
    expect(() => symmetricDifference([], {})).toThrow(TypeError);
    expect(() => symmetricDifference([], true)).toThrow(TypeError);
  });

  it('有一个参数的数组长度为 0 ，直接返回第一个数组', () => {
    expect(symmetricDifference([], [1, 2, 3])).toEqual([1, 2, 3]);

    expect(symmetricDifference([1, 2, 3], [])).toStrictEqual([1, 2, 3]);
  });

  it('正常的调用', () => {
    expect(
      symmetricDifference([1, 2, 3, 4, 5, 6, 7], [2, 3, 4, 5]),
    ).toStrictEqual([1, 6, 7]);
  });
});
