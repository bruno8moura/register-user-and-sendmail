import { Express } from 'express'
import { routes } from '@/main/routes'
import { router } from '@/main/routes/ExpressRouter'

interface Request{
  app: Express
}

export default ({ app }: Request) => {
  routes.forEach(route => route.execute(router))
  app.use('/api', router)
}
