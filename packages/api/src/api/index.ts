import { Router } from 'express';
import { createCustomer, getAllCustomers } from '../controllers/customer';

const r = Router();

r.get('/', (_req, res) => {
  res.json({
    msg: 'Hello API',
  });
});

r.route('/customers').get(getAllCustomers).post(createCustomer);

export { r as apiRoutes };
