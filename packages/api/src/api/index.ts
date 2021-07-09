import { Router } from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomer,
} from '../controllers/customer';

const r = Router();

r.get('/', (_req, res) => {
  res.json({
    msg: 'Hello API',
  });
});

r.route('/customers').get(getAllCustomers).post(createCustomer);
r.route('/customers/:id').get(getCustomer);

export { r as apiRoutes };
