import { randomUUID } from 'crypto'
import { UserModel } from '@/domain/entities'

interface Params {
  name: string,
  email: string
}

export default () => ({
  toDatabaseUserModel: ({ name, email }: Params): UserModel => {
    return {
      id: randomUUID(),
      name,
      email
    }
  }
})
