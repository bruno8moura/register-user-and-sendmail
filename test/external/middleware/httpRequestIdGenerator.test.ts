import { genReqId } from '@/external/middleware/httpRequestIdGenerator'
import crypto from 'crypto'

describe('External :: Middleware :: HttpRequesIdGenerator', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should generate a brand new uuid-v4 request id', () => {
    const req = {
      id: undefined,
      headers: {}
    }

    const res = {
      setHeader: () => {}
    }

    const uuidV4 = crypto.randomUUID()

    jest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => uuidV4)
    jest.spyOn(res, 'setHeader')

    // @ts-ignore
    const result = genReqId(req, res)

    expect(crypto.randomUUID).toBeCalledTimes(1)
    expect(res.setHeader).toBeCalledTimes(1)
    expect(result).toBe(uuidV4)
  })

  test('should use request id already generated from req.id', () => {
    const uuidV4 = 'b359111c-2474-49d8-93d8-7b7f0d31b84e'
    const req = {
      id: uuidV4,
      headers: {
        'x-request-id': uuidV4
      }
    }

    const res = {
      setHeader: () => {}
    }

    jest.spyOn(res, 'setHeader')

    // @ts-ignore
    const result = genReqId(req, res)

    expect(crypto.randomUUID).toBeCalledTimes(0)
    expect(res.setHeader).toBeCalledTimes(1)
    expect(result).toBe(uuidV4)
    expect(req.id).toBe(result)
  })

  test('should use request id already generated from "x-request-id" header', () => {
    const uuidV4 = 'b359111c-2474-49d8-93d8-7b7f0d31b84e'
    const req = {
      id: undefined,
      headers: {
        'x-request-id': uuidV4
      }
    }

    const res = {
      setHeader: () => {}
    }

    jest.spyOn(res, 'setHeader')

    // @ts-ignore
    const result = genReqId(req, res)

    expect(crypto.randomUUID).toBeCalledTimes(0)
    expect(res.setHeader).toBeCalledTimes(1)
    expect(result).toBe(uuidV4)
    expect(req.id).toBe(undefined)
  })
})
