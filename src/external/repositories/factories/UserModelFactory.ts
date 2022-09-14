import { randomUUID } from 'crypto'
import { UserModel } from '@/domain/entities'
import { AddUserModel } from '@/usecases'

export default () => ({
  toDatabaseUserModel: ({ name, email }: AddUserModel): UserModel => {
    return {
      id: randomUUID(),
      name,
      email
    }
  }
})
