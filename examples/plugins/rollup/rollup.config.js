import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve';
import logger from '../../../dist/plugins/rollup/index'
import del from 'rollup-plugin-delete'

const global = `var process = {
  env: {
    NODE_ENV: 'development'
  }
}`

export default {
  input : './examples/plugins/rollup/index.js',
  output: [
    { file: './examples/dist/plugins/rollup/index.js', format: 'iife', sourcemap: true, banner: global},
  ],
  watch: {
    include: './examples/plugins/rollup/**',
  },
  plugins: [
    del({ targets: ['./examples/dist/plugins/rollup/*']}),
    resolve(['ts', 'js', 'json']),
    json(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
    logger({
      name: 'logTool'
    })
  ],
}
