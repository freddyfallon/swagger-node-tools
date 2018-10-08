import request from 'supertest'
import app from './app'

describe('swaggerNodeTools', () => {  
  test('works without an error', (done) => {
    request(app)
      .post('/')
      .send('hey')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err)
        }
        expect(res.body).toEqual({this: 'works'})
        done()
      })
  })
})

