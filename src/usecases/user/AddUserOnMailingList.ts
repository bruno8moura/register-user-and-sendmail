import { User, UserData } from '@/domain'
import { Either, left, right } from '@/shared/util/Either'
import { UserRepository } from '@/usecases/ports/UserRepository'
import { EmailAlreadyRegisteredError } from '@/usecases/errors/EmailAlreadyRegisteredError'
import { AbstractError } from '@/domain/errors/AbstractError'
import { AddUser } from '@/usecases/user/AddUser'

export class AddUserOnMailingList implements AddUser {
    private repository: UserRepository
    constructor (repository: UserRepository) {
      this.repository = repository
    }

    async execute (request: UserData): Promise<Either<AbstractError, UserData>> {
      const foundUser = await this.repository.findUserByEmail(request.email)
      if (foundUser) return left(new EmailAlreadyRegisteredError({ input: request.email }))

      const userOrError = User.create(request)
      if (userOrError.isLeft()) return left(userOrError.value)

      await this.repository.add(request)

      return right(request)
    }
}
