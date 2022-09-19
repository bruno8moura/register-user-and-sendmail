import { CommonError, Params } from '@/domain/errors/CommonError'

export class EmailNotSentError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `Email was not sent to ${input}` })
  }
}
