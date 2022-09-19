import { InvalidEmailError, InvalidNameError, UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'
import { EmailAlreadyRegisteredError } from '../errors/EmailAlreadyRegisteredError'

export interface AddUserModel {
    name: string,
    email: string
}
export interface AddUser {
    execute(data: AddUserModel): Promise<Either<InvalidEmailError | InvalidNameError | EmailAlreadyRegisteredError, UserModel>>
}
