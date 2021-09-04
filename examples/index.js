const a = 1
const b = 'b'
const c = [1, 2, 3, {a: 'a'}, [4, 5]]
const d = {
  a: 'a',
  b: 'b',
  c: [1, 2],
  d: {a: 'a', b: 'b'}
}
const e = new Set();
const f = new Set([1, 2, [3, 4, [5]]]);
const g = new Map();
g.set('a', 'a')
g.set('b', 1)
g.set('c', [1,{}, {}])
const log = logger.config({ns: 'APP'});
log.debug(a, b, c, d, e, f, g)
log.info(a, b, c, d, e, f, g)
log.warn(a, b, c, d, e, f, g)
log.error(a, b, c, d, e, f, g)
log.fatal(a, b, c, d, e, f, g)
