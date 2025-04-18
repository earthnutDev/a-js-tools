/**
 *
 * 判断当前环境是否为 node 环境
 *
 */
export function isNode(): boolean {
  return (
    typeof window === 'undefined' || typeof window.document === 'undefined'
  );
}

/**
 *
 * 是否为浏览器环境
 *
 */
export function isBrowser(): boolean {
  return !isNode();
}
