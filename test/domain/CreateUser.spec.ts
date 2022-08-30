import { InvalidEmailError, InvalidNameError, User } from '@/domain'

describe('Domain :: CreateUser', () => {
  test('should not create user with invalid email address', () => {
    const invalidEmail = 'invalid_email'
    const expectedErrorMessage = `The email "${invalidEmail}" is invalid`
    const error = User.create({
      name: 'any_name',
      email: invalidEmail
    }).value as InvalidEmailError

    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual(expectedErrorMessage)
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0        '
    const expectedErrorMessage = `The name "${invalidName}" is invalid`
    const error = User.create({
      name: invalidName,
      email: 'any@mail.com'
    }).value as InvalidNameError

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(expectedErrorMessage)
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(257)
    const expectedErrorMessage = `The name "${invalidName}" is invalid`
    const error = User.create({
      name: invalidName,
      email: 'any@mail.com'
    }).value as InvalidNameError

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual(expectedErrorMessage)
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
