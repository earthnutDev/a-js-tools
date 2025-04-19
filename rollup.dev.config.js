import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';

/** 配置需要不打包进生产包的包名配置  */
const excludedPkg = ['node:', 'a-', 'color-pen', 'crypto', 'tslib'];

export default {
  input: 'eg/index.ts',
  output: {
    format: 'es',
    entryFileNames: '[name].mjs',
    preserveModules: false,
    sourcemap: false,
    exports: 'named',
    dir: '.eg/',
  },
  // 配置需要排除的包
  external: id => new RegExp('^'.concat(excludedPkg.join('|^'))).test(id),
  plugins: [resolve(), commonjs(), json(), typescript({}), cleanup()],
};
