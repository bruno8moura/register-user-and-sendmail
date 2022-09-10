import { MongodbUserRepository } from '@/external/repositories/mongodb/MongodbUserRepository'
import { RegisterUserWebController } from '@/interfaces/webcontrollers/RegisterUserWebController'
import { AddUserOnMailingList } from '@/usecases'

export class RegisterUserFactory {
  static create (): RegisterUserWebController {
    const repository = new MongodbUserRepository()
    const useCase = new AddUserOnMailingList(repository)
    const registerUserController: RegisterUserWebController = new RegisterUserWebController(useCase)

    return registerUserController
  }
}
