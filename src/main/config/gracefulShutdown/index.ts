import { Logger } from '@/external/log/pino/Logger'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { Server } from 'http'
import { HttpServerShutdown } from './HttpServerShutdown'

interface IRequest {
    server: Server,
}

export const configGracefulShutdown = ({ server }: IRequest) => {
  const onStop = async (signal: string) => {
    await new HttpServerShutdown({ server, signal }).shutdown()
    await MongoHelper.disconnect()

    const sucessful = 0
    process.exit(sucessful)
  }

  [
    'SIGINT', // SIGINT: ctrl + c
    'SIGTERM' // SIGTERM: in shell run "kill <pid>"
  ].forEach(event => {
    process.on(event, onStop)
    Logger.getInstance().info(`Graceful shutdown configured to signal: ${event}`)
  })
}
