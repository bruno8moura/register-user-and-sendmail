import {
  Email
} from '@/domain/entities/Email'

import { Name } from '@/domain/entities/Name'

import {
  InvalidEmailError,
  InvalidNameError
} from '@/domain/errors'

import {
  Either,
  left,
  right
} from '@/shared/util/Either'

import { AbstractError } from '@/domain/errors/AbstractError'

interface Params {
  name: string,
  email: string
}
export class User {
  private readonly name: string
  private readonly email: string

  private constructor ({ name, email }: Params) {
    this.name = name
    this.email = email
  }

  static create ({ name, email }: Params): Either<AbstractError, User> {
    const nameOrError = Name.create({ input: name })
    const emailOrError = Email.create({ input: email })

    if (nameOrError.isLeft()) return left(new InvalidNameError({ input: name }))
    if (emailOrError.isLeft()) return left(new InvalidEmailError({ input: email }))

    return right(new User({ name, email }))
  }
}
