/**
 *
 *
 * @packageDocumentation
 * @module @a-js-tools/get-random-string
 * @license MIT
 */
import { isNaN, isNumber, isPlainObject } from 'a-type-of-js';
import { randomBytes } from 'crypto';

/**
 *
 *  Random string generation function
 *
 *
 *
 */
export type RandomStringOptions = {
  /**
   * string length
   * @default 32
   */
  length?: number;
  /**
   * String optional characters
   * @default '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   */
  chars?: string;
  /**
   * Whether or not to include numbers
   * @default false
   */
  includeNumbers?: boolean;
  /**
   * Whether or not to include capital letters
   * @default false
   */
  includeUppercaseLetters?: boolean;
  /**
   * Whether or not it contains special characters
   * @default false
   */
  includeSpecial?: boolean;
  /**
   * String type
   * @default 'string''
   */
  type?: 'string' | 'uuid';
};

/**
 *
 *  Random string generation
 *
 *  @param   length - string length
 *  @returns  - A random string of characters generated
 *
 *
 */
export function getRandomString(length?: RandomStringOptions | number): string {
  //   验证输入参数
  if (
    // 参数类型错误
    (!isPlainObject(length) && !isNumber(length)) ||
    // 参数为 NaN
    (isNumber(length) && isNaN(length)) ||
    // 参数为数字时为无穷大
    (isNumber(length) && !isFinite(length)) ||
    // 参数为数字时为非整数
    (isNumber(length) && !Number.isInteger(length)) ||
    // 参数为数字时为负数
    (isNumber(length) && Number.isInteger(length) && length < 1) ||
    // 参数为数值然而却小于 1
    (isNumber(length) && length < 1) ||
    (isPlainObject(length) && isNumber(length.length) && length.length < 1)
  ) {
    throw new TypeError('Invalid argument type (getRandomString)');
  }

  const initOptions: RandomStringOptions & {
    length: number;
    chars: string;
    chars2: string;
    chars3: string;
  } = {
    length: 32,
    chars: 'abcdefghijklmnopqrstuvwxyz',
    chars2: '0123456789',
    chars3: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    type: 'string',
    includeUppercaseLetters: false,
    includeNumbers: false,
    includeSpecial: false,
  };

  /// 生成 UUID
  if (initOptions.type === 'uuid') {
    return crypto.randomUUID();
  }

  if (isNumber(length) && Number.isInteger(length) && length > 0) {
    // 验证输入参数
    Object.assign(initOptions, { length });
  }

  if (isPlainObject(length)) {
    Object.assign(initOptions, length);
    initOptions.length = initOptions.length < 1 ? 32 : initOptions.length;
  }
  /**  生成随机字符串  */
  const templateCharsArr: string[] = initOptions.chars.split('');
  // 添加大写字母
  if (initOptions.includeUppercaseLetters) {
    interleaveString(templateCharsArr, initOptions.chars.toUpperCase());
  }
  // 添加数字
  if (initOptions.includeNumbers) {
    interleaveString(templateCharsArr, initOptions.chars2);
  }
  // 添加特殊字符
  if (initOptions.includeSpecial) {
    interleaveString(templateCharsArr, initOptions.chars3);
  }

  // 使用密码学安全的随机数生成器
  const bytes = randomBytes(initOptions.length);
  let result = '';
  /**  获取最后的 chars 数据  */
  const chars = templateCharsArr.join('');

  // 循环遍历
  bytes.forEach(byte => (result += chars.charAt(byte % chars.length)));

  /**
   *
   *  字符串交叉函数
   *
   *  非线形串交叉，对相交叉
   *
   *  @param  str1 - 字符串1
   *  @param  str2 - 字符串2
   *  @returns - 交叉后的字符串
   *  @example
   *  ```ts
   *  interleaveString('abc', '123') // 'a1b2c3'
   *  ```
   */
  function interleaveString(str1: string[], str2: string) {
    const str1Length = str1.length,
      str2Length = str2.length;
    const maxLength = Math.max(str1Length, str2Length);

    for (let i = 0; i < maxLength; i++) {
      if (i < str1Length && str2[i] !== undefined) {
        str1[i] += str2[i];
      } else if (i < str2Length) {
        str1[i] = str2[i];
      }
    }
  }
  return result;
}
