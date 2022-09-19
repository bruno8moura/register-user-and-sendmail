import { Either, left, right } from '@/shared/util/Either'
import { IEmailSenderService } from '@/usecases/ports/IEmailSenderService'
import EmailFactory from '@/usecases/email/factories/EmailFactory'
import { EmailNotSentError } from '@/usecases/errors/EmailNotSentError'
import { IRequest, IResponse, ISendEmail } from '@/usecases/email/ISendEmail'

export class SendEmailWithBonusAttached implements ISendEmail {
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

    const response = EmailFactory
      .buildSendEmailWithBonusAttachedResponse(result.value)

    return right(response)
  }
}
