const supertest = require('supertest')
const app = require('../app')
const Order = require('../models/order')

beforeAll(async() =>{
  await Order.deleteMany()
})

describe('Order Endpoints', () => {
    let testorderid = ''; // used to access the tid of the test case
    //CREATE ORDER
    it('should create a new order', async () => {
        const res = await supertest(app).post('/order')
        .send({
            orderStatus: 'In Progress',
            orderType: 'Rental',
            itemId: 'asd65f4a65sd4fa6sd1',
            carrierId: 'dummyC',
            otherId: 'dummyp'
        })
        .expect(200)
        .expect(function(res, err) {
            if (err) {
                throw new Error(err);
            }
        })
        testorderid = res.body._id;
    })
    //GET ONE ORDER
    it('should get a specific order', async () => {
      const res = await supertest(app).get('/order/' + testorderid)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('orderStatus' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('itemId' in res.body)) {
          throw new Error('Did not get first name');
        }
        if (!('_id' in res.body)) {
          throw new Error('Did not get id');
        }
      })
    })
    //UPDATE ORDER
    it('should update a specific order', async () => {
      const res = await supertest(app).put('/order/' + testorderid)
      .send({
        orderStatus: 'Canceled',
        orderType: 'Rental',
        itemId: 'asdfasdasdasdfa',
        carrierId: 'dumC',
        otherId: 'dump'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        if (!('ok' in res.body)) {
          throw new Error('Did not update successfully');
        }
      })
    })
    /*
    //DELETE ORDER
    it('should delete a specific order', async () => {
      const res = await supertest(app).delete('/order/' + testorderid)
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