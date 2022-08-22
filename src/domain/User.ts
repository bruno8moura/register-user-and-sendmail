import { UserData } from '../usecases/UserData'
import { Email } from './Email'
import { InvalidUserDataError } from './errors/InvalidUserDataError'
import { Name } from './Name'
import { Either } from '../shared/util/Either'

export class User {
  static create ({ name, email }: UserData): Either<InvalidUserDataError, User> {
    const nameOrError = Name.create({ input: name })
    const emailOrError = Email.create({ input: email })

    if (nameOrError.isLeft()) return nameOrError
    if (emailOrError.isLeft()) return emailOrError
  }
}
