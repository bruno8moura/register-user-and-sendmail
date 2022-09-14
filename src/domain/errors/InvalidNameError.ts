import { BusinessError, Params } from '@/domain/errors/BusinessError'

export class InvalidNameError extends BusinessError {
  constructor ({ input }: Params) {
    super({ input: `The name "${input}" is invalid` })
  }
}
