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
})
