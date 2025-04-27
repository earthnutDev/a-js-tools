import { intersection } from './intersection';

describe('测试数组交集函数', () => {
  it('测试数组交集函数', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [4, 5, 6, 7, 8];
    const result = [4, 5];
    expect(intersection(arr1, arr2)).toStrictEqual(result);
  });

  it('有一个参数不是数组时抛出错误', () => {
    expect(() => intersection(null, [])).toThrow(TypeError);
  });

  it('两个参数有一个为空数组时返回空数组', () => {
    expect(intersection([], [1])).toStrictEqual([]);
  });

  it('正常调用', () => {
    expect(intersection([1, 2, 3], [1, 2, 3, 4, 5])).toStrictEqual([1, 2, 3]);
  });
  it('正常调用', () => {
    expect(intersection([1, 2, 3, 4, 5], [1, 2, 3])).toStrictEqual([1, 2, 3]);
  });
});
