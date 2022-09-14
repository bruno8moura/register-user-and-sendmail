import { AppError, Params } from '@/usecases/errors/AppError'

export class EmailAlreadyRegisteredError extends AppError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
    this.errorType = 'client.error'
  }
}
