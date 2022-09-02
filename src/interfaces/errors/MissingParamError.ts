import { AbstractError, Params } from '@/shared/errors/AbstractError'

export class MissingParamError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `The field "${input}" is missing` })
  }

  get name (): string {
    return MissingParamError.name
  }
}
