import request from 'supertest';
import app from '../../app';
import { defaultCustomer, defaultDeal } from './test.utils';

// a test to make sure that the deals endpoint is working properly
it('should response with 200 for deals endpoint', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // check the endpoint
  return request(app)
    .get(`/api/customers/${res.body.data.id!}/deals`)
    .expect(200);
});

// a test to make a new deal can be created
it('should response with status 201 for create deals endpoint', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // check the endpoint
  return request(app)
    .post(`/api/customers/${res.body.data.id!}/deals`)
    .send(defaultDeal)
    .expect(201);
});

// a test to make get all deals from a customer
it('should response with status 200 for getting all deals from a customer', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // create new deal
  const res2 = await request(app)
    .post(`/api/customers/${res.body.data.id!}/deals`)
    .send(defaultDeal)
    .expect(201);

  // get all deals
  const res3 = await request(app)
    .get(`/api/customers/${res.body.data.id!}/deals`)
    .expect(200);

  // check if the response is correct
  expect(res3.body.data).toBeDefined();
  expect(res3.body.data.length).toBe(1);
  expect(res3.body.data[0].id).toBe(res2.body.data.id);
});

// a test to make a new deal can be updated
it('should response with status 200 for update deals endpoint', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // create new deal
  const res2 = await request(app)
    .post(`/api/customers/${res.body.data.id!}/deals`)
    .send(defaultDeal)
    .expect(201);

  // update the deal
  const res3 = await request(app)
    .put(`/api/customers/${res.body.data.id!}/deals/${res2.body.data.id!}`)
    .send({
      name: 'new deal name',
    })
    .expect(200);

  // check if the response is correct
  expect(res3.body.data).toBeDefined();
  expect(res3.body.data.id).toBe(res2.body.data.id);
  expect(res3.body.data.name).toBe('new deal name');
});

// a test to make a new deal can be deleted
it('should response with status 200 for delete deals endpoint', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // create new deal
  const res2 = await request(app)
    .post(`/api/customers/${res.body.data.id!}/deals`)
    .send(defaultDeal)
    .expect(201);

  // delete the deal
  const res3 = await request(app)
    .delete(`/api/customers/${res.body.data.id!}/deals/${res2.body.data.id!}`)
    .expect(200);

  // check if the response is correct
  expect(res3.body.deletedDealId).toBe(res2.body.data.id);
});
