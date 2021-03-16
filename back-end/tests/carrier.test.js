const supertest = require('supertest')
const app = require('../app')
const Carrier = require('../models/Carrier')
const License = require('../models/License')
const Address = require('../models/Address')

beforeAll(async() =>{
  await Carrier.deleteMany()
  await License.deleteMany()
  await Address.deleteMany()
})

describe('Carrier Endpoints', () => {
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
  //GET ALL CARRIERS
  it('should get all carriers', async () => {
    const res = await supertest(app).get('/carrier')
  })
  //GET ONE CARRIER
  it('should get a specific carrier', async () => {
    const res = await supertest(app).get('/carrier/' + testuid)
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

  //===== Address Options =====
  //CREATE ADDRESS
  let testaddid = '';
  it('should create a new address', async () => {
    const res = await supertest(app).post('/carrier/' + testuid + '/address')
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
    const res = await supertest(app).get('/carrier/' + testuid + '/address/')
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
    const res = await supertest(app).put('/carrier/' + testuid + '/address/')
    .send({
      streetAddress: '4567 W. Avenue St.',
      city: 'Somewhere',
      state: 'ON',
      country: 'CA',
      postalCode: '891011',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not update successfully');
      }
    })
  })

  //===== License Options =====
  //CREATE LICENSE
  let testlicid = '';
  it('should create a new address', async () => {
    const res = await supertest(app).post('/carrier/' + testuid + '/license')
    .send({
        LicenseType: '1234 W. Avenue St.',
        LicenseNumber: 'Chicago',
        expirationDate: 'IL'
      })
    .expect(200)
    testlicid = res.body._id
  })
  //GET ONE LICENSE
  it('should get a specific address', async () => {
    const res = await supertest(app).get('/carrier/' + testuid + '/license/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('LicenseType' in res.body)) {
        throw new Error('Did not get LicenseType');
      }
      if (!('expirationDate' in res.body)) {
        throw new Error('Did not get expirationDate');
      }
      if (!('_id' in res.body)) {
        throw new Error('Did not get id');
      }
    })
  })
  //UPDATE LICENSE
  it('should update a specific address', async () => {
    const res = await supertest(app).put('/carrier/' + testuid+ '/license/')
    .send({
      LicenseType: '1234 W. Avenue St.',
      LicenseNumber: 'Chicago',
      expirationDate: 'IL'
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
  it('should get a specific carriers orders', async () => {
    const res = await supertest(app).get('/carrier/' + testuid + '/orders')
    .expect(200)
  })

   //DELETE LICENSE
   it('should delete a specific carrier', async () => {
    const res = await supertest(app).delete('/carrier/' + testuid+ '/license/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
      }
    })
  })
   //DELETE ADDRESS
   it('should delete a specific carrier', async () => {
    const res = await supertest(app).delete('/carrier/' + testuid+ '/address/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(function(res) {
      if (!('ok' in res.body)) {
        throw new Error('Did not delete successfully');
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
})