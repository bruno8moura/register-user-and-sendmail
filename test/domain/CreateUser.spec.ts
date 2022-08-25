import { InvalidEmailError } from '../../src/domain/errors/InvalidEmailError'
import { InvalidNameError } from '../../src/domain/errors/InvalidNameError'
import { User } from '../../src/domain/User'

describe('Domain :: CreateUser', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({
      name: 'any_name',
      email: invalidEmail
    }).value

    expect(error).toEqual(new InvalidEmailError({ input: invalidEmail }))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0        '
    const error = User.create({
      name: invalidName,
      email: 'any@mail.com'
    }).value

    expect(error).toEqual(new InvalidNameError({ input: invalidName }))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(257)
    const error = User.create({
      name: invalidName,
      email: 'any@mail.com'
    }).value

    expect(error).toEqual(new InvalidNameError({ input: invalidName }))
  })

  test('should create user with valid data', () => {
    const expected = {
      name: 'any_name',
      email: 'any@mail.com'
    }
    const createdUser = User.create({
      name: 'any_name',
      email: 'any@mail.com'
    }).value

    expect(createdUser).toEqual(expected)
  })
})
