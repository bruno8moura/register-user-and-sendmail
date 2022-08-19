import { UserRepository } from '../../src/usecases/ports/UserRepository'
import { RegisterUserOnMailingList } from '../../src/usecases/RegisterUserOnMailingList'
import { UserData } from '../../src/usecases/UserData'

describe('Register use on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    class InMemoryUserRepository implements UserRepository {
      private repository: UserData[] = []
      async add (userData: UserData): Promise<void> {
        this.repository.push(userData)
      }

      async findUserByEmail (email: string): Promise<UserData> {
        return Promise.resolve(this.repository.find(aUser => aUser.email === email))
      }
    }

    const repository: UserRepository = new InMemoryUserRepository()
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repository)
    const name = 'any_name'
    const email = 'any@email.com'
    await usecase.registerUserOnMailingList({ name, email })
    const user = await repository.findUserByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })
})
