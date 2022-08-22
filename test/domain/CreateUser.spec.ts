import { InvalidEmailError } from '../../src/domain/errors/InvalidEmailError'
import { InvalidNameError } from '../../src/domain/errors/InvalidNameError'
import { User } from '../../src/domain/User'
import { left } from '../../src/shared/util/Either'

describe('Drivers :: CreateUser', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({
      name: 'any_name',
      email: invalidEmail
    })

    expect(error).toEqual(left(new InvalidEmailError({ input: invalidEmail })))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0        '
    const error = User.create({
      name: invalidName,
      email: 'any@mail.com'
    })

    expect(error).toEqual(left(new InvalidNameError({ input: invalidName })))
  })
})
