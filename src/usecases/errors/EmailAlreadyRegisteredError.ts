import { CommonError, Params } from '@/domain/errors/CommonError'

export class EmailAlreadyRegisteredError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
  }
}
