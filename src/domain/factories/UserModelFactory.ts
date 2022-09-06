import { randomUUID } from 'crypto'
import { UserData } from '@/domain/entities'

export default () => ({
  toDatabaseUserModel: (userData: UserData) => {
    const { name, email } = userData

    return {
      id: randomUUID(),
      name,
      email
    }
  }
})
