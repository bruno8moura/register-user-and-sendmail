import { UserData, UserModel } from '@/domain'
import { UserRepository } from '@/usecases'
import { MongoHelper } from './helpers/MongoHelper'
import UserModelFactory from '@/domain/factories/UserModelFactory'

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
    const userToDatabase: UserModel = UserModelFactory().toDatabaseUserModel(userData)
    await usersCollection.insertOne(userToDatabase)

    return MongoHelper.modelMap({ data: userToDatabase })
  }
}
