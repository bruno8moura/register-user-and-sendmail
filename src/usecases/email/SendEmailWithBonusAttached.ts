import { Either, left, right } from '@/shared/util/Either'
import { IEmailSenderService } from '@/usecases/ports/IEmailSenderService'
import EmailContentFactory from '@/usecases/email/factories/EmailContentFactory'
import { EmailNotSentError } from '@/usecases/errors/EmailNotSentError'
import { IRequest, IResponse, ISendEmail } from '@/usecases/email/ISendEmail'

interface ISenderAddress {
  email: string
}
export class SendEmailWithBonusAttached implements ISendEmail {
  private readonly emailSenderService: IEmailSenderService
  private readonly senderAddress: ISenderAddress
  constructor (emailSenderService: IEmailSenderService, senderAddress: ISenderAddress) {
    this.emailSenderService = emailSenderService
    this.senderAddress = senderAddress
  }

  async execute ({ user }: IRequest): Promise<Either<EmailNotSentError, IResponse>> {
    const emailData = EmailContentFactory.buildContent(user, this.senderAddress.email)

    const result = await this.emailSenderService.send(emailData)

    if (result.isLeft()) {
      return left(new EmailNotSentError({ input: user.email }))
    }

    const response = EmailContentFactory
      .buildSendEmailWithBonusAttachedResponse(result.value)

    return right(response)
  }
}
