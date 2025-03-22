/**
 *
 *
 * @packageDocumentation
 * @module @a-js-tools/class-name
 * @license MIT
 */
/**
 *
 * Translates into hump nomenclature
 *
 * @param str                   The string to be converted
 * @param dividingType   Separator. Defaults to "-"
 * @param initial Whether or not to convert the first character. Default is false (small hump type)
 * @returns    hump nomenclature string (e.g. "helloWorld")
 *
 */
export function toLowerCamelCase(
  /**  The string to be converted  */
  str: string,
  /**  Separator. Defaults to "-"  */
  dividingType: string = '-',
  /**  Whether or not to convert the first character. Default is false (small hump type)  */
  initial: boolean = false,
): string {
  let result: string = str;
  /**
   * 匹配规则
   *
   * - 匹配到分隔符，将分隔符后面的字符转化为大写
   */
  const template =
    /[\\]|[\^]|[?]|[-]|[.]|[(]|[)]|[|]|[[]\[\]]|[{]|[}]|[+]|[*]|[$]/;
  /**  转化首字符   */
  const toTransform = (_str: string, _dividingType: string) =>
    _str.replace(
      new RegExp(
        `${template.test(_dividingType) ? `\\${_dividingType}` : _dividingType}([a-zA-Z])`,
        'g',
      ),
      (match: string, p1: string) => p1.toUpperCase(),
    );
  // 多分隔符转化
  dividingType.split('').forEach((item: string) => {
    result = toTransform(result, item);
  });

  return initial
    ? result.replace(/^./, (match: string) => match.toUpperCase())
    : result;
}

/**
 * Convert to hyphenated joins
 *
 * @param str                      The converted string
 * @param dividingType       Hyphens between converted words
 * @returns a hyphenated string (e.g. 'hello-world')
 *
 */
export function toSplitCase(str: string, dividingType: string = '-'): string {
  const result: string = str.replace(/[A-Z]/g, (match: string) =>
    dividingType.concat(match.toLowerCase()),
  );
  return result.startsWith(dividingType) ? result.substring(1) : result;
}
