import merge from 'rollup-merge-config';
import baseConnfig from './rollup.config.base';
import { terser } from "rollup-plugin-terser";
import del from 'rollup-plugin-delete'

export default merge(baseConnfig, {
  plugins: [
    terser(),
    del({ targets: ['dist/*', 'docs/*']})
  ],
});
