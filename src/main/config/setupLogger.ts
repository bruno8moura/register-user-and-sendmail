import { Express } from 'express'
import PinoLogger from '@/external/log/pino/driver/PinoLogger'
import HttpPinoLogger from '@/external/log/pino/driver/HttpPinoLogger'
import { env } from '@/main/config/env'

interface Request {
    app:Express
  }

export default ({ app }: Request) => {
  const logger = PinoLogger.getInstance({ level: env.LOGGER.level ?? 'info' })
  const httpLogger = HttpPinoLogger.getInstance(logger)

  app.use(httpLogger.httpLoggerImpl)
}
