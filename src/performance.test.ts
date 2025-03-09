import { debounce, throttle } from './performance';

describe('debounce', () => {
  it('throws TypeError when callback is not a function', () => {
    expect(() => debounce('not a function' as never, 100)).toThrow(TypeError);
  });

  //
  it('defaults to 200ms delay when delay is not a finite non-negative number', () => {
    const callback = jest.fn(); // 假设这是一个函数
    const debounced = debounce(callback, NaN); // 200ms
    debounced(); // 调用debounced函数
    expect(callback).not.toHaveBeenCalled(); // 200ms后，callback没有被调用
    jest.advanceTimersByTime(200); // 快进200ms
    expect(callback).toHaveBeenCalled(); // 200ms后，callback被调用
  });

  it('executes callback after delay', () => {
    const callback = jest.fn(); // 创建一个模拟函数
    const debounced = debounce(callback, 100); // 创建一个延迟为100ms的函数
    debounced(); // 调用debounced函数
    expect(callback).not.toHaveBeenCalled(); // 100ms后，callback没有被调用
    jest.advanceTimersByTime(100); //   快进100ms
    expect(callback).toHaveBeenCalled(); // 100ms后，callback被调用
  });

  it('resets timer on subsequent calls', () => {
    const callback = jest.fn(); // 创建一个模拟的回调函数
    const debounced = debounce(callback, 100); // 创建一个延迟为100ms的函数
    debounced(); // 调用debounced函数
    debounced(); // 调用debounced函数
    expect(callback).not.toHaveBeenCalled(); // 100ms后，callback没有被调用
    jest.advanceTimersByTime(100); //   快进100ms
    expect(callback).toHaveBeenCalled(); // 100ms后，callback被调用一次
  });

  it('logs error when callback throws an error', () => {
    const callback = jest.fn(() => {
      throw new Error('Callback error');
    });
    const debounced = debounce(callback, 100); // 创建一个延迟100ms的防抖函数
    console.log = jest.fn(); // 模拟console.log
    debounced(); // 调用防抖函数
    jest.advanceTimersByTime(100); // 快进100ms
    expect(console.log).toHaveBeenCalledWith(
      // 检查console.log是否被调用
      'Debounce callback throw an error',
      expect.any(Error), // 匹配任何Error类型
    );
  });

  it('clears timer when clear method is called', () => {
    const callback = jest.fn(); // 创建一个模拟函数
    const debounced = debounce(callback, 100); // 调用debounce函数
    debounced(); // 调用debounced函数
    debounced.cancel(); // // 调用clear方法
    jest.advanceTimersByTime(100); // 快进100毫秒
    expect(callback).not.toHaveBeenCalled(); // 检查callback是否没有被调用
  });
});

describe('throttle', () => {
  it('should execute the callback after the specified delay', () => {
    const callback = jest.fn(); // 创建一个模拟的回调函数
    const throttled = throttle(callback, 100); // 调用throttle函数
    expect(callback).not.toHaveBeenCalled(); // 检查callback是否没有被调用
    throttled(); // 调用throttled函数
    jest.advanceTimersByTime(100); // 快进时间100毫秒
    expect(callback).toHaveBeenCalled(); // 检查callback是否被调用
  });

  // 这个测试没有必要
  it('should use the default delay for invalid delay values', () => {
    const callback = jest.fn(); // 创建一个模拟函数
    const throttled = throttle(callback, -1); // 无效的延迟
    throttled(); // 调用throttled函数
    expect(callback).toHaveBeenCalledTimes(1); // 检查callback是否没有被调用
    jest.advanceTimersByTime(200); // 默认延迟
    throttled(); // 调用throttled函数
    expect(callback).toHaveBeenCalledTimes(2); // 检查callback是否被调用
  });

  it('should not execute the callback if it is in the throttle state', () => {
    const callback = jest.fn(); //  创建一个模拟的回调函数
    const throttled = throttle(callback, 100); // 创建一个节流函数
    throttled(); // 调用throttled函数
    throttled(); // 再次调用，应该被节流
    expect(callback).toHaveBeenCalledTimes(1); // 检查callback是否被调用了一次
  });

  it('should handle errors in the callback', () => {
    const callback = jest.fn(() => {
      throw new Error('Callback error');
    });
    const throttled = throttle(callback, 100);
    console.error = jest.fn(); // 模拟console.log
    throttled();
    // 由于错误处理是在回调执行期间完成的，因此我们无法直接测试错误日志。
    expect(console.error).toHaveBeenCalledWith(
      // 检查console.log是否被调用
      'Throttle callback throw an error',
      expect.any(Error), // 匹配任何Error类型
    );
  });
});
