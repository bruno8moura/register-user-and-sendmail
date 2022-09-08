import { UserData } from '@/domain/entities/UserData'
import { AbstractError } from '@/domain/errors/AbstractError'
import { Either } from '@/shared/util/Either'

export interface AddUser {
    execute(data: UserData): Promise<Either<AbstractError, UserData>>
}
