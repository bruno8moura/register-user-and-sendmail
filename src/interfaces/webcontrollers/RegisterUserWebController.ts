import { HttpRequest, HttpResponse, RegisterUserUseCase } from '@/interfaces/webcontrollers/ports'
import { HttpResponseHelper } from '@/interfaces/webcontrollers/helper/HttpResponseHelper'

export class RegisterUserWebController {
    private readonly useCase: RegisterUserUseCase
    constructor (useCase: RegisterUserUseCase) {
      this.useCase = useCase
    }

    async handle ({ body }: HttpRequest): Promise<HttpResponse> {
      const { name, email } = body
      const result = await this.useCase.execute({ name, email })

      if (result.isLeft()) {
        return HttpResponseHelper.badRequest({ error: result.value })
      }

      return HttpResponseHelper.created({ body: result.value })
    }
}
