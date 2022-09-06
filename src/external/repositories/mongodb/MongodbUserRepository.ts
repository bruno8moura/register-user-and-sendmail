import { UserData, UserModel } from '@/domain'
import { UserRepository } from '@/usecases'
import { MongoHelper } from './helpers/MongoHelper'
import { randomUUID } from 'crypto'

export class MongodbUserRepository implements UserRepository {
  async exists (email: string): Promise<boolean> {
    const usersCollection = MongoHelper.getCollection('users')
    const foundUser = await usersCollection.findOne({ email })

    return !!foundUser
  }

  findUserByEmail (email: string): Promise<UserData> {
    throw new Error('Method not implemented.')
  }

  async add (userData: UserData): Promise<UserModel> {
    const usersCollection = MongoHelper.getCollection('users')
    const newUser: UserModel = { ...userData, id: randomUUID() }
    await usersCollection.insertOne(newUser)

    return MongoHelper.modelMap({ data: newUser })
  }
}
