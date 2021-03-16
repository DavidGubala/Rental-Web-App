const supertest = require('supertest')
const app = require('../app')
const Load = require('../models/load')

beforeAll(async() =>{
  await Load.deleteMany()
})

describe('Load Endpoints', () => {
    let testloadid = ''; // used to access the tid of the test case
    //CREATE LOAD
    it('should create a new load', async () => {
        const res = await supertest(app).post('/load')
        .send({
            loadWeight: '50lbs',
            price: '1500',
            pulocId: 'asd65f4a65sd4fa6sd1',
            destinationId: '6a5s4df65a4sd6fa1',
            shipperId: 'dummyS',
            carrierId :'dummyC'
        })
        .expect(200)
        .expect(function(res, err) {
            if (err) {
                throw new Error(err);
            }
        })
        testloadid = res.body._id;
    })
    //GET ONE LOAD
    it('should get a specific load', async () => {
      const res = await supertest(app).get('/load/' + testloadid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('loadWeight' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('price' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('_id' in res.body)) {
          throw new Error('Did not get id');
        }
      })
    })
    //UPDATE LOAD
    it('should update a specific load', async () => {
      const res = await supertest(app).put('/load/' + testloadid)
      .send({
        loadWeight: '500lbs',
        price: '500',
        pulocId: 'jkl;',
        destinationId: 'asdf',
        shipperId: 'dummys',
        carrierId :'dummyc'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not update successfully');
        }
      })
    })
    //DELETE LOAD
    it('should delete a specific load', async () => {
      const res = await supertest(app).delete('/load/' + testloadid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not delete successfully');
        }
      })
    })

})