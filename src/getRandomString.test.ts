import { getRandomString } from './getRandomString'; // 假设文件名为 getRandomString.ts
import { randomUUID, randomBytes } from 'crypto';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
  randomBytes: jest.fn(),
}));

describe('getRandomString', () => {
  beforeEach(() => {
    (randomUUID as jest.Mock).mockReset();
    (randomBytes as jest.Mock).mockReset();
  });

  it('should throw an error for invalid input types', () => {
    expect(() => getRandomString('invalid')).toThrow(TypeError);
    expect(() => getRandomString({ length: 'invalid' } as never)).toThrow(
      TypeError,
    );
  });

  it('should throw an error for invalid length values', () => {
    expect(() => getRandomString(-1)).toThrow(TypeError);
    expect(() => getRandomString(0)).toThrow(TypeError);
    expect(() => getRandomString({ length: -1 })).toThrow(TypeError);
    expect(() => getRandomString({ length: 0 })).toThrow(TypeError);
  });

  it.skip('should generate a UUID when type is "uuid"', () => {
    (randomUUID as jest.Mock).mockReturnValue('mock-uuid');
    expect(getRandomString({ type: 'uuid' })).toBe('mock-uuid');
  });

  it('should generate a random string with default options', () => {
    (randomBytes as jest.Mock).mockReturnValue(Buffer.from([0, 1, 2, 3]));
    expect(getRandomString(4)).toBe('abcd');
  });

  it('should generate a random string with uppercase letters', () => {
    (randomBytes as jest.Mock).mockReturnValue(Buffer.from([0, 1, 2, 3]));
    expect(getRandomString({ length: 4, includeUppercaseLetters: true })).toBe(
      'aAbB',
    );
  });

  it('should generate a random string with numbers', () => {
    (randomBytes as jest.Mock).mockReturnValue(Buffer.from([0, 1, 2, 3]));
    expect(getRandomString({ length: 4, includeNumbers: true })).toBe('a0b1');
  });

  it('should generate a random string with special characters', () => {
    (randomBytes as jest.Mock).mockReturnValue(Buffer.from([0, 1, 2, 3]));
    expect(getRandomString({ length: 4, includeSpecial: true })).toBe('a!b@');
  });

  it('should generate a random string with all options', () => {
    (randomBytes as jest.Mock).mockReturnValue(Buffer.from([0, 1, 2, 3]));
    expect(
      getRandomString({
        length: 4,
        includeUppercaseLetters: true,
        includeNumbers: true,
        includeSpecial: true,
      }),
    ).toBe('aA0!');
  });
});
