import { UserData } from '../usecases/UserData'
import { Email } from './Email'
import { InvalidUserDataError } from '../shared/errors/InvalidUserDataError'
import { Name } from './Name'
import { Either, left, right } from '../shared/util/Either'
import { InvalidNameError } from '../shared/errors/InvalidNameError'
import { InvalidEmailError } from '../shared/errors/InvalidEmailError'
export class User {
  private readonly name
  private readonly email

  private constructor ({ name, email }: UserData) {
    this.name = name
    this.email = email
  }

  static create ({ name, email }: UserData): Either<InvalidUserDataError, User> {
    const nameOrError = Name.create({ input: name })
    const emailOrError = Email.create({ input: email })

    if (nameOrError.isLeft()) return left(new InvalidNameError({ input: name }))
    if (emailOrError.isLeft()) return left(new InvalidEmailError({ input: email }))

    return right(new User({ name, email }))
  }
}
