import { EmailAlreadyRegisteredException } from './errors/EmailAlreadyRegisteredException'
import { UserRepository } from './ports/UserRepository'
import { UserData } from './UserData'

export class RegisterUserOnMailingList {
    private repository: UserRepository
    constructor (repository: UserRepository) {
      this.repository = repository
    }

    async registerUserOnMailingList ({ name, email }: UserData): Promise<void> {
      const foundUser = await this.repository.findUserByEmail(email)
      if (foundUser) throw new EmailAlreadyRegisteredException()
      await this.repository.add({ name, email })
    }
}
