import merge from 'rollup-merge-config';
import baseConnfig from './rollup.config.base';
import del from 'rollup-plugin-delete'

export default merge(baseConnfig, {
  watch: {
    include: './src/**'
  },
  plugins:[
    del({ targets: 'dist/*' })
  ]
});
