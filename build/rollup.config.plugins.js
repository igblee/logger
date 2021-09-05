import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve';
import del from 'rollup-plugin-delete'

const global = `var process = {
  env: {
    NODE_ENV: 'production'
  }
}`

export default {
  input : './src/plugins/rollup-plugin.ts',
  output: [
    { file: './dist/plugins/rollup/index.js', format: 'es', sourcemap: true },
  ],
  watch: {
    include: './src/**'
  },
  plugins: [
    del({ targets: ['./dist/plugins/*']}),
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
