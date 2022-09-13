import { AbstractError, Params } from '@/domain/errors/AbstractError'

export class InvalidEmailError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
    this.errorType = 'client.error'
  }
}
