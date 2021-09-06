import { walk } from 'estree-walker'
import { createFilter } from 'rollup-pluginutils';
import MagicString from 'magic-string';
import { ILoggerPluginOption } from '../types'
import { defaultOption } from './constants'
const esprima = require('esprima')

export default function LoggerPlugin(option: ILoggerPluginOption = defaultOption) {
  const nOption = {...defaultOption, ...option}
  if (!nOption.name) {
    throw new Error('[Logger Plugin]: option [name] is required')
  }
  const filter = createFilter(nOption.include, nOption.exclude);
  return {
    name: 'logger-plugin',
    transform(code: string, id: string) {
      if (!filter(id)) return null;
			let magicString = new MagicString(code);
      const ast = esprima.parseScript(code, {
        sourceType: 'module',
        range: true,
        loc: true,
        attachComment: true,
        comment: true,
        tolerant: true
      })
      const positionHolderNodesMap = new Map()
      walk(ast, {
        enter(node: any, parent: any, prop: any) {
          const value: any = {}
          if(node.type === 'MemberExpression' &&
            prop === 'callee' &&
            node?.object?.name === nOption.name
          ) {
            const position = node?.object?.loc?.start || {
              line: 'UNKNOWN',
              column: 'UNKNOWN'
            }
            if (parent &&
                parent.type === 'CallExpression'
              ) {
                const start = parent?.arguments?.[0]?.range[0]
                const end = parent?.arguments?.[parent?.arguments?.length - 1]?.range[1]
                const originArgsString = magicString.slice( start, end )
                const lastIndex = id.lastIndexOf('/')
                const filename = id.slice(lastIndex + 1)
                const positionString = `'[f:${filename};l:${position?.line};c:${position?.column};]'`
                magicString.overwrite(start, end, positionString + ', ' + originArgsString);
              }
          }
          return node
        }
      });
      const result: any = { code: magicString.toString() };
      if (nOption.sourceMap !== false) result.map = magicString.generateMap({ hires: true });
      return result
    }
  };
}
