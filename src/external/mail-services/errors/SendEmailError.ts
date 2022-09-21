import { CommonError, Params } from '@/domain/errors/CommonError'

export class SendEmailError extends CommonError {
  constructor ({ input }: Params) {
    super({ input: `It was not possible to send email due to "${input}"` })
  }
}
