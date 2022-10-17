import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { hostname } from 'os'
import { Logger } from '@/external/log/pino/Logger'
const { database: { MONGO_URL }, server: { PORT } } = env

const start = async () => {
  const logger = Logger.getInstance()
  try {
    await MongoHelper.connect(MONGO_URL)
    app.listen(PORT, () => logger.info(`Server running at http://${hostname}:${PORT}`))
    MongoHelper.gracefulShutdown()
  } catch (error) {
    logger.error(error)
  }
}

start()
