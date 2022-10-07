import { EmailSenderService } from '@/external/mail-services/nodemailer/EmailSenderService'
import { SendEmailError } from '@/usecases/errors/SendEmailError'

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
nodemailer.createTransport.mockReturnValue({
  sendMail: jest.fn().mockImplementation(obj => ({
    accepted: [obj.to]
  })
  )
})

describe('External :: Mail-Services :: NodeMailer :: EmailSenderService', () => {
  beforeEach(() => {
    nodemailer.createTransport.mockClear()
  })

  test('should send an email', async () => {
    const expected = { sended: true, attached: true, destination: 'any_to@email.com' }

    const emailSenderService = new EmailSenderService({
      host: 'any',
      port: '0',
      auth: {
        user: 'any',
        pass: 'any'
      },
      secure: true
    })

    const result = await emailSenderService.send({
      destination: 'any_to@email.com',
      from: 'any_from@email.com',
      body: '<html>Hello World!</html>',
      title: 'A subject',
      rawText: 'A text',
      attachments: [
        { a: 1 },
        { b: 2 }
      ]
    })

    expect(result.value).toStrictEqual(expected)
  })

  test('should return erro when email is not sent', async () => {
    const expected = new SendEmailError({ input: 'An error happened' })

    const emailSenderService = new EmailSenderService({
      host: 'any',
      port: '0',
      auth: {
        user: 'any',
        pass: 'any'
      },
      secure: true
    })

    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockImplementation(
        obj => {
          throw new Error('An error happened')
        }
      )
    })

    const result = await emailSenderService.send({
      destination: 'any_to@email.com',
      from: 'any_from@email.com',
      body: '<html>Hello World!</html>',
      title: 'A subject',
      rawText: 'A text',
      attachments: [
        { a: 1 },
        { b: 2 }
      ]
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toBeInstanceOf(SendEmailError)
    expect(result.value).toStrictEqual(expected)
  })
})
