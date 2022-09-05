import { Express } from 'express'
import { BodyParser, ContentType, Cors } from '@/main/middlewares'

interface Request{
  app:Express
}

export default ({ app }: Request) => {
  app.use(BodyParser.json())
  app.use(Cors.enable())
  app.use(ContentType.json())
}
