
interface Params {
    input: string
}

export class Email {
  static validate ({ input }: Params): boolean {
    if (!input) return false
    if (input.length > 320) return false

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!emailRegex.test(input)) return false

    const [local, domain] = input.split('@')

    if (local.length > 64 || local.length === 0) return false

    if (domain.length > 255 || domain.length === 0) return false

    const domainParts = domain.split('.')

    const someDomainPartGreaterThan63 = domainParts.some(part => part.length > 63)
    if (someDomainPartGreaterThan63) {
      return false
    }

    return true
  }
}
