import { VALID_CHARS } from './enums/email/regex'

interface Params {
    input: string
}

export class Email {
  static validate ({ input }: Params): boolean {
    if (!input) return false
    if (input.length > 320) return false

    if (!VALID_CHARS.test(input)) return false

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
