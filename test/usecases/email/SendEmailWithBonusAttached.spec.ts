import { UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'
import { IResponse, SendEmailWithBonusAttached } from '@/usecases/email/SendEmailWithBonusAttached'
import { IEmailSenderService, IEmailSenderServiceResponse, IMessage } from '@/usecases/ports/IEmailSenderService'

const makeEmailSenderServiceStub = (): IEmailSenderService => {
  class EmailSenderServiceStub implements IEmailSenderService {
    send (message: IMessage): Promise<Either<Error, IEmailSenderServiceResponse>> {
      return Promise.resolve({
        isLeft: () => false,
        isRight: () => true,
        value: {
          destination: message.destination,
          sended: true,
          attached: true
        }
      })
    }
  }

  return new EmailSenderServiceStub()
}

describe('Usercase :: SendEmailWithBonusAttached', () => {
  test('should send an email with bonus attached', async () => {
    const expected: Either<Error, IResponse> = {
      isLeft: () => false,
      isRight: () => true,
      value: {
        sended: true,
        detail: 'Email has been sended to any@email.com',
        destination: 'any@email.com',
        attached: true
      }
    }

    const emailSender = makeEmailSenderServiceStub()

    const user: UserModel = {
      id: '123abc',
      name: 'Any User',
      email: 'any@email.com'
    }

    const result = await new SendEmailWithBonusAttached(emailSender).execute({
      user
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    expect(result.value).toStrictEqual(expected.value)
  })
})
