const supertest = require('supertest')
const app = require('../app')
const Shipper = require('../models/Shipper')
const Address = require('../models/Address')

beforeAll(async() =>{
  await Shipper.deleteMany()
  await Address.deleteMany()
})

describe('Shipper Endpoints', () => {
  let testuid = ''; // used to access the uid of the test case
  //CREATE SHIPPER
  it('should create a new shipper', async () => {
    const res = await supertest(app).post('/shipper')
    .send({
        fname: 'David',
        lname: 'shipper',
        email: 'fake@gmail.com'
      })
    .expect(200)
    testuid = res.body._id;
  })
  //GET ALL SHIPPERS
  it('should get all shippers', async () => {
    const res = await supertest(app).get('/shipper')
  })
  //GET ONE SHIPPER
  it('should get a specific shipper', async () => {
    const res = await supertest(app).get('/shipper/' + testuid)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('fname' in res.body)) {
        throw new Error('Did not get first name');
      }
      if (!('lname' in res.body)) {
        throw new Error('Did not get first name');
      }
      if (!('_id' in res.body)) {
        throw new Error('Did not get id');
      }
    })
  })
  //UPDATE SHIPPER
  it('should update a specific shipper', async () => {
    const res = await supertest(app).put('/shipper/' + testuid)
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

  //===== Address Options =====
  //CREATE ADDRESS
  let testaddid = '';
  it('should create a new address', async () => {
    const res = await supertest(app).post('/shipper/' + testuid + '/address')
    .send({
        streetAddress: '1234 W. Avenue St.',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '123456'
      })
    expect(200)
    testaddid = res.body._id;
  })
  //GET ONE ADDRESS
  it('should get a specific address', async () => {
    const res = await supertest(app).get('/shipper/' + testuid + '/address/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('streetAddress' in res.body)) {
        throw new Error('Did not get streetAddress');
      }
      if (!('city' in res.body)) {
        throw new Error('Did not get city');
      }
      if (!('_id' in res.body)) {
        throw new Error('Did not get id');
      }
    })
  })
  //UPDATE ADDRESS
  it('should update a specific address', async () => {
    const res = await supertest(app).put('/shipper/' + testuid + '/address/')
    .send({
      streetAddress: '4567 W. Avenue St.',
      city: 'Somewhere',
      state: 'ON',
      country: 'CA',
      postalCode: '891011'
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not update successfully');
      }
    })
  })
  
  //GET ALL ORDERS
  it('should get a specific shippers orders', async () => {
    const res = await supertest(app).get('/shipper/' + testuid + '/orders')
    .expect(200)
  })
  
  //GET ALL LOADS
  it('should get a specific shippers orders', async () => {
    const res = await supertest(app).get('/shipper/' + testuid + '/loads')
    .expect(200)
  })
  
   //DELETE ADDRESS
   it('should delete a specific shipper', async () => {
    const res = await supertest(app).delete('/shipper/' + testuid+ '/address/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })

  //DELETE SHIPPER
  it('should delete a specific shipper', async () => {
    const res = await supertest(app).delete('/shipper/' + testuid)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })
})