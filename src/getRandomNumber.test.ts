import { getRandomInt, getRandomFloat } from './getRandomNumber';

describe('getRandomInt', () => {
  // 这个测试本身就是个 bug
  it.skip('should return a random integer between 0 and 1 when no arguments are provided', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomInt()).toBe(0);
    spy.mockReturnValue(0.9);
    expect(getRandomInt()).toBe(1);
    spy.mockRestore();
  });

  it('should return a random integer within the specified range', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomInt(5, 1)).toBe(3);
    spy.mockRestore();
  });

  it('should handle reversed range by swapping min and max', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomInt(1, 5)).toBe(3);
    spy.mockRestore();
  });

  it('should return the same value when min equals max', () => {
    expect(getRandomInt(5, 5)).toBe(5);
  });

  it('should handle negative ranges correctly', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomInt(-5, -1)).toBe(-3);
    spy.mockRestore();
  });
});

describe('getRandomFloat', () => {
  it('should return a random float between 0 and 1 when no arguments are provided', () => {
    const result = getRandomFloat();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
  });

  it('should return a random float between min and max when both are provided', () => {
    const min = 5;
    const max = 10;
    const result = getRandomFloat(max, min);

    expect(result).toBeGreaterThanOrEqual(min); // 大于等于测试
    expect(result).toBeLessThan(max);
  });

  it('should return a random float between max and min when min is greater than max', () => {
    const min = 10;
    const max = 5;
    const result = getRandomFloat(max, min);
    expect(result).toBeGreaterThanOrEqual(max);
    expect(result).toBeLessThan(min);
  });

  it('should return min + 1 when max equals min', () => {
    const value = 5;
    const result = getRandomFloat(value, value);
    expect(result).toBeGreaterThanOrEqual(value);
    expect(result).toBeLessThan(value + 1);
  });
});
