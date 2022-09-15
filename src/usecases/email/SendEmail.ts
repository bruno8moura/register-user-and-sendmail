import { Either } from '@/shared/util/Either'

export interface IMessage {
    destinations: string[],
    attachments: string[],
    body: any,
    title: string
}

interface IResponse {
    sended: boolean,
    detail: string,
    destinations: string[]
}

export interface IEmailSenderServiceResponse {
    sended: boolean,
    destinations: string[]
}

export interface IEmailSenderService {
    send: (message: IMessage) => Promise<Either<Error, IEmailSenderServiceResponse>>
}

export class SendEmail {
    private readonly emailSenderService: IEmailSenderService
    constructor (emailSenderService: IEmailSenderService) {
      this.emailSenderService = emailSenderService
    }

    async execute (message: IMessage): Promise<IResponse> {
      const result = await this.emailSenderService.send(message)

      const value = result.value as IEmailSenderServiceResponse

      return {
        sended: value.sended,
        detail: `Email has been sended to ${message.destinations[0]}`,
        destinations: value.destinations
      }
    }
}
