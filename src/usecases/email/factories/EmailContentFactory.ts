import { UserModel } from '@/domain'
import { IEmailSenderServiceResponse } from '@/usecases/ports/IEmailSenderService'

export default class EmailContentFactory {
  static buildContent (user: UserModel, { from, attachedFilePath }) {
    const attachments = [{
      filename: attachedFilePath.split('/')[attachedFilePath.split('/').length - 1],
      path: attachedFilePath
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
