import request from 'supertest';
import app from '../../app';
import { defaultInvoice } from './test.utils';
import mongoose from 'mongoose';

// a test to make sure the invoice controller is working properly
it('should return a 200 status', async () => {
  return request(app).get('/api/invoices').expect(200);
});

// a test to create an invoice
it('should create an invoice with the status of 201', async () => {
  return request(app).post('/api/invoices').send(defaultInvoice).expect(201);
});

// a test to get an invoice
it('should get an invoice with the status of 200', async () => {
  // create an invoice
  const createdInvoice = await request(app)
    .post('/api/invoices')
    .send(defaultInvoice)
    .expect(201);
  // get the invoice
  await request(app)
    .get(`/api/invoices/${createdInvoice.body.data.id}`)
    .expect(200);

  expect(createdInvoice.body.data).toBeDefined();
  expect(createdInvoice.body.data.payment).toEqual(defaultInvoice.payment);
  expect(createdInvoice.body.data.totalAmount).toEqual(
    defaultInvoice.totalAmount
  );
  expect(createdInvoice.body.data.tax).toEqual(defaultInvoice.tax);
  expect(createdInvoice.body.data.subTotal).toEqual(defaultInvoice.subTotal);
  expect(createdInvoice.body.data.summary).toEqual(defaultInvoice.summary);
});

// a test to delete an invoice
it('should delete an invoice', async () => {
  // create an invoice
  const createdInvoice = await request(app)
    .post('/api/invoices')
    .send(defaultInvoice)
    .expect(201);

  const id = createdInvoice.body.data.id;
  // delete the invoice
  const deletedInvoice = await request(app)
    .delete(`/api/invoices/${id}`)
    .expect(200);
  expect(deletedInvoice.body.deletedInvoiceId).toEqual(id);
  expect(deletedInvoice.body.deleted).toEqual(true);
});

it('should return unsuccessfull status with a invalid invoice id', async () => {
  const invalidId = mongoose.Types.ObjectId();
  const { body } = await request(app)
    .get(`/api/invoices/${invalidId}`)
    .expect(200);
  expect(body.success).toEqual(false);
});
