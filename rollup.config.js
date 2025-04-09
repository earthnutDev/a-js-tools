import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

/** 配置需要不打包进生产包的包名配置  */
const excludedPkg = ['node:', 'a-', 'color-pen', 'crypto', 'tslib'];

export default {
  input: './index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/mjs/',
    },
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/cjs/',
    },
  ],
  // 配置需要排除的包
  external: id => new RegExp('^'.concat(excludedPkg.join('|^'))).test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        // { src: 'package.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
        { src: 'CHANGELOG-en.md', dest: 'dist' },
      ],
    }),
  ],
};
