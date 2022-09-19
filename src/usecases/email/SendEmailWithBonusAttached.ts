import { UserModel } from '@/domain'
import { Either, left, right } from '@/shared/util/Either'
import { IEmailSenderService, IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'
import EmailFactory from '@/usecases/email/factories/EmailFactory'
import { EmailNotSentError } from '../errors/EmailNotSentError'

export interface IResponse {
  sended: boolean,
  detail: string,
  destination: string,
  attached: boolean
}

export interface IRequest {
  user: UserModel,
}

export class SendEmailWithBonusAttached {
  private readonly emailSenderService: IEmailSenderService
  constructor (emailSenderService: IEmailSenderService) {
    this.emailSenderService = emailSenderService
  }

  async execute ({ user }: IRequest): Promise<Either<EmailNotSentError, IResponse>> {
    const attachments = ['anAttachment'] // TODO attach a file!
    const emailData = EmailFactory.buildEmailData(user, attachments)

    const result = await this.emailSenderService.send(emailData)

    if (result.isLeft()) {
      // TODO logger.error(result.value)
      return left(new EmailNotSentError({ input: user.email }))
    }

    const value = result.value as IEmailSenderServiceResponse
    const response = {
      sended: value.sended,
      detail: `Email has been sent to ${value.destination}`,
      destination: value.destination,
      attached: value.attached
    }

    return right(response)
  }
}
