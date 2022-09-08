import { HttpRequest, HttpResponse } from '@/interfaces/webcontrollers/ports'

export interface Controller {
    handle(request: HttpRequest): Promise<HttpResponse>
}
