import { InvalidUserDataError, Params } from '@/domain/errors'

export class EmailAlreadyRegisteredError extends InvalidUserDataError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
  }

  get name (): string {
    return EmailAlreadyRegisteredError.name
  }
}
