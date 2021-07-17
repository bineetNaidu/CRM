import request from 'supertest';
import app from '../../app';
import { defaultCustomer } from './test.utils';

// a test to make sure the notes API is working
it('should return a 200 response', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // get the customer
  const customerId = res.body.data.id;
  return request(app).get(`/api/customers/${customerId}/notes`).expect(200);
});

// a test to create a new note
it('should create a new note', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // get the customer
  const customerId = res.body.data.id;

  // create a new note
  const res2 = await request(app)
    .post(`/api/customers/${customerId}/notes`)
    .send({
      body: 'test note',
    })
    .expect(201);

  // check the data
  expect(res2.body.data).toBeDefined();
  expect(res2.body.data.body).toBe('test note');
});

// a test to get back all notes for a customer
it('should get back all notes for a customer', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // get the customer
  const customerId = res.body.data.id;

  // create a new note
  await request(app)
    .post(`/api/customers/${customerId}/notes`)
    .send({
      body: 'test note',
    })
    .expect(201);

  // create a new note
  await request(app)
    .post(`/api/customers/${customerId}/notes`)
    .send({
      body: 'test note 2',
    })
    .expect(201);

  // get the notes
  const res4 = await request(app)
    .get(`/api/customers/${customerId}/notes`)
    .expect(200);

  // check the data
  expect(res4.body.data).toBeDefined();
  expect(res4.body.data.length).toBe(2);
  expect(res4.body.data[0].body).toBe('test note');
  expect(res4.body.data[1].body).toBe('test note 2');
});

// a test to update a note
it('should update a note', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // get the customer
  const customerId = res.body.data.id;

  // create a new note
  const res2 = await request(app)
    .post(`/api/customers/${customerId}/notes`)
    .send({
      body: 'test note',
    })
    .expect(201);

  // update the note
  const res3 = await request(app)
    .put(`/api/customers/${customerId}/notes/${res2.body.data.id}`)
    .send({
      body: 'updated note',
    })
    .expect(200);

  // check the data
  expect(res3.body.data).toBeDefined();
  expect(res3.body.data.body).toBe('updated note');
});

// a test to delete a note
it('should delete a note', async () => {
  // create a new customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  // get the customer
  const customerId = res.body.data.id;

  // create a new note
  const res2 = await request(app)
    .post(`/api/customers/${customerId}/notes`)
    .send({
      body: 'test note',
    })
    .expect(201);

  // delete the note
  const res3 = await request(app)
    .delete(`/api/customers/${customerId}/notes/${res2.body.data.id}`)
    .expect(200);

  // check the data
  expect(res3.body.deletedNoteId).toEqual(res2.body.data.id);
});
