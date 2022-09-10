import { Controller } from '@/interfaces/webcontrollers/Controller'

export interface RouteAdapter {
  execute (controller: Controller): any
}
