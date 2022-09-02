export interface Params {
    input: string
}

export abstract class AbstractError extends Error {
  constructor ({ input }: Params) {
    super(input)
  }

  abstract get name(): string
}
