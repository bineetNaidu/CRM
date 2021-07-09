import { Router } from 'express';
import {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from '../controllers/customer';

const r = Router();

r.get('/', (_req, res) => {
  res.json({
    msg: 'Hello API',
  });
});

r.route('/customers').get(getAllCustomers).post(createCustomer);
r.route('/customers/:id').get(getCustomer).put(updateCustomer);

export { r as apiRoutes };
