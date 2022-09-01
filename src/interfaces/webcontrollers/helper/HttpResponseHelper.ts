import { HttpResponse } from '../ports/HttpResponse'

export class HttpResponseHelper {
  static created ({ body }): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  }
}
