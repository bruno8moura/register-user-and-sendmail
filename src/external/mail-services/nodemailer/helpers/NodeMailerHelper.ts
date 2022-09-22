import { Either, left, right } from '@/shared/util/Either'
import * as nodemailer from 'nodemailer'

interface AuthEmailServerConfiguration {
  user: string,
  pass: string
}

interface EmailServerConfiguration {
  host: string,
  port: number,
  auth: AuthEmailServerConfiguration
}

interface IRequest {
    to: string,
    from: string,
    text: string,
    html: string,
    subject: string
    attachments: Object[]
}

interface IResponse {
    sended: boolean
}

export class NodeMailerHelper {
  private readonly config: EmailServerConfiguration
  constructor (config: EmailServerConfiguration) {
    this.config = config
  }

  async send (request: IRequest): Promise<Either<Error, IResponse>> {
    try {
      const transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        auth: {
          user: this.config.auth.user,
          pass: this.config.auth.pass
        }
      })

      const result = await transporter.sendMail({
        from: request.from,
        to: request.to,
        subject: request.subject,
        text: request.text,
        html: request.html,
        attachments: request.attachments
      })

      return right({ sended: result.accepted.includes(request.to) })
    } catch (error) {
      return left(error)
    }
  }
}
