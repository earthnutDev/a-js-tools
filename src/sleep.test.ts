import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should resolve after specified delay', async () => {
    const delay = 1000;
    const promise = sleep(delay);

    jest.advanceTimersByTime(delay);
    await expect(promise).resolves.toBeUndefined();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
  });

  it('should use default delay when not provided', async () => {
    const promise = sleep();

    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should resolve immediately when delay is 0', async () => {
    const promise = sleep(0);

    jest.advanceTimersByTime(0);
    await expect(promise).resolves.toBeUndefined();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });

  it('should not resolve before delay time', async () => {
    const delay = 1000;
    const promise = sleep(delay);
    let resolved = false;

    promise.then(() => {
      resolved = true;
    });
    jest.advanceTimersByTime(delay - 1);

    expect(resolved).toBe(false);
    jest.advanceTimersByTime(1);
    await expect(promise).resolves.toBeUndefined();
    expect(resolved).toBe(true);
  });
});
