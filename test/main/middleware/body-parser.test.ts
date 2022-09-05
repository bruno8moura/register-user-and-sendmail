import request from 'supertest'
import { app } from '@/main/config'

describe('Main :: Middleware :: BodyParser', () => {
  test('should parse body as json', async () => {
    app.post('/test_body_parser', async (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Bruno' })
      .expect({ name: 'Bruno' })
  })
})
