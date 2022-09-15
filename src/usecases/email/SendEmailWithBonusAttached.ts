import { UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'
import { IEmailSenderService, IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'

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
      const { email: destination } = user
      const attachments = ['anAttachment']
      const title = 'Welcome and enjoy your bonus!'
      const body = `
                    <html>
                      Hello ${user.name}!\n
                      Your bonus is attached.
                    </html>
                  `

      const result = await this.emailSenderService.send({
        destination,
        body,
        attachments,
        title
      })

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
