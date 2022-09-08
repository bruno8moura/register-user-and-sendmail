import { UserModel } from '@/domain'
import { AddUserModel } from '@/usecases'

export interface UserRepository {
    findUserByEmail(email: string): Promise<UserModel>
    add(addUserModel: AddUserModel): Promise<UserModel>
    exists(email: string): Promise<boolean>
}
