import { Logger } from '@/external/log/pino/Logger'
import { EmailSenderService, EmailServerConfiguration } from '@/external/mail-services/nodemailer/EmailSenderService'
import { MongodbUserRepository } from '@/external/repositories/mongodb/MongodbUserRepository'
import { RegisterUserWebController } from '@/interfaces/webcontrollers/RegisterUserWebController'
import { env } from '@/main/config/env'
import { AddUserOnMailingList } from '@/usecases'
import { ISendEmail } from '@/usecases/email/ISendEmail'
import { SendEmailWithBonusAttached } from '@/usecases/email/SendEmailWithBonusAttached'
import { IEmailSenderService } from '@/usecases/ports/IEmailSenderService'

export class RegisterUserFactory {
  static create (): RegisterUserWebController {
    const logger = new Logger()
    const repository = new MongodbUserRepository()
    const addUser = new AddUserOnMailingList(repository)
    const emailServerConfiguration: EmailServerConfiguration = {
      host: env.smtpServer.HOST,
      port: env.smtpServer.PORT,
      auth: {
        user: env.smtpServer.credentials.USER,
        pass: env.smtpServer.credentials.PASS
      },
      secure: env.smtpServer.SECURE
    }
    const emailSenderService: IEmailSenderService = new EmailSenderService(emailServerConfiguration)
    const sendEmailWithBonusAttached: ISendEmail =
    new SendEmailWithBonusAttached(
      emailSenderService,
      {
        from: env.email.SENDER,
        attachedFilePath: env.email.ATTACHED_FILE_PATH
      })
    const registerUserController: RegisterUserWebController =
    new RegisterUserWebController(
      addUser,
      sendEmailWithBonusAttached,
      logger
    )

    return registerUserController
  }
}
