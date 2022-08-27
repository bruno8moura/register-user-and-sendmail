import { InvalidUserDataError, Params } from './InvalidUserDataError'

export class InvalidEmailError extends InvalidUserDataError {
  public readonly name = 'InvalidEmailError'
  constructor ({ input }: Params) {
    super({ input: `The email "${input}" is invalid` })
  }
}
