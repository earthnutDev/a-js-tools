import { toLowerCamelCase, toSplitCase } from './className';

describe('测试命名转化', () => {
  describe('toLowerCamelCase 转化为驼峰命名法', () => {
    // 默认分割符为 '-'
    it('应将具有默认分隔符的字符串转换为小驼峰式大小写', () => {
      expect(toLowerCamelCase('hello-world')).toBe('helloWorld');
    });

    it('应将具有自定义分割类型的字符串转换为小驼峰式大小写', () => {
      expect(toLowerCamelCase('hello_world', '_')).toBe('helloWorld');
    });

    it('应转换具有初始大小写的字符串', () => {
      expect(toLowerCamelCase('hello-world', '-', true)).toBe('HelloWorld');
    });

    it('应处理分隔符中的特殊字符', () => {
      expect(toLowerCamelCase('hello*world', '*')).toBe('helloWorld');
    });

    it('当 input 为空时，应返回空字符串', () => {
      expect(toLowerCamelCase('')).toBe('');
    });

    it('当不存在分隔符时，应返回相同的字符串', () => {
      expect(toLowerCamelCase('helloworld')).toBe('helloworld');
    });

    it('应处理字符串中的多个分割类型', () => {
      expect(toLowerCamelCase('hello-world_test-case', '-_')).toBe(
        'helloWorldTestCase',
      );
    });
  });

  describe('toSplitCase 转化为拆分命名法', () => {
    it('应将驼峰式大小写字符串转换为具有默认分割类型的拆分大小写', () => {
      expect(toSplitCase('helloWorld')).toBe('hello-world');
    });

    it('应该将驼峰式大小写字符串转换为具有自定义分割类型的拆分大小写', () => {
      expect(toSplitCase('helloWorld', '_')).toBe('hello_world');
    });

    it('当 input 为空时，应返回空字符串', () => {
      expect(toSplitCase('')).toBe('');
    });

    it('当不存在大写字母时，应返回相同的字符串', () => {
      expect(toSplitCase('helloworld')).toBe('helloworld');
    });
  });
});
