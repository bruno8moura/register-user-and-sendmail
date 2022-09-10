import { ExpressRouteAdapter } from '@/main/config/adapters/express/ExpressRouteAdapter'
import { AddUserRoute } from '@/main/config/routes/AddUserRoute'
const routeAdapter = new ExpressRouteAdapter()

const addUserRoute = new AddUserRoute(routeAdapter)

export const routes = [
  addUserRoute
]
