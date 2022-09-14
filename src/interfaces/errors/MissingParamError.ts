import { CommonError, Params } from '@/domain/errors/CommonError'

export class MissingParamError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `The field "${input}" is missing` })
  }
}
