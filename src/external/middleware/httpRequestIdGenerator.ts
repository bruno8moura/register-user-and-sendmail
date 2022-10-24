import { randomUUID } from 'crypto'
import { ServerResponse, IncomingMessage } from 'http'

export const genReqId = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.id as string || req.headers['x-request-id'] || randomUUID()
  res.setHeader('x-request-id', id)
  return id
}
