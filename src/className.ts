/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName a-js-tools
 * @FileName className.ts
 * @CreateDate  周六  09/14/2024
 * @Description css 类名转换
 ****************************************************************************/

/** # 转化为驼峰命名法
 *
 * @param str                   待转化的字符串
 * @param [dividingType='-']    分隔符。缺省为 "-"
 * @param [initial=false]       是否转化首字符。缺省为false（小驼峰式）
 */
export function toLowerCamelCase(
  str: string,
  dividingType: string = '-',
  initial: boolean = false,
) {
  const template =
    /[\\]|[\^]|[?]|[-]|[.]|[(]|[)]|[|]|[[]\[\]]|[{]|[}]|[+]|[*]|[$]/;
  const result = str.replace(
    new RegExp(
      `${template.test(dividingType) ? `\\${dividingType}` : dividingType}([a-zA-Z])`,
      'g',
    ),
    (match: string, p1: string) => p1.toUpperCase(),
  );
  return initial
    ? result.replace(/^./, (match: string) => match.toUpperCase())
    : result;
}
/**  # （小）驼峰转化为分隔符分割式
 *
 * @param str                      转化的字符串
 * @param [dividingType='-']       转化后单词间的连字符
 */
export function toSplitCase(str: string, dividingType: string = '-') {
  const result: string = str.replace(/(A-Z)/g, (match: string) =>
    dividingType.concat(match.toLowerCase()),
  );
  return result.startsWith(dividingType) ? result : result.replace(/^./, '');
}

export default {
  toSplitCase: toSplitCase,
};
