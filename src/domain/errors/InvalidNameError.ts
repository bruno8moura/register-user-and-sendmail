import { AbstractError, Params } from '@/shared/errors/AbstractError'

export class InvalidNameError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `The name "${input}" is invalid` })
  }

  get name (): string {
    return InvalidNameError.name
  }
}
