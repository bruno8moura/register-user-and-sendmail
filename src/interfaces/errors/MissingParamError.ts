import { AppError, Params } from '@/usecases/errors/AppError'

export class MissingParamError extends AppError {
  constructor ({ input }: Params) {
    super({ input: `The field "${input}" is missing` })
    this.errorType = 'client.error'
  }
}
