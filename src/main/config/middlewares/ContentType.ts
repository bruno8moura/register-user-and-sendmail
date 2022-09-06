import { Request, Response, NextFunction } from 'express'

export class ContentType {
  static json () {
    return (req:Request, res: Response, next: NextFunction) => {
      res.set('content-type', 'application/json')

      next()
    }
  }
}
