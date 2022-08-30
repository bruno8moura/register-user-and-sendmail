import { UserData } from '@/domain'

export interface UserRepository {
    findUserByEmail(email: string): Promise<UserData>
    add(userData: UserData): Promise<void>
}
