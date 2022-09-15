import { UserModel } from '@/domain'
import EmailFactory from '@/usecases/email/factories/EmailFactory'

describe('Usecases :: Email :: Factories :: EmailFactory', () => {
  describe('#buildEmailData', () => {
    test('should build all needed information to send email', () => {
      const destination = 'any@email.com'
      const attachments = ['anAttachment']
      const title = 'Welcome and enjoy your bonus!'
      const body = '<html>Hello Any User!\n Your bonus is attached.\n </html>'
      const expected = {
        destination,
        attachments,
        title,
        body
      }

      const user: UserModel = {
        id: 'asdf123',
        name: 'Any User',
        email: 'any@email.com'
      }

      const result = EmailFactory.buildEmailData(user, attachments)

      expect(result).toStrictEqual(expected)
    })
  })
})
