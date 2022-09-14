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

    expect(Object.keys(addedUser)).toStrictEqual(['id', 'name', 'email'])
  })

  test('should user exists into database', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'Any Name',
      email: 'any@mail.com'
    })

    expect(await userRepository.exists('any@mail.com')).toBeTruthy()
  })

  test('should "id" field has a valid UUID v4', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()
    const addedUser = await userRepository.add({
      name: 'Any Name',
      email: 'any@mail.com'
    })

    const UUID_V4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    expect(new RegExp(UUID_V4).test(addedUser.id)).toBeTruthy()
  })

  test('should find an previous registered user into database', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'Any Name',
      email: 'any@mail.com'
    })
    const foundUser = await userRepository.findUserByEmail('any@mail.com')
    expect(foundUser).toBeDefined()
  })

  test('should not find an inexistent user into database', async () => {
    const userRepository: UserRepository = new MongodbUserRepository()

    const foundUser = await userRepository.findUserByEmail('asdfasdfasdf@mail.com')
    expect(foundUser).toBeNull()
  })
})
