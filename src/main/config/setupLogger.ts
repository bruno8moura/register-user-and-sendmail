import { Express } from 'express'
import PinoLogger from '@/external/log/pino/PinoLogger'
import HttpPinoLogger from '@/external/log/pino/HttpPinoLogger'

interface Request {
    app:Express
  }

export default ({ app }: Request) => {
  const logger = PinoLogger.getInstance({ level: 'info' })
  const httpLogger = HttpPinoLogger.getInstance(logger)

  app.use(httpLogger.httpLoggerImpl)
}
