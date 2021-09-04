import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve';

const global = `var process = {
  env: {
    NODE_ENV: 'development'
  }
}`

export default {
  input : './src/index.ts',
  output: [
    { file: './dist/logger.amd.js', format: 'amd', sourcemap: true },
    { file: './dist/logger.umd.js', name: 'logger', format: 'umd', sourcemap: true, banner: global},
    { file: './dist/logger.es.js', format: 'es', sourcemap: true },
    { file: './dist/logger.cjs.js', format: 'cjs', sourcemap: true },
  ],
  plugins: [
    resolve(['ts', 'js', 'json']),
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps()
  ],
}
