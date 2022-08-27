import { InvalidUserDataError, Params } from './InvalidUserDataError'

export class EmailAlreadyRegisteredError extends InvalidUserDataError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
  }

  get name (): string {
    return EmailAlreadyRegisteredError.name
  }
}
