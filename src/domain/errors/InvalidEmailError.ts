import { BusinessError, Params } from '@/domain/errors/BusinessError'

export class InvalidEmailError extends BusinessError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }
}
