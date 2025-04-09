import {
  getDirectoryBy,
  pathJoin,
  readFileToJsonSync,
  writeJsonFile,
} from 'a-node-tools';
let packageJson = readFileToJsonSync('./package.json');

const deleteKeys = ['scripts', 'devDependencies', 'lint-staged', 'private'];
for (const key of deleteKeys) delete packageJson[key];

packageJson = {
  ...packageJson,
  main: 'cjs/index.cjs',
  module: 'mjs/index.mjs',
  types: 'types/index.d.ts',
  files: ['mjs', 'cjs', 'types'],
  exports: {
    import: './mjs/index.mjs',
    require: './cjs/index.cjs',
    types: './types/index.d.ts',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/a-js-tools.git',
  },
  keywords: ['a-js-tools'],
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev/about',
  },
  homepage: 'https://earthnut.dev/a-js-tools',
  bugs: {
    url: 'https://github.com/earthnutDev/a-js-tools/issues',
    email: 'earthnut.dev@outlook.com',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
};

const distPath = getDirectoryBy('dist', 'directory');

const distPackagePath = pathJoin(distPath, './dist/package.json');

writeJsonFile(distPackagePath, packageJson);
