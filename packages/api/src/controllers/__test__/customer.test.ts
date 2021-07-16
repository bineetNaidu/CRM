import request from 'supertest';
import app from '../../app';

const defaultCustomer = {
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.com',
  phoneNumber: '(000) 000 0000',
  timezone: 'Pacific time',
  avatar:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fbootstrap%2Fimg_avatar3.png&f=1&nofb=1',
};

it('should return a 200 OK status', async () => {
  return request(app).get('/api/customers').expect(200);
});

// write a test that create a new customer
it('should create a new customer', async () => {
  return request(app).post('/api/customers').send(defaultCustomer).expect(201);
});

// write a test to get a customer
it('should get a customer', async () => {
  // create a customer
  const customer = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(200);
  // get the customer
  const c = await request(app)
    .get(`/api/customers/${customer.body.data.id}`)
    .expect(200);

  expect(c.body.data.firstName).toEqual(defaultCustomer.firstName);
  expect(c.body.data.lastName).toEqual(defaultCustomer.lastName);
  expect(c.body.data.email).toEqual(defaultCustomer.email);
  expect(c.body.data.phoneNumber).toEqual(defaultCustomer.phoneNumber);
  expect(c.body.data.timezone).toEqual(defaultCustomer.timezone);
  expect(c.body.data.avatar).toEqual(defaultCustomer.avatar);
});

// write a test that update a customer
it('should update a customer', async () => {
  // first create a customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  const id = res.body.data.id;
  // then update the customer
  const updatedRes = await request(app)
    .put(`/api/customers/${id}`)
    .send({
      firstName: 'test2',
      lastName: 'test2',
    })
    .expect(200);

  expect(updatedRes.body.data.firstName).toBe('test2');
  expect(updatedRes.body.updated).toBe(true);
});

// write a test that delete a customer
it('should delete a customer', async () => {
  // first create a customer
  const res = await request(app)
    .post('/api/customers')
    .send(defaultCustomer)
    .expect(201);

  const id = res.body.data.id;
  // then delete the customer
  const deletedRes = await request(app)
    .delete(`/api/customers/${id}`)
    .expect(200);

  expect(deletedRes.body.deletedCustomerId).toBe(id);
  expect(deletedRes.body.deleted).toBe(true);
});
