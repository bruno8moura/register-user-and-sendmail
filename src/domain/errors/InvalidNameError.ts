import { InvalidUserDataError, Params } from '@/domain/errors/InvalidUserDataError'

export class InvalidNameError extends InvalidUserDataError {
  constructor ({ input }: Params) {
    super({ input: `The name "${input}" is invalid` })
  }

  get name (): string {
    return InvalidNameError.name
  }
}
