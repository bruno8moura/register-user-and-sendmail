import { json } from 'express'

export class BodyParser {
  static json () {
    return json()
  }
}
