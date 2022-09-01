interface UserData {
    name: string,
    email: string
}

export interface RegisterUserUseCase {
    execute(user: UserData): Promise<any>
}
