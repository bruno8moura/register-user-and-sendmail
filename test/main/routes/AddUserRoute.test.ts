import request from 'supertest'
import { app } from '@/main/config'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'

describe('Main :: Config :: Routes :: AddUserRoute', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should register an user successfully', async () => {
    const data = {
      name: 'Any Name',
      email: 'any@mail.com'
    }

    await request(app)
      .post('/api/users')
      .send(data)
      .expect(201)
  })
})
