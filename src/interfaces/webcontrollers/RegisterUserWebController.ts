import { RegisterUserUseCase } from './ports/RegisterUserUseCase'
import { HttpRequest } from './ports'
import { HttpResponse } from './ports/HttpResponse'

export class RegisterUserWebController {
    private readonly useCase: RegisterUserUseCase
    constructor (useCase: RegisterUserUseCase) {
      this.useCase = useCase
    }

    async handle ({ body }: HttpRequest): Promise<HttpResponse> {
      const { name, email } = body
      const result = await this.useCase.execute({ name, email })

      return Promise.resolve({ statusCode: 201, body: result.value })
    }
}
