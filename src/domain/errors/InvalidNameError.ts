import { CommonError, Params } from '@/domain/errors/CommonError'

export class InvalidNameError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `The name "${input}" is invalid` })
  }
}
