import { Either, left, right } from '@/shared/util/Either'
import { SendEmailError } from '@/usecases/errors/SendEmailError'
import {
  IEmailSenderService,
  IEmailSenderServiceResponse,
  IRequest
}
  from '@/usecases/ports/IEmailSenderService'

import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

interface AuthEmailServerConfiguration {
    user: string,
    pass: string
}

export interface EmailServerConfiguration {
    host: string,
    port: string,
    auth: AuthEmailServerConfiguration
}

export class EmailSenderService implements IEmailSenderService {
    private readonly config: EmailServerConfiguration
    constructor (config: EmailServerConfiguration) {
      this.config = config
    }

    async send (request: IRequest): Promise<Either<SendEmailError, IEmailSenderServiceResponse>> {
      try {
        const options: SMTPTransport.Options = {
          host: this.config.host,
          port: Number(this.config.port),
          auth: {
            user: this.config.auth.user,
            pass: this.config.auth.pass
          }
        }

        const transporter = nodemailer.createTransport(options)

        const result = await transporter.sendMail({
          from: request.from,
          to: request.destination,
          subject: request.title,
          text: request.rawText,
          html: request.body,
          attachments: request.attachments
        })

        return right({
          sended: result.accepted.includes(request.destination),
          attached: request.attachments.length > 0,
          destination: request.destination
        })
      } catch (error) {
        return left(new SendEmailError({ input: error.message }))
      }
    }
}
