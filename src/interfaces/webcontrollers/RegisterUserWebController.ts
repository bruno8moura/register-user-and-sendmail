import { HttpRequest, HttpResponse, RegisterUserUseCase } from '@/interfaces/webcontrollers/ports'
import { HttpResponseHelper } from '@/interfaces/webcontrollers/helper/HttpResponseHelper'
import { MissingParamError } from '../errors/MissingParamError'
import { InternalServerError } from '../errors/InternalServerError'

export class RegisterUserWebController {
    private readonly useCase: RegisterUserUseCase
    constructor (useCase: RegisterUserUseCase) {
      this.useCase = useCase
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

        const result = await this.useCase.execute({ name, email })

        if (result.isLeft()) {
          return HttpResponseHelper.badRequest({ error: result.value })
        }

        return HttpResponseHelper.created({ body: result.value })
      } catch (error) {
        return HttpResponseHelper.internalServerError({ error: new InternalServerError() })
      }
    }
}
