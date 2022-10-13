import PinoLogger from './PinoLogger'
import pinoHttp, { HttpLogger } from 'pino-http'

export default class HttpPinoLogger {
  httpLoggerImpl: HttpLogger
  private static httpPinoLoggerInstance: Readonly<HttpPinoLogger>
  private constructor (logger: PinoLogger) {
    this.httpLoggerImpl =
      pinoHttp({
        logger: logger.pinoLoggerImpl,
        autoLogging: true
      })
  }

  static getInstance (logger?: PinoLogger): Readonly<HttpPinoLogger> {
    if (HttpPinoLogger.httpPinoLoggerInstance) return HttpPinoLogger.httpPinoLoggerInstance

    if (!logger) throw Error('Logger is undefined.')

    HttpPinoLogger.httpPinoLoggerInstance = Object.freeze(new HttpPinoLogger(logger))

    return HttpPinoLogger.httpPinoLoggerInstance
  }
}
