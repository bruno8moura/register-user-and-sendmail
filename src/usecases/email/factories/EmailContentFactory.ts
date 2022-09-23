import { UserModel } from '@/domain'
import { IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'

export default class EmailFactory {
  static buildContent (user: UserModel, from: string) {
    const attachments = [{
      filename: 'bonus-data.txt',
      path: 'https://raw.githubusercontent.com/bruno8moura/register-user-and-sendmail/assets/email-attachment/bonus-data.txt'
    }]

    const rawText = `Hello ${user.name}!\n Your bonus is attached.\n`
    return {
      from,
      destination: user.email,
      attachments,
      title: 'Welcome and enjoy your bonus!',
      body: `<html>${rawText}</html>`,
      rawText
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
