import { Severity } from '../enums/enum'

interface ILoggerConfigOption {
  severity?: Severity;
  ns?: string;
  isCompressed?: boolean;
}

type SeverityKey = Partial<keyof typeof Severity>

interface ILoggerPluginOption {
  exclude?: string;
  include?: string;
  name: string;
  sourceMap?: string | boolean;
}
