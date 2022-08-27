import { InvalidUserDataError, Params } from './InvalidUserDataError'

export class InvalidEmailError extends InvalidUserDataError {
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }
}
