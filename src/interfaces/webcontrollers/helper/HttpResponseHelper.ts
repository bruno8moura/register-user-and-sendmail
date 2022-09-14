import { HttpResponse } from '@/interfaces/webcontrollers/ports'
import { EnumHttpErrorType } from '../enums/EnumHttpErrorType'

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
      body: {
        ...body,
        errorType: EnumHttpErrorType.CLIENT_ERROR
      }
    }
  }

  static internalServerError ({ body }: Payload): HttpResponse {
    return {
      statusCode: 500,
      body: {
        ...body,
        errorType: EnumHttpErrorType.SERVER_ERROR
      }
    }
  }
}
