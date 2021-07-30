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
  searchCustomer,
} from '../controllers/customer';
import {
  createDeal,
  deleteDeal,
  getAllDealsByCustomer,
  updateDeal,
} from '../controllers/deals';
import {
  createSetting,
  getSetting,
  updateSetting,
} from '../controllers/setting';
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
} from '../controllers/invoice';

const r = Router();

r.route('/customers').get(getAllCustomers).post(createCustomer);
r.get('/customers/search', searchCustomer);
r.route('/customers/:id')
  .get(getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

// Notes Route
r.route('/customers/:id/notes').get(getAllNotesByCustomer).post(createNote);
r.route('/customers/:id/notes/:noteId').delete(deleteNote).put(updateNote);

// Deals Route
r.route('/customers/:id/deals').get(getAllDealsByCustomer).post(createDeal);
r.route('/customers/:id/deals/:dealId').delete(deleteDeal).put(updateDeal);

// Invoice Route
r.route('/invoices').get(getInvoices).post(createInvoice);
r.route('/invoices/:invoiceId').get(getInvoice).delete(deleteInvoice);

// Settings
r.route('/settings').post(createSetting).get(getSetting).put(updateSetting);

export { r as apiRoutes };
