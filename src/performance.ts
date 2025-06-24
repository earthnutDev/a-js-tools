/**
 * 防抖和节流
 *
 * @packageDocumentation
 * @module @a-js-tools/performance
 * @license MIT
 */

import { isFunction, isNull, isPlainObject, isUndefined } from 'a-type-of-js';

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
/**  参数类型  */
export type debounce_throttle_options<T extends (...args: unknown[]) => void> =
  | T
  | {
      /**  回调函数  */
      callback: T;
      /**  使用的延迟时间，缺省值为 200ms  */
      delay?: number;
      /**  使用的 this  */
      this?: null | unknown;
    };

/**
 *
 * 防抖
 *
 * @param options 使用参数
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
  options: debounce_throttle_options<F>,
): DebounceAndThrottleReturnType<F> {
  if (isFunction(options)) {
    options = {
      callback: options,
      delay: 200,
      this: null,
    };
  }
  if (!isPlainObject(options) || !isFunction(options.callback))
    throw new TypeError('参数类型有误');

  if (isUndefined(options.delay)) options.delay = 200;

  if (!isFinite(options.delay) || options.delay < 0)
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
          Reflect.apply(options.callback, options.this ?? null, args);
        } catch (error) {
          console.log('Debounce callback throw an error', error);
        }
      },
      Math.max(options.delay ?? 5, 5),
    );
  };
  result.cancel = () => {
    clear();
  };
  return result;
}

/**
 *   节流
 *
 * @param options 使用的参数值
 * @returns   返回的闭包函数
 */
export function throttle<F extends (...args: unknown[]) => void>(
  options: debounce_throttle_options<F>,
): DebounceAndThrottleReturnType<F> {
  if (isFunction(options)) {
    options = {
      callback: options,
      delay: 200,
      this: null,
    };
  }
  if (!isPlainObject(options) || !isFunction(options.callback))
    throw new TypeError('参数类型有误');

  if (isUndefined(options.delay)) options.delay = 200;

  if (!isFinite(options.delay) || options.delay < 0)
    // 强制转换非数值
    options.delay = 200;

  /**  延迟控制插销   */
  let inThrottle = false;
  /**  延迟控制   */
  let timeoutId: NodeJS.Timeout | null = null;

  const throttled = (...args: Parameters<F>) => {
    if (inThrottle) return;
    try {
      Reflect.apply(options.callback, options.this ?? null, args);
    } catch (error) {
      console.error('Throttle callback throw an error', error);
    }
    inThrottle = true;
    if (!isNull(timeoutId)) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(
      () => {
        inThrottle = false;
        timeoutId = null;
      },
      Math.max(options.delay ?? 5, 5),
    );
  };

  throttled.cancel = () => {
    if (!isNull(timeoutId)) {
      clearTimeout(timeoutId);
    }
    inThrottle = false;
    timeoutId = null;
  };

  return throttled;
}
