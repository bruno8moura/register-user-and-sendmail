import { CommonError, Params } from '@/domain/errors/CommonError'

export class InvalidEmailError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }
}
