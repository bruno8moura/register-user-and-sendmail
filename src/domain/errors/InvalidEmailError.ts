interface Params {
    email: string
}

export class InvalidEmailError extends Error {
  constructor ({ email }: Params) {
    super(`The email "${email}" is invalid`)
  }
}
