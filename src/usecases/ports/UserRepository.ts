import { UserData } from '@/domain/entities/UserData'

export interface UserRepository {
    findUserByEmail(email: string): Promise<UserData>
    add(userData: UserData): Promise<void>
}
