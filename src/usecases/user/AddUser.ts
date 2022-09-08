import { InvalidEmailError, InvalidNameError, UserModel } from '@/domain'
import { Either } from '@/shared/util/Either'

export interface AddUserModel {
    name: string,
    email: string
}
export interface AddUser {
    execute(data: AddUserModel): Promise<Either<InvalidEmailError | InvalidNameError, UserModel>>
}
