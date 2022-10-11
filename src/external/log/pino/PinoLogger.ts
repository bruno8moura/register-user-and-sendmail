import pino, { Logger } from 'pino'

interface Options {
    level: 'debug' | 'info' | 'error'
}

export default class PinoLogger {
    pinoLoggerImpl: Logger
    private static pinoLoggerInstance: Readonly<PinoLogger>
    private constructor (options: Options) {
      this.pinoLoggerImpl = pino(options)
    }

    static getInstance (options?: Options): Readonly<PinoLogger> {
      if (PinoLogger.pinoLoggerInstance) return PinoLogger.pinoLoggerInstance

      PinoLogger.pinoLoggerInstance = Object.freeze(new PinoLogger(options))

      return PinoLogger.pinoLoggerInstance
    }
}
