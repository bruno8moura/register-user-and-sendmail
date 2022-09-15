import { UserModel } from '@/domain'

export default class EmailFactory {
  static buildEmailData (user: UserModel, attachments: string[]) {
    return {
      destination: user.email,
      attachments,
      title: 'Welcome and enjoy your bonus!',
      body: `<html>Hello ${user.name}!\n Your bonus is attached.\n </html>`
    }
  }
}
