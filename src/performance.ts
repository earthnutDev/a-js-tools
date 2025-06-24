/**
 * 防抖和节流
 *
 * @packageDocumentation
 * @module @a-js-tools/performance
 * @license MIT
 */

import { isFunction, isNull, isNumber, isUndefined } from 'a-type-of-js';

type Callback = (...args: unknown[]) => void;

/**
 *
 * 节流和防抖返回值类型
 *
 */
export interface DebounceAndThrottleReturnType<F extends Callback> {
  (...args: Parameters<F>): void;
  cancel(): void;
}

/**  第二参数  */
export type debounce_throttle_options =
  | {
      delay?: number;
      this?: null | unknown;
    }
  | number;

/**
 *
 * 防抖
 *
 * @param   callback 回调函数
 * @param   options    延迟时间（毫秒），默认 200 (ms) 或包含 this 的配置
 * @returns   返回的闭包函数
 * @example
 *
 * ```ts
 * const debounce = (callback: Function, delay = 300) => {
 *   let timer: any = null
 *   return (...args: any[]) => {
 *     clearTimeout(timer)
 *   }
 * }
 *
 */
export function debounce<F extends (...args: unknown[]) => void>(
  callback: F,
  options: debounce_throttle_options = 200,
): DebounceAndThrottleReturnType<F> {
  if (!isFunction(callback)) throw new TypeError('callback must be a function');

  if (isNumber(options))
    options = {
      delay: options,
      this: null,
    };
  if (
    isUndefined(options.delay) ||
    !isFinite(options.delay) ||
    options.delay < 0
  )
    // 强制转换非数值
    options.delay = 200;

  /**  定时器返回的 id  */
  let timeoutId: NodeJS.Timeout | undefined;
  const clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };
  const result = (...args: Parameters<F>) => {
    clear();
    timeoutId = setTimeout(
      () => {
        try {
          Reflect.apply(callback, options?.this ?? null, args);
        } catch (error) {
          console.log('Debounce callback throw an error', error);
        }
      },
      Math.max(options?.delay ?? 5, 5),
    );
  };
  result.cancel = () => clear();
  return result;
}

/**
 *   节流
 *
 * @param callback   回调函数
 * @param options      延迟时间（毫秒），默认 200 (ms) 或设置 this
 * @returns   返回的闭包函数
 */
export function throttle<F extends (...args: unknown[]) => void>(
  callback: F,
  options: debounce_throttle_options = 200,
): DebounceAndThrottleReturnType<F> {
  if (!isFunction(callback)) throw new TypeError('callback must be a function');

  if (isNumber(options))
    options = {
      delay: options,
      this: null,
    };
  if (
    isUndefined(options.delay) ||
    !isFinite(options.delay) ||
    options.delay < 0
  )
    // 强制转换非数值
    options.delay = 200;
  /**  延迟控制插销   */
  let inThrottle = false;
  /**  延迟控制   */
  let timeoutId: NodeJS.Timeout | null = null;

  const throttled = (...args: Parameters<F>) => {
    if (inThrottle) return;
    try {
      Reflect.apply(callback, options?.this ?? null, args);
    } catch (error) {
      console.error('Throttle 执行回调抛出问题', error);
    }
    inThrottle = true;
    if (!isNull(timeoutId)) clearTimeout(timeoutId);

    timeoutId = setTimeout(
      () => {
        inThrottle = false;
        timeoutId = null;
      },
      Math.max(options?.delay ?? 5, 5),
    );
  };

  throttled.cancel = () => {
    if (!isNull(timeoutId)) clearTimeout(timeoutId);
    inThrottle = false;
    timeoutId = null;
  };

  return throttled;
}
