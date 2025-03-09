import { isNaN, isNumber } from 'a-type-of-js';

/**
 *
 * 获取一个随机整数
 *
 * 可传入两个参数，获取两参数之间的任意数
 *
 * 若只传入一个参数，这获取小于（若提供的值为负数，则为大于）该数的整数
 *
 * @export
 * @param {number} max 最大值，不可为  `NaN`
 * @param {number} [min] 最小值，不可取值 `NaN`
 * @return {*}  {number}
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
  _min > _max && ([_max, _min] = [_min, _max]);
  //**  两值相等时，直接返回最大值  */
  if (_max === _min) return _max;
  return Math.round(Math.random() * (_max - _min) + _min);
}

/**
 *
 * 获取一个随机浮点数数
 *
 * 可传入两个参数，获取两参数之间的任意数
 *
 * 若只传入一个参数，这获取小于（若提供的值为负数，则为大于）该数的浮点数数
 *
 * @export
 * @param {number} max 最大值，缺省 1
 * @param {number} [min] 最小值，缺省 0
 * @return {*}  {number}
 */
export function getRandomFloat(max: number = 1, min: number = 0): number {
  if (max == min) max++;
  min > max && ([max, min] = [min, max]);
  return Math.random() * (max - min) + min;
}
