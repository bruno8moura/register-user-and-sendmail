import { AbstractError, Params } from '@/domain/errors/AbstractError'

export class MissingParamError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `The field "${input}" is missing` })
    this.errorType = 'client.error'
  }
}
