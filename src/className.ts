/****************************************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @ProjectName a-js-tools
 * @FileName className.ts
 * @CreateDate  周六  09/14/2024
 * @Description css 类名转换
 ****************************************************************************/

/**************************************
 *
 * 转化为驼峰命名法
 *
 * @param str                   待转化的字符串
 * @param [dividingType='-']    分隔符。缺省为 "-"
 * @param [initial=false]       是否转化首字符。缺省为false（小驼峰式）
 * @returns {string}             转化后的字符串
 *
 **************************************/
export function toLowerCamelCase(
  /**  待转化的字符串  */
  str: string,
  /**  分隔符。缺省为 "-"  */
  dividingType: string = '-',
  /**  是否转化首字符。缺省为false（小驼峰式）  */
  initial: boolean = false,
): string {
  let result: string = str;
  /**************************
   * 匹配规则
   *
   * - 匹配到分隔符，将分隔符后面的字符转化为大写
   **************************/
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

/**************************************
 *
 * @param str                      转化的字符串
 * @param [dividingType='-']       转化后单词间的连字符
 *
 *
 **************************************/
export function toSplitCase(str: string, dividingType: string = '-'): string {
  const result: string = str.replace(/[A-Z]/g, (match: string) =>
    dividingType.concat(match.toLowerCase()),
  );
  return result.startsWith(dividingType) ? result.substring(1) : result;
}
