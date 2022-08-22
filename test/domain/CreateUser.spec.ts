import { InvalidEmailError } from '../../src/domain/errors/InvalidEmailError'
import { User } from '../../src/domain/User'
import { left } from '../../src/shared/util/Either'

describe.only('Drivers :: CreateUser', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({
      name: 'any_name',
      email: invalidEmail
    })

    expect(error).toEqual(left(new InvalidEmailError({ email: invalidEmail })))
  })
})
