import { AbstractError } from '@/domain/errors/AbstractError'

export class InternalServerError extends AbstractError {
  constructor () {
    super({ input: 'Internal Server Error' })
  }

  get name (): string {
    return InternalServerError.name
  }
}
