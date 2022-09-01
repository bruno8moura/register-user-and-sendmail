import { RegisterUserUseCase } from './ports/RegisterUserUseCase'
import { HttpRequest } from './ports'
import { HttpResponse } from './ports/HttpResponse'
import { HttpResponseHelper } from './helper/HttpResponseHelper'

export class RegisterUserWebController {
    private readonly useCase: RegisterUserUseCase
    constructor (useCase: RegisterUserUseCase) {
      this.useCase = useCase
    }

    async handle ({ body }: HttpRequest): Promise<HttpResponse> {
      const { name, email } = body
      const { value } = await this.useCase.execute({ name, email })

      return HttpResponseHelper.created({ body: value })
    }
}
