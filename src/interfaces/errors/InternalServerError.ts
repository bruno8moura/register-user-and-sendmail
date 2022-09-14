import { AppError } from '@/usecases/errors/AppError'

export class InternalServerError extends AppError {
  constructor () {
    super({ input: 'Internal Server Error' })
    this.errorType = 'server.error'
  }
}
