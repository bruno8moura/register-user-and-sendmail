import { AbstractError, Params } from '@/shared/errors/AbstractError'

export class InvalidEmailError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }

  get name (): string {
    return InvalidEmailError.name
  }
}
