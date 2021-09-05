import { ILoggerConfigOption } from './types'
import { Severity } from './enums/enum'
import { getLoggerLabel, getTimestamp, stringifyArgs } from './utils'

const defaultConnfig: ILoggerConfigOption = {
  severity: globalThis?.process?.env?.NODE_ENV === 'production' ? Severity.WARN : Severity.DEBUG,
  ns: '',
  isCompressed: false
}

const logTool = globalThis.console;

class Logger {
  private __config
  private __isNSExisted

  constructor(option: ILoggerConfigOption) {
    this.__config = option
    this.__isNSExisted = !!this.__config.ns
  }

  debug = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const timestamp = getTimestamp()
    const nArgs = this.__isNSExisted
      ? [`[${timestamp}][${this.__config.ns}][${getLoggerLabel('DEBUG', this.__config.isCompressed)}]`, ...formatedArgs]
      : [`[${timestamp}][${getLoggerLabel('DEBUG', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool/*__#LOGGER#__*/.debug.apply(this, nArgs)
  }

  info = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const timestamp = getTimestamp()
    const nArgs = this.__isNSExisted
      ? [`[${timestamp}][${this.__config.ns}][${getLoggerLabel('INFO', this.__config.isCompressed)}]`, ...formatedArgs]
      : [`[${timestamp}][${getLoggerLabel('INFO', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool/*__#LOGGER#__*/.info.apply(this, nArgs)
  }
   warn = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const timestamp = getTimestamp()
    const nArgs = this.__isNSExisted
      ? [`[${timestamp}][${this.__config.ns}][${getLoggerLabel('WARN', this.__config.isCompressed)}]`, ...formatedArgs]
      : [`[${timestamp}][${getLoggerLabel('WARN', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool/*__#LOGGER#__*/.warn.apply(this, nArgs)
  }

  error = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const timestamp = getTimestamp()
    const nArgs = this.__isNSExisted
      ? [`[${timestamp}][${this.__config.ns}][${getLoggerLabel('ERROR', this.__config.isCompressed)}]`, ...formatedArgs]
      : [`[${timestamp}][${getLoggerLabel('ERROR', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool/*__#LOGGER#__*/.error.apply(this, nArgs)
  }

  fatal = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const timestamp = getTimestamp()
    const nArgs = this.__isNSExisted
      ? [`[${timestamp}][${this.__config.ns}][${getLoggerLabel('FATAL', this.__config.isCompressed)}]`, ...formatedArgs]
      : [`[${timestamp}][${getLoggerLabel('FATAL', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool/*__#LOGGER#__*/.error.apply(this, nArgs)
  }
}

export function config(option: ILoggerConfigOption = defaultConnfig) {
  const ownOption = {...defaultConnfig, ...option}
  return new Logger(ownOption)
}
