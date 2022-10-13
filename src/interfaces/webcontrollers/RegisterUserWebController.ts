import { HttpRequest, HttpResponse, AddUser } from '@/interfaces/webcontrollers/ports'
import { HttpResponseHelper } from '@/interfaces/webcontrollers/helper/HttpResponseHelper'
import { MissingParamError, InternalServerError } from '@/interfaces/errors'
import { Controller } from '@/interfaces/webcontrollers/Controller'
import { ISendEmail } from '@/usecases/email/ISendEmail'
import { ILogger } from '@/usecases/ports/ILogger'

export class RegisterUserWebController implements Controller {
    private readonly addUser: AddUser
    private readonly sendEmailWithBonusAttached: ISendEmail
    private readonly logger: ILogger
    constructor (addUser: AddUser, sendEmailWithBonusAttached: ISendEmail, logger: ILogger) {
      this.addUser = addUser
      this.sendEmailWithBonusAttached = sendEmailWithBonusAttached
      this.logger = logger
    }

    async handle ({ body }: HttpRequest): Promise<HttpResponse> {
      try {
        const { name, email } = body

        if (!name) {
          return HttpResponseHelper.badRequest({ body: new MissingParamError({ input: 'name' }) })
        }

        if (!email) {
          return HttpResponseHelper.badRequest({ body: new MissingParamError({ input: 'email' }) })
        }

        const result = await this.addUser.execute({ name, email })

        if (result.isLeft()) {
          return HttpResponseHelper.badRequest({ body: result.value })
        }

        const sendEmailResponse = await this.sendEmailWithBonusAttached.execute({ user: result.value })

        this.logger.info({ data: sendEmailResponse })

        return HttpResponseHelper.created({ body: result.value })
      } catch (error) {
        this.logger.error({ data: error })
        return HttpResponseHelper.internalServerError({ body: new InternalServerError() })
      }
    }
}
