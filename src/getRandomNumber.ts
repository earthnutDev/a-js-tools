/**
 *
 *
 * @packageDocumentation
 * @module @a-js-tools/get-random-number
 * @license MIT
 */
import { isNaN, isNumber } from 'a-type-of-js';

/**
 *
 * Get a random integer
 *
 * You can pass in two parameters and get any number between them
 *
 * If only one parameter is passed, this gets an integer that is less than (or greater than) that number if the value provided is negative
 *
 * @param   max Maximum, not allowed  `NaN`
 * @param   min Minimum, non-desirable value `NaN`
 * @returns  a random integer number
 */
export function getRandomInt(max: number = 1, min: number = 0): number {
  //  判断是否为 NaN 或 不是数字
  if (isNaN(max) || isNaN(min) || !isNumber(max) || !isNumber(min)) {
    throw new TypeError('getRandomInt: max or min is NaN or is not a number');
  }

  /**  获取最小值  */
  let _min = Math.ceil(Number(min)),
    /**  获取最大值  */
    _max = Math.floor(Number(max));
  /**  两值交换  */
  if (_min > _max) [_max, _min] = [_min, _max];
  //**  两值相等时，直接返回最大值  */
  if (_max === _min) return _max;
  return Math.round(Math.random() * (_max - _min) + _min);
}

/**
 *
 * Gets a random floating-point number
 *
 * You can pass in two parameters and get any number between them
 *
 * If you pass in only one parameter, this gets the number of floating-point numbers that are less than (or greater than) that number if the value provided is negative
 *
 * @param   max Maximum, default 1
 * @param min Minimum, default 0
 * @returns   a random floating-point number
 */
export function getRandomFloat(max: number = 1, min: number = 0): number {
  if (max == min) max++;
  if (min > max) [max, min] = [min, max];
  return Math.random() * (max - min) + min;
}
