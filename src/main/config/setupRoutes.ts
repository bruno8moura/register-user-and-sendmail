import { Express } from 'express'
import { routes } from '@/main/config/routes'
import { router } from '@/main/config/routes/ExpressRouter'

interface Request{
  app: Express
}

export default ({ app }: Request) => {
  routes.forEach(route => route.execute(router))
  app.use('/api', router)
}
