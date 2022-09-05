import request from 'supertest'
import { app } from '@/main/config'

describe('Main :: Middleware :: ContentType', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type', async (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
