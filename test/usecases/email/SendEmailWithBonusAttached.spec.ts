import { UserModel } from '@/domain'
import { Either, left, right } from '@/shared/util/Either'
import { Left } from '@/shared/util/Either/Left'
import { IResponse } from '@/usecases/email/ISendEmail'
import { SendEmailWithBonusAttached } from '@/usecases/email/SendEmailWithBonusAttached'
import { EmailNotSentError } from '@/usecases/errors/EmailNotSentError'
import { IEmailSenderService, IEmailSenderServiceResponse, IRequest } from '@/usecases/ports/IEmailSenderService'

const makeEmailSenderServiceStub = (): IEmailSenderService => {
  class EmailSenderServiceStub implements IEmailSenderService {
    send (message: IRequest): Promise<Either<EmailNotSentError, IEmailSenderServiceResponse>> {
      return Promise.resolve(right({
        destination: message.destination,
        sended: true,
        attached: true
      }))
    }
  }

  return new EmailSenderServiceStub()
}

let emailSender: IEmailSenderService

describe('Usercase :: SendEmailWithBonusAttached', () => {
  beforeEach(() => {
    emailSender = makeEmailSenderServiceStub()
  })

  test('should send an email with bonus attached', async () => {
    const expected: Either<Error, IResponse> = right({
      sended: true,
      detail: 'Email has been sent to any@email.com',
      destination: 'any@email.com',
      attached: true
    })

    const user: UserModel = {
      id: '123abc',
      name: 'Any User',
      email: 'any@email.com'
    }

    const result = await new SendEmailWithBonusAttached(emailSender, { from: 'from@email.com', attachedFilePath: '/1/file' }).execute({
      user
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    expect(result.value).toStrictEqual(expected.value)
  })

  test('should not send an email with invalid email', async () => {
    const expected = new EmailNotSentError({ input: 'invalidEmail' })

    jest.spyOn(emailSender, 'send').mockResolvedValueOnce(left(expected))

    const user: UserModel = {
      id: '123abc',
      name: 'Any User',
      email: 'invalidEmail'
    }

    const result = await new SendEmailWithBonusAttached(emailSender, { from: 'from@email.com', attachedFilePath: '/1/file' }).execute({
      user
    })

    expect(result).toBeInstanceOf(Left)
    expect(result.isRight()).toBeFalsy()
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toStrictEqual(expected)
  })
})
