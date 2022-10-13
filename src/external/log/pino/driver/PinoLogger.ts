import pino, { Logger } from 'pino'
import { env } from '@/main/config/env'

interface Options {
    level: 'debug' | 'info' | 'error'
}

export default class PinoLogger {
    pinoLoggerImpl: Logger
    private static pinoLoggerInstance: Readonly<PinoLogger>
    private constructor (options: Options) {
      if (env.server.env === 'local') {
        this.pinoLoggerImpl = pino({
          ...options,
          transport: {
            target: 'pino-pretty'
          }
        })
      } else this.pinoLoggerImpl = pino(options)
    }

    static getInstance (options?: Options): Readonly<PinoLogger> {
      if (PinoLogger.pinoLoggerInstance) return PinoLogger.pinoLoggerInstance

      PinoLogger.pinoLoggerInstance = Object.freeze(new PinoLogger(options))

      return PinoLogger.pinoLoggerInstance
    }
}
