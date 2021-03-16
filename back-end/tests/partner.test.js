const supertest = require('supertest')
const app = require('../app')
const Partner = require('../models/Partner')
const Address = require('../models/Address')

beforeAll(async() =>{
  await Partner.deleteMany()
  await Address.deleteMany()
})

describe('Partner Endpoints', () => {
  let testuid = ''; // used to access the uid of the test case
  //CREATE PARTNER
  it('should create a new partner', async () => {
    const res = await supertest(app).post('/partner')
    .send({
        fname: 'David',
        lname: 'partner',
        email: 'fake@gmail.com'
      })
    .expect(200)
    testuid = res.body._id;
  })
  //GET ALL PARTNERS
  it('should get all partners', async () => {
    const res = await supertest(app).get('/partner')
  })
  //GET ONE PARTNER
  it('should get a specific partner', async () => {
    const res = await supertest(app).get('/partner/' + testuid)
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
  //UPDATE PARTNER
  it('should update a specific partner', async () => {
    const res = await supertest(app).put('/partner/' + testuid)
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
    const res = await supertest(app).post('/partner/' + testuid + '/address')
    .send({
        streetAddress: '1234 W. Avenue St.',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '123456'
      })
    .expect(200)
    testaddid = res.body._id;
  })
  //GET ONE ADDRESS
  it('should get a specific address', async () => {
    const res = await supertest(app).get('/partner/' + testuid + '/address/')
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
    const res = await supertest(app).put('/partner/' + testuid + '/address/')
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
  it('should get a specific partner orders', async () => {
    const res = await supertest(app).get('/partner/' + testuid + '/orders')
    .expect(200)
  })
  //GET ALL ORDERS
  it('should get a specific partner orders', async () => {
    const res = await supertest(app).get('/partner/' + testuid + '/inventory')
    .expect(200)
  })
   //DELETE ADDRESS
   it('should delete a specific partner', async () => {
    const res = await supertest(app).delete('/partner/' + testuid+ '/address/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })
  //DELETE PARTNER
  it('should delete a specific partner', async () => {
    const res = await supertest(app).delete('/partner/' + testuid)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })
})