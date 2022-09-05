import { Express } from 'express'
import { BodyParser } from '@/main/middlewares/BodyParser'

interface Request{
  app:Express
}

export default ({ app }: Request) => {
  app.use(BodyParser.json())
}
