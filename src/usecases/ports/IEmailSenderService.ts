import { Either } from '@/shared/util/Either'
import { SendEmailError } from '@/usecases/errors/SendEmailError'

export interface IRequest {
    from: string
    destination: string,
    attachments: Object[],
    body: any,
    title: string,
    rawText: string
}

export interface IEmailSenderServiceResponse {
    sended: boolean,
    destination: string,
    attached: boolean
}

export interface IEmailSenderService {
    send: (request: IRequest) => Promise<Either<SendEmailError, IEmailSenderServiceResponse>>
}
