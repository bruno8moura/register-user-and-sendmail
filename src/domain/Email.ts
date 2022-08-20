
interface Params {
    input: string
}

export class Email {
  static validate ({ input }: Params) {
    if (!input) return false

    return true
  }
}
