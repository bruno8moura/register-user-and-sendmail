import { Either } from '@/shared/util/Either'
import { IEmailSenderService, IEmailSenderServiceResponse, IMessage, SendEmail } from '@/usecases/email/SendEmail'

const makeEmailSenderServiceStub = (): IEmailSenderService => {
  class EmailSenderServiceStub implements IEmailSenderService {
    send (message: IMessage): Promise<Either<Error, IEmailSenderServiceResponse>> {
      return Promise.resolve({
        isLeft: () => false,
        isRight: () => true,
        value: {
          destinations: message.destinations,
          sended: true
        }
      })
    }
  }

  return new EmailSenderServiceStub()
}

describe('Usercase :: SendEmail', () => {
  test('should send an email for one destination', async () => {
    const expected = {
      sended: true,
      detail: 'Email has been sended to any@email.com',
      destinations: ['any@email.com']
    }

    const emailSender = makeEmailSenderServiceStub()

    const destinations = ['any@email.com']
    const attachments = ['anAttachment']
    const body = '<html>Hello World</html>'
    const title = 'Send email'

    const result = await new SendEmail(emailSender).execute({
      destinations,
      attachments,
      body,
      title
    })

    expect(result).toStrictEqual(expected)
  })
})
