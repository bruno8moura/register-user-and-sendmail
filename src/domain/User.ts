import { Either } from '../shared/util/Either'
import { UserData } from '../usecases/UserData'
import { Email } from './Email'
import { InvalidEmailError } from './errors/InvalidEmailError'

export class User {
  static create ({ email }: UserData): Either<InvalidEmailError, User> {
    const result = Email.create({ input: email })

    return result
  }
}
