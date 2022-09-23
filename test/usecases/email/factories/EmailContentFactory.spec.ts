import { UserModel } from '@/domain'
import EmailContentFactory from '@/usecases/email/factories/EmailContentFactory'

describe('Usecases :: Email :: Factories :: EmailContentFactory', () => {
  describe('#buildEmailData', () => {
    test('should build all needed information to send email', () => {
      const attachments = [{
        filename: 'bonus-data.txt',
        path: 'https://raw.githubusercontent.com/bruno8moura/register-user-and-sendmail/assets/email-attachment/bonus-data.txt'
      }]

      const rawText = 'Hello Any User!\n Your bonus is attached.\n'
      const expected = {
        from: 'from@email.com',
        destination: 'any@email.com',
        attachments,
        title: 'Welcome and enjoy your bonus!',
        body: `<html>${rawText}</html>`,
        rawText
      }

      const user: UserModel = {
        id: 'asdf123',
        name: 'Any User',
        email: 'any@email.com'
      }

      const from = 'from@email.com'
      const result = EmailContentFactory.buildContent(user, from)

      expect(result).toStrictEqual(expected)
    })
  })
})
