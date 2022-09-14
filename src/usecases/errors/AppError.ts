export interface Params {
    input: string
}

export type ErrorType = 'client.error' | 'server.error';
export abstract class AppError extends Error {
  errorType: ErrorType
  detail: string

  constructor ({ input }: Params) {
    super(input)
    this.detail = input
  }
}
