import { autoEscapedRegExp } from './autoEscapedRegExp'; // 假设文件名为 autoEscapedRegExp.ts

describe('autoEscapedRegExp', () => {
  it('should throw TypeError if pattern is not a string', () => {
    expect(() => autoEscapedRegExp({} as never)).toThrow(TypeError);
  });

  it('should return a RegExp with escaped pattern when no options are provided', () => {
    const result = autoEscapedRegExp('test');
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('test');
  });

  it('should return a RegExp with escaped pattern and options', () => {
    const result = autoEscapedRegExp('test', {
      start: true,
      end: true,
      flags: 'i',
    });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('^test$');
    expect(result.flags).toBe('i');
  });

  it('should return a RegExp with escaped pattern and no anchors when options are false', () => {
    const result = autoEscapedRegExp('test', {
      start: false,
      end: false,
      flags: 'g',
    });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('test');
    expect(result.flags).toBe('g');
  });

  it('should return a RegExp with escaped pattern and start anchor when end is false', () => {
    const result = autoEscapedRegExp('test', {
      start: true,
      end: false,
      flags: 'm',
    });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('^test');
    expect(result.flags).toBe('m');
  });

  it('should return a RegExp with escaped pattern and end anchor when start is false', () => {
    const result = autoEscapedRegExp('test', {
      start: false,
      end: true,
      flags: 'u',
    });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('test$');
    expect(result.flags).toBe('u');
  });
});
