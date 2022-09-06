import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { MongodbUserRepository } from '@/external/repositories/mongodb/MongodbUserRepository'
import { UserRepository } from '@/usecases'

describe('External :: Repositories :: Mongodb :: MongoUserRepository', () => {
  beforeEach(() => {
    MongoHelper.clearCollection('users')
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should add an user to database', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()
    const addedUser = await userRepository.add({
      name: 'Any Name',
      email: 'any@mail.com'
    })

    expect(Object.keys(addedUser)).toStrictEqual(['name', 'email', 'id'])
  })

  test('should user exists into database', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'Any Name',
      email: 'any@mail.com'
    })

    expect(await userRepository.exists('any@mail.com')).toBeTruthy()
  })
})
