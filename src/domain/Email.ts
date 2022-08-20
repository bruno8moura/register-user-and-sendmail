
interface Params {
    input: string
}

export class Email {
  static validate ({ input }: Params) {
    if (!input) return false

    const [local] = input.split('@')
    if (local.length > 64) return false

    if (input.length > 320) return false

    return true
  }
}
