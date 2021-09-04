import { STRINGIFY_ERROR } from '../constants'
import { SeverityKey } from '../types'
import { CompressedLoggerLabel, LoggerLabel, Severity } from '../enums/enum'

export function getLoggerLabel(severity: SeverityKey, isCompressed = false): string{
  return isCompressed ? CompressedLoggerLabel[severity] : LoggerLabel[severity];
}

export function myTypeOf(data: any): string {
  return Object.prototype.toString.call(data).slice(8, -1).toLocaleLowerCase()
}

export function stringifyArgs(args: any[]): string[] {
  return args.map((arg, index) => {
    try {
      if (myTypeOf(arg) === 'array') {
        const argToString = arg.reduce((acc: string, curr: any, nIndex: number) => {
          const suffix = nIndex === arg.length - 1 ? '' : ','
          const value = ['string', 'number', 'boolean', 'null', 'undefined'].includes(myTypeOf(curr))
          ? curr
          : curr + ''
          return acc + value + suffix
        }, '')
        return `[${argToString}]`
      }
      if (myTypeOf(arg) === 'object') {
        const entries = Object.entries(arg)
        const entriesLen = entries.length
        const argToString = entries.reduce((acc: string, curr: any, nIndex: number) => {
          const suffix = nIndex === entriesLen - 1 ? '' : ','
          const value = ['string', 'number', 'boolean', 'null', 'undefined'].includes(myTypeOf(curr[1]))
          ? curr[1]
          : myTypeOf(curr[1]) === 'array'
            ? `[${curr[1] + ''}]`
            : curr[1] + ''
          return acc + `${curr[0]}:${value}` + suffix
        }, '')
        return `{${argToString}}`
      }
      if (myTypeOf(arg) === 'map') {
        const mapToObject = Object.fromEntries(arg.entries())
        const entries = Object.entries(mapToObject)
        const entriesLen = entries.length
        const argToString = entries.reduce((acc: string, curr: any, nIndex: number) => {
          const suffix = nIndex === entriesLen - 1 ? '' : ','
          const value = ['string', 'number', 'boolean', 'null', 'undefined'].includes(myTypeOf(curr[1]))
          ? curr[1]
          : myTypeOf(curr[1]) === 'array'
            ? `[${curr[1] + ''}]`
            : curr[1] + ''
          return acc + `${curr[0]}:${value}` + suffix
        }, '')
        return `#Map#{${argToString}}`
      }
      if (myTypeOf(arg) === 'set') {
        const setToArray = Array.from(arg)
        const argToString = setToArray.reduce((acc: string, curr: any, nIndex: number) => {
          const suffix = nIndex === setToArray.length - 1 ? '' : ','
          const value = ['string', 'number', 'boolean', 'null', 'undefined'].includes(myTypeOf(curr))
          ? curr
          : myTypeOf(curr) === 'array'
            ? `[${curr + ''}]`
            : curr + ''
          return acc + value + suffix
        }, '')
        return `#Set#[${argToString}]`
      }
      if (['string', 'number', 'boolean', 'null', 'undefined'].includes(myTypeOf(arg))) {
        return arg
      }
      return arg + ''
    } catch(err) {
      console.error('[Logger internal error]', err)
      return STRINGIFY_ERROR
    }
  })
}

export function getTimestamp(): string {
  if (globalThis.performance && globalThis.performance.now) {
    return (globalThis.performance.timeOrigin + globalThis.performance.now()).toFixed(2)
  }
  const now = Date.now()
  if (globalThis.process && globalThis.process.hrtime) {
    const hrtime = globalThis.process.hrtime()
    return (now + hrtime[1] / 1000000).toFixed(2)
  }
  return now.toFixed(2)
}
