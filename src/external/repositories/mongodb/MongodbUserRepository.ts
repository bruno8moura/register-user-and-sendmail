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

  async findUserByEmail (email: string): Promise<UserModel> {
    const usersCollection = MongoHelper.getCollection('users')
    return usersCollection.findOne({ email })
  }

  async add (userData: UserData): Promise<UserModel> {
    const usersCollection = MongoHelper.getCollection('users')
    const userToDatabase: UserModel = UserModelFactory().toDatabaseUserModel(userData)
    await usersCollection.insertOne(userToDatabase)

    return MongoHelper.modelMap({ data: userToDatabase })
  }
}
