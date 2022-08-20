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
})
