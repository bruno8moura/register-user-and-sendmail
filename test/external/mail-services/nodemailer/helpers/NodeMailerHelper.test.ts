import { NodeMailerHelper } from '@/external/mail-services/nodemailer/helpers/NodeMailerHelper'

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
nodemailer.createTransport.mockReturnValue({
  sendMail: jest.fn().mockImplementation(obj => ({
    accepted: [obj.to]
  })
  )
})

describe('External :: Mail-Services :: NodeMailer :: Helpers :: NodeMailerHelper', () => {
  beforeEach(() => {
    nodemailer.createTransport.mockClear()
  })

  test('should send an email', async () => {
    const expected = { sended: true }

    const nodeMailerHelper = new NodeMailerHelper({
      host: 'any',
      port: 0,
      auth: {
        user: 'any',
        pass: 'any'
      }
    })

    const result = await nodeMailerHelper.send({
      to: 'any_to@email.com',
      from: 'any_from@email.com',
      html: '<html>Hello World!</html>',
      subject: 'A subject',
      text: 'A text',
      attachments: [
        { a: 1 },
        { b: 2 }
      ]
    })

    expect(result.value).toStrictEqual(expected)
  })

  test('should return erro when email is not sent', async () => {
    const expected = new Error('An error happened')

    const nodeMailerHelper = new NodeMailerHelper({
      host: 'any',
      port: 0,
      auth: {
        user: 'any',
        pass: 'any'
      }
    })

    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockImplementation(
        obj => {
          throw new Error('An error happened')
        }
      )
    })

    const result = await nodeMailerHelper.send({
      to: 'any_to@email.com',
      from: 'any_from@email.com',
      html: '<html>Hello World!</html>',
      subject: 'A subject',
      text: 'A text',
      attachments: [
        { a: 1 },
        { b: 2 }
      ]
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(expected)
  })
})
