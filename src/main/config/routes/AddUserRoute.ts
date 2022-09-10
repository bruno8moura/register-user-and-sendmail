import { RegisterUserWebController } from '@/interfaces/webcontrollers/RegisterUserWebController'
import { Router } from 'express'
import { RouteAdapter } from '@/main/config/adapters/RouteAdapter'
import { RegisterUserFactory } from './factories/controllers/RegisterUserFactory'
import routePaths from '@/main/config/routes/RoutePaths'

export class AddUserRoute {
    private routeAdapter: RouteAdapter
    constructor (routeAdapter: RouteAdapter) {
      this.routeAdapter = routeAdapter
    }

    execute (router: Router): void {
      const registerUserController: RegisterUserWebController = RegisterUserFactory.create()
      router.post(routePaths.USERS, this.routeAdapter.execute(registerUserController))
    }
}
