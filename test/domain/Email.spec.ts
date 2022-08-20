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

  test('should not accept string larger than 320 chars', () => {
    const email = 'l'.repeat(64).concat('@').concat('mail'.repeat(150)).concat('.').concat('com'.repeat(150))
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })

  test('should not accept domain part larger than 255 chars', () => {
    const email = 'l'.repeat(5).concat('@').concat('m'.repeat(256)).concat('.').concat('com')
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@mail.com'
    const result = Email.validate({ input: email })

    expect(result).toBeFalsy()
  })
})
