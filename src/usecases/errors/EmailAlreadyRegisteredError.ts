import { AbstractError, Params } from '@/shared/errors/AbstractError'

export class EmailAlreadyRegisteredError extends AbstractError {
  constructor ({ input }: Params) {
    super({ input: `Email ${input} already registered` })
  }

  get name (): string {
    return EmailAlreadyRegisteredError.name
  }
}
