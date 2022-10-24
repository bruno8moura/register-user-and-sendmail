import request from 'supertest'
import { app } from '@/main/config'

describe('External :: Middleware :: HttpRequesIdGenerator', () => {
  test('should return a brand new generated uuid v4 into headers response', async () => {
    app.post('/test_request_id', async (req, res) => {
      res.status(201).send('')
    })

    await request(app)
      .post('/test_request_id')
      .expect(201)
      .then(response => {
        const requestId = response.headers['x-request-id'] as string
        const matchUuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

        expect(matchUuidV4.test(requestId)).toBeTruthy()
      })
  })

  test('should return the same uuid v4 passed prior in request into header response', async () => {
    app.post('/test_request_id', async (req, res) => {
      res.status(201).send('')
    })

    await request(app)
      .post('/test_request_id')
      .set('x-request-id', '36de66f3-6f28-4f54-b68c-27c7050e10e4')
      .expect(201)
      .then(response => {
        const requestId = response.headers['x-request-id'] as string
        expect(requestId).toBe('36de66f3-6f28-4f54-b68c-27c7050e10e4')
      })
  })
})
