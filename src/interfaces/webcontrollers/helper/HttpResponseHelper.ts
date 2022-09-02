import { HttpResponse } from '@/interfaces/webcontrollers/ports'

export class HttpResponseHelper {
  static created ({ body }): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  }

  static badRequest ({ error }): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  static internalServerError ({ error }): HttpResponse {
    return {
      statusCode: 500,
      body: error
    }
  }
}
