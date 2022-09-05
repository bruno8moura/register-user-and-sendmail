import { UserData } from '@/domain/entities/UserData'
import { AbstractError } from '@/shared/errors/AbstractError'
import { Either } from '@/shared/util/Either'

export interface AddUser {
    execute(data: UserData): Promise<Either<AbstractError, UserData>>
}
