import { Email } from '../../src/domain/Email'

describe('Domain :: EmailValidation', () => {
  test('should not accept null strings', () => {
    const email = null
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@mail.com'
    const result = Email.validate({ input: email })

    expect(result).toBeTruthy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65).concat('@mail.com')
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })
})
