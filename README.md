# 一点点 🤏 js 函数

[![version](<https://img.shields.io/npm/v/a-js-tools.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/a-js-tools) [![Coverage Status](<https://img.shields.io/coverallsCoverage/github/earthnutDev/a-js-tools?logo=coveralls&label=coveralls&labelColor=rgb(12, 244, 39)&color=rgb(0,0,0)>)](https://coveralls.io/github/earthnutDev/a-js-tools?branch=main) [![codecov](<https://img.shields.io/codecov/c/github/earthnutDev/a-js-tools/main?logo=codecov&label=codecov&labelColor=rgb(7, 245, 245)&color=rgb(0,0,0)>)](https://codecov.io/gh/earthnutDev/a-js-tools) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/a-js-tools/issues)
一个纯函数的工具

## 安装

```sh
npm install --save a-js-tools
```

## 纯函数

- `lmDebounce` 防抖函数
- `lmThrottle` 节流函数
- `getRandomInt` 获取随机的整数
- `getRandomFloat` 获取随机的浮点数
- `getRandomString` 获取随机字符串
- `escapeRegExp` 转义字符串为简单的正则表达式
- `autoEscapedRegExp` 生成简单的正则表达式
- `isBrowser` 是否为浏览器环境
- `isNode` 是否为 Node 环境
- `createConstructor` 构造构造函数

## class 名称转化

- `toLowerCamelCase` 转化为小驼峰
- `toSplitCase` 转化为连接符分隔

## 数组相关

- `intersection` 方法，计算两个数组的交集（两个数组共有的元素）
- `union` 方法，计算两个数组的并集（两个数组合并在一起并去重）
- `difference` 方法，计算两个数组的差集（以第一个数组为基准）
- `symmetricDifference` 方法，计算两个数组的对称差集（在两个数组都不共有的元素）
- `enArr` 对象，包含上面的方法

## 查看文档

查看 [https://earthnut.dev/a-js-tools](https://earthnut.dev/a-js-tools)
