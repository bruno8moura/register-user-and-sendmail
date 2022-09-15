import { UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'
import { IEmailSenderService, IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'
import EmailFactory from '@/usecases/email/factories/EmailFactory'

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

    async execute ({ user }: IRequest): Promise<Either<Error, IResponse>> {
      const attachments = ['anAttachment']
      const emailData = EmailFactory.buildEmailData(user, attachments)

      const result = await this.emailSenderService.send(emailData)

      const value = result.value as IEmailSenderServiceResponse

      return Promise.resolve({
        isLeft: () => false,
        isRight: () => true,
        value: {
          sended: value.sended,
          detail: `Email has been sended to ${value.destination}`,
          destination: value.destination,
          attached: value.attached
        }
      })
    }
}
