type Callback = (...args: unknown[]) => void;

/**************************
 * DebounceAndThrottleReturnType
 *
 *
 *
 * @description: 函数防抖和函数节流的返回类型
 *
 **************************/
export interface DebounceAndThrottleReturnType<F extends Callback> {
  (...args: Parameters<F>): void;
  cancel(): void;
}
/**************************************
 *
 * 函数防抖
 *
 * @param {*} callback
 * @param {number} delay 缺省 300 ms
 * @return {*}   返回的是一个函数
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
 **************************************/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => void>(
  callback: F,
  delay: number = 200,
): DebounceAndThrottleReturnType<F> {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  if (!isFinite(delay) || delay < 0)
    // 强制转换非数值
    delay = 200;

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
          Reflect.apply(callback, null, args);
        } catch (error) {
          console.log('Debounce callback throw an error', error);
        }
      },
      Math.max(delay, 5),
    );
  };
  result.cancel = () => {
    clear();
  };
  return result;
}

/**
 *  节流函数
 * @param callback
 * @param delay  延迟时间，单位为毫秒（ms），缺省 200（ms）
 * @returns  返回的是一个函数
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<F extends (...args: any[]) => void>(
  callback: F,
  delay: number = 200,
): DebounceAndThrottleReturnType<F> {
  // 强制转换非数值
  if (!isFinite(delay) || (isFinite(delay) && delay < 0)) delay = 200;
  /**  延迟控制插销   */
  let inThrottle = false;
  /**  延迟控制   */
  let timeoutId: NodeJS.Timeout | null = null;

  const throttled = (...args: Parameters<F>) => {
    if (inThrottle) return;
    try {
      Reflect.apply(callback, null, args);
    } catch (error) {
      console.error('Throttle callback throw an error', error);
    }
    inThrottle = true;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      inThrottle = false;
      timeoutId = null;
    }, delay);
  };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    inThrottle = false;
    timeoutId = null;
  };

  return throttled;
}
