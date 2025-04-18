interface CreateConstructor<T> {
  new (): T;
}
/**
 *
 * 构建一个 Constructor 构造函数
 *
 */
export function createConstructor<T>(
  constructor: (...argumentList: unknown[]) => T,
): CreateConstructor<T> {
  return constructor as unknown as CreateConstructor<T>;
}
