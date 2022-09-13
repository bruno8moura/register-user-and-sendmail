import { AbstractError, Params } from '@/domain/errors/AbstractError'

export class EmailAlreadyRegisteredError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
    this.errorType = 'client.error'
  }
}
