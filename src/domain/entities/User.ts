import {
  Email
} from '@/domain/entities/Email'

import { Name } from '@/domain/entities/Name'
import {
  InvalidEmailError,
  InvalidNameError,
  InvalidUserDataError
} from '@/domain/errors'
import { UserData } from '@/domain/entities/UserData'
import {
  Either,
  left,
  right
} from '@/shared/util/Either'

export class User {
  private readonly name: string
  private readonly email: string

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
