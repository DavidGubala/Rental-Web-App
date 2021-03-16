const request = require('supertest')
const app = require('../app')

describe('Carrier Endpoints', () => {
  it('should create a new carrier', async () => {
    const res = await request(app).post('/carrier').send({
        fname: 'David',
        lname: 'Gubala',
        email: 'fake@gmail.com'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('carrier')
  })
})