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

  test('should return another content when forced', async () => {
    app.get('/test_content_type_xml', async (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
