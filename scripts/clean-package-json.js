import {
  getDirectoryBy,
  pathJoin,
  readFileToJsonSync,
  writeJsonFileSync,
  fileExist,
} from '@vvi/node';
import { readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';

// 原始 package.json 内容
let packageJson = readFileToJsonSync('./package.json');
let dependencies = packageJson.dependencies;
// 移除冗余的键
[
  'scripts',
  'devDependencies',
  'packageManager',
  'private',
  'dependencies',
  'type',
  'jja',
].forEach(key => delete packageJson[key]);
const esPrefix = 'es'; // es 前缀
const cjsPrefix = 'cjs'; // cjs 前缀
const dtsPrefix = 'es'; // 类型文件的前缀
// 查看当前打包 dist 文件路径
const distParentPath = getDirectoryBy('dist', 'directory');
// 查看当前的源码文件路径（原则上与上面值一致）
const srcParentDirectory = getDirectoryBy('src', 'directory');
// 当前 src 的路径
const srcDirectory = pathJoin(srcParentDirectory, 'src');
// src 目录下的文件列表
const srcChildrenList = readdirSync(srcDirectory);
// 打包的 exports
const exportsList = {};

for (const childrenName of srcChildrenList) {
  // 如果是测试文件则跳过
  if (
    // 剔除测试文件
    childrenName.endsWith('.test.ts') ||
    childrenName.endsWith('index.ts') ||
    // 剔除非导出模块
    ['testData.ts', 'types.ts'].includes(childrenName)
  )
    continue;

  // 文件名（不带后缀）
  const childrenBaseName = basename(childrenName, extname(childrenName));
  // 子文件/夹的路径
  const childPath = pathJoin(srcDirectory, childrenName);

  const childFile = fileExist(childPath); // 文件元数据
  if (!childFile) throw new RangeError(`${childrenName} 文件未能读取`);
  // 子文件是文件夹时以 index.xxx.js 为准
  if (childFile.isDirectory()) {
    exportsList[`./${childrenBaseName}`] = {
      import: {
        default: `./${esPrefix}/${childrenName}/index.js`,
        types: `./${dtsPrefix}/${childrenName}/index.d.ts`,
      },
      require: {
        default: `./${cjsPrefix}/${childrenName}/index.js`,
        types: `./${dtsPrefix}/${childrenName}/index.d.ts`,
      },
    };
  } else if (childFile.isFile()) {
    exportsList[`./${childrenBaseName}`] = {
      import: {
        default: `./${esPrefix}/${childrenBaseName}.js`,
        types: `./${dtsPrefix}/${childrenBaseName}.d.ts`,
      },
      require: {
        default: `./${cjsPrefix}/${childrenBaseName}.js`,
        types: `./${dtsPrefix}/${childrenBaseName}.d.ts`,
      },
    };
  } else {
    throw new Range(`${childrenName} 文件类型不符合要求`);
  }
}

packageJson = {
  ...packageJson,
  // unpkg: '', // 如果希望通过 CDN 使用，可以添加 unpkg 字段指向 UMD 构建版本
  // funding: '', // 如果有人赞助，可以添加
  main: cjsPrefix + '/index.js', // 旧版本 CommonJs 入口
  // module: esPrefix + '/index.js', // 旧版本 ESM 入口
  types: dtsPrefix + '/index.d.ts', // 旧版本类型入口
  author: {
    name: '泥豆君',
    email: 'Mr.MudBean@outlook.com',
    url: 'https://mudbean.cn',
  },
  description: '一点点 🤏  js 函数',
  sideEffects: false, // 核心：开启 Tree Shaking
  license: 'MIT',
  files: [esPrefix, cjsPrefix, 'CHANGELOG.md', 'LICENSE', 'README.md'],
  exports: {
    '.': {
      import: {
        default: `./${esPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
      require: {
        default: `./${cjsPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
    },
    ...exportsList,
  },
  keywords: ['js utils', 'js 工具', 'mudbean', 'vvi'],
  homepage: 'https://npm.gleanings.cn/utils',
  dependencies,
  bugs: {
    url: 'https://github.com/gleanings/utils/issues',
    email: 'Mr.MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/gleanings/utils.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  engines: {
    // globalThis 支持的最低版本的 node 为 12
    node: '>=18.0.0',
  },
  browserslist: ['last 2 versions not ie <= 11'],
};

{
  // 整理打包后 package.json 文件路径
  const distPackagePath = pathJoin(distParentPath, './dist/package.json');
  // 写入新的 packages.json 文件
  writeJsonFileSync(distPackagePath, packageJson);
}
