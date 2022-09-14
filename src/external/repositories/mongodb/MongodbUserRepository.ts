import { UserModel } from '@/domain'
import { UserRepository } from '@/usecases'
import { MongoHelper } from '@/external/repositories/mongodb/helpers/MongoHelper'
import { AddUserModel } from '@/usecases/user/AddUser'
import UserModelFactory from '@/external/repositories/factories/UserModelFactory'

export class MongodbUserRepository implements UserRepository {
  private getCollection () {
    return MongoHelper.getCollection('users')
  }

  async findUserByEmail (email: string): Promise<UserModel> {
    return this.getCollection().findOne({ email })
  }

  async add (addUserModel: AddUserModel): Promise<UserModel> {
    const newUserModel = UserModelFactory().toDatabaseUserModel(addUserModel)
    await this.getCollection().insertOne(newUserModel)

    return MongoHelper.modelMap({ data: newUserModel })
  }

  async exists (email: string): Promise<boolean> {
    const foundUser = this.findUserByEmail(email)

    return !!foundUser
  }
}
