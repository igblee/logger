import { logTool } from './module1/module1'

const a = 1
const b = 'b'
const c = [1, 2, 3, {a: 'a'}, [4, 5]]
const d = {
  a: 'a',
  b: 'b',
  c: [1, 2],
  d: {a: 'a', b: 'b'},
  f: null,
  g: true,
  k: undefined,
  i: new Date(),
  y: /a/g,
  k: () => {}
}
d.e = d
const e = new Set();
const f = new Set([1, 2, [3, 4, [5]]]);
const g = new Map();
g.set('a', 'a')
g.set('b', 1)
g.set('c', [1,{}, {}])

        logTool.debug(a, b, c, d, e, f, g)
        logTool.info(a, b, c, d, e, f, g)
        logTool.warn(a, b, c, d, e, f, g)
        logTool.error(a, b, c, d, e, f, g)
        logTool.fatal(a, b, c, d, e, f, g)

