import { EmailAlreadyRegisteredError, InvalidUserDataError, User, UserData } from '@/domain'
import { Either, left, right } from '@/shared/util/Either'
import { UserRepository } from '@/usecases/ports/UserRepository'

export class RegisterUserOnMailingList {
    private repository: UserRepository
    constructor (repository: UserRepository) {
      this.repository = repository
    }

    async registerUserOnMailingList (request: UserData): Promise<Either<InvalidUserDataError, UserData>> {
      const foundUser = await this.repository.findUserByEmail(request.email)
      if (foundUser) return left(new EmailAlreadyRegisteredError({ input: request.email }))

      const userOrError = User.create(request)
      if (userOrError.isLeft()) return left(userOrError.value)

      await this.repository.add(request)

      return right(request)
    }
}
