interface CreateConstructor<T, Args extends unknown[] = unknown[]> {
  new (...args: Args): T;
}
/**
 *
 * 构建一个 Constructor 构造函数
 *
 */
export function createConstructor<T, Args extends unknown[] = unknown[]>(
  constructor: (...argumentList: Args) => T,
): CreateConstructor<T, Args> {
  return constructor as unknown as CreateConstructor<T, Args>;
}
