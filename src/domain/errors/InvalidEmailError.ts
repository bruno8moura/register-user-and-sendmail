import { InvalidUserDataError, Params } from '@/domain/errors/InvalidUserDataError'

export class InvalidEmailError extends InvalidUserDataError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }

  get name (): string {
    return InvalidEmailError.name
  }
}
