import { Request, Response, NextFunction } from 'express'

export class Cors {
  static enable () {
    return (req:Request, res: Response, next: NextFunction) => {
      res.set('access-control-allow-origin', '*')
      res.set('access-control-allow-headers', '*')
      res.set('access-control-allow-methods', '*')

      next()
    }
  }
}
