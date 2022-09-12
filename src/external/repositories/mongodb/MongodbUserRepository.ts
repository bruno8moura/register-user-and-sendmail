import { UserModel } from '@/domain'
import { UserRepository } from '@/usecases'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import UserModelFactory from '@/domain/factories/UserModelFactory'
import { AddUserModel } from '@/usecases/user/AddUser'

export class MongodbUserRepository implements UserRepository {
  private getCollection () {
    return MongoHelper.getCollection('users')
  }

  async findUserByEmail (email: string): Promise<UserModel> {
    return this.getCollection().findOne({ email })
  }

  async add (addUserModel: AddUserModel): Promise<UserModel> {
    const userToDatabase: UserModel = UserModelFactory().toDatabaseUserModel(addUserModel)
    await this.getCollection().insertOne(userToDatabase)

    return MongoHelper.modelMap({ data: userToDatabase })
  }

  async exists (email: string): Promise<boolean> {
    const foundUser = this.findUserByEmail(email)

    return !!foundUser
  }
}
