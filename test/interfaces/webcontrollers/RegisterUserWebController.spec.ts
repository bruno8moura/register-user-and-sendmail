import { InternalServerError } from '@/interfaces/errors/InternalServerError'
import { MissingParamError } from '@/interfaces/errors/MissingParamError'
import { AddUser, AddUserModel, HttpRequest, HttpResponse } from '@/interfaces/webcontrollers/ports'
import { RegisterUserWebController } from '@/interfaces/webcontrollers/RegisterUserWebController'
import { Either } from '@/shared/util/Either'
import { InvalidEmailError, InvalidNameError, UserModel } from '@/domain'
import { IRequest, IResponse, ISendEmail } from '@/usecases/email/ISendEmail'
import { EmailNotSentError } from '@/usecases/errors/EmailNotSentError'
import EmailFactory from '@/usecases/email/factories/EmailFactory'

const makeRegisterUserOnMailingList = (): AddUser => {
  class AddUserOnMailingListStub implements AddUser {
    async execute (data: AddUserModel): Promise<Either<InvalidEmailError | InvalidNameError, UserModel>> {
      return Promise.resolve({ isLeft: () => false, isRight: () => true, value: { ...data, id: 'any' } })
    }
  }

  return new AddUserOnMailingListStub()
}

const makeSendEmailwithBonusAttached = (): ISendEmail => {
  class SendEmailWithBonusAttachedStub implements ISendEmail {
    async execute ({ user }: IRequest): Promise<Either<EmailNotSentError, IResponse>> {
      return Promise
        .resolve({
          isLeft: () => false,
          isRight: () => true,
          value: EmailFactory.buildSendEmailWithBonusAttachedResponse({
            sended: true,
            attached: true,
            destination: user.email
          })
        })
    }
  }

  return new SendEmailWithBonusAttachedStub()
}

const makeSut = () => {
  const addUser = makeRegisterUserOnMailingList()
  const sendEmailWithBonusAttached = makeSendEmailwithBonusAttached()
  const controller: RegisterUserWebController = new RegisterUserWebController(addUser, sendEmailWithBonusAttached)

  return {
    addUser,
    sendEmailWithBonusAttached,
    controller
  }
}

describe('Interfaces :: WebControllers :: RegisterUserWebController', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const expected: UserModel = {
      id: 'any',
      name: 'Any Name',
      email: 'any@email.com'
    }
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@email.com'
      }
    }

    const { controller } = makeSut()

    const { statusCode, body }: HttpResponse = await controller.handle(request)

    expect(statusCode).toBe(201)
    expect(body).toStrictEqual(expected)
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'invalid name',
        email: 'any@email.com'
      }
    }

    const expected = {
      body: {
        ...new InvalidEmailError({ input: 'An error!' }),
        errorType: 'client.error'
      },
      statusCode: 400
    }

    const { controller, addUser } = makeSut()

    jest.spyOn(addUser, 'execute').mockImplementationOnce(async () => {
      return Promise.resolve({
        isLeft: () => true,
        isRight: () => false,
        value: new InvalidEmailError({ input: 'An error!' })
      })
    })

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })

  test('should return status code 400 when request contains invalid email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'invalid email'
      }
    }

    const expected = {
      body: {
        ...new InvalidEmailError({ input: 'An error!' }),
        errorType: 'client.error'
      },
      statusCode: 400
    }

    const { controller, addUser } = makeSut()

    jest.spyOn(addUser, 'execute').mockImplementationOnce(async () => {
      return Promise.resolve({
        isLeft: () => true,
        isRight: () => false,
        value: new InvalidEmailError({ input: 'An error!' })
      })
    })

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const request: HttpRequest = {
      body: {
        email: 'any@email.com'
      }
    }

    const expected = {
      body: {
        ...new MissingParamError({ input: 'name' }),
        errorType: 'client.error'
      },
      statusCode: 400
    }

    const { controller } = makeSut()

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })

  test('should return status code 400 when request is missing user email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name'
      }
    }

    const expected = {
      body: {
        ...new MissingParamError({ input: 'email' }),
        errorType: 'client.error'
      },
      statusCode: 400
    }

    const { controller } = makeSut()

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })

  test('should return status code 500 when an "Internal Server Error" happens', async () => {
    const expected = {
      body: {
        ...new InternalServerError(),
        errorType: 'server.error'
      },
      statusCode: 500
    }

    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@email.com'
      }
    }

    const { controller, addUser } = makeSut()

    jest.spyOn(addUser, 'execute').mockImplementationOnce(() => { throw new Error('An error!') })

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })

  test('should return status code 500 when email service is unavailable', async () => {
    const expected = {
      body: {
        ...new InternalServerError(),
        errorType: 'server.error'
      },
      statusCode: 500
    }

    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@email.com'
      }
    }

    const { controller, sendEmailWithBonusAttached } = makeSut()

    jest.spyOn(sendEmailWithBonusAttached, 'execute').mockImplementationOnce(() => { throw new Error('An error!') })

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })
})
