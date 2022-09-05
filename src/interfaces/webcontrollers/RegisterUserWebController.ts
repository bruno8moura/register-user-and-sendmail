import { HttpRequest, HttpResponse, AddUser } from '@/interfaces/webcontrollers/ports'
import { HttpResponseHelper } from '@/interfaces/webcontrollers/helper/HttpResponseHelper'
import { MissingParamError, InternalServerError } from '@/interfaces/errors'

export class RegisterUserWebController {
    private readonly addUser: AddUser
    constructor (addUser: AddUser) {
      this.addUser = addUser
    }

    async handle ({ body }: HttpRequest): Promise<HttpResponse> {
      try {
        const { name, email } = body

        if (!name) {
          return HttpResponseHelper.badRequest({ error: new MissingParamError({ input: 'name' }) })
        }

        if (!email) {
          return HttpResponseHelper.badRequest({ error: new MissingParamError({ input: 'email' }) })
        }

        const result = await this.addUser.execute({ name, email })

        if (result.isLeft()) {
          return HttpResponseHelper.badRequest({ error: result.value })
        }

        return HttpResponseHelper.created({ body: result.value })
      } catch (error) {
        return HttpResponseHelper.internalServerError({ error: new InternalServerError() })
      }
    }
}
