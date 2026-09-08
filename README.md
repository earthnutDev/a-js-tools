# @vvi/utils

[![version](<https://img.shields.io/npm/v/@vvi/utils.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/@vvi/utils) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/gleanings/utils/issues)
一个纯函数的工具

## 安装

```sh
npm install --save @vvi/utils

# pnpm
pnpm add --save @vvi/utils

# yarn
yarn add @vvi/utils
```

## 纯函数

- `autoEscapedRegExp` - 生成简单的正则表达式
- `createBezier` - 构建简单的贝尔赛曲线
- `debounce` - 防抖函数
- `escapeRegExp` - 转义字符串为简单的正则表达式
- `getRandomFloat` - 获取随机的浮点数
- `getRandomInt` - 获取随机的整数
- `getRandomString` - 获取随机字符串
- `isBrowser` - 是否为浏览器环境
- `isNode` - 是否为 Node 环境
- `sleep` - 你的线程太累了，让它丫的睡一会吧
- `throttle` - 节流函数

## class 名称转化

- `toLowerCamelCase` - 转化为小驼峰
- `toSplitCase` - 转化为连接符分隔

## 数组相关

- `intersection` - 方法，计算两个数组的交集（两个数组共有的元素）
- `union` - 方法，计算两个数组的并集（两个数组合并在一起并去重）
- `difference` - 方法，计算两个数组的差集（以第一个数组为基准）
- `symmetricDifference` - 方法，计算两个数组的对称差集（在两个数组都不共有的元素）
- `enArr` - 对象，包含上面的方法
- `tryJSONParse` - 简单试图将字符串数据化，不适用于复杂场景
- `tryJSONStringify` - 简单试图将数据字符串化，不适用于复杂场景

## 状态

此软件包是 `MrMudBean` 生态系统的一部分。
它使用严格的 TypeScript 编写，并通过 Rollup 构建进行验证。
虽然单元测试较少，但 API 稳定，并在生产环境中大量使用。
