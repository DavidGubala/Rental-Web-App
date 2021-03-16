const supertest = require('supertest')
const app = require('../app')
const Truck = require('../models/truck')
const Trailer = require('../models/trailer')

beforeAll(async() =>{
  await Truck.deleteMany()
  await Trailer.deleteMany()
})

describe('Rental Endpoints', () => {
    let testtruckid = ''; // used to access the tid of the test case
    //CREATE TRUCK
    it('should create a new truck', async () => {
        const res = await supertest(app).post('/rental/truck')
        .send({
            truckType: 'Semi',
            vin: 'a6s5f6asd1a6sdf1asd3v5asd31',
            make: 'Volvo',
            model: 'Truck',
            year: '2016',
            price: '875',
            locationId: 'dummy',
            ownerId: 'dummy'
        })
        .expect(200)
        .expect(function(res, err) {
            if (err) {
                throw new Error(err);
            }
        })
        testtruckid = res.body._id;
    })
    //GET ONE TRUCK
    it('should get a specific truck', async () => {
      const res = await supertest(app).get('/rental/truck/' + testtruckid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('truckType' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('vin' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('_id' in res.body)) {
          throw new Error('Did not get id');
        }
      })
    })
    //UPDATE TRUCK
    it('should update a specific truck', async () => {
      const res = await supertest(app).put('/rental/truck/' + testtruckid)
      .send({
        truckType: 'Semi',
        vin: '1234',
        make: '!Wabash',
        model: '!Truck',
        year: '2017',
        price: '895',
        locationId: 'dummy1',
        ownerId: 'dummy1',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not update successfully');
        }
      })
    })


    //CREATE TRIALER
    let testtrailerid = ''
    it('should create a new trailer', async () => {
        const res = await supertest(app).post('/rental/trailer')
        .send({
            trailerType: 'Reefer',
            bodyLength : '53',
            manuf: 'Wabash',
            year: '2016',
            price: '875',
            locationId: 'dummy',
            ownerId: 'dummy'
        })
        .expect(200)
        .expect(function(res, err) {
            if (err) {
                throw new Error(err);
            }
        })
        testtrailerid = res.body._id;
    })
    //GET ONE TRIALER
    it('should get a specific trailer', async () => {
      const res = await supertest(app).get('/rental/trailer/' + testtrailerid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('trailerType' in res.body)) {
          throw new Error('Did not get trailer type');
        }
        if (!('bodyLength' in res.body)) {
          throw new Error('Did not get vin');
        }
        if (!('_id' in res.body)) {
          throw new Error('Did not get id');
        }
      })
    })
    //UPDATE TRIALER
    it('should update a specific trailer', async () => {
      const res = await supertest(app).put('/rental/trailer/' + testtrailerid)
      .send({
        truckType: 'Semi',
        vin: '1234',
        make: '!Wabash',
        model: '!Truck',
        year: '2017',
        price: '895',
        locationId: 'dummy1',
        ownerId: 'dummy1'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not update successfully');
        }
      })
    })

    //GET ALL Rentals
    it('should get all rentals', async () => {
        const res = await supertest(app).get('/rental/inventory')
        console.log(res.body)
    })
        
    //DELETE TRAILER
    it('should delete a specific trailer', async () => {
      const res = await supertest(app).delete('/rental/trailer/' + testtrailerid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not delete successfully');
        }
      })
    })
    //DELETE TRUCK
    it('should delete a specific truck', async () => {
      const res = await supertest(app).delete('/rental/truck/' + testtruckid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not delete successfully');
        }
      })
    })

})