import { HttpResponse } from '@/interfaces/webcontrollers/ports'

export class HttpResponseHelper {
  static created ({ body }): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  }
}
