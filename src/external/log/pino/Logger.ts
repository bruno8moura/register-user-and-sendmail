import { ILogger, IRequest } from '@/usecases/ports/ILogger'
import PinoLogger from './driver/PinoLogger'

export class Logger implements ILogger {
  private readonly logger: Readonly<PinoLogger>
  constructor () {
    this.logger = PinoLogger.getInstance()
  }

  info (req: IRequest) {
    this.logger.pinoLoggerImpl.info(req.data)
  }

  error (req: IRequest) {
    this.logger.pinoLoggerImpl.error(req.data)
  }
}
