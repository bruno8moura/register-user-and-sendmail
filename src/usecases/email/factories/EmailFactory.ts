import { UserModel } from '@/domain'
import { IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'

export default class EmailFactory {
  static buildEmailData (user: UserModel, attachments: string[]) {
    return {
      destination: user.email,
      attachments,
      title: 'Welcome and enjoy your bonus!',
      body: `<html>Hello ${user.name}!\n Your bonus is attached.\n </html>`
    }
  }

  static buildSendEmailWithBonusAttachedResponse (data: IEmailSenderServiceResponse) {
    return {
      sended: data.sended,
      detail: `Email has been sent to ${data.destination}`,
      destination: data.destination,
      attached: data.attached
    }
  }
}
