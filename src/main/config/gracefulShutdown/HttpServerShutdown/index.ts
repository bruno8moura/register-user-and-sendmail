import { promisify } from 'util'
import { Logger } from '@/external/log/pino/Logger'
import { Server } from 'http'

interface IRequest {
    server: Server,
    signal: string
}

export class HttpServerShutdown {
  private server: Server
  private signal: string

  constructor ({ server, signal }: IRequest) {
    this.server = server
    this.signal = signal
  }

  async shutdown () {
    const logger = Logger.getInstance()
    logger.info(`\n${this.signal} signal received!`)

    logger.info('Closing http server')
    await promisify(this.server.close.bind(this.server))()
    logger.info('Http server has closed!')
  }
}
