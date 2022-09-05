import { Express } from 'express'
import { BodyParser } from '@/main/middlewares/BodyParser'
import { Cors } from '@/main/middlewares/Cors'

interface Request{
  app:Express
}

export default ({ app }: Request) => {
  app.use(BodyParser.json())
  app.use(Cors.enable())
}
