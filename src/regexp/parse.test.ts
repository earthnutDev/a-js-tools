import { parse } from './parse'; // 假设 parse 方法在 parse.ts 文件中

describe('parse', () => {
  it('should convert string options to an object with flags property', () => {
    const result = parse('mig');
    expect(result).toEqual({ flags: 'mig' });
  });

  it('should set flags to empty string if options.flags is not a string', () => {
    const result = parse({ flags: 123 });
    expect(result).toEqual({ flags: '' });
  });

  it('should retain only valid regex flags', () => {
    const result = parse({ flags: 'migx' });
    expect(result).toEqual({ flags: 'mig' });
  });

  it('should remove duplicate flags', () => {
    const result = parse({ flags: 'mmiig' });
    expect(result).toEqual({ flags: 'mig' });
  });

  it('should set flags to empty string if no valid flags are present', () => {
    const result = parse({ flags: 'abc' });
    expect(result).toEqual({ flags: '' });
  });
});
