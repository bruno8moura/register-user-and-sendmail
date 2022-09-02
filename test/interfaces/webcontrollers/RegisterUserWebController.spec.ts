import { MissingParamError } from '@/interfaces/errors/MissingParamError'
import { HttpRequest } from '@/interfaces/webcontrollers/ports'
import { HttpResponse } from '@/interfaces/webcontrollers/ports/HttpResponse'
import { RegisterUserUseCase } from '@/interfaces/webcontrollers/ports/RegisterUserUseCase'
import { RegisterUserWebController } from '@/interfaces/webcontrollers/RegisterUserWebController'

const makeRegisterUserOnMailingList = (): RegisterUserUseCase => {
  interface Request {
      name: string,
      email: string
  }
  interface Response {
    value:{
      name: string,
      email: string
    }
  }

  class RegisterUserOnMailingListStub implements RegisterUserUseCase {
    async execute (request: Request): Promise<Response> {
      return Promise.resolve({ isLeft: () => false, isRight: () => true, value: { ...request } })
    }
  }

  return new RegisterUserOnMailingListStub()
}

const makeSut = () => {
  const useCase = makeRegisterUserOnMailingList()
  const controller: RegisterUserWebController = new RegisterUserWebController(useCase)

  return {
    useCase,
    controller
  }
}

describe('Interfaces :: WebControllers :: RegisterUserWebController', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any Name',
        email: 'any@email.com'
      }
    }

    const { controller } = makeSut()

    const { statusCode, body }: HttpResponse = await controller.handle(request)

    expect(statusCode).toBe(201)
    expect(body).toStrictEqual(request.body)
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'invalid name',
        email: 'any@email.com'
      }
    }

    const expected = {
      body: new Error('An error!'),
      statusCode: 400
    }

    const { controller, useCase } = makeSut()

    jest.spyOn(useCase, 'execute').mockImplementationOnce(async () => {
      return Promise.resolve({
        isLeft: () => true,
        isRight: () => false,
        value: new Error('An error!')
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
      body: new Error('An error!'),
      statusCode: 400
    }

    const { controller, useCase } = makeSut()

    jest.spyOn(useCase, 'execute').mockImplementationOnce(async () => {
      return Promise.resolve({
        isLeft: () => true,
        isRight: () => false,
        value: new Error('An error!')
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
      body: new MissingParamError({ input: 'name' }),
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
      body: new MissingParamError({ input: 'email' }),
      statusCode: 400
    }

    const { controller } = makeSut()

    const result: HttpResponse = await controller.handle(request)

    expect(result).toStrictEqual(expected)
  })
})
