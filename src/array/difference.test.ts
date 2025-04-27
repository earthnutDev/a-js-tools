import { difference } from './difference';
describe('测试两个数组的差集', () => {
  it('抛出错误', () => {
    expect(() => difference([], 'a')).toThrow(TypeError);
    expect(() => difference([], undefined)).toThrow(TypeError);
    expect(() => difference([], null)).toThrow(TypeError);
    expect(() => difference([], 1)).toThrow(TypeError);
    expect(() => difference([], {})).toThrow(TypeError);
    expect(() => difference([], true)).toThrow(TypeError);
  });

  it('有一个参数的数组长度为 0 ，直接返回第一个数组', () => {
    expect(difference([], [1, 2, 3])).toEqual([]);

    expect(difference([1, 2, 3], [])).toStrictEqual([1, 2, 3]);
  });

  it('正常的调用', () => {
    expect(difference([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5])).toStrictEqual([
      6, 7,
    ]);
  });
});
