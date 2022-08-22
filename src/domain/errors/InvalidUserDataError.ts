export interface Params {
    input: string
}

export class InvalidUserDataError extends Error {
  constructor ({ input }: Params) {
    super(input)
  }
}
