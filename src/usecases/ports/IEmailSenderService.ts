import { Either } from '@/shared/util/Either'

export interface IMessage {
    destination: string,
    attachments: string[],
    body: any,
    title: string
}

export interface IEmailSenderServiceResponse {
    sended: boolean,
    destination: string,
    attached: boolean
}

export interface IEmailSenderService {
    send: (message: IMessage) => Promise<Either<Error, IEmailSenderServiceResponse>>
}
