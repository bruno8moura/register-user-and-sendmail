import { randomUUID } from 'crypto'
import { UserModel } from '@/domain/entities'
import { AddUserModel } from '@/usecases/user/AddUser'

export default () => ({
  toDatabaseUserModel: (addUserModel: AddUserModel): UserModel => {
    const { name, email } = addUserModel

    return {
      id: randomUUID(),
      name,
      email
    }
  }
})
