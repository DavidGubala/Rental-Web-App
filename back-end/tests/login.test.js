const supertest = require('supertest')
const app = require('../app')
const Login = require('../models/login')
const Carrier = require('../models/Carrier')

beforeAll(async() =>{
    await Carrier.deleteMany()
    await Login.deleteMany()
})
  
describe('Login Endpoints', () => {
  let testuid = ''; // used to access the uid of the test case
  //CREATE CARRIER
  it('should create a new carrier', async () => {
    const res = await supertest(app).post('/carrier')
    .send({
        fname: 'David',
        lname: 'carrier',
        email: 'fake@gmail.com'
      })
    .expect(200)
    testuid = res.body._id;
  })
  //REGISTER
  it('should register a user', async () => {
    const res = await supertest(app).post('/login/register')
    .send({
        uid: testuid,
        pass: 'password'
      })
    .expect(200)
  })
  //LOGIN
  it('should login a user', async () => {
    const res = await supertest(app).post('/login')
    .send({
        loginType : 'carrier',
        email:'fake@gmail.com',
        pass: 'password'
      })
    .expect(200)
    .expect(function(res) {
        console.log(res.body)
      if (!('status' in res.body)) {
        if (!(res.body.status == 'ok')) {
            throw new Error('error');
          }
      }
    })
  })
  /*
  //UPDATE CARRIER
  it('should update a specific carrier', async () => {
    const res = await supertest(app).put('/carrier/' + testuid)
    .send({
      fname: 'dave',
      lname: 'tester',
      email: 'faker@gmail.com'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not update successfully');
      }
    })
  })
  //DELETE CARRIER
  it('should delete a specific carrier', async () => {
    const res = await supertest(app).delete('/carrier/' + testuid)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })
  */
})