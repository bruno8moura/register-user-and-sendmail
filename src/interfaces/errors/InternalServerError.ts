import { CommonError } from '@/domain/errors/CommonError'

export class InternalServerError extends CommonError {
  constructor () {
    super({ input: 'Internal Server Error' })
  }
}
