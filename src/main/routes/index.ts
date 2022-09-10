import { ExpressRouteAdapter } from '@/main/adapters/express/ExpressRouteAdapter'
import { AddUserRoute } from '@/main/routes/AddUserRoute'
const routeAdapter = new ExpressRouteAdapter()

const addUserRoute = new AddUserRoute(routeAdapter)

export const routes = [
  addUserRoute
]
