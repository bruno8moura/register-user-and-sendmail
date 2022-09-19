import { InvalidEmailError, InvalidNameError, User, UserModel } from '@/domain'
import { Either, left, right } from '@/shared/util/Either'
import { UserRepository } from '@/usecases/ports/UserRepository'
import { EmailAlreadyRegisteredError } from '@/usecases/errors/EmailAlreadyRegisteredError'
import { AddUser, AddUserModel } from '@/usecases/user/AddUser'

export class AddUserOnMailingList implements AddUser {
    private repository: UserRepository
    constructor (repository: UserRepository) {
      this.repository = repository
    }

    async execute (request: AddUserModel): Promise<Either<InvalidEmailError | InvalidNameError | EmailAlreadyRegisteredError, UserModel>> {
      const foundUser = await this.repository.findUserByEmail(request.email)
      if (foundUser) return left(new EmailAlreadyRegisteredError({ input: request.email }))

      const userOrError = User.create(request)
      if (userOrError.isLeft()) return left(userOrError.value)

      const newUser = await this.repository.add(request)

      return right(newUser)
    }
}
