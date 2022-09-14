export interface Params {
    input: string
}

export abstract class BusinessError extends Error {
  detail: string

  constructor ({ input }: Params) {
    super(input)
    this.detail = input
  }
}
