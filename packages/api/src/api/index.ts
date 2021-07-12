import { Router } from 'express';
import {
  createNote,
  deleteNote,
  updateNote,
  getAllNotesByCustomer,
} from '../controllers/notes';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from '../controllers/customer';

const r = Router();

r.route('/customers').get(getAllCustomers).post(createCustomer);
r.route('/customers/:id')
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

r.route('/customers/:id/notes').get(getAllNotesByCustomer).post(createNote);
r.route('/customers/:id/notes/:noteId').delete(deleteNote).put(updateNote);

export { r as apiRoutes };
