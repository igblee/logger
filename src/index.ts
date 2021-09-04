import { FLAG } from './constants'
import { ILoggerConfigOption } from './types'
import { Severity } from './enums/enum'
import { getLoggerLabel, stringifyArgs } from './utils'

const defaultConnfig: ILoggerConfigOption = {
  severity: globalThis?.process?.env?.NODE_ENV === 'production' ? Severity.WARN : Severity.DEBUG,
  ns: '',
  isCompressed: false
}

const logTool = globalThis.console;

class Logger {
  private __config
  private __isNSExisted
  public __FLAG__

  constructor(option: ILoggerConfigOption) {
    this.__FLAG__ = FLAG
    this.__config = option
    this.__isNSExisted = !!this.__config.ns
  }

  debug = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const nArgs = this.__isNSExisted
    ? [`[${this.__config.ns}][${getLoggerLabel('DEBUG', this.__config.isCompressed)}]`, ...formatedArgs]
    : [`[${getLoggerLabel('DEBUG', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool.debug.apply(this, nArgs)
  }

  info = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const nArgs = this.__isNSExisted
    ? [`[${this.__config.ns}][${getLoggerLabel('INFO', this.__config.isCompressed)}]`, ...formatedArgs]
    : [`[${getLoggerLabel('INFO', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool.info.apply(this, nArgs)
  }
   warn = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const nArgs = this.__isNSExisted
    ? [`[${this.__config.ns}][${getLoggerLabel('WARN', this.__config.isCompressed)}]`, ...formatedArgs]
    : [`[${getLoggerLabel('WARN', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool.warn.apply(this, nArgs)
  }

  error = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const nArgs = this.__isNSExisted
    ? [`[${this.__config.ns}][${getLoggerLabel('ERROR', this.__config.isCompressed)}]`, ...formatedArgs]
    : [`[${getLoggerLabel('ERROR', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool.error.apply(this, nArgs)
  }

  fatal = (...args: any[]) => {
    const formatedArgs = stringifyArgs(args)
    const nArgs = this.__isNSExisted
    ? [`[${this.__config.ns}][${getLoggerLabel('FATAL', this.__config.isCompressed)}]`, ...formatedArgs]
    : [`[${getLoggerLabel('FATAL', this.__config.isCompressed)}]`, ...formatedArgs]
    return logTool.error.apply(this, nArgs)
  }
}

export function config(option: ILoggerConfigOption = defaultConnfig) {
  const ownOption = {...defaultConnfig, ...option}
  return new Logger(ownOption)
}
