import { ILogger } from '@/usecases/ports/ILogger'
import PinoLogger from './driver/PinoLogger'

export class Logger implements ILogger {
  private readonly pinoLogger: Readonly<PinoLogger>
  private static loggerInstance: Readonly<ILogger>
  private constructor () {
    this.pinoLogger = PinoLogger.getInstance()
  }

  info (req: any) {
    this.pinoLogger.pinoLoggerImpl.info(req)
  }

  error (req: any) {
    this.pinoLogger.pinoLoggerImpl.error(req)
  }

  static getInstance (): Readonly<ILogger> {
    if (Logger.loggerInstance) return Logger.loggerInstance

    Logger.loggerInstance = Object.freeze(new Logger())

    return Logger.loggerInstance
  }
}
