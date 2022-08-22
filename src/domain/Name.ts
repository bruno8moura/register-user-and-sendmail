import { Either, left, right } from '../shared/util/Either'
import { InvalidNameError } from './errors/InvalidNameError'

interface Params {
    input: string
}

export class Name {
  private readonly name: string
  private constructor (name: string) {
    this.name = name
  }

  static create ({ input }: Params): Either<InvalidNameError, Name> {
    if (!Name.validate(input)) {
      return left(new InvalidNameError({ input }))
    }

    return right(new Name(input))
  }

  static validate (name: string): boolean {
    if (name.trim().length < 2) {
      return false
    }

    if (name.trim().length > 255) {
      return false
    }

    return true
  }
}
