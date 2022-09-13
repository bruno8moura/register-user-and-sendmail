import { AbstractError } from '@/domain'

export class InternalServerError extends AbstractError {
  constructor () {
    super({ input: 'Internal Server Error' })
    this.errorType = 'server.error'
  }
}
