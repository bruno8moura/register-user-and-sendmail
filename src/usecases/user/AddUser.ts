import { InvalidEmailError, InvalidNameError } from '@/domain'
import { UserData } from '@/domain/entities/UserData'
import { Either } from '@/shared/util/Either'

export interface AddUser {
    execute(data: UserData): Promise<Either<InvalidEmailError | InvalidNameError, UserData>>
}
