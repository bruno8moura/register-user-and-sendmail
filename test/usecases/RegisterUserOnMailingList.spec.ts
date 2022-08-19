import { EmailAlreadyRegisteredException } from '../../src/usecases/errors/EmailAlreadyRegisteredException'
import { UserRepository } from '../../src/usecases/ports/UserRepository'
import { RegisterUserOnMailingList } from '../../src/usecases/RegisterUserOnMailingList'
import { UserData } from '../../src/usecases/UserData'

const makeInMemoryRepository = (): UserRepository => {
  class InMemoryUserRepository implements UserRepository {
    private repository: UserData[] = []
    async add (userData: UserData): Promise<void> {
      this.repository.push(userData)
    }

    async findUserByEmail (email: string): Promise<UserData> {
      return Promise.resolve(this.repository.find(aUser => aUser.email === email))
    }
  }

  return new InMemoryUserRepository()
}

const makeSut = () => {
  const repository = makeInMemoryRepository()
  const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repository)
  return {
    useCase,
    repository
  }
}

describe('Register use on mailing list use case', () => {
  test('should return "undefined" if user is not found', async () => {
    const { useCase, repository } = makeSut()
    const name = 'any_name'
    const email = 'any@email.com'
    await useCase.registerUserOnMailingList({ name, email })
    const user = await repository.findUserByEmail('any_other@email.com')
    expect(user).toBeUndefined()
  })

  test('should return user if user is found', async () => {
    const { useCase, repository } = makeSut()
    const name = 'any_name'
    const email = 'any@email.com'
    await useCase.registerUserOnMailingList({ name, email })
    const user = await repository.findUserByEmail('any@email.com')
    expect(user).toEqual({ name, email })
  })

  test('should add user with complete data to mailing list', async () => {
    const { useCase } = makeSut()
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await useCase.registerUserOnMailingList({ name, email })
    expect(response).toBeUndefined()
  })

  test('should not add two users with same email', async () => {
    const { useCase } = makeSut()
    const name = 'any_name'
    const email = 'any@email.com'
    try {
      const response = await useCase.registerUserOnMailingList({ name, email })
      expect(response).toBeUndefined()

      await useCase.registerUserOnMailingList({ name, email })
    } catch (error) {
      expect(error).toBeInstanceOf(EmailAlreadyRegisteredException)
      expect(error.message).toEqual('Email already registered')
    }
  })
})
