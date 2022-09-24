import { UserModel } from '@/domain'
import EmailContentFactory from '@/usecases/email/factories/EmailContentFactory'

describe('Usecases :: Email :: Factories :: EmailContentFactory', () => {
  describe('#buildEmailData', () => {
    test('should build all needed information to send email', () => {
      const attachments = [{
        filename: 'bonus-filename',
        path: '/1/2/3/bonus-filename'
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
      const attachedFilePath = '/1/2/3/bonus-filename'
      const result = EmailContentFactory.buildContent(user, { from, attachedFilePath })

      expect(result).toStrictEqual(expected)
    })
  })
})
