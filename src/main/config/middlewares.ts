import { Express } from 'express'
import { BodyParser } from '@/main/middlewares/BodyParser'
import { Cors } from '@/main/middlewares/Cors'
import { ContentType } from '@/main/middlewares/ContentType'

interface Request{
  app:Express
}

export default ({ app }: Request) => {
  app.use(BodyParser.json())
  app.use(Cors.enable())
  app.use(ContentType.json())
}
