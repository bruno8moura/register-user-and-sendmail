import { HttpResponse } from '@/interfaces/webcontrollers/ports'
interface Payload {
  body: any
}

export class HttpResponseHelper {
  static created ({ body }: Payload): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  }

  static badRequest ({ body }: Payload): HttpResponse {
    return {
      statusCode: 400,
      body
    }
  }

  static internalServerError ({ body }: Payload): HttpResponse {
    return {
      statusCode: 500,
      body
    }
  }
}
