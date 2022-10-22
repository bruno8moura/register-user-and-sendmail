import 'module-alias/register'
import './config/moduleAliases'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { hostname } from 'os'
import { Logger } from '@/external/log/pino/Logger'
import { Server } from 'http'
import { configGracefulShutdown } from '@/main/config/gracefulShutdown'
const { database: { MONGO_URL }, server: { PORT } } = env

const start = async (): Promise<void> => {
  const logger = Logger.getInstance()
  try {
    await MongoHelper.connect(MONGO_URL)
    const server: Server = app.listen(PORT, () => logger.info(`Server running at http://${hostname}:${PORT}`))

    configGracefulShutdown({ server })
  } catch (error) {
    logger.error(error)
  }
}

start()
