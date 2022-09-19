import { UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'
import { EmailNotSentError } from '@/usecases/errors/EmailNotSentError'

export interface IRequest {
    user: UserModel,
  }

export interface IResponse {
    sended: boolean,
    detail: string,
    destination: string,
    attached: boolean
  }

export interface ISendEmail {
    execute ({ user }: IRequest): Promise<Either<EmailNotSentError, IResponse>>
}
